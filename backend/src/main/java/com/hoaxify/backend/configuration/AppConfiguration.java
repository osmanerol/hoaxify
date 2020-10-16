package com.hoaxify.backend.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "hoaxify") // application.propertiesdeki degiskenleri bu classa assign et
public class AppConfiguration {

	private String uploadPath;
	
}
