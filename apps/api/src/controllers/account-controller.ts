import type { IAccount } from "@trivo/shared/types/account";
import type { RequestHandler } from "express";
import { ZodError } from "zod";

import { MockAccountRepository } from "../repositories/mock-account-repository";
import { AccountService } from "../services/account-service";

type ErrorResponse = {
  message: string;
};

const accountService = new AccountService(new MockAccountRepository()); // Change to DB later when implemented

export const getSidebarAccounts: RequestHandler<
  Record<string, never>,
  ErrorResponse | IAccount[]
> = async (_request, response) => {
  try {
    const sidebarAccounts = await accountService.getSidebarAccounts();

    response.status(200).json(sidebarAccounts);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(500).json({
        message: "Accounts data is invalid.",
      });
      return;
    }

    response.status(500).json({
      message: "Unable to load accounts.",
    });
  }
};
