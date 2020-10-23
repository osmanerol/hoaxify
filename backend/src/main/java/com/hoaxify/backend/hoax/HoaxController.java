package com.hoaxify.backend.hoax;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.backend.hoax.vm.HoaxSubmitVm;
import com.hoaxify.backend.hoax.vm.HoaxVm;
import com.hoaxify.backend.shared.CurrentUser;
import com.hoaxify.backend.shared.GenericResponse;
import com.hoaxify.backend.user.User;


@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

	@Autowired
	HoaxService hoaxService;
	
	@PostMapping("/hoaxes")
	GenericResponse saveHoaxes(@Valid @RequestBody HoaxSubmitVm hoaxSubmitVm, @CurrentUser User user) {
		this.hoaxService.save(hoaxSubmitVm, user);
		return new GenericResponse("hoax saved");
	}
	
	@GetMapping("/hoaxes")
	Page<HoaxVm> getHoaxes(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return this.hoaxService.getHoaxes(page).map(HoaxVm::new);
	}

	@GetMapping({"/hoaxes/{id:[0-9]+}", "/users/{username}/hoaxes/{id:[0-9]+}"})
	ResponseEntity<?> getHoaxesRelatite(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page, 
			@PathVariable long id, @PathVariable(required=false) String username, @RequestParam(name="count",required=false, defaultValue="false") boolean count,
			@RequestParam(name="direction", defaultValue="before") String direction){
		if(count) {
			long newHoaxCount=this.hoaxService.getNewHoaxesCount(id, username);
			Map<String, Long> response=new HashMap<>();
			response.put("count",newHoaxCount);
			return ResponseEntity.ok(response); 
		}
		if(direction.equals("after")) {
			List<HoaxVm> newHoaxes=this.hoaxService.getNewHoaxes(id, username, page.getSort()).stream().map(HoaxVm::new).collect(Collectors.toList());
			return ResponseEntity.ok(newHoaxes);
		}
		return  ResponseEntity.ok(this.hoaxService.getOldHoaxes(id, username, page).map(HoaxVm::new));
	}

	@GetMapping("/users/{username}/hoaxes")
	Page<HoaxVm> getUserHoaxes(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return this.hoaxService.getHoaxesOfUser(username, page).map(HoaxVm::new);
	}
	
	@DeleteMapping("/hoaxes/{id:[0-9]+}")
	@PreAuthorize("@hoaxSecurity.isAllowedToDelete(#id, principal)")
	public GenericResponse deleteHoax(@PathVariable long id) {
		this.hoaxService.delete(id);
		return new GenericResponse("hoax deleted.");
	}
}