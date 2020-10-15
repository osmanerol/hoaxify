package com.hoaxify.backend.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.backend.shared.CurrentUser;
import com.hoaxify.backend.shared.GenericResponse;
import com.hoaxify.backend.user.vm.UserUpdateVm;
import com.hoaxify.backend.user.vm.UserVm;


@RestController
@RequestMapping("/api/1.0")
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/users")
	public GenericResponse createUser(@Valid @RequestBody User user) { // @Valid , User nesnesindeki constraintleri kontrol eder
		this.userService.save(user);
		return new GenericResponse("user created");
	}
	
	//	map function iceride tekil olarak user objelerini UserVm constructorina yollar
	@GetMapping("/users")
	Page<UserVm> getUsers(Pageable page, @CurrentUser User user){
		return this.userService.getUsers(page,user).map(UserVm::new);
	}

	@GetMapping("/users/{username}")
	UserVm getUser(@PathVariable String username) {
		User user=this.userService.getUserByUsername(username);
		return new UserVm(user);
	}
	
	//	update username
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username") // istegi atan kullanicinin yetkisi var mi kontrolu . principal=loggedInUser
	UserVm updateUser(@RequestBody UserUpdateVm updatedUser, @PathVariable String username) {
		User user=this.userService.updateUser(username, updatedUser);
		return new UserVm(user);
	}
	
}