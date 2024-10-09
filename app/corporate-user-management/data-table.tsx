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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | any
    onRowSelect: (row: TData) => void;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             onRowSelect,
                                         }: DataTableProps<TData, TValue>) {

    interface ColumnFilter {
        id: string
        value: unknown
    }

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = useState<any>([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

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
        onRowSelect(row);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(0);
    };
    const filteredData = useMemo(() => {
        return data.filter((row:any) =>
            filters[row.status]
        );
    }, [data, filters]);
    // Paginated data
    const paginatedData = React.useMemo(() => {
        return filteredData.slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
        );
    }, [filteredData, currentPage, itemsPerPage]);

    // Total pages based on filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageChange = (pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            setCurrentPage(pageIndex);
        }
    };


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
            <div className="table-container">
                <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
                    <h2 className='text-lg font-bold'>Corporate User Management</h2>
                    <div className='mt-4'>
                        <Input
                            placeholder="Search...."
                            value={globalFilter}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="max-w-full sm:max-w-sm mb-4"
                        />
                        <div className='mb-6 text-sm text-center sm:text-left'>
                            Search by any column information type
                        </div>
                    </div>
                </div>
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    Status filter:
                    <Checkbox
                        label="Active"
                        name="Active"
                        checked={filters.Active}
                        onChange={handleCheckboxChange}
                    />
                    <Checkbox
                        label="Inactive"
                        name="Inactive"
                        checked={filters.Inactive}
                        onChange={handleCheckboxChange}
                    />
                    <Checkbox
                        label="Suspended"
                        name="Suspended"
                        checked={filters.Suspended}
                        onChange={handleCheckboxChange}
                    />
                </div>
                {/* Table for Larger Screens */}
                <div className="hidden lg:block rounded-md border">
                    <Table className="table">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} onClick={() => handleRowClick(row.original)}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Stacked Cards for Mobile */}
            <div className="lg:hidden">
                {paginatedData.length ? (
                    table.getRowModel().rows.map((row, index) => (
                        <div key={index} className="card mb-4 bg-white rounded-md shadow-md border">
                            {row.getVisibleCells().map((cell:any, cellIndex) => (
                                <div key={cellIndex} className="flex justify-between py-2">
                                    <span className="font-light">{flexRender(cell.column.columnDef.header, cell.getContext())}</span>
                                    <span className='font-black'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4">No results.</div>
                )}
            </div>
            <div className="flex items-center justify-between py-4">
                <p>Items Per Page:</p>
                <Select onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 0}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(index);
                                }}
                                className={index === currentPage ? "active" : ""}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages - 1}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
