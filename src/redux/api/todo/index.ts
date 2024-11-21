import { api as index } from "..";

const ENDPOIND = "a28ba7204fc73982f880d638a70defee/rtk";

export const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: `${ENDPOIND}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.PostTodoResponse, TODO.PostTodoRequest>({
      query: (data) => ({
        url: `${ENDPOIND}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: builder.mutation<TODO.EditTodoResponse, TODO.EditTodoRequest>({
      query: ({ _id, data }) => ({
        url: `${ENDPOIND}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<
      TODO.DeleteTodoResponse,
      TODO.DeleteTodoRequest
    >({
      query: (id) => ({
        url: `${ENDPOIND}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    deleteAllTodo: builder.mutation<
      TODO.DeleteAllTodoResponse,
      TODO.DeleteAllTodoRequest
    >({
      query: () => ({
        url: `${ENDPOIND}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});
export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodoMutation,
  useEditTodoMutation,
} = api;
