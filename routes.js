import { addNoteHandler, getAllNotes } from "./handler.js";

const routes = [
	{
		method: "POST",
		path: "/notes",
		handler: addNoteHandler,
	},
	{
		method: "GET",
		path: "/notes",
		handler: getAllNotes,
	},
];

export { routes };
