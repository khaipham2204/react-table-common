import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type WaterFlowData = {
  date: string
  waterStation: number
  waterSupplyStation: number
  house5WastewaterTreatment: number
  building6A: number
  house8: number
  coffeeAKhoai: number
  house10: number
  heliosBuilding: number
  telecomBuilding: number
  sbiBuilding: number
}

export const createWaterFlowColumns = (): ColumnDef<WaterFlowData>[] => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        Ngày
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "waterStation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        Thủy đài
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("waterStation")}</div>,
  },
  {
    accessorKey: "waterSupplyStation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Trạm</div>
          <div>nước cấp</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("waterSupplyStation")}</div>,
  },
  {
    accessorKey: "house5WastewaterTreatment",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Nhà 5</div>
          <div>Xử lý nước thải</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("house5WastewaterTreatment")}</div>,
  },
  {
    accessorKey: "building6A",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Tòa nhà</div>
          <div>6A</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("building6A")}</div>,
  },
  {
    accessorKey: "house8",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        Nhà 8
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("house8")}</div>,
  },
  {
    accessorKey: "coffeeAKhoai",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Coffee</div>
          <div>A Khoai</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("coffeeAKhoai")}</div>,
  },
  {
    accessorKey: "house10",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        Nhà 10
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("house10")}</div>,
  },
  {
    accessorKey: "heliosBuilding",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Tòa nhà</div>
          <div>Helios</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("heliosBuilding")}</div>,
  },
  {
    accessorKey: "telecomBuilding",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Tòa nhà</div>
          <div>Telecom</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("telecomBuilding")}</div>,
  },
  {
    accessorKey: "sbiBuilding",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-red-600 font-medium px-1 md:px-2 text-xs md:text-sm w-full justify-center"
      >
        <div className="text-center">
          <div>Tòa nhà</div>
          <div>SBI</div>
        </div>
        <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("sbiBuilding")}</div>,
  },
]

export const waterFlowSampleData: WaterFlowData[] = [
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
  {
    date: "07-11-2024",
    waterStation: 100,
    waterSupplyStation: 100,
    house5WastewaterTreatment: 100,
    building6A: 100,
    house8: 100,
    coffeeAKhoai: 100,
    house10: 100,
    heliosBuilding: 100,
    telecomBuilding: 100,
    sbiBuilding: 100,
  },
]
