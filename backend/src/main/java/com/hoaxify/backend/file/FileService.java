package com.hoaxify.backend.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoaxify.backend.configuration.AppConfiguration;
import com.hoaxify.backend.user.User;

@Service
@EnableScheduling
public class FileService {

	AppConfiguration appConfiguration;
	Tika tika;
	FileAttachmentRepository fileAttachmentRepository;
	
	public FileService(AppConfiguration appConfiguration, FileAttachmentRepository fileAttachmentRepository) {
		this.appConfiguration=appConfiguration;
		this.tika=new Tika();
		this.fileAttachmentRepository=fileAttachmentRepository;
	}
	
	public String writeBase64EncodedStringToFile(String image) throws IOException {
		String fileName=this.generateRandomName();
		File target=new File(appConfiguration.getProfileStoragePath()+"/"+fileName);
		OutputStream outputStream=new FileOutputStream(target);
		byte[] base64encoded=Base64.getDecoder().decode(image);
		outputStream.write(base64encoded);
		outputStream.close();
		return fileName;
	}
	
	public String generateRandomName() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	//	resim guncellemede eski resmi silme
	public void deleteProfileImage(String oldImageName) {
		if(oldImageName== null) {
			return ;
		}
		deleteFile(Paths.get(this.appConfiguration.getProfileStoragePath(),oldImageName));
	}

	public void deleteAttachmentFile(String oldImageName) {
		if(oldImageName== null) {
			return ;
		}
		deleteFile(Paths.get(this.appConfiguration.getAttachmentStoragePath(),oldImageName));
	}
	
	private void deleteFile(Path path) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detectType(String base64) {
		byte[] base64encoded=Base64.getDecoder().decode(base64);
		return detectType(base64encoded);
	}
	
	public String detectType(byte[] array) {
		return tika.detect(array);
	}

	public FileAttachment saveHoaxAttachment(MultipartFile multipartFile) {
		String fileName=this.generateRandomName();
		File target=new File(appConfiguration.getAttachmentStoragePath()+"/"+fileName);
		OutputStream outputStream;
		String fileType=null;
		try {
			byte[] array=multipartFile.getBytes();
			outputStream = new FileOutputStream(target);
			outputStream.write(array);
			outputStream.close();
			fileType=detectType(array);	
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment attachment=new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());
		attachment.setFileType(fileType);
		return this.fileAttachmentRepository.save(attachment);
	}
	

	//	uzun sure hoax gonderilmeden file saved olursa directory temizleme
	@Scheduled(fixedRate=24*60*60*1000) // 24 saatte bir calistir
	public void cleanupStorage() {
		// son 24 saatten eski olanlari sil
		Date twentyFourHoursAgo=new Date(System.currentTimeMillis()-(24*60*60*1000));
		List<FileAttachment> filesToBeDeleted=this.fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
		for(FileAttachment file:filesToBeDeleted) { 
			//	delete file
			deleteAttachmentFile(file.getName());
			//	delete from table
			this.fileAttachmentRepository.deleteById(file.getId());
		}
	}

	public void deleteAllStoredFilesForUser(User inDB) {
		deleteProfileImage(inDB.getImage());
		List<FileAttachment> filesToBeRemoved=this.fileAttachmentRepository.findByHoaxUser(inDB);
		for(FileAttachment file:filesToBeRemoved) {
			deleteAttachmentFile(file.getName());
		}
	}
	
	
}
