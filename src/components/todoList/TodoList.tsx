import React, {KeyboardEventHandler, MouseEventHandler, useEffect, useState} from "react";
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

    useEffect(() => {
        const data: string | null = localStorage.getItem('data');
        if (data != null) setTodos(JSON.parse(data));
        else localStorage.setItem("data", JSON.stringify(TODO_DATA));
    }, [])

    const [todos, setTodos] = useState<ITodo[]>(TODO_DATA);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [value, setValue] = useState("");

    const filteredTodos = todos.filter(todo => {
        if (filter === Filter.Done) {
            return todo.isActive;
        } else if (filter === Filter.NotDone) {
            return !todo.isActive;
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
        setTodos(prevState => {
            const newData = prevState.filter((todo => !todo.isActive));
            localStorage.setItem('data', JSON.stringify(newData))
            return newData
        })
    }

    const handleAdd: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter' && value !== '') {
            setTodos(prevTodos => {
                const newTodos = [...prevTodos, {id: todos.length + 1, name: value, isActive: false}];
                localStorage.setItem('data', JSON.stringify(newTodos));
                return newTodos;
            })
            setValue("");
        }
    }


    const handleAddButton: MouseEventHandler<HTMLButtonElement> = () => {
        if (value != '') {
            setTodos(prevTodos => {
                const newTodos = [...prevTodos, {id: todos.length + 1, name: value, isActive: false}];
                localStorage.setItem('data', JSON.stringify(newTodos));
                return newTodos;
            })
            setValue("");
        }
    }

    return (
        <>
            <div className={styles.topMenu}>
                <input placeholder={"New task..."}
                       className={styles.addInput}
                       onKeyDown={handleAdd}
                       value={value}
                       onChange={event => setValue(event.target.value)}
                       type="text"
                />
                <button onClick={handleAddButton}>+</button>
            </div>

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

