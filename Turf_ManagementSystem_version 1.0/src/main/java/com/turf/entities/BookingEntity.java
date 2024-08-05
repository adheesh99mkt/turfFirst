package com.turf.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
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
@NoArgsConstructor
@ToString
@Entity
@Table(name="bookings",
uniqueConstraints = 
@UniqueConstraint(columnNames = {"slot","date","turf_id"}))
public class BookingEntity extends BaseEntity {
	
		@Column(name="no_of_players",nullable=false)
		private int no_of_players;
		
		@Enumerated(EnumType.STRING)
		@Column(name="slot",nullable=false,length=15)
		private BookingSlot slot;
		
		@Column(name="date",nullable=false)
		private LocalDate date;
		
		@Enumerated(EnumType.STRING)
		@Column(name="status",length=20)
		private BookingStatus status;
		
		//for multiple players booking in same slot we have to make the relation one to many
		@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
		@JoinColumn(name="player_id",nullable=false)
		private List<UserEntity>  players=new ArrayList<UserEntity>();
		
		@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
		@JoinColumn(name="game_id",nullable=false)
		private GameEntity game;
		
		@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
		@JoinColumn(name="turf_id",nullable=false)
		private TurfEntity turf;
		
		//not finalized this confirmation property
		@Column(name="confirmation",nullable=false)
		private boolean confirmation;

		public BookingEntity(int no_of_players, BookingSlot slot, LocalDate date,
				ArrayList<UserEntity> players, GameEntity game, TurfEntity turf,boolean confirmation) {
			super();
			this.no_of_players = no_of_players;
			this.slot = slot;
			this.date = date;
			this.status = BookingStatus.PENDING;
			this.players = players;
			this.game = game;
			this.turf = turf;
			this.confirmation=confirmation;
		}
		
		public void addPlayer(UserEntity player) {
			if(!players.contains(player)) {
				players.add(player);
			}
			
		}
		public void removePlayer(UserEntity player) {
			if(players.contains(player)) {
				players.remove(player);
			}
		}
		
		
}
