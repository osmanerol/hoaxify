package com.hoaxify.backend.hoax;

import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserService;


@Service
public class HoaxService {

	HoaxRepository hoaxRepository;
	
	UserService userService;
	
	public HoaxService(HoaxRepository hoaxRepository, UserService userService) {
		super();
		this.hoaxRepository = hoaxRepository;
		this.userService=userService;
	}

	public void save(Hoax hoax, User user) {
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		this.hoaxRepository.save(hoax);
	}

	public Page<Hoax> getHoaxes(Pageable page) {
		return this.hoaxRepository.findAll(page);
	}

	public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
		User inDB=this.userService.getUserByUsername(username);
		return this.hoaxRepository.findByUser(inDB, page);
	}

	public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
		Specification<Hoax> specification=idLessThan(id);
		if(username!=null) {
			User inDB=this.userService.getUserByUsername(username);
			specification=specification.and(userIs(inDB));
			// return this.hoaxRepository.findByIdLessThanAndUser(id, inDB, page);
			return this.hoaxRepository.findAll(specification,page);
		}
		return this.hoaxRepository.findAll(specification, page);
	}

	public long getNewHoaxesCount(long id, String username) {
		Specification<Hoax> specification=idGreaterThan(id);
		if(username!=null) {
			User inDB=this.userService.getUserByUsername(username);
			specification=specification.and(userIs(inDB));
		}
		return this.hoaxRepository.count(specification);
	}

	public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
		Specification<Hoax> specification=idGreaterThan(id);
		if(username!=null) {
			User inDB=this.userService.getUserByUsername(username);
			specification=specification.and(userIs(inDB));
		}
		return this.hoaxRepository.findAll(specification, sort);
	}
	
	Specification<Hoax> idLessThan(long id){
		return new Specification<Hoax>() {
			// id sutunu , parametre olan id'den kucuk mu
			@Override
			public Predicate toPredicate(Root<Hoax> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.lessThan(root.get("id"), id);
			}
		};
	}
	
	Specification<Hoax> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}

	Specification<Hoax> idGreaterThan(long id){
		// id sutunu , parametre olan id'den buyuk mu
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}
	
}
