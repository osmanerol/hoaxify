package com.hoaxify.backend.configuration;



import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		// basic authentication http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		http.exceptionHandling().authenticationEntryPoint(new AuthEntryPoint());
		//	h2-console browser
		http.headers().frameOptions().disable();
		
		//	bu pathe gelen requestlerin icinde authentication parametreleri olmali, login yapmis olmali
		http
			.authorizeRequests()
							    .antMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
							    .antMatchers(HttpMethod.POST, "/api/1.0/hoaxes").authenticated()
							    .antMatchers(HttpMethod.POST, "/api/1.0/hoax-attachments").authenticated()
							    .antMatchers(HttpMethod.POST, "/api/1.0/logout").authenticated()
			.and()
			.authorizeRequests().anyRequest().permitAll();
		
		//	her requestte creds olmali icin cookie temizleme
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(tokenFilter(),UsernamePasswordAuthenticationFilter.class);
	}
	
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	TokenFilter tokenFilter() {
		return new TokenFilter();
	}
	
}
