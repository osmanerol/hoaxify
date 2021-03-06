package com.hoaxify.backend;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.hoaxify.backend.hoax.HoaxService;
import com.hoaxify.backend.hoax.vm.HoaxSubmitVm;
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
	CommandLineRunner createInitialUser(UserService userService, HoaxService hoaxService) {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				try {
					userService.getUserByUsername("user1");
				} catch(Exception ex){ 
					for(int i=1;i<=25;i++) {
						User user=new User();
						user.setUsername("user"+i);
						user.setDisplayName("User "+i);
						user.setPassword("P4ssword");
						userService.save(user);
						for(int j=1;j<=20;j++) {
							HoaxSubmitVm hoax=new HoaxSubmitVm();
							hoax.setContent("Hoax - "+j+" from user("+i+")");
							hoaxService.save(hoax,user);
						}
					}
				}
			}
		};
	}

}
