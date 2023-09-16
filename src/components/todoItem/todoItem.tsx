import {ITodo} from "../../data/todo-data";
import React, {useState} from "react";
import styles from './todoItem.module.sass'

interface ITodoItem {
    todoItem: ITodo,
    onToggleActive: (id:number) => void
}

export const TodoItem: React.FC<ITodoItem> = ({todoItem, onToggleActive}) => {

    const [isAcitve, setActive] = useState(todoItem.isActive)

    const handleCheck = () => {
        setActive(!isAcitve)
        onToggleActive(todoItem.id)
    }

    return (
        <li className={styles.todoItem}>
            <label style={{textDecoration: todoItem.isActive ? "line-through" : "none"}} onChange={handleCheck}>
                <input checked={isAcitve} type="checkbox"/>
                <span>{todoItem.name}
            </span>
            </label>
        </li>
    )
};
