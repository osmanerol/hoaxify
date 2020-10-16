package com.hoaxify.backend.configuration;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Autowired
	AppConfiguration appConfiguration;
	
	//	images/profile.png gibi gelen istekleri picture-storage altinda arar
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**")
				.addResourceLocations("file:./"+appConfiguration.getUploadPath()+"/")
				.setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
	}
	
	// baslangicta otomatik klasör oluşturma
	@Bean
	CommandLineRunner createStorageDirectories() {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				File folder=new File(appConfiguration.getUploadPath());
				// 	eger varsa ve klasorse
				boolean folderExist=folder.exists() && folder.isDirectory();
				if(!folderExist) {
					folder.mkdir();
				}
			}
		};
	}
	
}
