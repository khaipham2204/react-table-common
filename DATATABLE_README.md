# DataTable Component

A reusable, responsive data table component built with @tanstack/react-table and shadcn/ui components.

## Features

- ✅ Responsive design with mobile-first approach
- ✅ Sorting functionality
- ✅ Pagination with customizable controls
- ✅ Filtering capabilities
- ✅ TypeScript support with generic types
- ✅ Customizable styling and theming
- ✅ Card-based layout
- ✅ Action button support
- ✅ Vietnamese localization support

## Usage

### Basic Example

```tsx
import { DataTable } from "@/components/DataTable"
import type { ColumnDef } from "@tanstack/react-table"

// Define your data type
type User = {
  id: string
  name: string
  email: string
}

// Create columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name", 
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email", 
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
]

// Sample data
const data: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
]

// Use the component
export function UserTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      title="User Management"
      actionButtonText="Add User"
      onActionButtonClick={() => console.log("Add user clicked")}
    />
  )
}
```

### Advanced Example with Sorting

```tsx
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const columns: ColumnDef<User>[] = [
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
  // ... other columns
]
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | - | **Required.** Column definitions |
| `data` | `TData[]` | - | **Required.** Data array |
| `title` | `string` | - | **Required.** Table title |
| `actionButtonText` | `string` | `"Action"` | Text for the action button |
| `onActionButtonClick` | `() => void` | - | Action button click handler |
| `noDataMessage` | `string` | `"No data available."` | Message when no data |
| `enablePagination` | `boolean` | `true` | Enable/disable pagination |
| `enableSorting` | `boolean` | `true` | Enable/disable sorting |
| `enableFiltering` | `boolean` | `true` | Enable/disable filtering |

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized by modifying the classes in the component file. Key styling areas:

- **Card container**: Main wrapper with rounded corners and shadow
- **Header**: Title and action button area
- **Table**: Responsive table with hover effects
- **Pagination**: Centered pagination controls with red accent

### Responsive Behavior

- **Mobile (< 640px)**: Horizontal scroll for table, stacked header layout
- **Tablet (640px - 768px)**: Improved spacing, side-by-side header layout
- **Desktop (> 768px)**: Full layout with optimal spacing

### Column Configuration

```tsx
// Simple column
{
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => <div>{row.getValue("name")}</div>,
}

// Sortable column with custom styling
{
  accessorKey: "status",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-red-600 font-medium"
    >
      Status
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => {
    const status = row.getValue("status") as string
    return (
      <div className="text-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {status}
        </span>
      </div>
    )
  },
}

// Multi-line header
{
  accessorKey: "description",
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      <div className="text-center">
        <div>Long</div>
        <div>Description</div>
      </div>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div className="text-center">{row.getValue("description")}</div>,
}
```

## File Structure

```
src/
├── components/
│   ├── DataTable.tsx          # Main reusable component
│   └── ui/                    # shadcn/ui components
├── data/
│   └── waterFlowData.tsx      # Example data and columns
├── examples/
│   └── DataTableExamples.tsx  # Usage examples
└── App.tsx                    # Main application
```

## Dependencies

- `@tanstack/react-table` - Table functionality
- `lucide-react` - Icons
- `shadcn/ui` - UI components
- `tailwindcss` - Styling

## Examples

See `src/examples/DataTableExamples.tsx` for complete working examples including:

- User management table with status badges
- Product catalog without pagination
- Custom column rendering
- Different styling approaches

## Vietnamese Water Flow Example

The original water flow monitoring table is now refactored to use this component. See:

- `src/data/waterFlowData.tsx` - Data types and column definitions
- `src/App.tsx` - Implementation using the DataTable component
