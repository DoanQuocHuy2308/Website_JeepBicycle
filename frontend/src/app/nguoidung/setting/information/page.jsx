"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/user.css";
import { Divider } from 'primereact/divider';
import { InputTextarea } from "primereact/inputtextarea";
const infor = {
    id: "",
    username: "",
    password: "",
    name: "",
    birthday: null,
    sex: "",
    address: "",
    email: "",
    phone: "",
    image: null,
    role_user: 1,
    ban: false,
    created_at: "",
    updated_at: ""
}
export default function Page() {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [dataUser, setDataUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState(infor);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("data"));
        setDataUser(stored);
    }, []);
    useEffect(() => {
        const fetchUser = async () => {
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
        if (dataUser) {
            fetchUser();
        }
    }, [dataUser]);

    const sexes = [
        { label: "Nam", value: "Nam" },
        { label: "Nữ", value: "Nữ" },
        { label: "Khác", value: "Khác" },
    ];

    const roles = [
        { label: "Khách hàng", value: 1 },
        { label: "Nhân viên", value: 2 },
        { label: "Quản trị viên", value: 3 },
    ];

    const upLoad = (event) => {
        const file = event.files[0];
        const url = URL.createObjectURL(file);
        setAvatar(url);
        setUser((prev) => ({ ...prev, image: file }));
    };

    const clearImg = () => {
        setAvatar(null);
        setUser((prev) => ({ ...prev, image: null }));
        fileUploadRef.current?.clear();
    };

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const btnUpdateUsers = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                if (key === "image" && user.image instanceof File) {
                    formData.append("file", user.image);
                } else if (key === "birthday") {
                    formData.append(key, formatDate(user.birthday));
                } else if (key === "password") {
                    formData.append(key, "");
                }
                else {
                    formData.append(key, user[key]);
                }
            });

            await axios.put(`http://localhost:3000/users/updateUsers`, formData, {
                params: { id: user.id },
                headers: {
                    Authorization: `Bearer ${dataUser.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Cập nhật người dùng thành công!",
                life: 3000,
            });
            window.location.reload();
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: `Cập nhật người dùng thất bại: ${err.response?.data?.message || err.message}`,
                life: 3000,
            });
        }
    };

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const checkOldPassword = async (password) => {
        if (!password) return null;

        try {
            const res = await axios.post("http://localhost:3000/login/checkPassword", {
                id: dataUser.user.id,
                password: password,
            });
            return res.data;
        } catch (err) {
            console.error("Lỗi kiểm tra mật khẩu:", err);
            return false;
        }
    };

    const btnUpdatePassword = async () => {
        const isValid = await checkOldPassword(oldPassword);

        if (!isValid) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Mật khẩu cũ không đúng!",
                life: 3000,
            });
            return;
        }

        if (newPassword !== newPasswordAgain) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Mật khẩu mới không khớp!",
                life: 3000,
            });
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/login/updatePassword`,
                {
                    id: dataUser.user.id,
                    password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Đổi mật khẩu thành công!",
                life: 3000,
            });

            window.location.reload();
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: `Cập nhật thất bại: ${err.response?.data?.message || err.message}`,
                life: 3000,
            });
        }
    };


    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>có ít nhất 1 chữ thường</li>
                <li>có ít nhất 1 chữ Hoa</li>
                <li>có ít nhất 1 số</li>
                <li>tối thiểu 8 ký tự</li>
            </ul>
        </>
    );
    return (
        <>
            <Toast ref={toast} position="top-right" />
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-6">Thông tin tài khoản</h2>
            <TabView>
                <TabPanel header="Hồ sơ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-[250px] h-[250px] rounded-xl overflow-hidden border-4 border-blue-500 shadow-md">
                                    <img
                                        src={avatar ? avatar : `http://localhost:3000${user.image}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <FileUpload
                                        ref={fileUploadRef}
                                        mode="basic"
                                        name="avatar"
                                        auto
                                        accept="image/*"
                                        chooseLabel="Chọn ảnh"
                                        customUpload
                                        uploadHandler={upLoad}
                                    />
                                    <Button label="Xóa" severity="danger" icon="pi pi-times" className="mt-2" onClick={clearImg} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Tên đăng nhập</label>
                                <InputText className="w-full" value={user.username || ""} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Mật khẩu</label>
                                <Password className="w-full" value={user.password || ""} disabled  />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Vai trò</label>
                                <Dropdown
                                    className="w-full"
                                    value={user.role_user}
                                    options={roles}
                                    disabled
                                    placeholder="Chọn vai trò"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 mb-1">Họ tên</label>
                                <InputText className="w-full" value={user.name || ""} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Ngày sinh</label>
                                <Calendar
                                    className="w-full"
                                    showIcon
                                    placeholder="Chọn ngày sinh"
                                    value={user.birthday ? new Date(user.birthday) : null}
                                    onChange={(e) => setUser({ ...user, birthday: e.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Giới tính</label>
                                <Dropdown
                                    className="w-full"
                                    options={sexes}
                                    placeholder="Chọn giới tính"
                                    value={user.sex || ""}
                                    onChange={(e) => setUser({ ...user, sex: e.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Email</label>
                                <InputText className="w-full" value={user.email || ""} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Số điện thoại</label>
                                <InputMask
                                    className="w-full"
                                    mask="9999 999 999"
                                    placeholder="0123 456 789"
                                    value={user.phone || ""}
                                    onChange={(e) => setUser({ ...user, phone: e.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Địa chỉ</label>
                                <InputTextarea rows={5} cols={30} placeholder="Nhập địa chỉ" className="w-full" value={user.address || ""} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                            </div>
                            <Button label="Lưu thông tin" icon="pi pi-save" className="mt-4" onClick={btnUpdateUsers} />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Đổi mật khẩu">
                    <div className="flex justify-center h-full items-center">
                        <div className="flex flex-col w-[500px] space-y-4">
                            <div>
                                <label className="block text-gray-600 mb-1">Mật khẩu cũ</label>
                                <Password
                                    className="w-full"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    toggleMask
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Mật khẩu mới</label>
                                <Password
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    toggleMask
                                    header={header}
                                    footer={footer}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">Nhập lại mật khẩu</label>
                                <Password
                                    value={newPasswordAgain}
                                    onChange={(e) => setNewPasswordAgain(e.target.value)}
                                    toggleMask
                                    header={header}
                                    footer={footer}
                                />
                            </div>

                            <Button
                                label="Đổi mật khẩu"
                                icon="pi pi-lock"
                                onClick={btnUpdatePassword}
                                className="mt-2"
                            />
                        </div>
                    </div>

                </TabPanel>
            </TabView>
        </>
    );
}
