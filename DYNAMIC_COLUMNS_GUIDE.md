# Dynamic DataTable Guide

## Overview

This guide explains how to handle **dynamic columns** when fetching data from APIs. The solution includes utilities and components that automatically generate table columns based on API responses.

## 🎯 Key Features

- ✅ **Auto-generate columns** from API response
- ✅ **Flexible API formats** support
- ✅ **Custom column formatting**
- ✅ **Loading states** and error handling
- ✅ **Refresh functionality**
- ✅ **TypeScript support** with generics

## 📁 File Structure

```
src/
├── components/
│   ├── DataTable.tsx              # Static table component
│   └── DynamicDataTable.tsx       # 🆕 Dynamic API-driven table
├── utils/
│   └── dynamicColumns.tsx         # 🆕 Column generation utilities
├── examples/
│   ├── DataTableExamples.tsx      # Static examples
│   └── DynamicDataTableExamples.tsx # 🆕 Dynamic examples
├── data/
│   └── waterFlowData.tsx          # Static data
└── AppWithDynamic.tsx             # 🆕 Demo with tabs
```

## 🚀 Quick Start

### 1. Basic Dynamic Table

```tsx
import { DynamicDataTable } from "@/components/DynamicDataTable"

function MyDynamicTable() {
  const fetchData = async () => {
    const response = await fetch('/api/my-data')
    const data = await response.json()
    
    // Auto-generate columns from data
    const columns = createDynamicColumns(data)
    return { columns, data }
  }

  return (
    <DynamicDataTable
      title="My Dynamic Table"
      fetchData={fetchData}
    />
  )
}
```

### 2. With Custom Column Configuration

```tsx
const fetchData = async () => {
  const response = await fetch('/api/water-data')
  const data = await response.json()
  
  const columns = createDynamicColumns(data, {
    // Customize specific columns
    date: { 
      header: 'Ngày', 
      formatter: (value) => new Date(value).toLocaleDateString('vi-VN')
    },
    flow_rate: {
      header: 'Lưu lượng',
      formatter: (value) => `${value} L/s`
    },
    status: {
      header: 'Trạng thái',
      formatter: (value) => (
        <span className={`badge ${value === 'active' ? 'green' : 'red'}`}>
          {value === 'active' ? 'Hoạt động' : 'Ngừng'}
        </span>
      )
    }
  })
  
  return { columns, data }
}
```

## 📊 Supported API Formats

### Format 1: Simple Array
```json
[
  { "id": 1, "name": "Item 1", "value": 100 },
  { "id": 2, "name": "Item 2", "value": 200 }
]
```

### Format 2: Nested Data
```json
{
  "data": [
    { "id": 1, "name": "Item 1", "value": 100 }
  ],
  "meta": { "total": 1, "page": 1 }
}
```

### Format 3: Alternative Nesting
```json
{
  "results": [...],
  "count": 10,
  "next": "url"
}
```

### Format 4: Custom Structure
```json
{
  "success": true,
  "items": [...],
  "pagination": {...}
}
```

## 🛠️ Column Configuration Options

```tsx
const columnConfig = {
  columnKey: {
    header: string,              // Display name
    sortable: boolean,           // Enable sorting (default: true)
    formatter: (value) => React.ReactNode, // Custom renderer
    className: string            // CSS classes
  }
}
```

### Examples:

```tsx
{
  // Date formatting
  created_at: {
    header: 'Ngày tạo',
    formatter: (value) => new Date(value).toLocaleDateString('vi-VN')
  },
  
  // Currency formatting
  price: {
    header: 'Giá',
    formatter: (value) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value)
  },
  
  // Status badges
  status: {
    header: 'Trạng thái',
    formatter: (value) => (
      <span className={`px-2 py-1 rounded text-xs ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    )
  },
  
  // Percentage
  completion: {
    header: 'Hoàn thành',
    formatter: (value) => `${Math.round(value * 100)}%`
  },
  
  // Image/Avatar
  avatar: {
    header: 'Ảnh',
    sortable: false,
    formatter: (value) => (
      <img src={value} alt="Avatar" className="w-8 h-8 rounded-full" />
    )
  }
}
```

## 🔄 Real-World Examples

### Example 1: E-commerce Products

```tsx
const fetchProducts = async () => {
  const response = await fetch('/api/products')
  const data = await response.json()
  
  const columns = createDynamicColumns(data.products, {
    name: { header: 'Tên sản phẩm' },
    price: { 
      header: 'Giá',
      formatter: (value) => `${value.toLocaleString('vi-VN')} ₫`
    },
    stock: { 
      header: 'Kho',
      formatter: (value) => value > 0 ? `${value} sản phẩm` : 'Hết hàng'
    },
    category: { header: 'Danh mục' },
    rating: {
      header: 'Đánh giá',
      formatter: (value) => '⭐'.repeat(Math.round(value))
    }
  })
  
  return { columns, data: data.products }
}
```

### Example 2: User Management

```tsx
const fetchUsers = async () => {
  const response = await fetch('/api/users')
  const users = await response.json()
  
  const columns = createDynamicColumns(users, {
    avatar_url: {
      header: 'Avatar',
      sortable: false,
      formatter: (url) => (
        <img src={url} alt="Avatar" className="w-10 h-10 rounded-full mx-auto" />
      )
    },
    full_name: { header: 'Họ tên' },
    email: { header: 'Email' },
    role: {
      header: 'Vai trò',
      formatter: (role) => (
        <span className={`px-2 py-1 rounded text-xs ${
          role === 'admin' ? 'bg-purple-100 text-purple-800' :
          role === 'editor' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {role}
        </span>
      )
    },
    last_login: {
      header: 'Lần đăng nhập cuối',
      formatter: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa từng'
    },
    is_active: {
      header: 'Trạng thái',
      formatter: (active) => (
        <span className={`px-2 py-1 rounded text-xs ${
          active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {active ? 'Hoạt động' : 'Vô hiệu hóa'}
        </span>
      )
    }
  })
  
  return { columns, data: users }
}
```

### Example 3: Financial Data

```tsx
const fetchTransactions = async () => {
  const response = await fetch('/api/transactions')
  const data = await response.json()
  
  const columns = createDynamicColumns(data, {
    transaction_id: { header: 'Mã GD' },
    amount: {
      header: 'Số tiền',
      formatter: (amount) => (
        <span className={amount >= 0 ? 'text-green-600' : 'text-red-600'}>
          {amount >= 0 ? '+' : ''}{amount.toLocaleString('vi-VN')} ₫
        </span>
      )
    },
    type: {
      header: 'Loại',
      formatter: (type) => ({
        'deposit': 'Nạp tiền',
        'withdrawal': 'Rút tiền',
        'transfer': 'Chuyển khoản',
        'payment': 'Thanh toán'
      }[type] || type)
    },
    created_at: {
      header: 'Thời gian',
      formatter: (date) => new Date(date).toLocaleString('vi-VN')
    },
    status: {
      header: 'Trạng thái',
      formatter: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'completed' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {{
            'completed': 'Hoàn thành',
            'pending': 'Đang xử lý',
            'failed': 'Thất bại'
          }[status] || status}
        </span>
      )
    }
  })
  
  return { columns, data }
}
```

## 🧪 Testing Your Implementation

1. **Run the demo app**:
   ```bash
   npm run dev
   ```

2. **Switch to `AppWithDynamic.tsx`** in your main.tsx:
   ```tsx
   import App from './AppWithDynamic'
   ```

3. **Test different views**:
   - Static Table: Your original water flow table
   - Dynamic API Table: Mock water flow data
   - Sensor Data: Mock sensor readings

## 💡 Pro Tips

1. **Handle loading states**: Always show loading indicators
2. **Error boundaries**: Implement proper error handling
3. **Performance**: Use React.memo for large datasets
4. **Caching**: Consider caching API responses
5. **Validation**: Validate API response structure
6. **Fallbacks**: Always have fallback column configurations

## 🔧 Advanced Usage

### Custom Hook for API Tables

```tsx
function useApiTable(endpoint: string, columnConfig?: any) {
  const [tableData, setTableData] = useState({ columns: [], data: [] })
  const [loading, setLoading] = useState(false)
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      const columns = createDynamicColumns(data, columnConfig)
      setTableData({ columns, data })
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }, [endpoint, columnConfig])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { ...tableData, loading, refresh: fetchData }
}
```

This solution provides complete flexibility for handling any API structure while maintaining the beautiful styling and functionality of your original table!
