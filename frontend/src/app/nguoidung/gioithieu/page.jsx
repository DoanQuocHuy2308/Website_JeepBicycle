'use client';
import Link from "next/link";
import styleGioiThieu from "@/styles/gioithieu.module.css";
import Image from "next/image";
import img1 from "@/ImageJeepBicycle/GioiThieu/GioiThieu06.png";
import img2 from "@/ImageJeepBicycle/GioiThieu/GioiThieu07.png";
import img3 from "@/ImageJeepBicycle/GioiThieu/GioiThieu09.png";
import {Helmet} from "react-helmet";

const Section = ({ title, content, image, reverse }) => {
    return (
        <div className={`flex flex-col md:flex-row items-center mb-12 ${reverse ? "md:flex-row-reverse" : ""}`}>
            <div className="md:w-1/2 px-4">
                <h2 className={styleGioiThieu.titleContent}>{title}</h2>
                {Array.isArray(content) ? (
                    <ul className="list-none">
                        {content.map((item, index) => (
                            <li key={index} className={styleGioiThieu.contentTitle}>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styleGioiThieu.contentTitle}>{content}</p>
                )}
            </div>
            <div className="md:w-1/2 px-4">
                <Image src={image} alt={title} className="w-full rounded-4xl" />
            </div>
        </div>
    );
};
export default function GioiThieu() {
    function pageLienHe() {
        window.location.href = "/nguoidung/trangchu";
    }
    return (
        <div>
            <Helmet>
            <meta charSet="utf-8" />
            <title>GioiThieu</title>
            </Helmet>
            <div className={`${styleGioiThieu.background} w-full h-55 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleGioiThieu.title}>Về Chúng Tôi</h2>
                    <p className={styleGioiThieu.content}><Link href="/nguoidung/trangchu">Trang Chủ</Link> » Giới thiệu về JeepBicycle Việt Nam</p>
                </div>
            </div>
            <div className="container mx-auto max-w-7xl my-16 px-4">
                <Section
                    title="Sứ mệnh"
                    content="Sứ mệnh của Jeep Bicycle Vietnam là đóng góp vào quá trình nâng cao sức khỏe người Việt và sự phát triển bền vững của cộng đồng bằng cách khuyến khích sử dụng xe đạp, giảm thiểu ô nhiễm môi trường và tăng cường kết nối giữa con người với nhau."
                    image={img1}
                />
                <Section
                    title="Tầm nhìn"
                    content="Tầm nhìn của chúng tôi là xây dựng một cộng đồng người đi xe đạp lớn mạnh với hơn 1 triệu thành viên tham gia vào năm 2030, tăng cường sức khỏe thúc đẩy sự gắn kết và chia sẻ niềm đam mê xe đạp."
                    image={img2}
                    reverse
                />
                <Section
                    title="Giá trị cốt lõi"
                    content={["Passion: ĐAM MÊ", "Adventure: KHÁM PHÁ", "Freedom: TỰ DO", "Authenticity: CÁ TÍNH RIÊNG"]}
                    image={img3}
                />
            </div>
            <div className={`${styleGioiThieu.footerbackground} w-full h-72 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleGioiThieu.footertitle}>Liên hệ với chúng tôi</h2>
                    <p className={`${styleGioiThieu.footercontent} w-7xl`}>Chúng tôi xây dựng một đội ngũ chuyên viên và tư vấn viên chuyên nghiệp, giàu kinh nghiệm, có kiến thức chuyên môn sâu sắc và đam mê với lĩnh vực xe đạp. Sứ mệnh của chúng tôi là luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của khách hàng về các loại xe, mẫu mã, chính sách và dịch vụ hậu mãi.</p>
                    <button onClick={pageLienHe} className={`p-4 ${styleGioiThieu.footerbutton} w-2xs rounded-2xl`}>Liên hệ chúng tôi ngay &#62;</button>
                </div>
            </div>
        </div>
    );
}
