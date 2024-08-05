package com.turf.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turf.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
	//add a finder for user login
	Optional<UserEntity> findByEmailAndPassword(String em,String pass);

	Optional<UserEntity> findByEmail(String email);

	boolean existsByEmail(String email);
}
