import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ServiceAccount = {
  username: string;
  customerFriendlyName: string;
  contracts: {
    displayName: string;
    servicesInfo: {
      crm1: string;
      serviceTypeId:number;
    }[];
  }[];
};

export const columns: ColumnDef<ServiceAccount>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customerFriendlyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) =>
      row.contracts?.[0]?.servicesInfo?.[0]?.crm1 || "N/A", // Safely accessing crm1
    id: "servicesInfo.crm1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Info
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => row.contracts?.[0]?.displayName || "N/A",
    id: "contracts.displayName",
    header: "Product",
  },
];
