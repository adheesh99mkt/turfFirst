package com.turf.service;

import java.util.List;

import com.turf.DTO.ApiResponse;
import com.turf.DTO.SignInRequest;
import com.turf.DTO.SignInResponse;
import com.turf.DTO.SignUp;
import com.turf.custexception.NotFoundException;
import com.turf.entities.UserEntity;

public interface UserService {

	ApiResponse createUser(SignUp user);

	SignInResponse authenticateUser(SignInRequest dto)throws NotFoundException;

	List<UserEntity> getAll();

	SignInResponse getById(Long userId)throws NotFoundException;
	
}
