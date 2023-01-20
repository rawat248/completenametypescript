import React, { useState } from "react";
import { Fragment } from "react";

type FormElem = React.FormEvent<HTMLFormElement>;
interface IToDo {
  text: string;
  complete: boolean;
}
const Main = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<IToDo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addToDo(value);
    setValue("");
  };
  const addToDo = (text: string): void => {
    const newToDo: IToDo[] = [...todos, { text, complete: false }];
    console.log(newToDo);
    setTodos(newToDo);
  };
  const completeToDo = (index: number): void => {
    const newToDo: IToDo[] = [...todos];
    newToDo[index].complete = !newToDo[index].complete;
    setTodos(newToDo);
  };
  const removeToDo = (index: number): void => {
    const newToDo: IToDo[] = [...todos];
    newToDo.splice(index, 1);
    setTodos(newToDo);
  };
  return (
    <div>
      <h1>To do list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: IToDo, index: number) => {
          return (
            <Fragment key={index}>
              <div
                style={{ textDecoration: todo.complete ? "line-through" : "" }}
              >
                {todo.text}
              </div>
              <button type="button" onClick={() => completeToDo(index)}>
                {" "}
                {todo.complete ? "Incomplete" : "Complete"}{" "}
              </button>
              <button type="button" onClick={() => removeToDo(index)}>
                &times;
              </button>
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default Main;
