import { Router, type Router as ExpressRouter } from "express";

import { getSidebarAccounts } from "../controllers/account-controller";

export const createAccountsRouter = (): ExpressRouter => {
  const router = Router();

  router.get("/", getSidebarAccounts);

  return router;
};
