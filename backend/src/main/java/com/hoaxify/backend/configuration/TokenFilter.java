package com.hoaxify.backend.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hoaxify.backend.auth.AuthService;

public class TokenFilter extends OncePerRequestFilter {

	@Autowired
	AuthService authService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authorization=request.getHeader("Authorization");
		if(authorization!=null) {
			String token=authorization.substring(7); 
			UserDetails user=this.authService.getUserDetails(token);
			if(user!=null) {
				UsernamePasswordAuthenticationToken authenticaion=new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
				authenticaion.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticaion);
			}
		}
		filterChain.doFilter(request, response);
	}

}
