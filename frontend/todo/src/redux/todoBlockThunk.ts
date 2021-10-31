import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo, TodoSectionType } from "../model/datatype";

export const fetchTodos = createAsyncThunk(
  "todoBlockSlice/fetchTodos",
  async () => {
    const { data } = await axios.get("http://localhost:8080/getAllTodos/1");
    // console.log("FETCH RESPONSE: ", data);

    let section: TodoSectionType[] = data;

    return section.sort((a: TodoSectionType, b: TodoSectionType) =>
      a.sectionPos > b.sectionPos ? 1 : -1
    );
  }
);

export const updateAndSaveTodos = createAsyncThunk(
  "todoBlockSlice/updateAndSaveTodos",
  async (todo: Todo) => {
    let { data } = await axios.post("http://localhost:8080/saveTodo", {
      ...todo,
    });
    todo.todoItemId = +data;

    return todo;
  }
);

export const updateAndSaveSection = createAsyncThunk(
  "todoBlockSlice/updateAndSaveSection",
  async (section: TodoSectionType) => {
    let { data } = await axios.post("http://localhost:8080/saveSection", {
      ...section,
    });
    // console.log("UPDATE AND SAVE SECTION: ", data);

    let sec: TodoSectionType = data;
    section.sectionId = sec.sectionId;
    section.sectionType = sec.sectionType;
    return section;
  }
);

export const deleteSection = createAsyncThunk(
  "todoBlockSlice/deleteSection",
  (section: TodoSectionType) => {
    axios
      .delete("http://localhost:8080/deleteSection/" + section.sectionId)
      .then((res: any) => {
        // console.log("RESPONSE: ", res);
      })
      .catch((err: any) => {
        // console.log("ERROR: ", err);
      });
    return section;
  }
);

export const updateDragNDrop = createAsyncThunk(
  "todoBlockSlice/updateStateAfterDragNDrop",
  async (sections: any) => {
    let sectionsArr = [ sections.src, sections.dest]
    // console.log(sectionsArr);
    
    await axios.post("http://localhost:8080/updateDnd", sectionsArr);
    // console.log("DATA: ", data); let { data } = 

    return sections;
  }
);

export const updateDragNDropSection = createAsyncThunk(
  "todoBlockSlice/updateDragNDropSection",
  async (sections: TodoSectionType[]) => {
    // console.log("SECTIONS: ", sections);
    await axios.post("http://localhost:8080/updateDndSection", sections);
    // console.log("DATA: ", data); let { data } = 

    return sections;
  }
);