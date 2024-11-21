"use client";
import { FC } from "react";
import scss from "./TodoAdd.module.scss";
import { usePostTodoMutation } from "@/redux/api/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";

const TodoAdd: FC = () => {
  const [postTodoMutation] = usePostTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const { register, handleSubmit, reset } = useForm<ITodo>();
  const sendTodo: SubmitHandler<ITodo> = async (data) => {
    const file = data.file![0];
    const formDate = new FormData();
    formDate.append("file", file);
    const { data: responseImage } = await uploadFileMutation(formDate);

    await postTodoMutation({
      title: data.title,
      description: data.description,
      img: responseImage?.url,
    });
    reset();
  };

  return (
    <section className={scss.TodoAdd}>
      <div className="container">
        <div className={scss.content}>
          <h1>ToDoAdd</h1>
          <form onSubmit={handleSubmit(sendTodo)}>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              placeholder="description"
              {...register("description", { required: true })}
            />
            <input type="file" {...register("file", { required: true })} />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TodoAdd;
