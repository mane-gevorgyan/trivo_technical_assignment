"use client";
import { useParams } from "next/navigation";

const AccountPage = () => {
  const params = useParams<{ accountId?: string }>();

  return <div>Account Page for {params.accountId}</div>;
};

AccountPage.displayName = "AccountPage";

export default AccountPage;
