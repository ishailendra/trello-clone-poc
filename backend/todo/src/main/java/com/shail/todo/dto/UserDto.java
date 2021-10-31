package com.shail.todo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class UserDto {

	private Integer userId;
	private String name;
	private String email;
	private String password;
}
