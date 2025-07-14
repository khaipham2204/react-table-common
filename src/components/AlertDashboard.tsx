import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, TrendingUp, TrendingDown, ChevronUp, ChevronDown } from "lucide-react"

// Types for dashboard data
type AlertSummary = {
    totalAlerts: number
    alertChange: number
    alertTrend: 'up' | 'down'
    thresholdExceeded: number
    totalParameters: number
}

type ParameterData = {
    name: string
    value: number
    percentage: number
    color: 'red' | 'orange' | 'yellow' | 'green'
}

// Sample data matching your image
const alertData: AlertSummary = {
    totalAlerts: 50,
    alertChange: 2,
    alertTrend: 'up',
    thresholdExceeded: 7,
    totalParameters: 11
}

const parametersData: ParameterData[] = [
    { name: 'COD', value: 18, percentage: 36.0, color: 'red' },
    { name: 'BOD5', value: 11, percentage: 22.0, color: 'red' },
    { name: 'PO4', value: 8, percentage: 16.0, color: 'red' },
    { name: 'FLOW', value: 8, percentage: 16.0, color: 'red' },
    { name: 'pH-', value: 4, percentage: 8.0, color: 'red' }
]

export function AlertDashboard() {
    const getParameterBarColor = (color: ParameterData['color']) => {
        switch (color) {
            case 'red':
                return 'bg-red-500'
            case 'orange':
                return 'bg-orange-500'
            case 'yellow':
                return 'bg-yellow-500'
            case 'green':
                return 'bg-green-500'
            default:
                return 'bg-gray-400'
        }
    }

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Thống kê cảnh báo theo chỉ số
                    </h1>
                </div>

                {/* Alert Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Total Alerts Card */}
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <AlertTriangle className="h-8 w-8 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            Tổng cảnh báo
                                        </p>
                                        <p className="text-3xl font-bold text-red-600">
                                            {alertData.totalAlerts}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1 text-red-600">
                                    {alertData.alertTrend === 'up' ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {alertData.alertChange}%
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Threshold Exceeded Card */}
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <AlertCircle className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            Chỉ số vượt ngưỡng
                                        </p>
                                        <p className="text-3xl font-bold text-orange-600">
                                            {alertData.thresholdExceeded}/{alertData.totalParameters}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Parameters Chart */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Thống kê chi tiết theo tham số
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                                <ChevronUp className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                <ChevronDown className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {parametersData.map((param, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {param.name}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            {param.value}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({param.percentage}%)
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full ${getParameterBarColor(param.color)}`}
                                            style={{ width: `${param.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Scroll indicator */}
                        <div className="flex justify-center mt-6">
                            <div className="flex flex-col items-center space-y-1">
                                <div className="w-1 h-12 bg-gray-300 rounded-full relative">
                                    <div className="w-1 h-4 bg-gray-600 rounded-full absolute top-0" />
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-blue-200">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                            <p className="text-sm text-gray-600">Tỷ lệ cảnh báo đã xử lý</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-green-200">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">24h</div>
                            <p className="text-sm text-gray-600">Thời gian phản hồi trung bình</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
                            <p className="text-sm text-gray-600">Trạm quan trắc đang hoạt động</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Alternative compact version
export function CompactAlertDashboard() {
    return (
        <div className="w-full p-4 space-y-4">
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Thống kê cảnh báo theo chỉ số
            </h2>

            {/* Compact Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                        <p className="text-sm text-gray-600">Tổng cảnh báo</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-red-600">50</span>
                            <span className="text-sm text-red-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                2%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-orange-600 mr-3" />
                    <div>
                        <p className="text-sm text-gray-600">Chỉ số vượt ngưỡng</p>
                        <span className="text-2xl font-bold text-orange-600">7/11</span>
                    </div>
                </div>
            </div>

            {/* Compact Parameters List */}
            <Card>
                <CardContent className="p-4 space-y-3">
                    {parametersData.map((param, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 w-12">
                                    {param.name}
                                </span>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${getParameterBarColor(param.color)}`}
                                        style={{ width: `${param.percentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="font-bold text-gray-900">{param.value}</span>
                                <span className="text-gray-500">({param.percentage}%)</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

// Helper function for parameter colors
function getParameterBarColor(color: ParameterData['color']) {
    switch (color) {
        case 'red':
            return 'bg-red-500'
        case 'orange':
            return 'bg-orange-500'
        case 'yellow':
            return 'bg-yellow-500'
        case 'green':
            return 'bg-green-500'
        default:
            return 'bg-gray-400'
    }
}

export default AlertDashboard
