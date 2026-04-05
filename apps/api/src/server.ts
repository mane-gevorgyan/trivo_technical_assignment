import { createApp } from "./app";
import { resolveServerPort } from "./config/server";

const port = resolveServerPort(process.env.PORT);
const app = createApp();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
