import { AlertDashboard, CompactAlertDashboard } from "@/components/AlertDashboard"

// Example showcasing the alert dashboard
export function AlertDashboardExample() {
    return <AlertDashboard />
}

// Example showcasing the compact version
export function CompactAlertExample() {
    return <CompactAlertDashboard />
}

// Example with custom data
export function CustomAlertDashboard() {
    return (
        <div className="space-y-8">
            <AlertDashboard />
            <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-4">Phiên bản thu gọn</h3>
                <CompactAlertDashboard />
            </div>
        </div>
    )
}

export default AlertDashboardExample
