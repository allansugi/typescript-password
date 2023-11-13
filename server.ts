import "dotenv/config";
import { App } from "./App";

const port = parseInt(process.env.PORT || "8080");
const app = new App(port);
app.listen();

export { app };
