import type { FullAccountData, IAccount } from "@trivo/shared/types/account";

export const toAccountSummary = ({ id, name }: FullAccountData): IAccount => ({
  id,
  name,
});
