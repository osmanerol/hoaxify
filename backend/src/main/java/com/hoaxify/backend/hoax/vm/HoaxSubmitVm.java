package com.hoaxify.backend.hoax.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class HoaxSubmitVm {

	private long attachmentId;
	
	@Size(min=1,max=1000)
	private String content;
	
}
