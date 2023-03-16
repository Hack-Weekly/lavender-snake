import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodoAppContent } from "@/todo/TodoAppContent";
import React from "react";
import IndexContent from "../index/IndexContent";
import { ChatApp } from "@/chat/ChatApp";

// routes are declared here
const router = createBrowserRouter([
	// there is an option where you can declare routes by using components, but for now I decided to use good old json object format.
	{
		path: "/",
		element: <IndexContent />,
	},
	{
		path: "/todo",
		element: <TodoAppContent />,
	},
	{
		path: "/chat",
		element: <ChatApp />,
	},
]);

export const AppRouter = () => <RouterProvider router={router} />;
