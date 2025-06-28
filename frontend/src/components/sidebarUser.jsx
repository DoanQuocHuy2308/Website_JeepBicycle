"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PanelMenu } from "primereact/panelmenu";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/user.css";

export default function SidebarUser() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("data");
      if (storedData) {
        setDataUser(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!dataUser?.user?.id) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/users/getUsersById?id=${dataUser.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${dataUser.token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [dataUser]);

  const menuItems = [
    {
      label: "Thông tin cá nhân",
      icon: "pi pi-user-edit",
      command: () => router.push("/nguoidung/setting/information"),
    },
    {
      label: "Lịch sử đặt hàng",
      icon: "pi pi-cog",
      command: () => router.push("/nguoidung/setting/donhang"),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push("/loginFolder/login");
  };

  const role = () => {
    if (user.role_user === 1) {
      return "Khách hàng";
    }
    return "";
  };

  return (
    <div className="col-span-12 md:col-span-3 bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
          <img
            src={user.image ? `http://localhost:3000${user.image}` : "/default-avatar.png"}
            alt={user.name || "Avatar người dùng"}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">{user.name || "Người dùng"}</h1>
        <span className="text-sm text-gray-500">{role()}</span>
        <div className="mt-6 w-full">
          <PanelMenu model={menuItems} className="w-full shadow-md rounded-md" />
        </div>
      </div>
      <div className="w-full mt-6">
        <Button label="Đăng xuất" icon="pi pi-sign-out" className="w-full p-button-danger" onClick={handleLogout} />
      </div>
    </div>
  );
}
