import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateAndSaveTodos } from "../../redux/todoBlockThunk";
import { Todo } from "../../model/datatype";
import styles from "./TodoEditor.module.css";

interface Props {
  todo: Todo;
  closeTodoEditor: () => void;
}
const TodoEditor: React.FC<Props> = (props) => {
  const todoTitle = useRef<HTMLInputElement>(null);
  const todoDesc = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const saveTodoEditor = () => {
    let todoItem: Todo = {
      todoItemId: props.todo.todoItemId,
      todoTitle: todoTitle.current!.value,
      todoDesc: todoDesc.current!.value,
      todoPos: props.todo.todoPos,
      todoType: props.todo.todoType,
      // sectionId: props.todo.sectionId,
      isNewCard: false,
    };
    dispatch(updateAndSaveTodos(todoItem));
    props.closeTodoEditor();
  };

  useEffect(() => {
    // console.log("TODO EDITOR");
    
    // let editor = document.getElementById("todo-editor-root");
    // editor!.style.display = "flex";
    // // editor!.style.scale = "1";
    // let backdrop = document.getElementById("backdrop");
    // backdrop!.style.opacity = "1";
    // backdrop!.style.height = "100vh"
    // backdrop!.style.width = "100%"
    // backdrop!.style.transform = "scale(1)";
  }, []);

  return (
    <Fragment>
      <div
        id="backdrop"
        className={styles.backdrop}
        onClick={() => props.closeTodoEditor()}
      ></div>
      <div className={styles.card} id="todo-editor">
        <input
          type="text"
          className={styles.title}
          ref={todoTitle}
          defaultValue={props.todo.todoTitle}
          id="todo-editor-title"
        />

        <textarea
          placeholder="Description"
          className={styles["form-control"]}
          ref={todoDesc}
          defaultValue={props.todo.todoDesc}
        ></textarea>
        <div style={{ textAlign: "center" }}>
          <button onClick={saveTodoEditor} className={styles.btn}>
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TodoEditor;
