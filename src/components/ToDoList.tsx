"use client";
import { FC, useState } from "react";
import scss from "./ToDoList.module.scss";
import {
  useDeleteAllTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";

const ToDoList: FC = () => {
  const { register, handleSubmit, setValue } = useForm<ITodo>();
  const { data, isLoading } = useGetTodosQuery();
  const [editTodoMutation] = useEditTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [deleteAllTodo] = useDeleteAllTodoMutation();
  const [editId, setEditId] = useState<number | null>(null);
  const [uploadFileMutation] = useUploadFileMutation();
  const editTodo: SubmitHandler<ITodo> = async (data) => {
    try {
      if (!data.file || data.file.length === 0) {
        console.error("No file provided.");
        return;
      }
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);
      const { data: responseImage } = await uploadFileMutation(formData);

      await editTodoMutation({
        _id: editId!,
        data: { ...data, img: responseImage?.url },
      });
      setEditId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAll = async () => {
    try {
      await deleteAllTodo();
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };
  if (!isLoading) {
    console.log("🚀 ~ data:", data);
  }

  return (
    <section className={scss.ToDoList}>
      <div className="container">
        <h1>ToDoList</h1>
        <div className={scss.content}>
          {data?.map((el) => (
            <div key={el._id} className="">
              {editId === el._id ? (
                <form onSubmit={handleSubmit(editTodo)}>
                  <input
                    type="text"
                    placeholder="edit title"
                    {...register("title", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="edit description"
                    {...register("description", { required: true })}
                  />
                  <input
                    type="file"
                    {...register("file", { required: true })}
                  />
                  <button type="submit">save</button>
                </form>
              ) : (
                <div className="">
                  <h1>{el.title}</h1>
                  <h1>{el.description}</h1>
                  {el.img && <img src={el.img} alt="image" />}
                  <button onClick={() => deleteTodoMutation(el._id!)}>
                    remove
                  </button>
                  <button
                    onClick={() => {
                      setEditId(el._id!);
                      setValue("title", el.title);
                      setValue("description", el.description);
                      setValue("file", el.file);
                    }}
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
          ))}
          <button onClick={deleteAll}>deleteAll</button>
        </div>
      </div>
    </section>
  );
};

export default ToDoList;
