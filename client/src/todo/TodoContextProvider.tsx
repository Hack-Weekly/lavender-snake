import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "@/types";
import { useApiClient } from "@/apiClient";

const TodoContext = createContext<[Todo[] | undefined, any]>([[], () => {}]);
export const useTodos = () => useContext(TodoContext);
export function TodoContextProvider({ children }: any) {
	const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
	const apiClient = useApiClient();
	useEffect(() => {
		if (!apiClient.user) return;
		(async () => {
			const t = await apiClient.getTodos();
			setTodos(t);
		})();
	}, [apiClient]);

	return (
		<TodoContext.Provider value={[todos, setTodos]}>
			{children}
		</TodoContext.Provider>
	);
}
