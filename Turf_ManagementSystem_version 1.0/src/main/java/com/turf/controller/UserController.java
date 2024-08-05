package com.turf.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turf.DTO.ApiResponse;
import com.turf.DTO.SignInRequest;
import com.turf.DTO.SignInResponse;
import com.turf.DTO.SignUp;
import com.turf.custexception.NotFoundException;
import com.turf.security.JwtUtils;
import com.turf.service.UserService;



@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private AuthenticationManager authMgr;
	
//	@PostMapping
//	public ApiResponse RegisterUser(@RequestBody UserDTO user) {
//		
//		try {
//			
//		}
//		return userService.createUser(user);
//		
//	}
	@PostMapping
	public ResponseEntity<?> userSignUp(@RequestBody @Valid SignUp dto) {
		System.out.println("in signup " + dto);
		try {			
			ApiResponse resp = userService.createUser(dto);
			// => success , send resp pkt : SC 201 , resp body - ApiReponse
			return ResponseEntity.status(HttpStatus.CREATED).body(resp);
		} catch (RuntimeException e) {
			//invalid login 
			System.out.println(e);
			// resp pkt - SC 404 api resp with err mesg
			return ResponseEntity.
					status(HttpStatus.NOT_FOUND).
					body(new ApiResponse(e.getMessage()));
		}

	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid SignInRequest dto) {
		System.out.println("in sigin " + dto);
		try {			
			//SignInResponse respDto = userService.authenticateUser(dto);
			
			// 1. create a token(implementation of Authentication i/f)
			// to store un verified user email n pwd
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(dto.getEmail(),
					dto.getPassword());
			//2.  invoke auth mgr's authenticate method;
			Authentication verifiedToken = authMgr.authenticate(token);
			// => authentication n authorization successful !
			//3. In case of successful auth,  create JWT n send it to the clnt in response
			SignInResponse resp = new SignInResponse(jwtUtils.generateJwtToken(verifiedToken), "Successful Auth!!!!");
			// => success , send resp pkt : SC 200 , resp body - user dto
			return ResponseEntity.ok(resp);
		} catch (Exception e) {
			//invalid login 
			System.out.println(e);
			// resp pkt - SC 404 api resp with err mesg
			return ResponseEntity.
					status(HttpStatus.NOT_FOUND).
					body(new NotFoundException("some exception occured..user not found"));
		}

	}
	@GetMapping
	public ResponseEntity<?> getAllUser(){
		try {
			return ResponseEntity.ok(userService.getAll());
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new NotFoundException("some exception occured..user not found"));
		
		}
	}
	@GetMapping("/{userId}")
	public ResponseEntity<?> getById(@PathVariable @Valid Long userId){
		try {
			SignInResponse respDto=userService.getById(userId);
			return ResponseEntity.ok(respDto);
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new NotFoundException("user not found"));
		}
	}
}
