"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IPayment = {
    status: string | undefined,
    accountId: string | undefined,
    name: string | undefined,
    emailAddress: string | undefined,
    username: string | undefined
    createDate: string | undefined
}

export const columns: ColumnDef<IPayment>[] = [
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                    Status
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "accountId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                    Account Id
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                   Name
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "emailAddress",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                    Email Address
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                    Username
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='uppercase lg:normal-case'
                >
                    Create Date
                    <ArrowUpDown className="hidden lg:inline-block md:ml-2 md:h-4 md:w-4" />
                </Button>
            )
        },
    },
]

