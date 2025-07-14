import { DynamicDataTable } from "@/components/DynamicDataTable"
import { createDynamicColumns } from "@/utils/dynamicColumns"

// Type for the monitoring data shown in the image
type MonitoringData = {
  id: string
  phanHe: string  // Phần hệ
  tieuDe: string  // Tiêu đề  
  chiTiet: string // Chi tiết
  khuVuc: string  // Khu vực
  ngay: string    // Ngày
}

// Example component that matches the table in your image
export function MonitoringTable() {
  const fetchMonitoringData = async () => {
    try {
      // Simulate API call with data matching your image
      const mockData: MonitoringData[] = [
        {
          id: "1",
          phanHe: "QUAN TRẮC NƯỚC",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "2", 
          phanHe: "QUAN TRẮC NƯỚC",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "3",
          phanHe: "QUAN TRẮC NƯỚC", 
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "4",
          phanHe: "QUAN TRẮC NƯỚC",
          tieuDe: "Nồng độ CO2 cao", 
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "5",
          phanHe: "QUAN TRẮC KHÔNG KHÍ",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải", 
          ngay: "11/12/2024"
        },
        {
          id: "6",
          phanHe: "QUAN TRẮC KHÔNG KHÍ",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "7",
          phanHe: "QUAN TRẮC KHÔNG KHÍ",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "8",
          phanHe: "QUAN TRẮC KHÔNG KHÍ",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.", 
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "9",
          phanHe: "QUAN TRẮC KHÔNG KHÍ",
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        },
        {
          id: "10",
          phanHe: "QUAN TRẮC KHÔNG KHÍ", 
          tieuDe: "Nồng độ CO2 cao",
          chiTiet: "Nồng độ CO2 vượt ngưỡng 1000ppm.",
          khuVuc: "Nhà máy xử lý nước thải",
          ngay: "11/12/2024"
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create columns without the checkbox column (it will be added automatically)
      const columns = createDynamicColumns(mockData, {
        phanHe: { 
          header: 'Phần hệ',
          sortable: true,
          className: 'text-left font-medium'
        },
        tieuDe: { 
          header: 'Tiêu đề', 
          sortable: true,
          className: 'text-left'
        },
        chiTiet: { 
          header: 'Chi tiết', 
          sortable: true,
          className: 'text-left'
        },
        khuVuc: { 
          header: 'Khu vực', 
          sortable: true,
          className: 'text-left'
        },
        ngay: { 
          header: 'Ngày', 
          sortable: true,
          formatter: (value) => {
            // Format date if needed
            return value
          }
        }
      })

      return { columns, data: mockData }
    } catch (error) {
      throw new Error('Không thể tải dữ liệu quan trắc')
    }
  }

  const handleFilter = (filters: { dateRange?: string, searchTerm?: string }) => {
    console.log('Filtering with:', filters)
    // Implement your filter logic here
    // You might want to refetch data with filters applied
  }

  const handleExport = () => {
    console.log('Exporting monitoring data')
    // Implement export functionality
  }

  return (
    <DynamicDataTable
      title="Dữ liệu quan trắc môi trường"
      actionButtonText="Xuất báo cáo" 
      onActionButtonClick={handleExport}
      noDataMessage="Không có dữ liệu quan trắc."
      enablePagination={true}
      enableSorting={true}
      enableFiltering={true}
      enableRowSelection={true}
      enableDateFilter={true}
      enableGlobalSearch={true}
      filterButtonText="Lọc"
      searchPlaceholder="Tìm kiếm"
      dateFilterPlaceholder="06/24/2021 - 06/24/2021"
      fetchData={fetchMonitoringData}
      onFilter={handleFilter}
    />
  )
}

// Example with different configuration  
export function SimpleMonitoringTable() {
  const fetchData = async () => {
    // Reuse the same data but with simpler configuration
    const mockData = [
      {
        device: "Sensor 001",
        location: "Khu vực A", 
        status: "Hoạt động",
        lastUpdate: "11/12/2024 10:30"
      },
      {
        device: "Sensor 002",
        location: "Khu vực B",
        status: "Lỗi", 
        lastUpdate: "11/12/2024 09:15"
      }
    ]

    const columns = createDynamicColumns(mockData, {
      device: { header: 'Thiết bị' },
      location: { header: 'Vị trí' },
      status: { 
        header: 'Trạng thái',
        formatter: (value) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Hoạt động' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
      lastUpdate: { header: 'Cập nhật cuối' }
    })

    return { columns, data: mockData }
  }

  return (
    <DynamicDataTable
      title="Trạng thái thiết bị"
      enableRowSelection={false}
      enableDateFilter={false}
      enableGlobalSearch={true}
      searchPlaceholder="Tìm kiếm thiết bị..."
      fetchData={fetchData}
    />
  )
}
