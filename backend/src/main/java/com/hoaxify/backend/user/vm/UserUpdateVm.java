package com.hoaxify.backend.user.vm;

import javax.validation.constraints.Size;

import com.hoaxify.backend.shared.FileType;
import com.sun.istack.NotNull;

import lombok.Data;

@Data
public class UserUpdateVm {

	@NotNull
	@Size(min=4,max=255)
	private String displayName;
	
	@FileType(types = {"jpeg","png"})
	private String image;
	
}
