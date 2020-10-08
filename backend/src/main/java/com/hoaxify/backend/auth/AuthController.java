package com.hoaxify.backend.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.backend.shared.CurrentUser;
import com.hoaxify.backend.shared.Views;
import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class) // cevap donerken olusturulacak jsonları View.Base.class'a gore olustur
	public ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		// return username, displayName, image 
		return ResponseEntity.ok().body(user);
	}
	
}
