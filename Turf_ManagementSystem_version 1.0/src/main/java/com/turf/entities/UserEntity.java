package com.turf.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString(exclude = "password",callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users",
uniqueConstraints = 
@UniqueConstraint(columnNames = {"email"})) 
public class UserEntity extends BaseEntity {
	
	@Column(length = 20, name = "user_name") 
	private String userName;
	
	@Column(length = 30, name="email", unique = true) 
	private String email;
	
	@Column(length = 20,name="password", nullable = false) // not null constraint
	private String password;
	
	private LocalDate dob;
	
	@Column(name = "phone_no", length = 14, unique = true)
	private String phoneNo;
	
	@Enumerated(EnumType.STRING) // col type : varchar(20 : store enum constant names
	@Column(length = 20,name="role")
	private Role role;

	
	

}
	