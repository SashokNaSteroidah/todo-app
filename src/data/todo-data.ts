export interface ITodo {
    id: number,
    name: string,
    isActive: boolean
}

export type ITodo_data = ITodo[]

export const TODO_DATA: ITodo_data = [
    {id: 1, name: 'Помыть посуду', isActive: false},
    {id: 2, name: 'Убрать стол', isActive: true},
    {id: 3, name: 'Купить хлеб', isActive: false},
]