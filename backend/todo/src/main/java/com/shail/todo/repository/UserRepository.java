package com.shail.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shail.todo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	User findByEmail(String email);
}
