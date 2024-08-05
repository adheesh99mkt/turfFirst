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
@Table(name="games")
public class GameEntity extends BaseEntity {
	
	@Column(name="game_name",length = 20)
	private String game_name;
	
	@Column(name="description",length=50)
	private String description;
}
