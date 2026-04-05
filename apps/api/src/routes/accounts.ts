import { Router, type Router as ExpressRouter } from "express";

import { getSidebarAccounts, getSingleAccount } from "../controllers/account-controller";

export const createAccountsRouter = (): ExpressRouter => {
  const router = Router();

  router.get("/", getSidebarAccounts);

  router.get("/:accountId", getSingleAccount);

  return router;
};
