package com.turf.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="feedbacks",
uniqueConstraints = 
@UniqueConstraint(columnNames = {"player_id","turf_id","booking_id"}))
public class FeedbackEntity extends BaseEntity{
	
	@Column(name="comment_text",length = 100)
	private String commentText;
	
	private int rating;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="player_id",nullable = false)
	private UserEntity player;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="turf_id",nullable = false)
	private TurfEntity post;
	
	//for giving feedback player have to book the slot
	//without booking player cannot give feedback/review for turf
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="booking_id",nullable=false)
	private BookingEntity booking;
}

