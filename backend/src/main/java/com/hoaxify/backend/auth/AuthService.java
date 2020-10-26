package com.hoaxify.backend.auth;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserRepository;
import com.hoaxify.backend.user.vm.UserVm;


@Service
public class AuthService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	TokenRepository tokenRepository;
	
	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository) { 
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
		this.tokenRepository=tokenRepository;
	}
	
	public AuthResponse authenticate(Credentials credentials) {
		User inDB=this.userRepository.findByUsername(credentials.getUsername());
		if(inDB==null) {
			throw new AuthException();
		}
		boolean matches=this.passwordEncoder.matches(credentials.getPassword(), inDB.getPassword());
		if(!matches) {
			throw new AuthException();
		}
		UserVm userVm=new UserVm(inDB);
		String token=this.generateRandomToken();
		Token tokenEntity=new Token();
		tokenEntity.setToken(token);
		tokenEntity.setUser(inDB);
		this.tokenRepository.save(tokenEntity);
		AuthResponse response=new AuthResponse();
		response.setUser(userVm);
		response.setToken(token);
		return response;
	}
	
	@Transactional
	public UserDetails getUserDetails(String token) {
		Optional<Token> optionalToken=this.tokenRepository.findById(token);
		if(!optionalToken.isPresent()) {
			return null;
		}
		return optionalToken.get().getUser();
	}
	
	public String generateRandomToken() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void clearToken(String token) {
		this.tokenRepository.deleteById(token);
	}
	
}
