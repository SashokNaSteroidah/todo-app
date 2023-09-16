import React, {useState} from "react";
import {ITodo, TODO_DATA} from "../data/todo-data";
import {TodoItem} from "./todoItem";


export const TodoList: React.FC = () => {

    const [todos, setTodos] = useState<ITodo[]>(TODO_DATA);

    const handleToggleActive = (id: number) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isActive: !todo.isActive
                    };
                }
                return todo;
            });
        });
    }

    return (
        todos.map(todo =>
            <TodoItem key={todo.id} todoItem={todo} onToggleActive={handleToggleActive}/>
        )
    );
};

