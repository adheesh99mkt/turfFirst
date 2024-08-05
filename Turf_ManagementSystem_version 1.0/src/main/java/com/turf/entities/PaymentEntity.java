package com.turf.entities;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
@Table(name = "payments")
public class PaymentEntity extends BaseEntity {
	
	@Column(name="amount",nullable=false,length=10)
	private double amount;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status",length=15)
	private PaymentStatus status;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="player_id",nullable=false)
	private UserEntity player;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="booking_id",nullable=false)
	private BookingEntity booking;

	public PaymentEntity(double amount,  UserEntity player, BookingEntity booking) {
		super();
		this.amount = amount;
		this.status = PaymentStatus.PENDING;
		this.player = player;
		this.booking = booking;
	}

	
	
	
}
