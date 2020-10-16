package com.hoaxify.backend;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserService;

//(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication 
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	// baslangicta otomatik kullanici olusturma
	@Bean
	@Profile("dev") // sadece belirli profilde calis
	CommandLineRunner createInitialUser(UserService userService) {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				for(int i=1;i<=25;i++) {
					User user=new User();
					user.setUsername("user"+i);
					user.setDisplayName("User "+i);
					user.setPassword("P4ssword");
					userService.save(user);
				}
			}
		};
	}

}
