import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Calendar, FileText, Droplets, Wind, Factory, Plus } from "lucide-react"
import { CreateReportModal, type CreateReportFormData } from "@/components/CreateReportModal"

// Type for report card data
export type ReportCardData = {
    id: string
    title: string
    type: 'water' | 'air' | 'wastewater' | 'flow'
    dateRange: string
    time: string
    categories: Array<{
        name: string
        color: 'green' | 'red' | 'blue' | 'yellow'
    }>
    status?: 'active' | 'inactive' | 'warning'
}

interface ReportCardListProps {
    title: string
    data: ReportCardData[]
    loading?: boolean
    enableSearch?: boolean
    enableDateFilter?: boolean
    searchPlaceholder?: string
    dateFilterPlaceholder?: string
    filterButtonText?: string
    noDataMessage?: string
    onView?: (id: string) => void
    onDelete?: (id: string) => void
    onFilter?: (filters: { dateRange?: string, searchTerm?: string }) => void
    onCreateReport?: (data: CreateReportFormData) => void
}

const getIconForType = (type: ReportCardData['type']) => {
    switch (type) {
        case 'water':
            return <Droplets className="h-5 w-5" />
        case 'air':
            return <Wind className="h-5 w-5" />
        case 'wastewater':
            return <Factory className="h-5 w-5" />
        case 'flow':
            return <FileText className="h-5 w-5" />
        default:
            return <FileText className="h-5 w-5" />
    }
}

const getBackgroundColorForType = (type: ReportCardData['type']) => {
    switch (type) {
        case 'water':
            return 'bg-blue-100 text-blue-600'
        case 'air':
            return 'bg-green-100 text-green-600'
        case 'wastewater':
            return 'bg-red-100 text-red-600'
        case 'flow':
            return 'bg-purple-100 text-purple-600'
        default:
            return 'bg-gray-100 text-gray-600'
    }
}

const getCategoryColor = (color: string) => {
    switch (color) {
        case 'green':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'red':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'blue':
            return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'yellow':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

export function ReportCardList({
    title,
    data,
    loading = false,
    enableSearch = false,
    enableDateFilter = false,
    searchPlaceholder = "Tìm kiếm báo cáo...",
    dateFilterPlaceholder = "07/11/2024 - 09/11/2024",
    filterButtonText = "Lọc",
    noDataMessage = "Không có báo cáo nào.",
    onView,
    onDelete,
    onFilter,
    onCreateReport,
}: ReportCardListProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [dateRange, setDateRange] = React.useState("")
    const [currentPage, setCurrentPage] = React.useState(1)
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
    const itemsPerPage = 6

    // Filter data based on search term
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data
        return data.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.categories.some(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    }, [data, searchTerm])

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    const handleFilter = () => {
        if (onFilter) {
            onFilter({
                dateRange: dateRange || undefined,
                searchTerm: searchTerm || undefined
            })
        }
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
                            <div className="text-gray-500">Đang tải báo cáo...</div>
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
                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                {title}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tạo mới
                                </Button>
                                <Button variant="outline" size="sm" className="p-2">
                                    <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="p-2">
                                    <Calendar className="h-4 w-4" />
                                </Button>
                                <Button className="bg-red-500 hover:bg-red-600 text-white">
                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        {/* Filters Row */}
                        {(enableDateFilter || enableSearch) && (
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

                                {enableSearch && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder={searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-64"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-4 md:p-6">
                    {currentData.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            {noDataMessage}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {currentData.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    {/* Icon */}
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getBackgroundColorForType(item.type)}`}>
                                        {getIconForType(item.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            {item.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {item.dateRange}
                                            </span>
                                            <span>{item.time}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {item.categories.map((category, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(category.color)}`}
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onView?.(item.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Xem
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDelete?.(item.id)}
                                            className="text-red-600 hover:text-red-900 border-red-200 hover:border-red-300"
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))}
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

            {/* Create Report Modal */}
            <CreateReportModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={(data) => {
                    onCreateReport?.(data)
                    setIsCreateModalOpen(false)
                }}
            />
        </div>
    )
}
