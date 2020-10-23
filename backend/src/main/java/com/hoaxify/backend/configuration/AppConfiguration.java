package com.hoaxify.backend.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "hoaxify") // application.propertiesdeki degiskenleri bu classa assign et
public class AppConfiguration {

	private String uploadPath;	
	private String profileStorage="profile";
	private String attachmentStorage="attachments";
	
	public String getProfileStoragePath() {
		return this.uploadPath+"/"+this.profileStorage;
	}
	
	public String getAttachmentStoragePath() {
		return this.uploadPath+"/"+this.attachmentStorage;
	}
}
