import Hapi from "@hapi/hapi";
import { routes } from "./routes.js";

const init = async () => {
	const server = Hapi.server({
		port: 5000,
		host: "0.0.0.0",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	server.route(routes);

	await server.start();
	console.log(`server berjalan pada ${server.info.uri}`);
};

init();
