import type { RequestHandler } from "express";

import {
  type AccountParams,
  type AccountSettingsPatchInput,
  accountParamsSchema,
  accountSettingsPatchSchema,
} from "../validation/account";

type ErrorResponse = {
  message: string;
};

export const validateAccountParams: RequestHandler<
  AccountParams,
  ErrorResponse
> = (request, response, next) => {
  const parsedParams = accountParamsSchema.safeParse(request.params);

  if (!parsedParams.success) {
    response.status(400).json({
      message: "Invalid account id.",
    });
    return;
  }

  next();
};

export const validateAccountSettingsBody: RequestHandler<
  AccountParams,
  ErrorResponse,
  AccountSettingsPatchInput
> = (request, response, next) => {
  const parsedBody = accountSettingsPatchSchema.safeParse(request.body);

  if (!parsedBody.success) {
    response.status(400).json({
      message: "Invalid account settings data.",
    });
    return;
  }

  request.body = parsedBody.data;
  next();
};
