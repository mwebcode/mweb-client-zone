"use client";

import React, { useState, useEffect } from "react";
import { Cell } from "@tanstack/react-table";
import './data-table.css';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Debounce function
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

// Define a generic row type that can be indexed
interface DataTableProps<TData extends Record<string, any>, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelect: (row: TData) => void; // New prop for row selection
}

export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
  onRowSelect, // Destructure the new prop
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedFilter = useDebounce(globalFilter, 300);

  // Filtered data
  const filteredData = React.useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(debouncedFilter.toLowerCase())
      )
    );
  }, [data, debouncedFilter]);

  // Total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Adjust current page when filtered data changes
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [filteredData, totalPages, currentPage]);

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
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination: {
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      },
    },
    manualPagination: false,
  });

  const handleRowClick = (row: TData) => {
    onRowSelect(row); // Call the passed function to select a row
  };

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(0); // Reset to first page
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
        <p className="service-account-title font-bold text-xl">MY SERVICE ACCOUNT</p>
        <Input
          placeholder="Search"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm w-full"
        />
      </div>
      <p className="caption mt-2 text-sm text-gray-600">Search by any column.</p>

      <div className="rounded-md border overflow-x-auto">
        <div className="lg:hidden">
          {paginatedData.length ? (
            table.getRowModel()?.rows.map((row) => (
              <div key={row.id} className="card mb-4 bg-white rounded-md shadow-md border p-4 cursor-pointer" onClick={() => handleRowClick(row.original)}>
                {row.getVisibleCells().map((cell) => {
  const column = table.getColumn(cell.column.id); // Get the column definition

  // Check if the column exists
  if (!column) {
    return null; // Handle the case if the column is not found
  }

  // Get the header object for the cell
  const header = table.getHeaderGroups().flatMap(hg => hg.headers).find(h => h.column.id === cell.column.id);

  // Construct the correct header context if the header is found
  if (header) {
    const headerContext = {
      header, // Pass the header object
      column, // Pass the column
      table, // Include the table instance
    };

    return (
      <div key={cell.id} className="flex justify-between py-2">
        <span className="font-light">
          {flexRender(header.column.columnDef.header, headerContext)} {/* Correctly render the header */}
        </span>
        <span className='font-black'>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      </div>
    );
  }

  return null; // In case no header is found
})}



              </div>
            ))
          ) : (
            <div className="text-center h-24">No results.</div>
          )}
        </div>

        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {paginatedData.length ? (
                table.getRowModel()?.rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    onClick={() => handleRowClick(row.original)} // Row click handler
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
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between py-4 mt-4">
        <p className="text-sm">Items Per Page:</p>
        <Select onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
          <SelectTrigger className="w-full sm:w-[180px] mt-2 sm:mt-0">
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
  );
}
