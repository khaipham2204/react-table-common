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
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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

interface DynamicDataTableProps<TData, TValue> {
    title: string
    actionButtonText?: string
    onActionButtonClick?: () => void
    noDataMessage?: string
    enablePagination?: boolean
    enableSorting?: boolean
    enableFiltering?: boolean
    enableRowSelection?: boolean
    enableDateFilter?: boolean
    enableGlobalSearch?: boolean
    filterButtonText?: string
    searchPlaceholder?: string
    dateFilterPlaceholder?: string
    loading?: boolean
    fetchData: () => Promise<{ columns: ColumnDef<TData, TValue>[], data: TData[] }>
    onFilter?: (filters: { dateRange?: string, searchTerm?: string }) => void
}

export function DynamicDataTable<TData, TValue>({
    title,
    actionButtonText = "Action",
    onActionButtonClick,
    noDataMessage = "No data available.",
    enablePagination = true,
    enableSorting = true,
    enableFiltering = true,
    enableRowSelection = false,
    enableDateFilter = false,
    enableGlobalSearch = false,
    filterButtonText = "Lọc",
    searchPlaceholder = "Tìm kiếm",
    dateFilterPlaceholder = "06/24/2021 - 06/24/2021",
    loading: externalLoading = false,
    fetchData,
    onFilter,
}: DynamicDataTableProps<TData, TValue>) {
    const [columns, setColumns] = React.useState<ColumnDef<TData, TValue>[]>([])
    const [data, setData] = React.useState<TData[]>([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    
    // Filter states
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [dateRange, setDateRange] = React.useState("")

    const [sorting, setSorting] = React.useState<any[]>([])
    const [columnFilters, setColumnFilters] = React.useState<any[]>([])
    const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // Load data on component mount
    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchData()
            setColumns(result.columns)
            setData(result.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    const handleFilter = () => {
        if (onFilter) {
            onFilter({
                dateRange: dateRange || undefined,
                searchTerm: globalFilter || undefined
            })
        }
    }

    const table = useReactTable({
        data,
        columns,
        onSortingChange: enableSorting ? setSorting : undefined,
        onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
        onGlobalFilterChange: enableGlobalSearch ? setGlobalFilter : undefined,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        enableRowSelection: enableRowSelection,
        state: {
            sorting: enableSorting ? sorting : undefined,
            columnFilters: enableFiltering ? columnFilters : undefined,
            globalFilter: enableGlobalSearch ? globalFilter : undefined,
            columnVisibility,
            rowSelection: enableRowSelection ? rowSelection : undefined,
        },
    })

    const isLoading = loading || externalLoading

    return (
        <div className="w-full sm:p-4 md:p-6 bg-gray-50 min-h-screen">
            <Card className="overflow-hidden">
                <CardHeader className="px-0 sm:px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                    <div className="flex flex-col gap-4">
                        {/* Title and Action Button Row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                                {title}
                            </CardTitle>
                            <div className="flex gap-2">
                                {actionButtonText && (
                                    <Button
                                        variant="outline"
                                        className="border-red-200 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                                        onClick={onActionButtonClick}
                                        disabled={isLoading}
                                    >
                                        {actionButtonText}
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={loadData}
                                    disabled={isLoading}
                                    className="w-full sm:w-auto"
                                >
                                    {isLoading ? "Loading..." : "Refresh"}
                                </Button>
                            </div>
                        </div>

                        {/* Filters Row */}
                        {(enableDateFilter || enableGlobalSearch) && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    {enableDateFilter && (
                                        <>
                                            <Input
                                                placeholder={dateFilterPlaceholder}
                                                value={dateRange}
                                                onChange={(e) => setDateRange(e.target.value)}
                                                className="w-48"
                                            />
                                            <Button
                                                className="bg-red-500 hover:bg-red-600 text-white px-6"
                                                onClick={handleFilter}
                                            >
                                                {filterButtonText}
                                            </Button>
                                        </>
                                    )}
                                </div>

                                {enableGlobalSearch && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder={searchPlaceholder}
                                            value={globalFilter}
                                            onChange={(e) => setGlobalFilter(e.target.value)}
                                            className="w-64"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="">
                    {error && (
                        <div className="p-4 mb-4 text-red-600 bg-red-50 border border-red-200 rounded">
                            Error: {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="text-gray-500">Loading data...</div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-max">
                                <Table>
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                                                {enableRowSelection && (
                                                    <TableHead className="text-center border-gray-200 px-2 md:px-4 w-12">
                                                        <Checkbox
                                                            checked={table.getIsAllPageRowsSelected()}
                                                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                                            aria-label="Select all"
                                                        />
                                                    </TableHead>
                                                )}
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
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {enableRowSelection && (
                                                        <TableCell className="text-center py-2 md:py-3 px-2 md:px-4 w-12">
                                                            <Checkbox
                                                                checked={row.getIsSelected()}
                                                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                                                aria-label="Select row"
                                                            />
                                                        </TableCell>
                                                    )}
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
                                                    colSpan={(columns.length || 1) + (enableRowSelection ? 1 : 0)}
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
                    )}
                </CardContent>

                {enablePagination && !isLoading && data.length > 0 && (
                    <CardFooter className="flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t gap-3">
                        <div className="flex items-center space-x-1">
                            {/* Previous Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0 bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ‹
                            </Button>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {(() => {
                                    const currentPage = table.getState().pagination.pageIndex + 1
                                    const totalPages = table.getPageCount()
                                    const pages = []

                                    // Always show first page
                                    if (totalPages > 0) {
                                        pages.push(
                                            <Button
                                                key={1}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.setPageIndex(0)}
                                                className={`h-8 w-8 p-0 font-medium ${
                                                    currentPage === 1
                                                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                            >
                                                1
                                            </Button>
                                        )
                                    }

                                    // Show page 2 if exists and different from current selection
                                    if (totalPages > 1) {
                                        pages.push(
                                            <Button
                                                key={2}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.setPageIndex(1)}
                                                className={`h-8 w-8 p-0 font-medium ${
                                                    currentPage === 2
                                                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                            >
                                                2
                                            </Button>
                                        )
                                    }

                                    // Show ellipsis if there are more pages
                                    if (totalPages > 4) {
                                        pages.push(
                                            <span key="ellipsis" className="px-2 text-gray-500 font-medium">
                                                ...
                                            </span>
                                        )
                                    }

                                    // Show last two pages if total > 2
                                    if (totalPages > 2) {
                                        const secondLast = totalPages - 1
                                        const last = totalPages

                                        if (totalPages > 3) {
                                            pages.push(
                                                <Button
                                                    key={secondLast}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => table.setPageIndex(secondLast - 1)}
                                                    className={`h-8 w-8 p-0 font-medium ${
                                                        currentPage === secondLast
                                                            ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
                                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                                    }`}
                                                >
                                                    {secondLast}
                                                </Button>
                                            )
                                        }

                                        pages.push(
                                            <Button
                                                key={last}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.setPageIndex(last - 1)}
                                                className={`h-8 w-8 p-0 font-medium ${
                                                    currentPage === last
                                                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                            >
                                                {last}
                                            </Button>
                                        )
                                    }

                                    return pages
                                })()}
                            </div>

                            {/* Next Button */}
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
