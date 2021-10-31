package com.shail.todo.dto;

import java.util.List;

import com.shail.todo.entity.TodoItem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class ResponseDTO {
	private Integer sectionId;
	private List<TodoItem> todoItems;
	private String sectionType;
	private String sectionTitle;
	private Integer sectionPos;
}