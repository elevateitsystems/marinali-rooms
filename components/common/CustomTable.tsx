"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  className?: string;
  rowKey: (item: T) => string | number;
  skeletonRows?: number;
}

export function CustomTable<T>({
  data,
  columns,
  isLoading,
  isError,
  errorMessage = "Something went wrong. Please try again later.",
  emptyMessage = "No data found.",
  className,
  rowKey,
  skeletonRows = 5,
}: CustomTableProps<T>) {
  return (
    <div className={cn("bg-white border rounded-xl shadow-sm flex flex-col", className)}>
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              {columns.map((column, index) => (
                <TableHead 
                  key={index} 
                  className={cn("px-6 py-4 font-semibold text-gray-700 whitespace-nowrap", column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className="px-6 py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3 text-red-500">
                    <AlertCircle size={40} strokeWidth={1.5} />
                    <div className="space-y-1">
                      <p className="font-semibold">Error Loading Data</p>
                      <p className="text-sm opacity-90">{errorMessage}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                    <Inbox size={40} strokeWidth={1.5} />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow 
                  key={rowKey(item)} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, index) => (
                    <TableCell 
                      key={index} 
                      className={cn("px-6 py-4", column.className)}
                    >
                      {column.cell 
                        ? column.cell(item) 
                        : column.accessorKey 
                          ? (item[column.accessorKey] as React.ReactNode) 
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
