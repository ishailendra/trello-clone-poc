import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoBlockActions, todoBlockState } from "../../redux/todoBlockslice";
import {
  fetchTodos,
  updateDragNDrop,
  updateDragNDropSection,
  // updateDragNDropSection,
} from "../../redux/todoBlockThunk";

import MatButton from "../button/MatButton";
import TodoSection from "../todosection/TodoSection";
import styles from "./TodoBlock.module.css";

import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  // DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { Todo, TodoSectionType } from "../../model/datatype";

localStorage.setItem("index", "0");

const TodoBlock: React.FC<{
  // updateSectionsPos: (section: TodoSectionType[]) => void;
}> = () => {
  const { sections } = useAppSelector(todoBlockState);
  const dispatch = useAppDispatch();

  let sectionList = sections.slice().sort((a, b) => (a.sectionPos > b.sectionPos ? 1 : -1))
  useEffect(() => {
    // console.log("TODO BLOCK");

    dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNewSection = () => {
    let sec: TodoSectionType = {
      sectionTitle: "Enter title here",
      todoItems: [],
      sectionPos: sections.length, // + 1,
      sectionType: "",
      userId: 1,
      isNewSection: true,
    };

    dispatch(todoBlockActions.createNewSection(sec));

    /*
    let block = document.getElementById("todo-block");
    let blockWidth = +window.getComputedStyle(block!).width.replace("px", "");

    // console.log("BLOCK: ", block);
    console.log("BLCOK WIDTH: ", blockWidth);
    console.log("WINDOW INNERWIDTH: ", window.innerWidth);
    
    if (blockWidth > window.innerWidth) {
      let sec = document.getElementById("section");
      let secWidth = +window.getComputedStyle(sec!).width.replace("px", "");

      console.log("SECTION: ", sec);
      console.log("SECTION WIDTH: ", secWidth);
      
      // window.scrollBy(blockWidth, 0);
    }
    */
  };

  const onDragEnd = (result: DropResult) => {
    // console.log("ON DRAG END");
    const { destination, source, type, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "todosection") {
      let newSections: TodoSectionType[] = sections.map((section) => {
        let sec: TodoSectionType = {
          ...section,
        };

        if ( section.sectionPos > source.index && section.sectionPos < destination.index ) {
          sec = { ...section,sectionPos: section.sectionPos - 1 };
        }
        else if ( section.sectionPos > source.index && section.sectionPos > destination.index) {
          //do nothing
        }
        else if ( section.sectionPos < source.index && section.sectionPos > destination.index ) {
          sec = { ...section,sectionPos: section.sectionPos + 1 };
        } 
        else if (section.sectionPos === source.index) {
          sec = { ...section, sectionPos: destination.index, };
        } 
        else if (section.sectionPos > source.index && section.sectionPos === destination.index) {
          sec = { ...section,sectionPos: section.sectionPos - 1, };
        } 
        else if ( section.sectionPos < source.index && section.sectionPos === destination.index) {
          sec = { ...section, sectionPos: section.sectionPos + 1 }; 
        }

        return sec;
      });
      
      dispatch(todoBlockActions.updateDragNDropSection(newSections));
      dispatch(updateDragNDropSection(newSections));
      return;
    }
    
    const sourceSection = sections.filter((section: TodoSectionType) => source.droppableId === section.sectionType)[0];
    const destSection = sections.filter((section: TodoSectionType) => destination.droppableId === section.sectionType)[0];
   

    if (sourceSection.sectionType === destSection.sectionType) {
      let { todoItems } = sourceSection;
      let todos: Todo[] = todoItems.map((todo: Todo) => {
        let todoItem: Todo = {
          ...todo,
        };

        if (todo.todoPos > source.index && todo.todoPos < destination.index) {
          todoItem = {
            ...todo,
            todoPos: todo.todoPos - 1,
          };
        } 
        else if (todo.todoPos > source.index && todo.todoPos > destination.index) {
          //do nothing
        } 
        else if ( todo.todoPos < source.index && todo.todoPos > destination.index) {
          todoItem = {
            ...todo,
            todoPos: todo.todoPos + 1,
          };
        } 
        else if ( todo.todoPos === source.index) {
          todoItem = {
            ...todo,
            todoPos: destination.index,
          };
        } 
        else if ( todo.todoPos > source.index && todo.todoPos === destination.index ) {
          todoItem = {
            ...todo,
            todoPos: todo.todoPos - 1,
          };
        } 
        else if ( todo.todoPos < source.index && todo.todoPos === destination.index ) {
          todoItem = {
            ...todo,
            todoPos: todo.todoPos + 1,
          };
        }
        // console.log("TODO ITEM: ", todoItem);

        return todoItem;
      });
      let newSourceSection: TodoSectionType = {
        ...sourceSection,
        todoItems: todos,
      };
      // console.log("NEW SOURCE SECTION:  ", newSourceSection);
      // console.log("NEW SOURCE SECTION:  ", newSourceSection.todoItems.map((item: Todo) => (console.log("Title: ", item.todoTitle, " POS: ", item.todoPos))));
      // dispatch(todoBlockActions.updateStateAfterDragNDrop({
      //     src: newSourceSection,
      //     dest: null,
      //   })
      // );
      dispatch(todoBlockActions.updateDragNDrop({src: newSourceSection,dest: null,}));
      dispatch(updateDragNDrop({src: newSourceSection,dest: null,}));
    } 
    else {

      let srcTodoItems: Todo[] = [...sourceSection.todoItems];
      // let index = srcTodoItems.find(ndexOf((item: Todo) => item.todoItemId === draggableId)
      let index = srcTodoItems.findIndex((item: Todo) => item.todoItemId! === +draggableId);
      let remTodo: Todo[] = srcTodoItems.splice(index, 1);
      
      let srcTodos: Todo[] = srcTodoItems.map((todo: Todo) => {
        let todoItem: Todo = {
          ...todo,
        };
        if (todo.todoPos > source.index) {
          todoItem = { ...todo, todoPos: todo.todoPos - 1 };
        }

        return todoItem;
      });

      let destTodoItems: Todo[] = [...destSection.todoItems];

      let destTodos: Todo[] = destTodoItems.map((todo: Todo) => {
        let todoItem: Todo = {
          ...todo,
        };
        if (todo.todoPos >= destination.index) {
          todoItem = { ...todo, todoPos: todo.todoPos + 1, };
        }

        return todoItem;
      });

      destTodos.splice(destination.index, 0, { ...remTodo[0], todoPos: destination.index, todoType: destSection.sectionType });

      // console.log(srcTodos);
      // console.log(destTodos);
      dispatch( todoBlockActions.updateDragNDrop({ 
        src: { ...sourceSection, todoItems: srcTodos },
        dest: { ...destSection, todoItems: destTodos },
      }));
      dispatch( updateDragNDrop({ 
        src: { ...sourceSection, todoItems: srcTodos },
        dest: { ...destSection, todoItems: destTodos },
      }));
    }
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="todosection"
        >
          {(provided: DroppableProvided) => (
            <div
              className={styles["list-section"]}
              id="todo-block"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sectionList.map((item: TodoSectionType, index: number) => {
                return (
                  
                  <TodoSection
                    todoSection={item}
                    key={index}
                    todoSectionsCount={index}
                  />
                  
                );
              })}
                {provided.placeholder}
              <div className={styles["add-section"]} id="add-section-btn">
                <MatButton
                  id="add_section"
                  matClass="material-icons"
                  matType="playlist_add"
                  handleClick={createNewSection}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default TodoBlock;
