import { nanoid } from "nanoid";
import { notes } from "./notes.js";

const addNoteHandler = (request, h) => {
	const { title, tags, body } = request.payload;

	const id = nanoid(16);
	const createAt = new Date().toISOString();
	const updateAt = createAt;

	const newNote = { title, tags, body, id, createAt, updateAt };

	notes.push(newNote);

	const isSuccess = notes.filter((note) => note.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "success",
			message: "berhasil menambahkan note baru ",
			data: {
				noteId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "catatan gagal ditambahkan",
	});
	response.code(500);
	response.header("Access-Control-Allow-Origin", "*");
	return response;
};

const getAllNotes = () => ({
	status: "success",
	data: {
		notes,
	},
});

const getNoteById = (request, h) => {
	const { id } = request.params;

	const note = notes.filter((n) => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: "success",
			data: {
				note,
			},
		};
	}

	const response = h.response({
		status: "fail",
		message: "catatan tidak ditemukan",
	});

	response.code(404);
	return response;
};

const editNoteHandler = (request, h) => {
	const { id } = request.params;

	const { title, tags, body } = request.payload;
	const updateAt = new Date().toISOString();

	const index = notes.findIndex((note) => note.id === id); // jika item tidak ditemukan fin index akan me return -1

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updateAt,
		};

		const response = h.response({
			status: "success",
			message: "catatan berhasil diubah",
		});

		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "gagal merubah catatan",
	});

	response.code(404);
	return response;
};

const deleteNoteHandler = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "catatan berhasil dihapus",
		});

		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "gagal menghapus status",
	});

	response.code(404);
	return response;
};

export {
	addNoteHandler,
	getAllNotes,
	getNoteById,
	editNoteHandler,
	deleteNoteHandler,
};
