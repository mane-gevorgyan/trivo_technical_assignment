import type { AccountRepository } from "../repositories/account-repository";
import { DbAccountRepository } from "../repositories/db-account-repository";
import { MockAccountRepository } from "../repositories/mock-account-repository";
import { AccountService } from "../services/account-service";

const resolveAccountRepository = (): AccountRepository => {
  if (process.env.DATA_SOURCE === "db") {
    return new DbAccountRepository();
  }

  return new MockAccountRepository();
};

export const accountService = new AccountService(resolveAccountRepository());
