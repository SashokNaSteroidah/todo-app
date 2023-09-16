import React from "react";

interface TodoRemainder {
    remaining: number
}

export const TodoRemainder: React.FC<TodoRemainder> = ({remaining}) => {
    return <div>{remaining} осталось</div>;
};
