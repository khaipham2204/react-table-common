# Enhanced DynamicDataTable - Complete Feature Guide

## 🎉 New Features Added

Based on the table design in your image, I've enhanced the DynamicDataTable with these new features:

### ✅ **New Features**
1. **Date Range Filter** - Date picker with custom placeholder
2. **Filter Button** - Red "Lọc" button for applying filters  
3. **Global Search** - Search across all columns
4. **Row Selection** - Checkboxes for selecting rows
5. **Enhanced Pagination** - Numbered pagination (1, 2, ..., 9, 10)
6. **Flexible Layout** - Two-row header layout for filters

## 🚀 **Usage Examples**

### **Complete Monitoring Table (Like Your Image)**

```tsx
import { DynamicDataTable } from "@/components/DynamicDataTable"

function MonitoringTable() {
  const fetchData = async () => {
    const response = await fetch('/api/monitoring-data')
    const data = await response.json()
    
    const columns = createDynamicColumns(data, {
      phanHe: { header: 'Phần hệ', className: 'text-left font-medium' },
      tieuDe: { header: 'Tiêu đề', className: 'text-left' },
      chiTiet: { header: 'Chi tiết', className: 'text-left' },
      khuVuc: { header: 'Khu vực', className: 'text-left' },
      ngay: { header: 'Ngày' }
    })
    
    return { columns, data }
  }

  const handleFilter = (filters) => {
    console.log('Date range:', filters.dateRange)
    console.log('Search term:', filters.searchTerm)
    // Apply your filtering logic
  }

  return (
    <DynamicDataTable
      title="Dữ liệu quan trắc môi trường"
      actionButtonText="Xuất báo cáo"
      
      // Enable all new features
      enableRowSelection={true}
      enableDateFilter={true}
      enableGlobalSearch={true}
      
      // Customize text
      filterButtonText="Lọc"
      searchPlaceholder="Tìm kiếm"
      dateFilterPlaceholder="06/24/2021 - 06/24/2021"
      
      // Handlers
      fetchData={fetchData}
      onFilter={handleFilter}
      onActionButtonClick={() => console.log('Export')}
    />
  )
}
```

### **Simple Table (No Filters)**

```tsx
function SimpleTable() {
  return (
    <DynamicDataTable
      title="Device Status"
      enableRowSelection={false}
      enableDateFilter={false}
      enableGlobalSearch={true}
      searchPlaceholder="Search devices..."
      fetchData={fetchDeviceData}
    />
  )
}
```

## 📋 **Complete Props Reference**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Basic Props** | | | |
| `title` | `string` | - | **Required.** Table title |
| `fetchData` | `function` | - | **Required.** Function to fetch data |
| `actionButtonText` | `string` | `"Action"` | Action button text |
| `onActionButtonClick` | `function` | - | Action button handler |
| `noDataMessage` | `string` | `"No data available."` | Empty state message |
| **Core Features** | | | |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enableFiltering` | `boolean` | `true` | Enable table filtering |
| **🆕 New Features** | | | |
| `enableRowSelection` | `boolean` | `false` | Enable row checkboxes |
| `enableDateFilter` | `boolean` | `false` | Enable date range filter |
| `enableGlobalSearch` | `boolean` | `false` | Enable global search |
| **🆕 Customization** | | | |
| `filterButtonText` | `string` | `"Lọc"` | Filter button text |
| `searchPlaceholder` | `string` | `"Tìm kiếm"` | Search input placeholder |
| `dateFilterPlaceholder` | `string` | `"06/24/2021 - 06/24/2021"` | Date filter placeholder |
| **🆕 Event Handlers** | | | |
| `onFilter` | `function` | - | Filter event handler |
| `loading` | `boolean` | `false` | External loading state |

## 🎨 **Layout Variations**

### **1. Full Featured (Like Your Image)**
```tsx
<DynamicDataTable
  enableRowSelection={true}
  enableDateFilter={true}
  enableGlobalSearch={true}
  // ... other props
/>
```

### **2. Search Only**
```tsx
<DynamicDataTable
  enableRowSelection={false}
  enableDateFilter={false}
  enableGlobalSearch={true}
  // ... other props
/>
```

### **3. Date Filter Only**
```tsx
<DynamicDataTable
  enableRowSelection={false}
  enableDateFilter={true}
  enableGlobalSearch={false}
  // ... other props
/>
```

### **4. Basic Table (Original)**
```tsx
<DynamicDataTable
  enableRowSelection={false}
  enableDateFilter={false}
  enableGlobalSearch={false}
  // ... other props
/>
```

## 🔧 **Filter Handling**

```tsx
const handleFilter = (filters: { dateRange?: string, searchTerm?: string }) => {
  if (filters.dateRange) {
    // Parse date range: "06/24/2021 - 06/24/2021"
    const [startDate, endDate] = filters.dateRange.split(' - ')
    // Apply date filtering
  }
  
  if (filters.searchTerm) {
    // Apply search filtering
    // The global search is handled automatically by the table
    // This is for additional custom filtering
  }
  
  // Refetch data with filters or update local state
}
```

## 🎯 **Row Selection**

```tsx
// Access selected rows (if needed)
const [selectedRows, setSelectedRows] = useState([])

// In your component, you can track selections:
const table = useReactTable({
  // ... other config
  onRowSelectionChange: setRowSelection,
  state: {
    rowSelection: selectedRows
  }
})

// Get selected data
const selectedData = table.getFilteredSelectedRowModel().rows.map(row => row.original)
```

## 📱 **Responsive Behavior**

The enhanced table maintains full responsiveness:

- **Mobile**: Date filter and search stack vertically
- **Tablet**: Side-by-side layout for filters
- **Desktop**: Full two-row header layout

## 🎨 **Styling Customization**

### **Filter Button Styling**
```tsx
// The filter button uses red styling by default:
className="bg-red-500 hover:bg-red-600 text-white px-6"

// Customize in the component if needed
```

### **Pagination Styling**
```tsx
// Active page button:
className="bg-red-500 text-white border-red-500"

// Inactive page button:
className="bg-white border-gray-300 text-gray-700"
```

## 🧪 **Testing Your Enhanced Table**

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Switch to enhanced demo** in main.tsx:
   ```tsx
   import App from './AppWithDynamic'
   ```

3. **Test the "Monitoring Table" tab** - it has all the features from your image

## 💡 **Advanced Usage**

### **Custom Column Formatting**
```tsx
const columns = createDynamicColumns(data, {
  status: {
    header: 'Trạng thái',
    formatter: (value) => (
      <span className={`px-2 py-1 rounded ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  }
})
```

### **Real-time Data**
```tsx
// Auto-refresh every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    // Trigger data reload
    loadData()
  }, 30000)
  
  return () => clearInterval(interval)
}, [])
```

## 🎉 **Summary**

Your enhanced DynamicDataTable now supports:

✅ **All features from your image** - Date filter, search, checkboxes, numbered pagination  
✅ **Flexible configuration** - Enable/disable any feature  
✅ **Professional styling** - Matches your design requirements  
✅ **Full responsiveness** - Works on all screen sizes  
✅ **Type safety** - Complete TypeScript support  
✅ **Easy integration** - Drop-in replacement for any table  

The table is now ready to handle any monitoring, reporting, or data management scenario in your application! 🚀
