package com.shail.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.shail.todo.entity.TodoItem;

public interface TodoItemRepository extends JpaRepository<TodoItem, Integer> {

	@Modifying
	void deleteByTodoType(String sectionType);

	List<TodoItem> findByTodoType(String sectionType);

}
