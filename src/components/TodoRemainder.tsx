import React, {useState} from "react";
import {TODO_DATA} from "../data/todo-data";

export const TodoRemainder: React.FC = () => {
    const [todo, setTodo] = useState(TODO_DATA)
    return <div>{todo.filter(todo => todo.isActive).length} осталось</div>
};

