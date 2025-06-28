"use client";
import React, { useState, useEffect, useRef } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from 'primereact/dialog';
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
const infor = {
    id: 0,
    product_id: 0,
    image_path: "",
}
export default function Page() {
    const toast = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dataImages, setDataImages] = useState([]);
    const [form, setForm] = useState(false)
    const [checkAdd, setCheckAdd] = useState(false)
    const [checkUpdate, setCheckUpdate] = useState(false)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(infor)
    const [img, setImg] = useState(null)
    const fileUploadRef = useRef(null);
    const upLoad = (event) => {
        const file = event.files[0];
        const url = URL.createObjectURL(file);
        setImg(url);
        setImage((prev) => ({ ...prev, image_path: file }));
    };

    const clearImg = () => {
        setImg(null);
        setImage((prev) => ({ ...prev, image_path: null }));
        fileUploadRef.current?.clear();
    };
    useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products/getAllProducts");
            setProducts(res.data);
        } catch (error) {
            if (error?.response?.status === 403) {
                window.location.href = "/loginFolder/login";
            } else {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        }
    };
        fetchData();
    }, []);
    
        const fetchImages = async () => {
            try {
                const res = await axios.get("http://localhost:3000/image/getAllImageproducts");
                setDataImages(res.data);
            } catch (error) {
                if (error?.response?.status === 403) {
                    window.location.href = "/loginFolder/login";
                } else {
                    console.error("Lỗi khi lấy dữ liệu sử dụng:", error);
                }
            }
        };
    useEffect(() => {
        fetchImages();
    }, [])
    const imageTeamplete = (rowData) => {
        return <Image src={`http://localhost:3000${rowData.image_path}`} alt="Hình Ảnh" width="100" height="100" preview />
    }
    const selectedProductTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex items-center space-x-2">
                    <img
                        alt={option.name}
                        src={`http://localhost:3000${option.image}`}
                        className="w-5 h-5 object-cover rounded"
                    />
                    <p>{option.name}</p>
                    <span> / Màu sắc: {option.color}</span>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const productOptionTemplate = (option) => (
        <div className="flex items-center space-x-2">
            <img
                alt={option.name}
                src={`http://localhost:3000${option.image[0]}`}
                className="w-5 h-5 object-cover rounded"
            />
            <p>{option.name}</p>
            <span> / Màu sắc: {option.color}</span>
        </div>
    );
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const btnUpdate = (rowData) => {
        setImage({
            id: rowData.id,
            product_id: rowData.product_id,
            image_path: rowData.image_path
        });
        setImg(`http://localhost:3000${rowData.image_path}`);
        setSelectedProduct(products.find(p => p.id === rowData.product_id));
        setForm(true);
        setTitle("Cập nhật hình ảnh sản phẩm");
        setCheckUpdate(true);
        setCheckAdd(false);
    }
    const btnAdd = () => {
        setImage({
            id: 0,
            product_id: 0,
            image_path: ""
        });
        setImg(``);
        setSelectedProduct("");
        setForm(true);
        setTitle("Thêm hình ảnh sản phẩm")
        setCheckAdd(true)
        setCheckUpdate(false)
    }
    const handleAdd = async () => {
        if (!selectedProduct || !image.image_path) {
            toast.current.show({ severity: "error", summary: "Lỗi", detail: "Vui lớn chọn sản phẩm", life: 3000 });
            return;
        };

        const formData = new FormData();
        formData.append("product_id", selectedProduct.id);
        formData.append("file", image.image_path);

        try {
            await axios.post("http://localhost:3000/image/createImageproducts", formData);
            toast.current.show({ severity: "success", summary: "Thành công", detail: "Thêm hình ảnh thành công", life: 3000 });
            setForm(false);
            setImg(null);
            setImage(infor);
            fileUploadRef.current.clear();
            fetchImages();
        } catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/image/deleteImageproducts`,
                {
                    params: { id: id }
                }
            );
            toast.current.show({ severity: "success", summary: "Thành Cống", detail: "Xóa hình ảnh", life: 3000 });
            setDataImages(dataImages.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpdate = async (id) => {
        if (!selectedProduct) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Vui lòng chọn sản phẩm",
                life: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("product_id", selectedProduct.id);
        formData.append("file", image.image_path);

        try {
            await axios.put("http://localhost:3000/image/updateImageproducts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Cập nhật hình ảnh thành công",
                life: 3000,
            });
            setForm(false);
            setImg(null);
            setImage(infor);
            fileUploadRef.current?.clear();
            fetchImages();
        } catch (error) {
            console.error("Lỗi cập nhật hình ảnh:", error);
            toast.current.show({
                severity: "error",
                summary: "Thất bại",
                detail: "Cập nhật hình ảnh thất bại",
                life: 3000,
            });
        }
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredImages, setFilteredImages] = useState([]);
    useEffect(() => {
        const filtered = dataImages.filter((img) => {
            const product = products.find(p => p.id === img.product_id);
            const matchName = product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchSelectedProduct = selectedProduct ? img.product_id === selectedProduct.id : true;
            return matchName && matchSelectedProduct;
        });
        setFilteredImages(filtered);
    }, [searchTerm, selectedProduct, dataImages, products]);

    return (
        <>
            <Toast ref={toast} />
            <h2 className="text-[28px] font-bold text-orange-600 mx-5 mt-6 mb-4">
                Quản Lý Hình Ảnh Sản Phẩm
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white mx-5 p-4 rounded-2xl shadow-sm space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <IconField iconPosition="left" className="w-full md:w-[400px]">
                        <InputIcon className="pi pi-search text-gray-400" />
                        <InputText
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 px-4 rounded-xl border border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                        />
                    </IconField>
                    <Dropdown
                        inputId="productDropdown"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.value)}
                        options={products}
                        optionLabel="name"
                        placeholder="Chọn sản phẩm"
                        filter
                        showClear
                        valueTemplate={selectedProductTemplate}
                        itemTemplate={productOptionTemplate}
                        className="w-full border border-gray-300 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out [&_.p-dropdown-clear-icon]:text-red-500 [&_.p-dropdown-clear-icon]:text-lg"
                        panelClassName="z-50"
                    />
                </div>
                <div className="w-full md:w-auto">
                    <Button
                        label="Thêm Sản Phẩm"
                        icon="pi pi-plus"
                        severity="success"
                        raised
                        onClick={() => btnAdd()}
                        className="w-full md:w-auto px-5 py-2 text-white font-semibold rounded-xl bg-green-500 hover:bg-green-600 shadow-md transition duration-200"
                    />
                </div>
            </div>

            <Dialog header={title} visible={form} style={{ width: '50vw' }} onHide={() => { if (!form) return; setForm(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 space-x-2 space-y-4">
                    <FloatLabel>
                        <InputText id="idhinhanh" value={image.id} disabled className="w-full" onChange={(e) => setImage({ ...image, id: e.target.value })} />
                        <label htmlFor="idhinhanh">Mã Hình Ảnh</label>
                    </FloatLabel>
                    <Dropdown
                        value={selectedProduct}
                        onChange={(e) => {
                            setSelectedProduct(e.value);
                            setImage(prev => ({ ...prev, product_id: e.value.id }));
                        }}
                        options={products}
                        optionLabel="name"
                        placeholder="Chọn sản phẩm"
                        filter
                        valueTemplate={selectedProductTemplate}
                        itemTemplate={productOptionTemplate}
                        className="w-full"
                        panelClassName="z-50"
                    />
                    <div className="col-span-2 mx-auto space-y-4">
                        <div className="w-[250px] h-[250px] rounded-xl overflow-hidden border-4 border-blue-500 shadow-md">
                            <img src={img || (image?.image_path ? `http://localhost:3000${image.image_path}` : 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxayzfkjvowpff')} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex space-x-3">
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
                </div>
                <div className="mt-6">
                    {checkAdd &&
                        <Button
                            type="submit"
                            label="Thêm"
                            security="success"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            onClick={handleAdd}
                        />}
                    {checkUpdate &&
                        <Button
                            type="submit"
                            label="Cập Nhật"
                            severity="success"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => handleUpdate(image.id)}
                        />}
                </div>
            </Dialog>
            <div className="m-5">
                <DataTable value={filteredImages} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column body={(rowData, { rowIndex }) => rowIndex + 1} header="STT" style={{ width: '5%' }}></Column>
                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                    <Column field="color" header="Color" style={{ width: '25%' }}></Column>
                    <Column body={(rowData) => imageTeamplete(rowData)} header="Image" style={{ width: '20%' }}></Column>
                    <Column body={(rowData) =>
                        <Button icon="pi pi-pencil" rounded raised severity="warning" onClick={() => btnUpdate(rowData)} />
                    } header="Update" style={{ width: '5%' }}></Column>
                    <Column body={(rowData) =>
                        <Button icon="pi pi-trash" rounded raised severity="danger" onClick={() => handleDelete(rowData.id)} />
                    } header="Delete" style={{ width: '5%' }}></Column>
                </DataTable>
            </div>
        </>
    );
}
