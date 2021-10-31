package com.shail.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.shail.todo.dto.TodoSectionDTO;
import com.shail.todo.entity.TodoSection;

@Mapper(componentModel = "spring", uses = {TodoItemMapper.class})
public interface TodoSectionMapper {

	@Mapping(target = "createdDate", ignore = true)
	@Mapping(target = "updatedDate", ignore = true)
	TodoSection toEntity(TodoSectionDTO todoSectionDTO);

	@Mapping(target = "todoItems", ignore = true)
	TodoSectionDTO toDto(TodoSection todoSection);
}