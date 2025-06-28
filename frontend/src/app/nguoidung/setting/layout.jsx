import SidebarUser from "@/components/sidebarUser"
export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen bg-gray-100 gap-4 p-6">
            <SidebarUser />
            <div className="col-span-12 md:col-span-9 bg-white rounded-xl shadow-md p-6">
                {children}
            </div>
        </div>
    );
}
