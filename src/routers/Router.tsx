import { createBrowserRouter } from "react-router";
import Home from "../components/home/Home";
import AppLayout from "../ui/AppLayout";
// import Forecast from "../components/forecast/Forecast";
import NotFound from "../ui/NotFound";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "forecast",
				lazy: async () => {
					const module = await import("../components/forecast/Forecast");
					return { Component: module.default };
				},
			},
		],
	},
	{
		path: "*",
		Component: NotFound,
	},
]);
