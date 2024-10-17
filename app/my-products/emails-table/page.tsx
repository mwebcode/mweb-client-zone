"use client";
import React, { useState, useEffect } from "react";
import { ServiceAccount, columns } from "./columns";
import { DataTable } from "./data-table";
import ServiceAccountDetails from "@/app/view-account/view-account-page";


async function getData(): Promise<ServiceAccount[]> {
    const response = await fetch("/MockedServiceAccount.json");
    const data = await response.json();
    const serviceAccounts = data.customerData?.serviceAccounts || [];
    return serviceAccounts;
}

const EmailsPagePage: React.FC = () => {
  const [data, setData] = useState<ServiceAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();

      const accountWithoutEmail = result.filter(account =>
        account.contracts.some(contract =>
            contract.servicesInfo.some(serviceInfo => serviceInfo)
        )
      )
      setData(accountWithoutEmail);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} onRowSelect={function (row: ServiceAccount): void {
              throw new Error("Function not implemented.");
          } } />
    </div>
  );
};
export default EmailsPagePage;
