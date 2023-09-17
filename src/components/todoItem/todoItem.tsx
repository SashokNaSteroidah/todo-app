import React, { useState } from "react";
import styles from './todoItem.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ITodoItem {
    todoItem: {
        id: number;
        name: string;
        isActive: boolean;
    };
    onToggleActive: (id: number) => void;
}

export const TodoItem: React.FC<ITodoItem> = ({ todoItem, onToggleActive }) => {
    const [isActive, setActive] = useState(todoItem.isActive);

    const handleCheck = () => {
        setActive(!isActive);
        onToggleActive(todoItem.id);
    };

    return (
        <li className={`${styles.todoItem} ${styles.customCheckbox}`}>
            <label className={isActive ? styles.checked : ""}>
                {isActive && <FontAwesomeIcon icon={faCheck} />}
                <input
                    type="checkbox"
                    defaultChecked={isActive}
                    onClick={handleCheck}
                />
                <span>{todoItem.name}</span>
            </label>
        </li>
    );
};
