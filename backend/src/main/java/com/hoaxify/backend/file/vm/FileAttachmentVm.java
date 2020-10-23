package com.hoaxify.backend.file.vm;

import com.hoaxify.backend.file.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentVm {

	private String name;
	
	private String fileType;
	
	public FileAttachmentVm(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
		this.setFileType(fileAttachment.getFileType());
	}

}
