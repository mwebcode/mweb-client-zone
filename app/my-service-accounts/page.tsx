"use client";
import React, { useState, useEffect } from "react";
import { ServiceAccount, columns } from "./columns";
import { DataTable } from "./data-table";
import ServiceAccountDetails from "../view-account/view-account-page";


async function getData(): Promise<ServiceAccount[]> {
    const response = await fetch("/MockedServiceAccount.json");
    const data = await response.json();
    const serviceAccounts = data.customerData?.serviceAccounts || [];
    return serviceAccounts;
}

const ServiceAccountPage: React.FC = () => {
  const [data, setData] = useState<ServiceAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
      console.log('data :', result)
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRowSelect = (row: ServiceAccount) => {
    setSelectedAccount(row); 
    console.log(row);
  };

  const handleBack = () => {
    setSelectedAccount(null); 
  };

  return (
    <div className="container mx-auto py-10">
      {selectedAccount ? (
        <ServiceAccountDetails account={selectedAccount} onBack={handleBack} />
      ) : (
        <DataTable columns={columns} data={data} onRowSelect={handleRowSelect} />
       
      )}
    </div>
  );
};

export default ServiceAccountPage;
