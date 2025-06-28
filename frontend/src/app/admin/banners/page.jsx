"use client";
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function Page() {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const [dataBanners, setDataBanners] = useState([]);
    const [banner, setBanner] = useState({});
    const [img, setImg] = useState(null);
    const [visible, setVisible] = useState(false);
    const [checkAdd, setCheckAdd] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [title, setTitle] = useState('');

    const getAllBanners = async () => {
        try {
            const res = await axios.get('http://localhost:3000/banners/getAllBanners');
            setDataBanners(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBanners();
    }, []);

    const date = (value) => {
        const d = new Date(value);
        return d.toLocaleString("vi-VN");
    };

    const image = (value) => {
        return <Image src={`http://localhost:3000${value}`} alt="Banner" width="250" preview />;
    };

    const btnAdd = () => {
        setBanner({...banner,
            image_path: null
        });
        setImg(null);
        setVisible(true);
        setCheckAdd(true);
        setCheckEdit(false);
        setTitle("Thêm Ảnh Mới");
    };

    const btnEdit = (rowData) => {
        setBanner(rowData);
        setImg(`http://localhost:3000${rowData.image_path}`);
        setVisible(true);
        setCheckEdit(true);
        setCheckAdd(false);
        setTitle("Chỉnh Sửa Ảnh");
    };

    const btnDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/banners/deleteBanners`,{
                params: {
                    id: id
                }
            }
            );
            toast.current.show({ severity: 'success', summary: 'Xóa thành công', life: 3000 });
            getAllBanners();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Lỗi khi xóa', detail: error.message, life: 3000 });
        }
    };

    const uploadImage = (event) => {
        const file = event.files[0];
        const url = URL.createObjectURL(file);
        setImg(url);
        setBanner((prev) => ({ ...prev, image_path: file }));
    };

    const clearImage = () => {
        setImg(null);
        setBanner((prev) => ({ ...prev, image_path: null }));
        fileUploadRef.current?.clear();
    };
    const addBanner = async () => {
        try {
            const formData = new FormData();
            formData.append('file', banner.image_path);

            await axios.post('http://localhost:3000/banners/createBanners', formData);

            toast.current.show({ severity: 'success', summary: 'Thêm thành công', life: 3000 });
            setVisible(false);
            setBanner({});
            setImg(null);
            getAllBanners();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Lỗi khi thêm', detail: err.message, life: 3000 });
        }
    };

    const editBanner = async () => {
        try {
            const formData = new FormData();
            formData.append('file', banner.image_path);

            await axios.put(`http://localhost:3000/banners/updateBanners`, formData, {
                params: { id: banner.id }
            });

            toast.current.show({ severity: 'success', summary: 'Cập nhật thành công', life: 3000 });
            setVisible(false);
            setBanner({});
            setImg(null);
            getAllBanners();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Lỗi khi cập nhật', detail: err.message, life: 3000 });
        }
    };

    return (
        <div className="mx-5">
            <Toast ref={toast} />
            <h2 className="text-[28px] font-bold text-orange-600 mt-6 mb-4">
                Quản Lý Banner Ảnh
            </h2>

            <div className="my-5 flex justify-end">
                <Button
                    label="Thêm Ảnh Mới"
                    icon="pi pi-plus"
                    onClick={btnAdd}
                    iconPos="left"
                    severity="success"
                />
            </div>

            <Dialog
                header={title}
                visible={visible}
                style={{ width: '30vw' }}
                onHide={() => {
                    setVisible(false);
                    setBanner({});
                    setImg(null);
                    fileUploadRef.current?.clear();
                }}
            >
                <div className="space-y-4">
                    <FloatLabel>
                        <InputText
                            id="id"
                            disabled
                            value={banner.id || ''}
                            className="w-full"
                            onChange={(e) => setBanner(prev => ({ ...prev, id: e.target.value }))}
                        />
                        <label htmlFor="id">Mã Banner</label>
                    </FloatLabel>
                    <div className="flex justify-center">
                        <Image
                            src={img || 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxayzfkjvowpff'}
                            alt="Image"
                            width="300"
                            height='300'
                            preview
                        />
                    </div>
                    <div className="flex space-x-2 justify-center items-center">
                        <FileUpload
                            ref={fileUploadRef}
                            mode="basic"
                            name="image"
                            auto
                            accept="image/*"
                            chooseLabel="Chọn ảnh"
                            customUpload
                            uploadHandler={uploadImage}
                        />
                        <Button
                            label="Xóa ảnh"
                            icon="pi pi-times"
                            onClick={clearImage}
                            severity="danger"
                            raised
                        />
                    </div>
                    {checkAdd && (
                        <Button
                            label="Thêm Mới"
                            className='w-full'
                            icon="pi pi-plus"
                            onClick={addBanner}
                            iconPos="left"
                            severity="success"
                        />
                    )}
                    {checkEdit && (
                        <Button
                            label="Cập Nhật"
                            className='w-full'
                            icon="pi pi-pencil"
                            onClick={editBanner}
                            iconPos="left"
                            severity="warning"
                        />
                    )}
                </div>
            </Dialog>

            <DataTable
                value={dataBanners}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column
                    body={(_, { rowIndex }) => rowIndex + 1}
                    header="STT"
                    style={{ width: '5%' }}
                />
                <Column
                    body={(rowData) => image(rowData.image_path)}
                    header="Ảnh"
                    style={{ width: '50%' }}
                />
                <Column
                    body={(rowData) => date(rowData.updated_at)}
                    header="Ngày Tạo"
                    style={{ width: '20%' }}
                />
                <Column
                    body={(rowData) => (
                        <Button
                            icon="pi pi-pencil"
                            rounded
                            outlined
                            severity="warning"
                            onClick={() => btnEdit(rowData)}
                        />
                    )}
                    header="Sửa"
                    style={{ width: '5%' }}
                />
                <Column
                    body={(rowData) => (
                        <Button
                            icon="pi pi-times"
                            rounded
                            outlined
                            severity="danger"
                            onClick={() => btnDelete(rowData.id)}
                        />
                    )}
                    header="Xóa"
                    style={{ width: '5%' }}
                />
            </DataTable>
        </div>
    );
}
