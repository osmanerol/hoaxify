package com.hoaxify.backend.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
public class FileController {

	@Autowired
	FileService fileService;
	
	//	@RequestParam(name="iamge") veya degisken adi clientta verilen ad
	@PostMapping("/api/1.0/hoax-attachments")
	FileAttachment saveHoaxAttachment(MultipartFile file) {
		return this.fileService.saveHoaxAttachment(file);
	}
	
}
