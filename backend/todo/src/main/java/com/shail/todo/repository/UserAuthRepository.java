package com.shail.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shail.todo.entity.UserAuth;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {

	UserAuth findByEmail(String email);
}
