import { DataTable } from "@/components/DataTable"
import { createWaterFlowColumns, waterFlowSampleData } from "@/data/waterFlowData"
import { ApiDataTable, SensorDataTable } from "@/examples/DynamicDataTableExamples"
import { MonitoringTable, SimpleMonitoringTable } from "@/examples/MonitoringTableExample"
import { EnvironmentalReports, DynamicReports, SimpleReports } from "@/examples/ReportCardExamples"
import { ManufacturerExample, ManufacturerWithLoading, SimpleManufacturerTable } from "@/examples/ManufacturerTableExamples"
import { SettingsPage } from "@/components/SettingsPage"
import { AlertDashboardExample, CompactAlertExample, CustomAlertDashboard } from "@/examples/AlertDashboardExamples"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function App() {
    const [currentView, setCurrentView] = useState<'static' | 'dynamic' | 'sensor' | 'monitoring' | 'simple' | 'reports' | 'dynamic-reports' | 'simple-reports' | 'manufacturer' | 'manufacturer-loading' | 'simple-manufacturer' | 'settings' | 'alerts' | 'compact-alerts' | 'custom-alerts'>('monitoring')
    const columns = createWaterFlowColumns()

    const handleDownload = () => {
        console.log("Download button clicked")
    }

    return (
        <div className="space-y-4">
            {/* Navigation */}
            <div className="flex gap-2 p-4 bg-white rounded-lg shadow flex-wrap">
                <Button
                    variant={currentView === 'static' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('static')}
                >
                    Static Table
                </Button>
                <Button
                    variant={currentView === 'dynamic' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('dynamic')}
                >
                    Dynamic API
                </Button>
                <Button
                    variant={currentView === 'sensor' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('sensor')}
                >
                    Sensor Data
                </Button>
                <Button
                    variant={currentView === 'monitoring' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('monitoring')}
                >
                    Monitoring Table
                </Button>
                <Button
                    variant={currentView === 'simple' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('simple')}
                >
                    Simple Table
                </Button>
                <Button
                    variant={currentView === 'reports' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('reports')}
                >
                    Card Reports
                </Button>
                <Button
                    variant={currentView === 'dynamic-reports' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('dynamic-reports')}
                >
                    Dynamic Cards
                </Button>
                <Button
                    variant={currentView === 'simple-reports' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('simple-reports')}
                >
                    Simple Cards
                </Button>
                <Button
                    variant={currentView === 'manufacturer' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('manufacturer')}
                >
                    Manufacturer Table
                </Button>
                <Button
                    variant={currentView === 'manufacturer-loading' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('manufacturer-loading')}
                >
                    Loading Example
                </Button>
                <Button
                    variant={currentView === 'simple-manufacturer' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('simple-manufacturer')}
                >
                    Simple Manufacturer
                </Button>
                <Button
                    variant={currentView === 'settings' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('settings')}
                >
                    Settings Page
                </Button>
                <Button
                    variant={currentView === 'alerts' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('alerts')}
                >
                    Alert Dashboard
                </Button>
                <Button
                    variant={currentView === 'compact-alerts' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('compact-alerts')}
                >
                    Compact Alerts
                </Button>
                <Button
                    variant={currentView === 'custom-alerts' ? 'default' : 'outline'}
                    onClick={() => setCurrentView('custom-alerts')}
                >
                    Custom Dashboard
                </Button>
            </div>

            {/* Content */}
            {currentView === 'static' && (
                <DataTable
                    columns={columns}
                    data={waterFlowSampleData}
                    title="Lịch sử lưu lượng dòng hồ nước (Static)"
                    actionButtonText="Tải xuống ↓"
                    onActionButtonClick={handleDownload}
                    noDataMessage="Không có dữ liệu."
                    enablePagination={true}
                    enableSorting={true}
                    enableFiltering={true}
                />
            )}

            {currentView === 'dynamic' && <ApiDataTable />}

            {currentView === 'sensor' && <SensorDataTable />}

            {currentView === 'monitoring' && <MonitoringTable />}

            {currentView === 'simple' && <SimpleMonitoringTable />}

            {currentView === 'reports' && <EnvironmentalReports />}

            {currentView === 'dynamic-reports' && <DynamicReports />}

            {currentView === 'simple-reports' && <SimpleReports />}

            {currentView === 'manufacturer' && <ManufacturerExample />}

            {currentView === 'manufacturer-loading' && <ManufacturerWithLoading />}

            {currentView === 'simple-manufacturer' && <SimpleManufacturerTable />}

            {currentView === 'settings' && <SettingsPage />}

            {currentView === 'alerts' && <AlertDashboardExample />}

            {currentView === 'compact-alerts' && <CompactAlertExample />}

            {currentView === 'custom-alerts' && <CustomAlertDashboard />}
        </div>
    )
}
