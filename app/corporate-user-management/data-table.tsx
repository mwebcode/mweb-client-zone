"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel, getSortedRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import React, {useMemo, useState} from "react";
import {Input} from "@/components/ui/input";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | any
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = useState<any>([])
    interface ColumnFilter {
        id: string
        value: unknown
    }

    const [filters, setFilters] = useState(({
        Active: true,
        Inactive: true,
        Suspended: true,
    }))
    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters({
            ...filters,
            [name]: checked,
        });
    };
    type ColumnFiltersState = ColumnFilter[];

    // // Filter data based on selected statuses
    // const filteredData = data.filter((row) =>
    //     filters[row.status]
    // );
    const filteredData = useMemo(() => {
        return data.filter((row) =>
            filters[row.status]
        );
    }, [data, filters]);  // Recalculate only when data or filters change

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },

    });
    console.log(table.getState().columnFilters)
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Update filter for multiple columns
        table.setGlobalFilter(value);
    };
    const Checkbox = ({ label, name, checked, onChange }) => (
        <label className="custom-checkbox flex">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    );
    return (
        <div className='w-[1024px] items-center'>
            <div className="flex items-center py-4">
              <div className='flex gap-10'>
                  <h2 className='text-lg font-bold'>Corporate User Management</h2>
                  <span>
                    <Input
                        placeholder="Search...."
                        value={(table.getColumn("emailAddress")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("emailAddress")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </span>
              </div>
            </div>
            <div className='mb-6 text-sm'> Search by any column information type</div>

            <div className='mb-8 gap-10 flex'>
                <Checkbox
                    label="Active"
                    name='Active'
                    checked={filters.Active}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Inactive"
                    name='Inactive'
                    checked={filters.Inactive}
                    onChange={handleCheckboxChange}
                />
                <Checkbox
                    label="Suspended"
                    name='Suspended'
                    checked={filters.Suspended}
                    onChange={handleCheckboxChange}
                />
                {/*<label className='p-3 flex gap-2 custom-checkbox'>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        name="Active"*/}
                {/*        checked={filters.Active}*/}
                {/*        onChange={handleCheckboxChange}*/}
                {/*    />*/}
                {/*   <span className=''> Active</span>*/}
                {/*</label>*/}
                {/*<label className='p-3 flex gap-2 custom-checkbox'>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        name="Inactive"*/}
                {/*        checked={filters.Inactive}*/}
                {/*        onChange={handleCheckboxChange}*/}
                {/*    />*/}
                {/*  <span className='checkmark'>Inactive</span>*/}
                {/*</label>*/}
                {/*<label className='p-3 flex gap-2 custom-checkbox'>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        name="Suspended"*/}
                {/*        checked={filters.Suspended}*/}
                {/*        onChange={handleCheckboxChange}*/}
                {/*    />*/}
                {/*   <span className='checkmark'>Suspended</span>*/}
                {/*</label>*/}
            </div>


            <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
            </div>
            <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
