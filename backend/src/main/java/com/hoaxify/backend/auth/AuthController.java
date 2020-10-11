package com.hoaxify.backend.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.backend.shared.CurrentUser;
import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserRepository;
import com.hoaxify.backend.user.vm.UserVm;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/api/1.0/auth")
	public UserVm handleAuthentication(@CurrentUser User user) {
		// return username, displayName, image 
		return new UserVm(user);
	}
	
}