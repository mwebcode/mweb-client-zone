"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel, getSortedRowModel, Cell,
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
import React, {useEffect, useMemo, useState} from "react";
import {Input} from "@/components/ui/input";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | any
    onRowSelect: (row: TData) => void; // New prop for row selection
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             onRowSelect,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = useState<any>([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    const debouncedFilter = useDebounce(globalFilter, 300);
    interface ColumnFilter {
        id: string
        value: unknown
    }

    const [filters, setFilters] = useState(({
        Active: true,
        Inactive: true,
        Suspended: true,
    })) as any
    // Handle checkbox changes
    const handleCheckboxChange = (e:any) => {
        const { name, checked } = e.target;
        setFilters({
            ...filters,
            [name]: checked,
        });
    };
    type ColumnFiltersState = ColumnFilter[];

    const handleRowClick = (row: TData) => {
        onRowSelect(row); // Call the passed function to select a row
    };
    const filteredData = useMemo(() => {
        return data.filter((row:any) =>
            filters[row.status]
        );
    }, [data, filters]);  // Recalculate only when data or filters change
    // Paginated data
    const paginatedData = React.useMemo(() => {
        return filteredData.slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
        );
    }, [filteredData, currentPage, itemsPerPage]);

    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter,
            columnFilters,
        },

    });
    console.log(table.getState().columnFilters)
    const Checkbox = ({ label, name, checked, onChange }: any) => (
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

        <div className="w-full max-w-[1024px] mx-auto items-center">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
                <h2 className='text-lg font-bold'>Corporate User Management</h2>
                <Input
                    placeholder="Search...."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-full sm:max-w-sm"
                />
            </div>

            {/* Subheading */}
            <div className='mb-6 text-sm text-center sm:text-left'>
                Search by any column information type
            </div>

            {/* Filters */}
            <div className='mb-8 grid grid-cols-3 gap-4 sm:flex sm:gap-10'>
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
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
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

                        {paginatedData.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => handleRowClick(row.original)} // Row click handler
                                >
                                    {row.getVisibleCells().map((cell: Cell<TData, TValue>) => (
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

            {/* Pagination */}
            <div className="flex justify-center space-x-2 py-4">
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
