import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable"

// Example: User data type
type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

// Example: User columns
const createUserColumns = (): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-blue-600 font-medium"
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-blue-600 font-medium"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-blue-600 font-medium"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-blue-600 font-medium"
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-blue-600 font-medium"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
      )
    },
  },
]

// Example: Sample user data
const userSampleData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
  },
]

// Example component using DataTable
export function UserManagement() {
  const columns = createUserColumns()

  const handleExport = () => {
    console.log("Export users")
  }

  return (
    <DataTable
      columns={columns}
      data={userSampleData}
      title="User Management"
      actionButtonText="Export Users"
      onActionButtonClick={handleExport}
      noDataMessage="No users found."
      enablePagination={true}
      enableSorting={true}
      enableFiltering={true}
    />
  )
}

// Example: Simple data without pagination
type Product = {
  name: string
  price: number
  category: string
}

const createProductColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>${row.getValue("price")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
]

const productSampleData: Product[] = [
  { name: "Laptop", price: 999, category: "Electronics" },
  { name: "Phone", price: 599, category: "Electronics" },
  { name: "Desk", price: 299, category: "Furniture" },
]

export function ProductList() {
  const columns = createProductColumns()

  return (
    <DataTable
      columns={columns}
      data={productSampleData}
      title="Product Catalog"
      enablePagination={false}
      enableSorting={false}
      enableFiltering={false}
    />
  )
}
