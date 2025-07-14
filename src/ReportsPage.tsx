import { EnvironmentalReports } from '@/examples/ReportCardExamples'

// Simple standalone page that matches your image exactly
export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <EnvironmentalReports />
      </div>
    </div>
  )
}
