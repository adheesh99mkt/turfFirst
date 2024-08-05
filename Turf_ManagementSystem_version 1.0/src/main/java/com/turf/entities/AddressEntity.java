package com.turf.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="address")
public class AddressEntity extends BaseEntity {
	
	@Column(name="addr_line1",length=100)
	private String addrLine1;
	
	@Column(name="addr_line2",length=100)
	private String addrLine2;
	
	@Column(length=20)
	private String city;
	
	@Column(length=20,name="zip_code")
	private String zipCode;
	
	@Column(length=20)
	private String state;
	
	@Column(length=20)
	private String country;
	
}