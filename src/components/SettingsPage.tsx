import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Trash2, Users, UserCircle } from "lucide-react"

// Types for user group and account data
type UserGroup = {
    id: string
    name: string
}

type UserAccount = {
    id: string
    name: string
    email: string
    accountType: string
    status: 'ACTIVE' | 'INACTIVE'
}

export function SettingsPage() {
    // User Groups State
    const [userGroups, setUserGroups] = React.useState<UserGroup[]>([
        { id: "1", name: "Nhóm quản lý phân hệ nước ban ngày" },
        { id: "2", name: "Nhóm quản lý phân hệ nước ban đêm" },
        { id: "3", name: "Nhóm quản lý phân hệ không khí" },
    ])

    // User Accounts State
    const [userAccounts, setUserAccounts] = React.useState<UserAccount[]>([
        {
            id: "1",
            name: "admin",
            email: "admin@gmail.com",
            accountType: "Director",
            status: "ACTIVE"
        },
        {
            id: "2",
            name: "manager_aqi",
            email: "manager_aqi@gmail.com",
            accountType: "Manager",
            status: "ACTIVE"
        },
        {
            id: "3",
            name: "tester001",
            email: "tester001@gmail.com",
            accountType: "Staff",
            status: "INACTIVE"
        }
    ])

    const handleDeleteGroup = (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa nhóm người dùng này?')) {
            setUserGroups(prev => prev.filter(group => group.id !== id))
        }
    }

    const handleEditGroup = (id: string) => {
        const group = userGroups.find(g => g.id === id)
        const newName = prompt('Nhập tên nhóm mới:', group?.name)
        if (newName && newName !== group?.name) {
            setUserGroups(prev => 
                prev.map(g => g.id === id ? { ...g, name: newName } : g)
            )
        }
    }

    const handleAddGroup = () => {
        const name = prompt('Nhập tên nhóm người dùng:')
        if (name) {
            const newGroup: UserGroup = {
                id: Date.now().toString(),
                name
            }
            setUserGroups(prev => [...prev, newGroup])
        }
    }

    const handleDeleteAccount = (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            setUserAccounts(prev => prev.filter(account => account.id !== id))
        }
    }

    const handleEditAccount = (id: string) => {
        const account = userAccounts.find(a => a.id === id)
        const newName = prompt('Nhập tên tài khoản mới:', account?.name)
        if (newName && newName !== account?.name) {
            setUserAccounts(prev => 
                prev.map(a => a.id === id ? { ...a, name: newName } : a)
            )
        }
    }

    const handleAddAccount = () => {
        const name = prompt('Nhập tên tài khoản:')
        const email = prompt('Nhập email:')
        const accountType = prompt('Nhập loại tài khoản (Director/Manager/Staff):')
        
        if (name && email && accountType) {
            const newAccount: UserAccount = {
                id: Date.now().toString(),
                name,
                email,
                accountType,
                status: 'ACTIVE'
            }
            setUserAccounts(prev => [...prev, newAccount])
        }
    }

    const getStatusColor = (status: 'ACTIVE' | 'INACTIVE') => {
        return status === 'ACTIVE' 
            ? 'text-green-600 bg-green-100 px-2 py-1 rounded text-sm font-medium'
            : 'text-gray-500 bg-gray-100 px-2 py-1 rounded text-sm font-medium'
    }

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Trang cài đặt</h1>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="data" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger 
                            value="data" 
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
                        >
                            Cài đặt dữ liệu
                        </TabsTrigger>
                        <TabsTrigger 
                            value="notifications"
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
                        >
                            Thông báo
                        </TabsTrigger>
                        <TabsTrigger 
                            value="user-info"
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
                        >
                            Thông tin người dùng
                        </TabsTrigger>
                        <TabsTrigger 
                            value="user-management"
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
                        >
                            Quản lý người dùng
                        </TabsTrigger>
                    </TabsList>

                    {/* Data Settings Tab */}
                    <TabsContent value="data" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <p className="text-gray-600">Cài đặt dữ liệu sẽ được hiển thị ở đây.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <p className="text-gray-600">Cài đặt thông báo sẽ được hiển thị ở đây.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* User Info Tab */}
                    <TabsContent value="user-info" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <p className="text-gray-600">Thông tin người dùng sẽ được hiển thị ở đây.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* User Management Tab */}
                    <TabsContent value="user-management" className="mt-6 space-y-6">
                        {/* User Groups Section */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Users className="h-5 w-5 text-red-600" />
                                    Quản lý nhóm người dùng
                                </CardTitle>
                                <Button 
                                    onClick={handleAddGroup}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Thêm nhóm
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-gray-700 mb-3">
                                        Danh sách nhóm người dùng <span className="text-red-500">*</span>
                                    </h4>
                                    <div className="space-y-2">
                                        {userGroups.map((group) => (
                                            <div 
                                                key={group.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                            >
                                                <span className="text-gray-700">{group.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditGroup(group.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteGroup(group.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Pagination for groups */}
                                    <div className="flex items-center justify-center mt-4">
                                        <div className="flex items-center space-x-1">
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-100">‹</Button>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-red-500 text-white">1</Button>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                                            <span className="px-2 text-gray-500">...</span>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">9</Button>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">10</Button>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-100">›</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Accounts Section */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <UserCircle className="h-5 w-5 text-red-600" />
                                    Danh sách tài khoản
                                </CardTitle>
                                <Button 
                                    onClick={handleAddAccount}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Tạo mới
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50">
                                                <TableHead className="font-medium text-red-600">
                                                    Tên <span className="ml-1">↕</span>
                                                </TableHead>
                                                <TableHead className="font-medium text-red-600">
                                                    Email <span className="ml-1">↕</span>
                                                </TableHead>
                                                <TableHead className="font-medium text-red-600">
                                                    Loại tài khoản <span className="ml-1">↕</span>
                                                </TableHead>
                                                <TableHead className="font-medium text-red-600">
                                                    Trạng thái <span className="ml-1">↕</span>
                                                </TableHead>
                                                <TableHead className="font-medium text-gray-700 text-center">
                                                    Thao tác
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {userAccounts.map((account) => (
                                                <TableRow key={account.id} className="hover:bg-gray-50">
                                                    <TableCell className="font-medium">
                                                        {account.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {account.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {account.accountType}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className={getStatusColor(account.status)}>
                                                            {account.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEditAccount(account.id)}
                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDeleteAccount(account.id)}
                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination for accounts */}
                                <div className="flex items-center justify-center mt-4">
                                    <div className="flex items-center space-x-1">
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-100">‹</Button>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-red-500 text-white">1</Button>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                                        <span className="px-2 text-gray-500">...</span>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">9</Button>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">10</Button>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-100">›</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}