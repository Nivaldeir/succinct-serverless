import { ControllerFactory } from "./infra/controllers";
import server from "./infra/server";
import serverless from "serverless-http";

const controllers = ControllerFactory.create();
console.log("Controllers criados com sucesso");
server.addRoutes(controllers);

module.exports.handler = serverless(server.app);