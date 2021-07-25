import React, { ChangeEvent, FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
    const [task, setTask] = useState<string>("");
    const [deadline, setDealine] = useState<number>(0);
    const [todoList, setTodoList] = useState<ITask[]>([]);

    useEffect(() => {
        const localData = localStorage.getItem("todos");
        if (localData) {
            setTodoList(JSON.parse(localData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task") {
            setTask(event.target.value);
        } else {
            setDealine(Number(event.target.value));
        }
    };

    const addTask = (): void => {
        const newTask = { taskName: task, deadline: deadline };
        setTodoList([...todoList, newTask]);
        setTask("");
        setDealine(0);
    };

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(
            todoList.filter((task) => {
                return task.taskName !== taskNameToDelete;
            })
        );
    };

    return (
        <div className="App">
            <div className="header">
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="Task..."
                        name="task"
                        value={task}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Deadline Number"
                        name="deadline"
                        value={deadline}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="todoList">
                {todoList.map((task: ITask, key: number) => {
                    return (
                        <TodoTask
                            key={key}
                            task={task}
                            completeTask={completeTask}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
