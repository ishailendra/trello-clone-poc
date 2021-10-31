import React, { Fragment, useRef, useEffect, useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../redux/hooks";
import { todoBlockActions } from "../../redux/todoBlockslice";
import { updateAndSaveTodos } from "../../redux/todoBlockThunk";
import { Todo } from "../../model/datatype";
import TodoEditor from "../todoeditor/TodoEditor";

import styles from "./TodoCard.module.css";

interface Props {
  todo: Todo;
  // sectionType: string;
  todoItemsCount: number;
  index: number;
}

const TodoCard: React.FC<Props> = (props) => {
  const iref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  // let formEdit: boolean = false;

  const [formEdit, setFormEdit] = useState(false);

  useEffect(() => {
    // console.log("TODO CARD");

    if (props.todo.isNewCard) {
      let element = document.getElementById(
        "in_" + props.todoItemsCount + "_" + props.todo.todoType
      );
      if (element !== null) {
        let counter = 0;
        iref.current!.contentEditable = "true";
        iref.current!.onkeydown = () => {
          if (counter++ === 0) iref.current!.innerText = "";

          iref.current!.classList.remove(styles.placeholder);
          iref.current!.className = styles.rmdefault;
        };
        element!.focus();
        iref.current!.onblur = saveOrDeleteCard;
        iref.current?.classList.add(styles.placeholder);
        iref.current?.classList.add(styles.rmdefault);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkOverflow = () => {
    let el = document.getElementById(`${props.todo.todoType}`)!;
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
  const saveOrDeleteCard = () => {
    iref.current!.contentEditable = "false";
    if (
      iref.current!.innerText.trim() === "" ||
      iref.current!.innerText === "Enter title here"
    ) {
      checkOverflow();
      dispatch(todoBlockActions.removeNewEmptyTodo(props.todo.todoType));
    } else {
      let todo: Todo = {
        todoTitle: iref.current!.innerText,
        todoDesc: "",
        todoPos: props.todoItemsCount,
        todoType: props.todo.todoType,
        // sectionId: props.todo.sectionId,
        isNewCard: false,
      };
      dispatch(updateAndSaveTodos(todo));
    }
  };

  const editTodo = () => {
    setFormEdit(true);
    // console.log("TODO EDIT: ", formEdit);
  };

  const closeTodoEditor = () => {
    setFormEdit(false);
    // console.log("TODO EDIT: ", formEdit);
    // let editor = document.getElementById("todo-editor");
    // editor!.style.opacity = "0";
    // editor!.style.scale = "0";

    // let backdrop = document.getElementById("backdrop");
    // backdrop!.style.opacity = "0";
    // backdrop!.style.scale = "0";
  };
  return (
    <Fragment>
      <Draggable
        draggableId={"" + props.todo.todoItemId!}
        index={props.todo.todoPos}
        key={"" + props.todo.todoItemId!}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            className={styles.card}
            onClick={editTodo}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* {console.log("TODO CARD:  ", props.todo)} */}
            <div className={styles["card-title"]}>
              <h3
                id={"in_" + props.todo.todoPos + "_" + props.todo.todoType}
                ref={iref}
              >
                {/* {console.log("CARD TITLE: ", props.todo.todoTitle)} */}
                {props.todo.todoTitle}
              </h3>

              {/* <MatButton
            id="close_card"
            matClass="material-icons del-pos"
            matType="close"
            handleClick={deleteCard}
          /> */}
            </div>
          </div>
        )}
      </Draggable>
      {formEdit &&
        ReactDOM.createPortal(
          <TodoEditor todo={props.todo} closeTodoEditor={closeTodoEditor} />,
          document.getElementById("todo-editor-root")!
        )}
    </Fragment>
  );
};

export default TodoCard;
