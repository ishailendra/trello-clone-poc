import React, { Fragment, useEffect, useRef } from "react";

import styles from "./TodoSection.module.css";
import "../button/Button.css";
import TodoCard from "../todocard/TodoCard";
import { TodoSectionType, Todo } from "../../model/datatype";
import MatButton from "../button/MatButton";
import { useAppDispatch } from "../../redux/hooks";
import { todoBlockActions } from "../../redux/todoBlockslice";
import {
  deleteSection,
  updateAndSaveSection,
} from "../../redux/todoBlockThunk";
import {
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";

interface Props {
  todoSection: TodoSectionType;
  todoSectionsCount: number;
  // innerRef: any;
  // provided: DroppableProvided;
  // index: number;
}
const TodoSection: React.FC<Props> = (props) => {
  const { todoSection } = props;
  let { todoItems } = todoSection;
  // console.log("PROPS:  ", todoSection.todoItems);

  let todoItemsList = todoItems
    .slice()
    .sort((a, b) => (a.todoPos > b.todoPos ? 1 : -1));

  const dispatch = useAppDispatch();
  const sref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // console.log("TODO SECTION");

    if (todoSection.isNewSection) {
      let element = document.getElementById("s_" + props.todoSectionsCount);

      if (element != null) {
        let counter = 0;
        sref.current!.contentEditable = "true";
        sref.current!.onkeydown = () => {
          if (counter++ === 0) sref.current!.innerText = "";

          sref.current!.classList.remove(styles.placeholder);
          sref.current!.className = styles.rmdefault;
        };
        element!.focus();
        sref.current!.onblur = saveOrDeleteSection;
        sref.current?.classList.add(styles.placeholder);
        sref.current?.classList.add(styles.rmdefault);
      }
    }

    checkOverflow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkOverflow = () => {
    let el = document.getElementById(`${todoSection.sectionType}`)!;
    if (el) {
      let height: number = +window
        .getComputedStyle(el)
        .height.replace("px", "");

      if (height >= Math.floor(document.documentElement.clientHeight * 0.7)) {
        el.style.overflowY = "scroll";
      } else {
        el.style.overflowY = "unset";
      }
    }
  };

  const createNewTodo = () => {
    let item: Todo = {
      todoTitle: "Enter title here",
      todoDesc: "Description",
      todoPos: todoItemsList.length, // + 1,
      todoType: todoSection.sectionType,
      // sectionId: todoSection.sectionId!,
      isNewCard: true,
    };

    dispatch(
      todoBlockActions.createNewTodo({
        todo: item,
        sectionType: todoSection.sectionType,
      })
    );
    checkOverflow();
  };

  const deleteThisSection = () => {
    dispatch(deleteSection(todoSection));
  };

  const saveOrDeleteSection = () => {
    sref.current!.contentEditable = "false";
    if (
      sref.current!.innerText.trim() === "" ||
      sref.current!.innerText === "Enter title here"
    ) {
      dispatch(todoBlockActions.removeNewEmptySection());
    } else {
      let sec: TodoSectionType = {
        sectionType: "", //sref.current!.innerText.trim().replaceAll(" ", "").toUpperCase()
        todoItems: [],
        sectionPos: props.todoSectionsCount,
        sectionTitle: sref.current!.innerText,
        userId: 1,
        isNewSection: false,
      };
      dispatch(updateAndSaveSection(sec));
    }
  };

  return (
    <Fragment>
      <Draggable draggableId={""+props.todoSection.sectionId} index={props.todoSection.sectionPos} key={""+props.todoSection.sectionId}>
        {(provided: DraggableProvided) => (
          <div
            className={styles.somestyle}
            id="section"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={styles.todolist}>
              <div className={styles.title} {...provided.dragHandleProps}>
                <h3 id={"s_" + todoSection.sectionPos} ref={sref}>
                  {todoSection.sectionTitle}
                </h3>

                <MatButton
                  id="delete_forever"
                  matClass="material-icons"
                  matType="delete_forever"
                  handleClick={deleteThisSection}
                />
              </div>
              <hr />
              <Droppable
                droppableId={todoSection.sectionType}
                key={props.todoSectionsCount}
              >
                {(
                  provided: DroppableProvided
                  // snapshot: DroppableStateSnapshot
                ) => (
                  <div
                    className={styles["todo-container"]}
                    id={todoSection.sectionType}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {todoItemsList.map((todo: Todo, index: number) => (
                      <TodoCard
                        todo={todo}
                        key={index}
                        //sectionType={todoSection.sectionType}
                        todoItemsCount={index}
                        index={index}
                        //sectionId={todoSection.sectionId!}
                      />
                    ))}
                    {provided.placeholder}
                    <div className={styles["add-btn"]}>
                      <MatButton
                        id="add_card"
                        matClass="material-icons-outlined"
                        matType="add"
                        handleClick={createNewTodo}
                      />
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </Fragment>
  );
};

export default TodoSection;
