package com.turf.DTO;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.turf.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class SignUp{
		
		@JsonProperty(access = Access.READ_ONLY) // this property only used during ser.
		private Long id;
		@NotBlank(message = "User Name required")
		private String userName;
		
		@Email(message = "Invalid Email!!!")
		private String email;
		
		@JsonProperty(access = Access.WRITE_ONLY)// this property only used during de-ser.
		@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
		private String password;
		
		private Role role;
		
		@NotBlank(message = "Phone Number required")
		private String phoneNo;
		
		@NotBlank(message = "Date of Birth required")@Past
		private LocalDate dob;
		
		public SignUp(String userName,
				String email, String password, Role role,String phoneNo,LocalDate dob) {
			super();
			
			this.userName = userName;
			this.email = email;
			this.password = password;
			this.role = role;
			this.phoneNo=phoneNo;
			this.dob=dob;
		}
		
}
