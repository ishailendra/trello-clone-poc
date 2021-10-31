export interface Todo {
  todoItemId?: number;
  todoPos: number;
  todoTitle: string;
  todoDesc: string;
  todoType: string;
  // sectionId: number;
  isNewCard: boolean;
}

export interface TodoSectionType {
  sectionId?: number;
  sectionPos: number;
  sectionTitle: string;
  sectionType: string;
  todoItems: Todo[];
  userId: number;
  isNewSection: boolean;
}


export interface User {
  userId?: number;
  name?: string;
  email: string;
  password?: string;
}

export interface TokenHolder {
  accessKid?: number;
  accessToken?: string;
  refreshKid?: number;
  refreshToken?: string;
}