import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { X, Calendar } from "lucide-react"

interface CreateReportModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CreateReportFormData) => void
}

export interface CreateReportFormData {
    dateRange: string
    dataType: string
    category: string
    parameters: string[]
}

export function CreateReportModal({ isOpen, onClose, onSubmit }: CreateReportModalProps) {
    const [formData, setFormData] = React.useState<CreateReportFormData>({
        dateRange: "04/17/2021 - 04/24/2021",
        dataType: "Lịch sử",
        category: "Quan trắc nước",
        parameters: []
    })

    const handleParameterChange = (parameter: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            parameters: checked
                ? [...prev.parameters, parameter]
                : prev.parameters.filter(p => p !== parameter)
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        Tạo báo cáo mới
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Date Range */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm font-medium">
                                    1
                                </div>
                                <label className="text-sm font-medium text-gray-700">
                                    Ngày:
                                </label>
                            </div>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={formData.dateRange}
                                    onChange={(e) => setFormData(prev => ({ ...prev, dateRange: e.target.value }))}
                                    className="pl-4 pr-10"
                                    placeholder="04/17/2021 - 04/24/2021"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Step 2: Data Type */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm font-medium">
                                    2
                                </div>
                                <label className="text-sm font-medium text-gray-700">
                                    Loại dữ liệu
                                </label>
                            </div>
                            <select
                                value={formData.dataType}
                                onChange={(e) => setFormData(prev => ({ ...prev, dataType: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="Lịch sử">Lịch sử</option>
                                <option value="Thời gian thực">Thời gian thực</option>
                                <option value="Cảnh báo">Cảnh báo</option>
                                <option value="Thống kê">Thống kê</option>
                            </select>
                        </div>

                        {/* Step 3: Category */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm font-medium">
                                    3
                                </div>
                                <label className="text-sm font-medium text-gray-700">
                                    Phân hệ:
                                </label>
                            </div>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="Quan trắc nước">Quan trắc nước</option>
                                <option value="Quan trắc không khí">Quan trắc không khí</option>
                                <option value="Quan trắc nước thải">Quan trắc nước thải</option>
                                <option value="Dòng hồ nước">Dòng hồ nước</option>
                            </select>
                        </div>

                        {/* Step 4: Parameters */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm font-medium">
                                    4
                                </div>
                                <label className="text-sm font-medium text-gray-700">
                                    Chọn chỉ số cần xuất dữ liệu:
                                </label>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Row 1 */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="tat-ca"
                                        checked={formData.parameters.includes('Tất cả')}
                                        onCheckedChange={(checked) => handleParameterChange('Tất cả', checked as boolean)}
                                    />
                                    <label htmlFor="tat-ca" className="text-sm text-gray-700">
                                        Tất cả
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="cod"
                                        checked={formData.parameters.includes('COD')}
                                        onCheckedChange={(checked) => handleParameterChange('COD', checked as boolean)}
                                    />
                                    <label htmlFor="cod" className="text-sm text-gray-700">
                                        COD
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="bod5"
                                        checked={formData.parameters.includes('BOD5')}
                                        onCheckedChange={(checked) => handleParameterChange('BOD5', checked as boolean)}
                                    />
                                    <label htmlFor="bod5" className="text-sm text-gray-700">
                                        BOD5
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="dau-mo"
                                        checked={formData.parameters.includes('Dầu mỡ')}
                                        onCheckedChange={(checked) => handleParameterChange('Dầu mỡ', checked as boolean)}
                                    />
                                    <label htmlFor="dau-mo" className="text-sm text-gray-700">
                                        Dầu mỡ
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="po4"
                                        checked={formData.parameters.includes('PO4')}
                                        onCheckedChange={(checked) => handleParameterChange('PO4', checked as boolean)}
                                    />
                                    <label htmlFor="po4" className="text-sm text-gray-700">
                                        PO4
                                    </label>
                                </div>

                                {/* Row 2 */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="flow"
                                        checked={formData.parameters.includes('FLOW')}
                                        onCheckedChange={(checked) => handleParameterChange('FLOW', checked as boolean)}
                                    />
                                    <label htmlFor="flow" className="text-sm text-gray-700">
                                        FLOW
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="nitrat"
                                        checked={formData.parameters.includes('Nitrat')}
                                        onCheckedChange={(checked) => handleParameterChange('Nitrat', checked as boolean)}
                                    />
                                    <label htmlFor="nitrat" className="text-sm text-gray-700">
                                        Nitrat
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="h2s"
                                        checked={formData.parameters.includes('H2S')}
                                        onCheckedChange={(checked) => handleParameterChange('H2S', checked as boolean)}
                                    />
                                    <label htmlFor="h2s" className="text-sm text-gray-700">
                                        H2S
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="ph"
                                        checked={formData.parameters.includes('pH -')}
                                        onCheckedChange={(checked) => handleParameterChange('pH -', checked as boolean)}
                                    />
                                    <label htmlFor="ph" className="text-sm text-gray-700">
                                        pH -
                                    </label>
                                </div>

                                {/* Row 3 */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="tss"
                                        checked={formData.parameters.includes('TSS')}
                                        onCheckedChange={(checked) => handleParameterChange('TSS', checked as boolean)}
                                    />
                                    <label htmlFor="tss" className="text-sm text-gray-700">
                                        TSS
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="temp"
                                        checked={formData.parameters.includes('Temp')}
                                        onCheckedChange={(checked) => handleParameterChange('Temp', checked as boolean)}
                                    />
                                    <label htmlFor="temp" className="text-sm text-gray-700">
                                        Temp
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="amoni"
                                        checked={formData.parameters.includes('Amoni')}
                                        onCheckedChange={(checked) => handleParameterChange('Amoni', checked as boolean)}
                                    />
                                    <label htmlFor="amoni" className="text-sm text-gray-700">
                                        Amoni
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="do-dan"
                                        checked={formData.parameters.includes('Độ dẫn')}
                                        onCheckedChange={(checked) => handleParameterChange('Độ dẫn', checked as boolean)}
                                    />
                                    <label htmlFor="do-dan" className="text-sm text-gray-700">
                                        Độ dẫn
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t">
                            <Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                            >
                                Tạo
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
