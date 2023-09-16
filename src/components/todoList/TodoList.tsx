import React, {KeyboardEventHandler, useState} from "react";
import {ITodo, TODO_DATA} from "../../data/todo-data";
import {TodoItem} from "../todoItem/todoItem";
import {TodoRemainder} from "../TodoRemainder";
import styles from './todoListStyles.module.sass'

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

    const handleAdd:KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter' && value != '') {
            setTodos(prevTodos => [...prevTodos, {id: todos.length + 1, name: value, isActive: false}]);
            setValue("");
        }
    }

    return (
        <>
            <input className={styles.addInput}
                   onKeyDown={handleAdd}
                   value={value}
                   onChange={event => setValue(event.target.value)}
                   type="text"
            />

            <ul className={styles.todoItem}>
                {filteredTodos.length == 0
                    ? <div>Не найдено значений</div>
                    : filteredTodos.map(todo =>
                        <TodoItem key={todo.id}
                                  todoItem={todo}
                                  onToggleActive={handleToggleActive}
                        />
                    )}
            </ul>

            <article className={styles.remaining}>
                <TodoRemainder remaining={todos.filter(item => !item.isActive).length}/>
            </article>
            <article className={styles.bottomMenu}>
                <div>
                    <button onClick={() => setFilter(Filter.All)}>All</button>
                    <button onClick={() => setFilter(Filter.Done)}>Done</button>
                    <button onClick={() => setFilter(Filter.NotDone)}>Not Done</button>
                </div>
                <button className={styles.delete} onClick={handleDelete}>Clear completed</button>
            </article>

        </>


    );
};

