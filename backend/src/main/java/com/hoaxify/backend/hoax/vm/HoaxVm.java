package com.hoaxify.backend.hoax.vm;

import com.hoaxify.backend.file.vm.FileAttachmentVm;
import com.hoaxify.backend.hoax.Hoax;
import com.hoaxify.backend.user.vm.UserVm;

import lombok.Data;

@Data
public class HoaxVm {

	private long id;
	
	private String content;
	
	private long timestamp;	
	
	private UserVm user;
	
	private FileAttachmentVm fileAttachment;

	public HoaxVm(Hoax hoax) {
		this.setId(hoax.getId());
		this.setContent(hoax.getContent());
		this.setTimestamp(hoax.getTimestamp().getTime());
		this.setUser(new UserVm(hoax.getUser()));
		if(hoax.getFileAttachment()!=null) {
			this.fileAttachment=new FileAttachmentVm(hoax.getFileAttachment());
		}
	}
	
}
