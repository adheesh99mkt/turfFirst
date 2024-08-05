
package com.turf.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.turf.DTO.ApiResponse;
import com.turf.DTO.SignInRequest;
import com.turf.DTO.SignInResponse;
import com.turf.DTO.SignUp;
import com.turf.custexception.ApiException;
import com.turf.custexception.NotFoundException;
import com.turf.entities.UserEntity;
import com.turf.repositories.UserRepository;
@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public ApiResponse createUser(SignUp user) {
		// TODO Auto-generated method stub
		UserEntity usr=modelMapper.map(user, UserEntity.class);
		if(userRepository.existsByEmail(usr.getEmail())) {
			throw new ApiException("Email already present");
		}
		user.setPassword(encoder.encode(user.getPassword()));//pwd : encrypted using SHA
		userRepository.save(usr);
		return new ApiResponse("user added!");
	}

	@Override
	public SignInResponse authenticateUser(SignInRequest dto) throws NotFoundException{
		UserEntity user=userRepository.findByEmail(dto.getEmail())
				.orElseThrow(()->new NotFoundException("user not found"));
		if(user!=null) {
			if (encoder.matches(dto.getPassword(), user.getPassword())) {
				return modelMapper.map(user, SignInResponse.class);
            }
		}
		throw new NotFoundException("User not found!");
		
	}

	@Override
	public List<UserEntity> getAll() {
		return userRepository.findAll() //List<Category>
				.stream() //Stream<Category>
				.map(users -> 
				modelMapper.map(users,UserEntity.class)) //Stream<dto>
				.collect(Collectors.toList());
	}

	@Override
	public SignInResponse getById(Long userId) throws NotFoundException {
		
		Optional<UserEntity> optional = userRepository.findById(userId);
		UserEntity user = optional.orElseThrow(() -> 
		new NotFoundException("Invalid User ID!!!!"));
		return modelMapper.map(user, SignInResponse.class);
	}

}
