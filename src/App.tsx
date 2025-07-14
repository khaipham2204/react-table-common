import { DataTable } from "@/components/DataTable"
import { createWaterFlowColumns, waterFlowSampleData } from "@/data/waterFlowData"

export default function App() {
  const columns = createWaterFlowColumns()

  const handleDownload = () => {
    // Handle download logic here
    console.log("Download button clicked")
  }

  return (
    <DataTable
      columns={columns}
      data={waterFlowSampleData}
      title="Lịch sử lưu lượng dòng hồ nước"
      actionButtonText="Tải xuống ↓"
      onActionButtonClick={handleDownload}
      noDataMessage="Không có dữ liệu."
      enablePagination={true}
      enableSorting={true}
      enableFiltering={true}
    />
  )
}
