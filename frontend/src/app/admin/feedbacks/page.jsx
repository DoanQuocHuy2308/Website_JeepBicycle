"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Image } from 'primereact/image';
import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
export default function page() {
    const [feedbacks, setFeedbacks] = useState([]);
    const msgs = useRef(null);
    useEffect(() => {
        const fetchProductByType = async () => {
            const response = await axios.get('http://localhost:3000/feedbacks/getAllFeedbacks');
            const data = response.data;
            setFeedbacks(data);
        };
        fetchProductByType();
    }, [])
    const image = (value) => {
        return <Image src={`http://localhost:3000${value}`} alt="Image" width="150" height='150' preview />
    }
    const star = (value) => {
        return <Rating value={value} readOnly cancel={false} />;
    }
    const date = (value) => {
        const d = new Date(value);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    const products = (value) => {
        return (
            <div className="">
                <p className="text-lg font-semibold text-gray-800">{value.product_name}</p>
                <span className="text-sm text-gray-500 italic">Màu Sắc: {value.color}</span>
            </div>
        );
    };

    const deleteFeedback = async (value) => {
        try {
            if (!window.confirm(`Bạn có chắc chắn muốn xóa bình luận này?`)) return;

            await axios.delete(`http://localhost:3000/feedbacks/deleteFeedbacks`, {
                params: {
                    id: value
                }
            });

            msgs.current?.show([
                {
                    severity: 'success',
                    summary: 'Thông báo',
                    detail: `Xóa bình luận thành công!`,
                    life: 3000
                }
            ]);
            setFeedbacks(feedbacks.filter((f) => f.id !== value));
        } catch (err) {
            msgs.current?.show([
                {
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: err.response?.data?.message || 'Đã xảy ra lỗi khi xóa bình luận.',
                    life: 3000
                }
            ]);
        }
    };
    return (
        <div>
            <Toast ref={msgs} />
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">Danh Sách Feedbacks về sản phẩm</h2>
            <DataTable value={feedbacks} tableStyle={{ minWidth: '50rem' }}>
                <Column field="user_name" header="Name" sortable style={{ width: '10%' }}></Column>
                <Column body={(value) => products(value)} header="Product" sortable style={{ width: '20%' }}></Column>
                <Column body={(value) => image(value.image_path)} header="Image" sortable style={{ width: '10%' }}></Column>
                <Column body={(value) => star(value.star)} header="Star" sortable style={{ width: '5%' }}></Column>
                <Column field="content" header="Content" sortable style={{ width: '20%' }}></Column>
                <Column body={(value) => date(value.updated_at)} header="Date" sortable style={{ width: '10%' }}></Column>
                <Column body={(value) => <Button icon="pi pi-times" severity="danger" onClick={() => deleteFeedback(value.id)} aria-label="Cancel" />} header="Delete" style={{ width: '5%' }}></Column>
            </DataTable>
        </div>
    );
};
