package com.shail.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shail.todo.dto.TodoItemDTO;
import com.shail.todo.dto.TodoSectionDTO;
import com.shail.todo.service.TodoService;

@RestController
public class TodoController {

	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/getAllTodos/{id}")
	public ResponseEntity<?> getAllTodos(@PathVariable(name = "id") Integer userId){
		List<TodoSectionDTO> todoSectionDtos;
		try {
			todoSectionDtos = todoService.getAllTodos(userId);
			return new ResponseEntity<List<TodoSectionDTO>>(todoSectionDtos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
		}
//		System.err.println(todoSectionDtos);
//		System.err.println(todoSectionDtos.get(0).getTodoItems().get(0).getClass());
	}
	
	@DeleteMapping("/deleteSection/{id}")
	public ResponseEntity<String> deleteSection(@PathVariable Integer id) {
		System.err.println("DELETE SECTION ID: "+ id);
		todoService.deleteSection(id);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@PostMapping("/saveTodo")
	public ResponseEntity<Integer> saveTodo(@RequestBody TodoItemDTO todo) {
		System.err.println("SAVE TODO: "+todo.toString());
		return new ResponseEntity<Integer>(todoService.saveTodo(todo), HttpStatus.CREATED);
	}
	
	@PostMapping("/saveSection")
	public ResponseEntity<TodoSectionDTO> saveSection(@RequestBody TodoSectionDTO todoSection) {
		System.err.println("SAVE SECTION: "+todoSection.toString());
		return new ResponseEntity<TodoSectionDTO> (todoService.saveSection(todoSection), HttpStatus.CREATED);
	}
	
	@PostMapping("/saveTodoDesc")
	public ResponseEntity<String> saveTodoDesc(@RequestBody TodoItemDTO todoItemDto) {
		System.err.println("SAVE SECTION: "+todoItemDto.toString());
		todoService.saveTodoDesc(todoItemDto);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
	}
	
	@PostMapping("/updateDnd")
	public ResponseEntity<String> updateDnd(@RequestBody List<TodoSectionDTO> sections) {
		System.err.println("SAVE SECTION: "+sections);
		todoService.updateDnd(sections);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
	}
	
	@PostMapping("/updateDndSection")
	public ResponseEntity<String> updateDndSection(@RequestBody List<TodoSectionDTO> sections) {
		System.err.println("SAVE SECTION: "+sections);
		todoService.updateDndSections(sections);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
	}
}
