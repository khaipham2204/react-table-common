import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title: string
    actionButtonText?: string
    onActionButtonClick?: () => void
    noDataMessage?: string
    enablePagination?: boolean
    enableSorting?: boolean
    enableFiltering?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    actionButtonText = "Action",
    onActionButtonClick,
    noDataMessage = "No data available.",
    enablePagination = true,
    enableSorting = true,
    enableFiltering = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<any[]>([])
    const [columnFilters, setColumnFilters] = React.useState<any[]>([])
    const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: enableSorting ? setSorting : undefined,
        onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting: enableSorting ? sorting : undefined,
            columnFilters: enableFiltering ? columnFilters : undefined,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full sm:p-4 md:p-6 bg-gray-50 min-h-screen">
            <Card className="overflow-hidden">
                <CardHeader className="px-0 sm:px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                            {title}
                        </CardTitle>
                        {actionButtonText && (
                            <Button
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                                onClick={onActionButtonClick}
                            >
                                {actionButtonText}
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <div className="min-w-max">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id} className="text-center border-gray-200 px-2 md:px-4">
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
                                                className="hover:bg-gray-50"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="text-center py-2 md:py-3 px-2 md:px-4 text-sm md:text-base">
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                {noDataMessage}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>

                {enablePagination && (
                    <CardFooter className="flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t gap-3">
                        {/* Pagination - Centered */}
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0 bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ‹
                            </Button>
                            <div className="flex items-center space-x-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-2 focus:ring-red-200 font-medium"
                                >
                                    1
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-200 font-medium"
                                >
                                    2
                                </Button>
                                <span className="px-2 text-gray-500 font-medium">...</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-200 font-medium"
                                >
                                    9
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-200 font-medium"
                                >
                                    10
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-8 w-8 p-0 bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ›
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
