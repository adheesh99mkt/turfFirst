package com.turf.entities;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "turfs",
uniqueConstraints = 
@UniqueConstraint(columnNames = {"turf_name","address_id"}))

public class TurfEntity extends BaseEntity {
	
	@Column(name="turf_name",length=30)
	private String turf_name;
	
	@Lob
	private byte[] image;
	
	@Column(name="price_hr",nullable=false)
	private double price_hr;
	
	@Column(name="max_capacity",nullable=false)
	private int max_capacity;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status",length = 20)
	private TurfStatus status;
	
	@OneToMany(cascade = CascadeType.ALL ,fetch = FetchType.EAGER)
	private List<GameEntity> games=new ArrayList<GameEntity>();
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="owner_id",nullable=false)
	private UserEntity owner;
	
	@OneToOne(cascade =CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id")
	private AddressEntity myAddress;
	
	public void addGame(GameEntity game) {
		games.add(game);
	}
	public void removeGame(GameEntity game) {
		games.remove(game);
	}
	public TurfEntity(double price_hr, int max_capacity,  List<GameEntity> games, UserEntity owner,
			AddressEntity myAddress) {
		super();
		this.price_hr = price_hr;
		this.max_capacity = max_capacity;
		this.status = TurfStatus.PENDING;
		this.games = games;
		this.owner = owner;
		this.myAddress = myAddress;
	}
	
	
}
