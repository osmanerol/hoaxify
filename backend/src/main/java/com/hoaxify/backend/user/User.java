package com.hoaxify.backend.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.backend.shared.Views;

import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@NotNull(message="{hoaxify.constraints.username.NotNull.message}")
	@UniqueUsername
	@Size(min=4, max=255)
	@JsonView(Views.Base.class)
	private String username;

	@NotNull
	@Size(min=4, max=255)
	@JsonView(Views.Base.class)
	private String displayName;

	@NotNull
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoxafiy.constraints.password.Pattern.Message}")
	private String password;

	@JsonView(Views.Base.class)
	private String image;
}
