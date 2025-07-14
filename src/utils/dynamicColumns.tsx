import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Generic function to create columns from API data
export function createDynamicColumns<T extends Record<string, any>>(
  sampleData: T[],
  columnConfig?: Partial<Record<keyof T, {
    header?: string
    sortable?: boolean
    formatter?: (value: any) => React.ReactNode
    className?: string
  }>>
): ColumnDef<T>[] {
  if (sampleData.length === 0) return []
  
  // Get all keys from the first data item
  const keys = Object.keys(sampleData[0]) as (keyof T)[]
  
  return keys.map((key) => {
    const config = columnConfig?.[key] || {}
    const header = config.header || String(key)
    const sortable = config.sortable !== false // Default to true
    const formatter = config.formatter
    const className = config.className || "text-center"
    
    return {
      accessorKey: key as string,
      header: sortable 
        ? ({ column }) => (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
            >
              {header}
              <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          )
        : header,
      cell: ({ row }) => (
        <div className={className}>
          {formatter ? formatter(row.getValue(key as string)) : row.getValue(key as string)}
        </div>
      ),
    }
  })
}

// Example usage with API data
export async function fetchDataWithDynamicColumns() {
  try {
    // Simulate API call
    const response = await fetch('/api/water-flow-data')
    const apiData = await response.json()
    
    // API might return different structure like:
    // {
    //   columns: ['date', 'station_a', 'station_b', 'flow_rate'],
    //   data: [
    //     { date: '2024-01-01', station_a: 100, station_b: 150, flow_rate: 2.5 },
    //     ...
    //   ]
    // }
    
    if (apiData.data && apiData.data.length > 0) {
      // Create dynamic columns based on actual data
      const columns = createDynamicColumns(apiData.data, {
        date: { header: 'Ngày', sortable: true },
        station_a: { header: 'Trạm A', sortable: true },
        station_b: { header: 'Trạm B', sortable: true },
        flow_rate: { 
          header: 'Lưu lượng', 
          sortable: true,
          formatter: (value) => `${value} m³/s`
        }
      })
      
      return { columns, data: apiData.data }
    }
    
    return { columns: [], data: [] }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { columns: [], data: [] }
  }
}
