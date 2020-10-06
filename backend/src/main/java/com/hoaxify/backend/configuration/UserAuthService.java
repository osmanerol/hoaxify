package com.hoaxify.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserRepository;

@Service
public class UserAuthService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User inDB=this.userRepository.findByUsername(username);
		if(inDB==null) {
			throw new UsernameNotFoundException("user not found");
		}
		return new HoaxiftUserDetails(inDB);
	}

}
