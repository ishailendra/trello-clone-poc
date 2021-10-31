package com.shail.todo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shail.todo.dto.TodoItemDTO;
import com.shail.todo.dto.TodoSectionDTO;
import com.shail.todo.entity.TodoItem;
import com.shail.todo.entity.TodoSection;
import com.shail.todo.mapper.TodoItemMapper;
import com.shail.todo.mapper.TodoSectionMapper;
import com.shail.todo.repository.TodoItemRepository;
import com.shail.todo.repository.TodoSectionRepository;
import com.shail.todo.repository.UserRepository;

@Service
public class TodoService {

	@Autowired
	private TodoItemRepository itemRepository;

	@Autowired
	private TodoSectionRepository sectionRepository;

	@Autowired
	private TodoItemMapper itemMapper;

	@Autowired
	private TodoSectionMapper sectionMapper;

	@Autowired
	private UserRepository userRepository;

	public List<TodoSectionDTO> getAllTodos(Integer userId) throws Exception {

		if(!userRepository.findById(userId).isPresent()) {
			throw new Exception("USER DOESN'T EXIST");
		}


		List<TodoSection> todoSections = sectionRepository.findByUserId(userId);

		// @formatter:off
		List<TodoSectionDTO> todoSectionDto = todoSections.stream()
												.map(section -> {
													TodoSectionDTO sectionDto = sectionMapper.toDto(section);
													List<TodoItem> todoItems = itemRepository.findByTodoType(section.getSectionType());
													List<TodoItemDTO> todoItemDtos = todoItems.stream()
																						.map(item -> itemMapper.toDto(item))
																						.collect(Collectors.toList());
													sectionDto.setTodoItems(todoItemDtos);
													return sectionDto;
												})
												.collect(Collectors.toList());
		// @formatter:on


		return todoSectionDto;
	}

	@Transactional
	public void deleteSection(Integer id) {
		sectionRepository.findById(id).ifPresent(
				(section) -> {
					itemRepository.deleteByTodoType(section.getSectionType());
					sectionRepository.deleteById(id);
					
					List<TodoSection> todoSections = sectionRepository.findAll();
					List<TodoSection> todoSectionList = todoSections.stream().map(sectionItem -> {
						if(sectionItem.getSectionPos()> section.getSectionPos()) {
							sectionItem.setSectionPos(sectionItem.getSectionPos()-1);
						}
						return sectionItem;
					}).collect(Collectors.toList());
					
					sectionRepository.saveAll(todoSectionList);
				}
				);
		
	}

	@Transactional
	public Integer saveTodo(TodoItemDTO todo) {
		TodoItem todoItem = itemMapper.toEntity(todo);
		todoItem = itemRepository.save(todoItem);
		return todoItem.getTodoItemId();
	}

	@Transactional
	public TodoSectionDTO saveSection(TodoSectionDTO todoSectionDto) {
		TodoSection todoSection = sectionMapper.toEntity(todoSectionDto);

		String sectionType = UUID.randomUUID().toString().replaceAll("-", "");
		todoSection.setSectionType(sectionType);

		todoSection = sectionRepository.save(todoSection);

		todoSectionDto = sectionMapper.toDto(todoSection);

		todoSectionDto.setSectionPos(null);
		todoSectionDto.setSectionTitle(null);

		return todoSectionDto;
	}

	@Transactional
	public void saveTodoDesc(TodoItemDTO todoItemDto) {
		TodoItem todoItem = itemRepository.findById(todoItemDto.getTodoItemId()).get();
		todoItem.setTodoTitle(todoItemDto.getTodoTitle());
		todoItem.setTodoDesc(todoItemDto.getTodoDesc());
		itemRepository.save(todoItem);

	}

	public void updateDnd(List<TodoSectionDTO> sections) {
		// TODO Auto-generated method stub
		sections.forEach(section -> {
			if(section != null) {
				List<TodoItem> todoItems = new ArrayList<>();
				section.getTodoItems().forEach(item -> {
					TodoItem todo = itemRepository.findById(item.getTodoItemId()).get();
					todo.setTodoPos(item.getTodoPos());
					todo.setTodoType(item.getTodoType());
					todoItems.add(todo);
					//itemRepository.save(null)
				});

				itemRepository.saveAll(todoItems);
			}});
	}
	

	public void updateDndSections(List<TodoSectionDTO> sections) {
		List<TodoSection> todoSections = new ArrayList<>();
		sections.forEach(section -> {
			sectionRepository.findById(section.getSectionId()).ifPresent(sec -> {
				sec.setSectionPos(section.getSectionPos());
				todoSections.add(sec);
			});
			
		}); //.collect(Collectors.toList());
		
		sectionRepository.saveAll(todoSections);
		
	}
}

