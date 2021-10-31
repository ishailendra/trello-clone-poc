package com.shail.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shail.todo.entity.TodoSection;

public interface TodoSectionRepository extends JpaRepository<TodoSection, Integer> {

	public List<TodoSection> findByUserId(Integer userId);

}
