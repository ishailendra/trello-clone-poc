package com.shail.todo.entity;

import java.time.LocalDateTime;

//import java.util.List;

//import javax.persistence.CascadeType;
import javax.persistence.Entity;
//import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.JoinTable;
//import javax.persistence.JoinTable;
//import javax.persistence.JoinColumn;
//import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "todo_section")
@Getter @Setter @ToString
public class TodoSection {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer sectionId;
	private String sectionTitle;
	private Integer sectionPos;
	private String sectionType;
	private Integer userId;
	
	@CreationTimestamp
	private LocalDateTime createdDate;
	
	@UpdateTimestamp
	private LocalDateTime updatedDate;
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	@JoinTable(name = "todo_section_mapping",
//    				joinColumns = @JoinColumn(name = "section_id"),
//    				inverseJoinColumns = @JoinColumn(name = "todo_item_id"))
//	private List<TodoItem> todoItems;
}
