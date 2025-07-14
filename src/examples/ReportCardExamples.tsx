import React from 'react'
import { ReportCardList, type ReportCardData } from "@/components/ReportCardList"
import { type CreateReportFormData } from "@/components/CreateReportModal"

// Sample data matching your image
const reportSampleData: ReportCardData[] = [
  {
    id: "1",
    title: "Báo cáo: Lịch sử chỉ số nước ngầm",
    type: "water",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc nước", color: "blue" }
    ]
  },
  {
    id: "2", 
    title: "Báo cáo: Lịch sử chỉ số không khí",
    type: "air",
    dateRange: "07/11/2024 - 09/11/2024", 
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc không khí", color: "red" },
      { name: "Tự động", color: "yellow" }
    ]
  },
  {
    id: "3",
    title: "Báo cáo: Lịch sử chỉ số nước thải", 
    type: "wastewater",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc nước", color: "blue" }
    ]
  },
  {
    id: "4",
    title: "Báo cáo: Thống kê số lượng cảnh báo dòng hồ nước",
    type: "flow", 
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Cảnh báo", color: "red" },
      { name: "Dòng hồ nước", color: "blue" }
    ]
  },
  {
    id: "5",
    title: "Báo cáo: Lịch sử chỉ số nước ngầm",
    type: "water",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025", 
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc nước", color: "blue" }
    ]
  },
  {
    id: "6",
    title: "Báo cáo: Lịch sử chỉ số không khí",
    type: "air",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc không khí", color: "red" },
      { name: "Tự động", color: "yellow" }
    ]
  },
  {
    id: "7",
    title: "Báo cáo: Lịch sử chỉ số nước thải",
    type: "wastewater", 
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc nước", color: "blue" }
    ]
  },
  {
    id: "8",
    title: "Báo cáo: Thống kê số lượng cảnh báo dòng hồ nước",
    type: "flow",
    dateRange: "07/11/2024 - 09/11/2024", 
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Cảnh báo", color: "red" },
      { name: "Dòng hồ nước", color: "blue" }
    ]
  },
  {
    id: "9",
    title: "Báo cáo: Lịch sử chỉ số nước ngầm",
    type: "water",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc nước", color: "blue" }
    ]
  },
  {
    id: "10",
    title: "Báo cáo: Lịch sử chỉ số không khí", 
    type: "air",
    dateRange: "07/11/2024 - 09/11/2024",
    time: "15:47:59 04-08-2025",
    categories: [
      { name: "Lịch sử", color: "green" },
      { name: "Quan trắc không khí", color: "red" },
      { name: "Tự động", color: "yellow" }
    ]
  }
]

// Example component matching your image
export function EnvironmentalReports() {
  const [reports, setReports] = React.useState(reportSampleData)

  const handleView = (id: string) => {
    console.log('Viewing report:', id)
    // Navigate to report detail or open modal
  }

  const handleDelete = (id: string) => {
    console.log('Deleting report:', id)
    setReports(prev => prev.filter(report => report.id !== id))
  }

  const handleFilter = (filters: { dateRange?: string, searchTerm?: string }) => {
    console.log('Filtering reports:', filters)
    // Apply filters and reload data
  }

  const handleCreateReport = (data: CreateReportFormData) => {
    console.log('Creating new report:', data)
    
    // Generate new report from form data
    const newReport: ReportCardData = {
      id: `new-${Date.now()}`,
      title: `Báo cáo: ${data.dataType} ${data.category.toLowerCase()}`,
      type: data.category.includes('nước') ? 'water' : 
            data.category.includes('khí') ? 'air' : 
            data.category.includes('thải') ? 'wastewater' : 'flow',
      dateRange: data.dateRange,
      time: new Date().toLocaleString('vi-VN'),
      categories: [
        { name: data.dataType, color: 'green' as const },
        { name: data.category, color: 'blue' as const },
        ...(data.parameters.length > 0 ? [{ name: `${data.parameters.length} chỉ số`, color: 'yellow' as const }] : [])
      ]
    }

    setReports(prev => [newReport, ...prev])
    alert('Đã tạo báo cáo mới thành công!')
  }

  return (
    <ReportCardList
      title="Danh sách báo cáo môi trường"
      data={reports}
      enableSearch={true}
      enableDateFilter={true}
      searchPlaceholder="Tìm kiếm báo cáo..."
      dateFilterPlaceholder="07/11/2024 - 09/11/2024"
      filterButtonText="Lọc"
      noDataMessage="Không có báo cáo nào."
      onView={handleView}
      onDelete={handleDelete}
      onFilter={handleFilter}
      onCreateReport={handleCreateReport}
    />
  )
}

// Example with dynamic data fetch
export function DynamicReports() {
  const [data, setData] = React.useState<ReportCardData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate API call
    const fetchReports = async () => {
      try {
        setLoading(true)
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulate API response
        const apiData = reportSampleData.map(item => ({
          ...item,
          id: `api-${item.id}`,
          time: new Date().toLocaleString('vi-VN')
        }))
        
        setData(apiData)
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const handleView = (id: string) => {
    alert(`Viewing report: ${id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa báo cáo này?')) {
      setData(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleCreateReport = (formData: CreateReportFormData) => {
    const newReport: ReportCardData = {
      id: `dynamic-${Date.now()}`,
      title: `Báo cáo: ${formData.dataType} ${formData.category.toLowerCase()}`,
      type: formData.category.includes('nước') ? 'water' : 
            formData.category.includes('khí') ? 'air' : 
            formData.category.includes('thải') ? 'wastewater' : 'flow',
      dateRange: formData.dateRange,
      time: new Date().toLocaleString('vi-VN'),
      categories: [
        { name: formData.dataType, color: 'green' as const },
        { name: formData.category, color: 'blue' as const },
      ]
    }

    setData(prev => [newReport, ...prev])
    alert('Đã tạo báo cáo mới từ API!')
  }

  return (
    <ReportCardList
      title="Báo cáo động (API)"
      data={data}
      loading={loading}
      enableSearch={true}
      enableDateFilter={true}
      onView={handleView}
      onDelete={handleDelete}
      onCreateReport={handleCreateReport}
    />
  )
}

// Example with different configuration
export function SimpleReports() {
  const [simpleData, setSimpleData] = React.useState<ReportCardData[]>([
    {
      id: "simple-1",
      title: "Báo cáo hàng tuần",
      type: "water",
      dateRange: "01/01/2024 - 07/01/2024", 
      time: "08:00:00 08-01-2024",
      categories: [
        { name: "Tuần", color: "blue" }
      ]
    },
    {
      id: "simple-2",
      title: "Báo cáo hàng tháng",
      type: "air", 
      dateRange: "01/01/2024 - 31/01/2024",
      time: "08:00:00 01-02-2024",
      categories: [
        { name: "Tháng", color: "green" }
      ]
    }
  ])

  const handleCreateSimpleReport = (formData: CreateReportFormData) => {
    const newReport: ReportCardData = {
      id: `simple-${Date.now()}`,
      title: `Báo cáo đơn giản: ${formData.dataType}`,
      type: 'water',
      dateRange: formData.dateRange,
      time: new Date().toLocaleString('vi-VN'),
      categories: [
        { name: formData.dataType, color: 'green' as const }
      ]
    }

    setSimpleData(prev => [newReport, ...prev])
    alert('Đã tạo báo cáo đơn giản!')
  }

  return (
    <ReportCardList
      title="Báo cáo đơn giản"
      data={simpleData}
      enableSearch={false}
      enableDateFilter={false}
      onView={(id) => console.log('Simple view:', id)}
      onDelete={(id) => setSimpleData(prev => prev.filter(item => item.id !== id))}
      onCreateReport={handleCreateSimpleReport}
    />
  )
}

export default EnvironmentalReports
