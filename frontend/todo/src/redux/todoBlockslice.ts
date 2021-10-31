import { createSlice } from "@reduxjs/toolkit";
import { Todo, TodoSectionType } from "../model/datatype";
import { RootState } from "./store";
import {
  deleteSection,
  fetchTodos,
  updateAndSaveSection,
  updateAndSaveTodos,
  updateDragNDrop,
  updateDragNDropSection,
} from "./todoBlockThunk";
// saveTodoDesc,
let sec: TodoSectionType[] = [];
const initialState = { sections: sec };

const todoBlockSlice = createSlice({
  name: "todoBlockSlice",
  initialState,
  reducers: {
    createNewTodo(state, action) {
      state.sections.forEach((sec: TodoSectionType) => {
        if (sec.sectionType === action.payload.sectionType) {
          sec.todoItems.push(action.payload.todo);
        }
      });
    },

    removeNewEmptyTodo(state, action) {
      state.sections.forEach((sec: TodoSectionType) => {
        if (sec.sectionType === action.payload) {
          sec.todoItems.pop();
        }
      });
    },
    createNewSection(state, action) {
      state.sections.push(action.payload);
    },
    removeNewEmptySection(state) {
      state.sections.pop();
    },
    updateStateAfterDragNDrop(state, action) {
      // console.log("SRC: ", action.payload.src);
      // console.log("DEST: ", action.payload.dest);

      let { src } = action.payload;
      let { dest } = action.payload;

      let newSectionsState: TodoSectionType[] = state.sections.map(
        (sec: TodoSectionType) => {
          if (sec.sectionType === src.sectionType) {
            let section: TodoSectionType = {
              ...src,
            };

            return section;
          } else if (dest !== null && sec.sectionType === dest.sectionType) {
            let section: TodoSectionType = {
              ...dest,
            };

            return section;
          }
          return sec;
        }
      );
      // console.log("NEW SECTION:  ", newSectionsState);

      state.sections = newSectionsState;
    },
    updateDragNDrop(state, action) {
      let src: TodoSectionType = action.payload.src;
      let dest: TodoSectionType = action.payload.dest;

      let newSectionsState: TodoSectionType[] = state.sections.map(
        (sec: TodoSectionType) => {
          if (sec.sectionType === src.sectionType) {
            let section: TodoSectionType = {
              ...src,
            };

            return section;
          } else if (dest !== null && sec.sectionType === dest.sectionType) {
            let section: TodoSectionType = {
              ...dest,
            };

            return section;
          }
          return sec;
        }
      );
      // console.log("NEW SECTION:  ", newSectionsState);

      state.sections = newSectionsState;
    },
    updateDragNDropSection(state, action) {
      state.sections = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.sections = action.payload;
      // console.log("STATE: ", state.sections);
      // console.log("PAYLOAD:  ", action.payload);
    });

    builder.addCase(updateAndSaveTodos.fulfilled, (state, action) => {
      // console.log("UPDATE AND SAVE TODO: ");
      // console.log(action.payload);
      state.sections = state.sections.map((sec: TodoSectionType) => {
        if (sec.sectionType === action.payload.todoType) {
          sec.todoItems = sec.todoItems.map((todo: Todo) => {
            if (todo.todoPos === action.payload.todoPos) {
              todo = { ...action.payload };
              // console.log(todo);
            }
            return todo;
          });
        }

        return sec;
      });
    });

    builder.addCase(updateAndSaveSection.fulfilled, (state, action) => {
      // console.log("UPDATE AND SAVE SECTION: ");
      // console.log(action.payload);

      state.sections = state.sections.map((sec: TodoSectionType) => {
        if (sec.sectionPos === action.payload.sectionPos) {
          sec = { ...action.payload };
          // console.log(sec);
        }
        return sec;
      });
    });

    builder.addCase(deleteSection.fulfilled, (state, action) => {
      // console.log("DELETE SECTION: ");
      let sections: TodoSectionType[] = state.sections.map(
        (sec: TodoSectionType) => {
          let sectionItem: TodoSectionType = { ...sec };
          if (sec.sectionPos > action.payload.sectionPos) {
            sectionItem = {
              ...sec,
              sectionPos: sec.sectionPos - 1,
            };
          }
          return sectionItem;
        }
      );

      sections = sections.filter(
        (section) => section.sectionId !== action.payload.sectionId
      );
      state.sections = sections;
      // console.log("STATE SECTIONS ", state.sections);
    });

    /*
    builder.addCase(updateDragNDrop.fulfilled, (state, action) => {
      // console.log("PAYLOAD: ", action.payload);
      // console.log("DEST: ", action.payload.dest);

      let src: TodoSectionType = action.payload.src;
      let dest: TodoSectionType = action.payload.dest;

      let newSectionsState: TodoSectionType[] = state.sections.map(
        (sec: TodoSectionType) => {
          if (sec.sectionType === src.sectionType) {
            let section: TodoSectionType = {
              ...src,
            };

            return section;
          } else if (dest !== null && sec.sectionType === dest.sectionType) {
            let section: TodoSectionType = {
              ...dest,
            };

            return section;
          }
          return sec;
        }
      );
      // console.log("NEW SECTION:  ", newSectionsState);

      state.sections = newSectionsState;
    });
    builder.addCase(updateDragNDropSection.fulfilled, (state, action) => {
      state.sections = [...action.payload];

      // console.log("ACTION:  ", action.payload);

      // console.log("SECTIONS:  ", state.sections);
    });
*/
    /*
    builder.addCase(saveTodoDesc.fulfilled, (state, action) => {
      console.log("SAVE TODO DESC: ");
      let todo: Todo = action.payload;
      state.sections.map((sec: TodoSectionType) => {
        if (sec.sectionType === todo.todoType) {
          sec.todoItems.map((item: Todo) => {
            if (item.id === todo.id) {
              item = { ...todo };
            }
            return item;
          });
        }
        return sec;
      });
    });
    */
  },
});

export const todoBlockActions = todoBlockSlice.actions;
export const todoBlockState = (state: RootState) => state.todoBlockReducer;
export default todoBlockSlice;
