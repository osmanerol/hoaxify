package com.hoaxify.backend.hoax;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.backend.file.FileAttachment;
import com.hoaxify.backend.file.FileAttachmentRepository;
import com.hoaxify.backend.file.FileService;
import com.hoaxify.backend.hoax.vm.HoaxSubmitVm;
import com.hoaxify.backend.user.User;
import com.hoaxify.backend.user.UserService;

@Service
public class HoaxService {

	HoaxRepository hoaxRepository;
	
	UserService userService;
	
	FileAttachmentRepository fileAttachmentRepository;
	
	FileService fileService;
	
	public HoaxService(HoaxRepository hoaxRepository, UserService userService, FileAttachmentRepository fileAttachmentRepository, FileService fileService) {
		super();
		this.hoaxRepository = hoaxRepository;
		this.fileAttachmentRepository=fileAttachmentRepository;
		this.fileService=fileService;
		this.userService=userService;
	}

	public void save(HoaxSubmitVm hoaxSubmitVm, User user) {
		Hoax hoax=new Hoax();
		hoax.setContent(hoaxSubmitVm.getContent());
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		this.hoaxRepository.save(hoax);
		Optional<FileAttachment> optionalFileAttachment=this.fileAttachmentRepository.findById(hoaxSubmitVm.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment=optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			this.fileAttachmentRepository.save(fileAttachment);
		}
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

	public void delete(long id) {
		Hoax inDB=this.hoaxRepository.getOne(id);
		if(inDB.getFileAttachment()!=null) {
			String fileName=inDB.getFileAttachment().getName();
			this.fileService.deleteAttachmentFile(fileName);
		}
		this.hoaxRepository.deleteById(id);
	}	
	
}
