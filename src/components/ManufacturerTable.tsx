import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react"

// Type for manufacturer data
export type ManufacturerData = {
    id: string
    code: string
    manufacturerCode: string
    description: string
    status: 'ACTIVE' | 'INACTIVE'
}

interface ManufacturerTableProps {
    title: string
    data: ManufacturerData[]
    loading?: boolean
    enableSearch?: boolean
    searchPlaceholder?: string
    noDataMessage?: string
    onView?: (id: string) => void
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
    onAdd?: () => void
    onSearch?: (searchTerm: string) => void
}

const getStatusColor = (status: 'ACTIVE' | 'INACTIVE') => {
    switch (status) {
        case 'ACTIVE':
            return 'text-green-600 bg-green-100 px-2 py-1 rounded text-sm font-medium'
        case 'INACTIVE':
            return 'text-gray-500 bg-gray-100 px-2 py-1 rounded text-sm font-medium'
        default:
            return 'text-gray-500 bg-gray-100 px-2 py-1 rounded text-sm font-medium'
    }
}

export function ManufacturerTable({
    title,
    data,
    loading = false,
    enableSearch = true,
    searchPlaceholder = "Tìm kiếm...",
    noDataMessage = "Không có dữ liệu.",
    onView,
    onEdit,
    onDelete,
    onAdd,
    onSearch,
}: ManufacturerTableProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    // Filter data based on search term
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data
        return data.filter(item => 
            item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.manufacturerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [data, searchTerm])

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page when searching
        onSearch?.(value)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) {
        return (
            <div className="w-full sm:p-4 md:p-6 bg-gray-50 min-h-screen">
                <Card className="overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-center h-32">
                            <div className="text-gray-500">Đang tải dữ liệu...</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full sm:p-4 md:p-6 bg-gray-50 min-h-screen">
            <Card className="overflow-hidden">
                <CardHeader className="px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col gap-4">
                        {/* Title and Add Button Row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                {title}
                            </h2>
                            {onAdd && (
                                <Button
                                    onClick={onAdd}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Thêm mới
                                </Button>
                            )}
                        </div>

                        {/* Search Row */}
                        {enableSearch && (
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder={searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    {currentData.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            {noDataMessage}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-medium text-red-600 w-[200px]">
                                            Mã code
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                        <TableHead className="font-medium text-red-600 w-[200px]">
                                            Mã nhà sản xuất
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                        <TableHead className="font-medium text-red-600">
                                            Mô tả
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                        <TableHead className="font-medium text-red-600 w-[120px]">
                                            Trạng thái
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                        <TableHead className="font-medium text-gray-700 w-[120px] text-center">
                                            Thao tác
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentData.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-gray-50">
                                            <TableCell className="font-mono text-sm">
                                                {item.code}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.manufacturerCode}
                                            </TableCell>
                                            <TableCell>
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                <span className={getStatusColor(item.status)}>
                                                    {item.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-1">
                                                    {onView && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onView(item.id)}
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {onEdit && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onEdit(item.id)}
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {onDelete && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onDelete(item.id)}
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>

                {/* Pagination */}
                {totalPages > 1 && (
                    <CardFooter className="flex items-center justify-center px-4 md:px-6 py-4 bg-gray-50 border-t">
                        <div className="flex items-center space-x-1">
                            {/* Previous Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="h-8 w-8 p-0 bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ‹
                            </Button>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {(() => {
                                    const pages = []
                                    
                                    // Always show first page
                                    if (totalPages > 0) {
                                        pages.push(
                                            <Button
                                                key={1}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(1)}
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

                                    // Show page 2 if exists
                                    if (totalPages > 1) {
                                        pages.push(
                                            <Button
                                                key={2}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(2)}
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

                                    // Show last pages if total > 2
                                    if (totalPages > 2) {
                                        // Show second last page if total > 3
                                        if (totalPages > 3) {
                                            const secondLast = totalPages - 1
                                            pages.push(
                                                <Button
                                                    key={secondLast}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(secondLast)}
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

                                        // Always show last page
                                        const last = totalPages
                                        pages.push(
                                            <Button
                                                key={last}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(last)}
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
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
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
