import React from 'react'
import { ManufacturerTable, type ManufacturerData } from "@/components/ManufacturerTable"

// Sample data matching your image
const manufacturerSampleData: ManufacturerData[] = [
  {
    id: "1",
    code: "352818664021424",
    manufacturerCode: "111",
    description: "Quan trắc nước",
    status: "ACTIVE"
  },
  {
    id: "2", 
    code: "352818664021425",
    manufacturerCode: "222",
    description: "Quan trắc không khí",
    status: "ACTIVE"
  },
  {
    id: "3",
    code: "352818664021426",
    manufacturerCode: "333", 
    description: "Đo đếm điện tiêu thụ",
    status: "INACTIVE"
  },
  {
    id: "4",
    code: "352818664021427",
    manufacturerCode: "444",
    description: "Quan trắc nước thải",
    status: "ACTIVE"
  },
  {
    id: "5",
    code: "352818664021428",
    manufacturerCode: "555",
    description: "Dòng hồ nước",
    status: "INACTIVE"
  },
  {
    id: "6",
    code: "352818664021429",
    manufacturerCode: "666",
    description: "Quan trắc âm thanh",
    status: "ACTIVE"
  },
  {
    id: "7",
    code: "352818664021430",
    manufacturerCode: "777",
    description: "Quan trắc nhiệt độ",
    status: "ACTIVE"
  },
  {
    id: "8",
    code: "352818664021431", 
    manufacturerCode: "888",
    description: "Quan trắc độ ẩm",
    status: "INACTIVE"
  },
  {
    id: "9",
    code: "352818664021432",
    manufacturerCode: "999",
    description: "Quan trắc ánh sáng",
    status: "ACTIVE"
  },
  {
    id: "10",
    code: "352818664021433",
    manufacturerCode: "000",
    description: "Quan trắc tổng hợp",
    status: "ACTIVE"
  }
]

// Example component matching your image
export function ManufacturerExample() {
  const [manufacturers, setManufacturers] = React.useState(manufacturerSampleData)

  const handleView = (id: string) => {
    const item = manufacturers.find(m => m.id === id)
    alert(`Xem thông tin:\nMã code: ${item?.code}\nMô tả: ${item?.description}`)
  }

  const handleEdit = (id: string) => {
    const item = manufacturers.find(m => m.id === id)
    const newDescription = prompt(`Chỉnh sửa mô tả cho ${item?.code}:`, item?.description)
    
    if (newDescription && newDescription !== item?.description) {
      setManufacturers(prev => 
        prev.map(m => 
          m.id === id ? { ...m, description: newDescription } : m
        )
      )
    }
  }

  const handleDelete = (id: string) => {
    const item = manufacturers.find(m => m.id === id)
    if (confirm(`Bạn có chắc chắn muốn xóa "${item?.description}"?`)) {
      setManufacturers(prev => prev.filter(m => m.id !== id))
    }
  }

  const handleAdd = () => {
    const code = prompt('Nhập mã code:')
    const manufacturerCode = prompt('Nhập mã nhà sản xuất:')
    const description = prompt('Nhập mô tả:')
    
    if (code && manufacturerCode && description) {
      const newItem: ManufacturerData = {
        id: Date.now().toString(),
        code,
        manufacturerCode,
        description,
        status: 'ACTIVE'
      }
      
      setManufacturers(prev => [newItem, ...prev])
    }
  }

  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm)
    // In a real app, you might call an API here
  }

  return (
    <ManufacturerTable
      title="Danh sách nhà sản xuất"
      data={manufacturers}
      enableSearch={true}
      searchPlaceholder="Tìm kiếm theo mã code, nhà sản xuất hoặc mô tả..."
      noDataMessage="Không có dữ liệu nhà sản xuất."
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      onSearch={handleSearch}
    />
  )
}

// Example with loading state
export function ManufacturerWithLoading() {
  const [data, setData] = React.useState<ManufacturerData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setData(manufacturerSampleData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleView = (id: string) => {
    console.log('View:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit:', id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      setData(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <ManufacturerTable
      title="Danh sách nhà sản xuất (Loading)"
      data={data}
      loading={loading}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

// Example without add button
export function SimpleManufacturerTable() {
  const simpleData = manufacturerSampleData.slice(0, 5)

  return (
    <ManufacturerTable
      title="Bảng nhà sản xuất đơn giản"
      data={simpleData}
      enableSearch={false}
      onView={(id) => alert(`Xem ID: ${id}`)}
      onEdit={(id) => alert(`Sửa ID: ${id}`)}
      onDelete={(id) => alert(`Xóa ID: ${id}`)}
    />
  )
}

export default ManufacturerExample
