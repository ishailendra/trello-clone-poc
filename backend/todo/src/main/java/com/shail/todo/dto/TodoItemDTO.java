package com.shail.todo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class TodoItemDTO {

	private Integer todoItemId;
	private Integer todoPos;
	private String todoTitle;
	private String todoDesc;
	private String todoType;
	
//	private TodoSectionDTO section; 
}
