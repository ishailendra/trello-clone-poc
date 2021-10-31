package com.shail.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.shail.todo.dto.TodoItemDTO;
import com.shail.todo.entity.TodoItem;

@Mapper(componentModel = "spring", uses = {TodoSectionMapper.class})
public interface TodoItemMapper {

	@Mapping(target = "createdDate", ignore = true)
	@Mapping(target = "updatedDate", ignore = true)
	TodoItem toEntity(TodoItemDTO todoItemDTO);
	
	TodoItemDTO toDto(TodoItem todoItem);
}