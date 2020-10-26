package com.hoaxify.backend.auth;

import com.hoaxify.backend.user.vm.UserVm;

import lombok.Data;

@Data
public class AuthResponse {

	private String token;
	
	private UserVm user;
	
}
