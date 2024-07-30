// components/Sidebar.tsx
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className="h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-4">
                <img src="/logo.png" alt="Logo" className="h-12 mx-auto" />
            </div>
            <nav className="flex flex-col mt-4 space-y-2">
                <Link href="/">
                    <a className="px-4 py-2 hover:bg-gray-700">Dashboard</a>
                </Link>
                <Link href="/toll-expense">
                    <a className="px-4 py-2 hover:bg-gray-700">Toll Expense</a>
                </Link>
                <Link href="/accounting">
                    <a className="px-4 py-2 hover:bg-gray-700">Accounting</a>
                </Link>
                <div className="flex flex-col">
                    <Link href="/transactions/new">
                        <a className="px-4 py-2 hover:bg-gray-700">New</a>
                    </Link>
                    <Link href="/transactions/successful">
                        <a className="px-4 py-2 hover:bg-gray-700">Successful</a>
                    </Link>
                    <Link href="/transactions/failed">
                        <a className="px-4 py-2 bg-gray-700">Failed</a>
                    </Link>
                    <Link href="/transactions/pending">
                        <a className="px-4 py-2 hover:bg-gray-700">Pending</a>
                    </Link>
                </div>
                <Link href="/vehicle-reports">
                    <a className="px-4 py-2 hover:bg-gray-700">Vehicle Reports</a>
                </Link>
                <Link href="/alerts">
                    <a className="px-4 py-2 hover:bg-gray-700">Alerts</a>
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar
