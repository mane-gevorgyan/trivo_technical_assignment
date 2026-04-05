import type { RequestHandler } from "express";
import { ZodError } from "zod";

import { accountService } from "../config/account-dependencies";
import {
  type AccountParams,
  type AccountSettingsPatchInput,
  type FullAccountResponse,
  type SidebarAccountsResponse,
} from "../validation/account";

type ErrorResponse = {
  message: string;
};

export const getSidebarAccounts: RequestHandler<
  Record<string, never>,
  ErrorResponse | SidebarAccountsResponse
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

export const getSingleAccount: RequestHandler<
  AccountParams,
  ErrorResponse | FullAccountResponse
> = async (request, response) => {
  try {
    const { accountId } = request.params;

    const singleAccountData = await accountService.getSingleAccount(accountId);

    if (!singleAccountData) {
      response.status(404).json({
        message: "Account not found.",
      });
      return;
    }

    response.status(200).json(singleAccountData);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(500).json({
        message: "Account data is invalid.",
      });
      return;
    }

    response.status(500).json({
      message: "Unable to load account.",
    });
  }
};

export const updateAccountSettings: RequestHandler<
  AccountParams,
  ErrorResponse | FullAccountResponse,
  AccountSettingsPatchInput
> = async (request, response) => {
  try {
    const { accountId } = request.params;

    const updatedSettings = await accountService.updateAccountSettings(
      accountId,
      request.body,
    );

    if (!updatedSettings) {
      response.status(404).json({
        message: "Account not found.",
      });
      return;
    }

    response.status(200).json(updatedSettings);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(500).json({
        message: "Updated account data is invalid.",
      });
      return;
    }

    response.status(500).json({
      message: "Unable to update account settings.",
    });
  }
};
