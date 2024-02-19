import {
	addNoteHandler,
	deleteNoteHandler,
	editNoteHandler,
	getAllNotes,
	getNoteById,
} from "./handler.js";

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
	{
		method: "GET",
		path: "/notes/{id}",
		handler: getNoteById,
	},
	{
		method: "PUT",
		path: "/notes/{id}",
		handler: editNoteHandler,
	},
	{
		method: "DELETE",
		path: "/notes/{id}",
		handler: deleteNoteHandler,
	},
];

export { routes };
