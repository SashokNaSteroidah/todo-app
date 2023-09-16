import React, {useState} from "react";
import {TODO_DATA} from "../data/todo-data";

export const TodoRemainder: React.FC = () => {
    const [todo, setTodo] = useState(TODO_DATA);

    const handleToggleActive = (id: number) => {
        setTodo(prevTodo => {
            return prevTodo.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        isActive: !item.isActive
                    };
                }
                return item;
            });
        });
    };

    const remainingTasks = todo.filter(item => item.isActive).length;

    return <div>{remainingTasks} осталось</div>;
};
