package com.shail.todo.mapper;

import org.mapstruct.Mapper;

import com.shail.todo.dto.UserDto;
import com.shail.todo.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

	User toEntity(UserDto userDto);
	
	UserDto toDto(User user);
}