package com.shail.todo.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "todo_item")
@Getter @Setter
public class TodoItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer todoItemId;
	
	private String todoTitle;
	
	@Column(columnDefinition = "TEXT")
	private String todoDesc;
	private String todoType;
	private Integer todoPos;
	
	@CreationTimestamp
	private LocalDateTime createdDate;
	
	@UpdateTimestamp
	private LocalDateTime updatedDate;
	
	
}
