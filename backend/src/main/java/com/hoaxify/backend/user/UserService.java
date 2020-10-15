package com.hoaxify.backend.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.backend.error.NotFoundException;
import com.hoaxify.backend.user.vm.UserUpdateVm;

@Service
public class UserService {

	UserRepository userRepository;
	PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
	}
	
	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		this.userRepository.save(user);
	}
	
	public Page<User> getUsers(Pageable page, User user){
		if(user!=null) {
			return this.userRepository.findByUsernameNot(user.getUsername(), page);
		}
		// databaseden datalari parca parca cekmek icin. sayfa ve her sayfada kac data
		return this.userRepository.findAll(page);
	}
	
	public User getUserByUsername(String username) {
		User inDB=this.userRepository.findByUsername(username);
		if(inDB==null) {
			throw new NotFoundException();	
		}
		return inDB;	
	}
	
	public User updateUser(String username, UserUpdateVm updatedUser) {
		User inDB=this.getUserByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		this.userRepository.save(inDB);
		return inDB;
	}
	
}
