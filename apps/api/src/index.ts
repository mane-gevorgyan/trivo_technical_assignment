import "dotenv/config";

import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 4000);

const server = createServer((_request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.end(
    JSON.stringify({
      service: "trivo-api",
      status: "healthy",
      message: "Service is operational.",
    })
  );
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
