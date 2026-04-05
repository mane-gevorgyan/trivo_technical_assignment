import { MockAccountRepository } from "../repositories/mock-account-repository";
import { AccountService } from "../services/account-service";

export const accountService = new AccountService(new MockAccountRepository());
