namespace TODO {
  export type GetTodosResponse = ITodo[];
  export type GetTodosRequest = void;

  export type PostTodoResponse = ITodo[];
  export type PostTodoRequest = ITodo;

  export type EditTodoResponse = ITodo;
  export type EditTodoRequest = {
    _id: number;
    data: ITodo;
  };

  export type DeleteTodoResponse = ITodo[];
  export type DeleteTodoRequest = number;

  export type DeleteAllTodoResponse = ITodo[];
  export type DeleteAllTodoRequest = void;
}
