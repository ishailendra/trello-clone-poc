package com.shail.todo.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class TodoSectionDTO {

	private Integer sectionId;
	private Integer sectionPos;
	private String sectionTitle;
	private String sectionType;
	private Integer userId;
	private List<TodoItemDTO> todoItems;
}
