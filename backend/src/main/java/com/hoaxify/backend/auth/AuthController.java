package com.hoaxify.backend.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.backend.shared.Views;
import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class) // cevap donerken olusturulacak jsonları View.Base.class'a gore olustur
	public ResponseEntity<?> auth(@RequestHeader(name="Authorization") String authorization) {
		String base64encoded=authorization.split("Basic ")[1]; // Basic dXNlcjpQNHNzd29yZA==
		String decoded=new String(Base64.getDecoder().decode(base64encoded)); // user:P4sword
		String[] parts=decoded.split(":"); // ["user","P4ssword"]
		String username=parts[0]; // user
		User inDB=userRepository.findByUsername(username);
		// return username, displayName, image 
		return ResponseEntity.ok().body(inDB);
	}
	
}
