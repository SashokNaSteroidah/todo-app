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
    const [value, setValue] = useState("");

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

    const handleDelete = () => {
        setTodos(prevState => prevState.filter((todo => !todo.isActive)))
    }

    const handleAdd = (event) => {
        if (event.key == 'Enter' && value != '') {
            setTodos(prevTodos => [...prevTodos, {id: todos.length + 1, name: value, isActive: false}]);
            setValue("");
        }
    }

    return (
        <>
            <input onKeyDown={handleAdd} value={value} onChange={event => setValue(event.target.value)} type="text"/>
            {filteredTodos.length == 0
                ? <div>Не найдено значений</div>
                : filteredTodos.map(todo =>
                    <TodoItem key={todo.id} todoItem={todo} onToggleActive={handleToggleActive}/>
                )}
            <article >
                <div>
                    <button onClick={() => setFilter(Filter.All)}>All</button>
                    <button onClick={() => setFilter(Filter.Done)}>Done</button>
                    <button onClick={() => setFilter(Filter.NotDone)}>Not Done</button>
                </div>
                <TodoRemainder remaining={todos.filter(item => !item.isActive).length}/>
                <button onClick={handleDelete}>Удалить выполненные задачи</button>
            </article>
        </>


    );
};

