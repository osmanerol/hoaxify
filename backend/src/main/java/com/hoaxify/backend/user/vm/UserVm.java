package com.hoaxify.backend.user.vm;

import com.hoaxify.backend.user.User;

import lombok.Data;

@Data	
public class UserVm {

	private String username;
	private String displayName;
	private String image;
	
	public UserVm(User user) {
		this.setUsername(user.getUsername());
		this.setDisplayName(user.getDisplayName());
		this.setImage(user.getImage());
	}
	
}
