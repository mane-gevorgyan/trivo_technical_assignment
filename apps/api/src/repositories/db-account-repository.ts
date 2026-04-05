import type { FullAccountData } from "@trivo/shared/types/account";

import type { AccountSettingsPatchInput } from "../validation/account";
import { prisma } from "../lib/prisma";
import {
  accountWithSettingsSelect,
  flattenAccountRecord,
  toPrismaSettingsPatch,
} from "./helpers/account-repository-helpers";
import type { AccountRepository } from "./account-repository";

export class DbAccountRepository implements AccountRepository {
  async getAccounts(): Promise<FullAccountData[]> {
    const accounts = await prisma.account.findMany({
      orderBy: {
        name: "asc",
      },
      select: accountWithSettingsSelect,
    });

    return accounts
      .map(flattenAccountRecord)
      .filter((account): account is FullAccountData => account !== null);
  }

  async getAccountById(accountId: string): Promise<FullAccountData | null> {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: accountWithSettingsSelect,
    });

    if (!account) {
      return null;
    }

    return flattenAccountRecord(account);
  }

  async updateAccountSettings(
    accountId: string,
    settingsData: AccountSettingsPatchInput
  ): Promise<FullAccountData | null> {
    const existingAccount = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        id: true,
      },
    });

    if (!existingAccount) {
      return null;
    }

    await prisma.accountSettings.update({
      where: {
        accountId,
      },
      data: toPrismaSettingsPatch(settingsData),
    });

    return this.getAccountById(accountId);
  }
}
