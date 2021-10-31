package com.shail.todo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_auth")
@Getter @Setter
public class UserAuth {

	@Id
	private String email;
	private String password;
	private String role;
}
