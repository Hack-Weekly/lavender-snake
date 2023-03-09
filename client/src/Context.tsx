import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../../shared/types";
import apiClient from "./apiClient";

const TodoContext = createContext<[Todo[] | undefined, any]>([[], () => {}]);
export const useTodos = () => useContext(TodoContext);

export function Context({children}: any) {
    const [todos, setTodos] = useState<Todo[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const t = await apiClient.getTodos();
            setTodos(t);
        })()
    }, [])

    return <TodoContext.Provider value={[todos, setTodos]}>
        {children}
    </TodoContext.Provider>;
}