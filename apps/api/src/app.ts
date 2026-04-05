import "dotenv/config";

import cors from "cors";
import express, { type Express, type RequestHandler } from "express";

import { createAccountsRouter } from "./routes/accounts";

type HealthCheckResponse = {
  message: string;
  service: string;
  status: "healthy";
};

const getHealthStatus: RequestHandler<Record<string, never>, HealthCheckResponse> =
  (_request, response) => {
    response.status(200).json({
      service: "trivo-api",
      status: "healthy",
      message: "Service is operational.",
    });
  };

export const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/accounts", createAccountsRouter());
  app.get("/health", getHealthStatus);

  return app;
};
