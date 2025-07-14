import { DynamicDataTable } from "@/components/DynamicDataTable"
import { createDynamicColumns } from "@/utils/dynamicColumns"

// Example: Dynamic table for any API endpoint
export function ApiDataTable() {
  // Function to fetch data from your API
  const fetchWaterFlowData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/water-flow-data')
      const apiResponse = await response.json()
      
      // Handle different API response formats
      let data = []
      
      if (Array.isArray(apiResponse)) {
        // Simple array format
        data = apiResponse
      } else if (apiResponse.data) {
        // Nested format: { data: [...], meta: {...} }
        data = apiResponse.data
      } else if (apiResponse.results) {
        // Alternative nested format
        data = apiResponse.results
      }
      
      if (data.length === 0) {
        return { columns: [], data: [] }
      }
      
      // Create dynamic columns based on the data structure
      const columns = createDynamicColumns(data, {
        // Customize specific columns
        date: { 
          header: 'Ngày', 
          sortable: true,
          formatter: (value) => new Date(value).toLocaleDateString('vi-VN')
        },
        waterStation: { 
          header: 'Thủy đài', 
          sortable: true,
          formatter: (value) => `${value} m³`
        },
        waterSupplyStation: { 
          header: 'Trạm nước cấp', 
          sortable: true 
        },
        flow_rate: {
          header: 'Lưu lượng',
          sortable: true,
          formatter: (value) => `${value} L/s`
        },
        status: {
          header: 'Trạng thái',
          sortable: true,
          formatter: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              value === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {value === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
            </span>
          )
        }
      })
      
      return { columns, data }
    } catch (error) {
      console.error('Failed to fetch water flow data:', error)
      throw new Error('Không thể tải dữ liệu từ server')
    }
  }

  const handleExport = () => {
    console.log('Export data')
    // Implement export functionality
  }

  return (
    <DynamicDataTable
      title="Lịch sử lưu lượng dòng hồ nước (Dynamic)"
      actionButtonText="Tải xuống ↓"
      onActionButtonClick={handleExport}
      noDataMessage="Không có dữ liệu."
      fetchData={fetchWaterFlowData}
      enablePagination={true}
      enableSorting={true}
      enableFiltering={true}
    />
  )
}

// Example: Different API structure
export function SensorDataTable() {
  const fetchSensorData = async () => {
    try {
      // Mock API that returns different structure
      const mockApiResponse = {
        success: true,
        data: [
          {
            sensor_id: 'SENSOR_001',
            location: 'Building A',
            temperature: 25.5,
            humidity: 60,
            timestamp: '2024-07-13T10:30:00Z',
            battery_level: 85,
            signal_strength: 'Strong'
          },
          {
            sensor_id: 'SENSOR_002', 
            location: 'Building B',
            temperature: 23.8,
            humidity: 55,
            timestamp: '2024-07-13T10:35:00Z',
            battery_level: 92,
            signal_strength: 'Medium'
          }
        ],
        meta: {
          total: 2,
          page: 1,
          per_page: 10
        }
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const data = mockApiResponse.data
      
      const columns = createDynamicColumns(data, {
        sensor_id: { header: 'Sensor ID', sortable: true },
        location: { header: 'Vị trí', sortable: true },
        temperature: { 
          header: 'Nhiệt độ', 
          sortable: true,
          formatter: (value) => `${value}°C`
        },
        humidity: { 
          header: 'Độ ẩm', 
          sortable: true,
          formatter: (value) => `${value}%`
        },
        timestamp: { 
          header: 'Thời gian', 
          sortable: true,
          formatter: (value) => new Date(value).toLocaleString('vi-VN')
        },
        battery_level: { 
          header: 'Pin', 
          sortable: true,
          formatter: (value) => `${value}%`
        },
        signal_strength: { 
          header: 'Tín hiệu', 
          sortable: true,
          formatter: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              value === 'Strong' ? 'bg-green-100 text-green-800' :
              value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {value === 'Strong' ? 'Mạnh' : 
               value === 'Medium' ? 'Trung bình' : 'Yếu'}
            </span>
          )
        }
      })
      
      return { columns, data }
    } catch (error) {
      throw new Error('Không thể tải dữ liệu cảm biến')
    }
  }

  return (
    <DynamicDataTable
      title="Dữ liệu cảm biến thời gian thực"
      actionButtonText="Xuất báo cáo"
      onActionButtonClick={() => console.log('Export sensor data')}
      noDataMessage="Không có dữ liệu cảm biến."
      fetchData={fetchSensorData}
    />
  )
}

// Example: Completely unknown structure
export function GenericApiTable({ apiEndpoint, title }: { apiEndpoint: string, title: string }) {
  const fetchGenericData = async () => {
    try {
      const response = await fetch(apiEndpoint)
      const data = await response.json()
      
      // Handle completely unknown structure
      let processedData = []
      
      if (Array.isArray(data)) {
        processedData = data
      } else if (data.data) {
        processedData = data.data
      } else if (data.items) {
        processedData = data.items
      } else {
        // If it's an object, wrap it in an array
        processedData = [data]
      }
      
      if (processedData.length === 0) {
        return { columns: [], data: [] }
      }
      
      // Generate completely dynamic columns without any pre-configuration
      const columns = createDynamicColumns(processedData)
      
      return { columns, data: processedData }
    } catch (error) {
      throw new Error(`Không thể tải dữ liệu từ ${apiEndpoint}`)
    }
  }

  return (
    <DynamicDataTable
      title={title}
      noDataMessage="Không có dữ liệu."
      fetchData={fetchGenericData}
    />
  )
}
