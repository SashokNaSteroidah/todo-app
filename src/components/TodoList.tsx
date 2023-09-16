import React, {useState} from "react";
import {ITodo, TODO_DATA} from "../data/todo-data";
import {TodoItem} from "./todoItem";
import {TodoRemainder} from "./TodoRemainder";

const enum Filter {
    All = "all",
    Done = "done",
    NotDone = "notDone"
}

export const TodoList: React.FC = () => {

    const [todos, setTodos] = useState<ITodo[]>(TODO_DATA);
    const [filter, setFilter] = useState<Filter>(Filter.All);

    const filteredTodos = todos.filter(todo => {
        if (filter === Filter.Done) {
            return !todo.isActive;
        } else if (filter === Filter.NotDone) {
            return todo.isActive;
        }
        return true;
    });


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
        <>

            {filteredTodos.map(todo =>
                <TodoItem key={todo.id} todoItem={todo} onToggleActive={handleToggleActive}/>
            )}
            <div>
                <button onClick={() => setFilter(Filter.All)}>All</button>
                <button onClick={() => setFilter(Filter.Done)}>Done</button>
                <button onClick={() => setFilter(Filter.NotDone)}>Not Done</button>
            </div>
            <TodoRemainder />
        </>


    );
};

