import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodoAppContent } from "@/todo/TodoAppContent";
import React from "react";
import IndexContent from "../index/IndexContent";
import { ChatApp } from "@/chat/ChatApp";
import { AdminPage } from "@/admin/AdminPage";

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
	{
		path: "/admin",
		element: <AdminPage />,
	},
]);

export const AppRouter = () => <RouterProvider router={router} />;
