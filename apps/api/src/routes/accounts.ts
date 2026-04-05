import { Router, type Router as ExpressRouter } from "express";

import {
  getSidebarAccounts,
  getSingleAccount,
  updateAccountSettings,
} from "../controllers/account-controller";
import {
  validateAccountParams,
  validateAccountSettingsBody,
} from "../middleware/account-validation-middleware";

export const createAccountsRouter = (): ExpressRouter => {
  const router = Router();

  router.get("/", getSidebarAccounts);

  router.get("/:accountId", validateAccountParams, getSingleAccount);

  router.patch(
    "/:accountId/settings",
    validateAccountParams,
    validateAccountSettingsBody,
    updateAccountSettings,
  );

  return router;
};
