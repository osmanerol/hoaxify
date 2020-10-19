package com.hoaxify.backend.hoax;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.backend.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

	@Autowired
	HoaxService hoaxService;
	
	@PostMapping("/hoaxes")
	GenericResponse saveHoaxes(@Valid @RequestBody Hoax hoax) {
		this.hoaxService.save(hoax);
		return new GenericResponse("hoax saved");
	}
	
	@GetMapping("/hoaxes")
	Page<?> getHoaxes(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return this.hoaxService.getHoaxes(page);
	}
	
}
