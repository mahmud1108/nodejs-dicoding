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

const getAllNotes = (request, h) => {
	status: "success";
	data: {
		notes;
	}
};

export { addNoteHandler, getAllNotes };
