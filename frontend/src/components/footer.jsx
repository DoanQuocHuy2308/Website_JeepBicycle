import styleFooter from '@/styles/footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import congchung from '@/ImageJeepBicycle/CongChung.png';
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 pt-30">
            <div className="container mx-auto px-6 pb-30 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 882.8 351.6"
                        className="fill-white w-50"
                    >
                        <g>
                            <g>
                                <path d="M736.6,189.8c-0.7,39.6,7.8,60.6,40.5,60.6c32.6,0,37.3-35.8,37.3-63c0-27.2-6.2-53.7-40.5-53.7 C752.9,133.8,737.4,150.1,736.6,189.8 M670.5,351.6V87.1h66.9V98c0,14.5,5.9,8.5,10.6,2.9c0.8-0.9,15.7-19.2,49.3-19.2 c33.5,0,85.6,23.3,85.6,105.8c0,63.8-31.1,110.4-84.8,110.4c-29.6,0-46.7-11.6-50.6-16.3c-3.9-4.6-9.4-5.4-9.4,0v70H670.5"></path>
                                <path d="M153.2,0h72.3v189.8c0,32.6-14,101.1-114.3,101.1C10.9,290.9,0,227.1,0,191.3v-35h70v34.2 c0,21,14,40.4,40.4,40.4c26.4,0,42.8-14.8,42.8-39.6V0z"></path>
                                <path d="M376.8,161c0-19.5-10.9-38.1-35.8-38.1c-24.1,0-32.7,17.1-32.7,38.1H376.8z M334.1,79.3 c56.8,0,106.6,21.8,106.6,122.1H306.1c0,31.9,13.2,45.1,36.5,45.1c23.3,0,31.1-18.7,31.1-18.7h66.1c0,28.8-39.7,67.7-99.6,66.9 c-68.4,0-101.9-50.6-101.9-102.7C238.5,140,268,79.3,334.1,79.3"></path>
                                <path d="M591.9,161c0-19.5-10.9-38.1-35.8-38.1c-24.1,0-32.7,17.1-32.7,38.1H591.9z M549.2,79.3 c56.8,0,106.5,21.8,106.5,122.1H521.2c0,31.9,13.2,45.1,36.6,45.1c23.3,0,31.1-18.7,31.1-18.7H655c0,28.8-39.7,67.7-99.6,66.9 c-68.5,0-101.9-50.6-101.9-102.7C453.5,140,483.1,79.3,549.2,79.3"></path>
                            </g>
                            <g>
                                <path d="M882.8,333.2c0,10.3-8.1,18.4-18.6,18.4c-10.4,0-18.7-8.1-18.7-18.4c0-10.1,8.3-18.1,18.7-18.1 C874.8,315.1,882.8,323.1,882.8,333.2z M850.2,333.2c0,8.1,6,14.5,14.2,14.5c8,0,13.8-6.4,13.8-14.4c0-8.1-5.9-14.6-13.9-14.6 C856.2,318.7,850.2,325.2,850.2,333.2z M861.4,342.7h-4.2v-18.1c1.7-0.3,4-0.6,7-0.6c3.4,0,5,0.6,6.3,1.3c1,0.8,1.8,2.2,1.8,4 c0,2-1.5,3.5-3.8,4.2v0.2c1.8,0.7,2.8,2,3.3,4.4c0.6,2.8,0.9,3.9,1.3,4.5h-4.5c-0.5-0.7-0.9-2.3-1.4-4.4c-0.3-2-1.4-2.9-3.8-2.9 h-2V342.7z M861.5,332.4h2c2.3,0,4.2-0.8,4.2-2.7c0-1.7-1.2-2.8-3.9-2.8c-1.1,0-1.9,0.1-2.3,0.2V332.4z"></path>
                            </g>
                        </g>
                    </svg>
                    <p className={`mt-5 ${styleFooter.styleContent}`}>
                        JEEP BICYCLE VIETNAM giữ đúng tinh thần chung của Thương hiệu JEEP với những Giá trị Cốt lõi không thay đổi.</p>
                    <p className={`mt-2 ${styleFooter.styleContent}`}>   Đề cao sự Khoẻ Khoắn – Trẻ Trung tràn đầy Năng lượng Tích cực – Cá tính riêng
                    </p>
                    <div className="mt-5">
                        <strong className={styleFooter.styleTitle}>CÔNG TY CỔ PHẦN THƯƠNG MẠI XUẤT NHẬP KHẨU JEEP</strong>
                        <p className={`mt-5 ${styleFooter.styleContent}`}>ĐKKD/MST: 0110740818 do sở KH&ĐT TP. Hà Nội cấp ngày 07/06/2024</p>
                        <p className={`mt-5 ${styleFooter.styleContent}`}>Trụ sở: Số 105 Nguyễn Bá Khoản, P.Trung Hòa, Q.Cầu Giấy, TP.Hà Nội, Việt Nam</p>
                    </div>
                </div>
                <div>
                    <h5 className={styleFooter.styleTitle}>Về chúng tôi</h5>
                    <ul className="mt-5 space-y-2 ">
                        <li><a href="#" className={styleFooter.content}>Giới thiệu chung</a></li>
                        <li><a href="#" className={styleFooter.content}>Liên hệ với chúng tôi</a></li>
                        <li><a href="#" className={styleFooter.content}>Sản phẩm</a></li>
                        <li><a href="#" className={styleFooter.content}>Tin tức</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className={styleFooter.styleTitle}>Hỗ trợ khách hàng</h5>
                    <ul className="mt-5 space-y-2 ">
                        <li><a href="#" className={styleFooter.content}>Chính sách thanh toán</a></li>
                        <li><a href="#" className={styleFooter.content}>Chính sách bảo hành</a></li>
                        <li><a href="#" className={styleFooter.content}>Chính sách bảo mật</a></li>
                        <li><a href="#" className={styleFooter.content}>Chính sách vận chuyển</a></li>
                        <li><a href="#" className={styleFooter.content}>Chính sách đổi trả</a></li>
                        <li><a href="#" className={styleFooter.content}>Chính sách giải quyết khiếu nại</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className={styleFooter.styleTitle}>Thông tin liên hệ</h5>
                    <p className={`mt-5 ${styleFooter.styleContent}`}>Địa chỉ:<span className={styleFooter.content}> Tòa nhà VinaHud - 105 Nguyễn Bá Khoản - Phường Trung Hòa - Quận Cầu Giấy - T.P Hà Nội</span></p>
                    <p className={`mt-5 ${styleFooter.styleContent}`}>Hotline/Zalo: <span className={styleFooter.content}>0978320093</span></p>
                    <p className={`mt-5 ${styleFooter.styleContent}`}>Email: <span className={styleFooter.content}>doanquochuy23082004@gmail.com</span></p>
                    <div className="flex space-x-2 mt-5">
                        <a href="#" className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition">
                            <FontAwesomeIcon icon={faFacebook} className="text-black hover:text-white" />
                        </a>
                        <a href="#" className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition">
                            <FontAwesomeIcon icon={faTiktok} className="text-black hover:text-white" />
                        </a>
                        <a href="#" className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition">
                            <FontAwesomeIcon icon={faInstagram} className="text-black hover:text-white" />
                        </a>
                        <a href="#" className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition">
                            <FontAwesomeIcon icon={faYoutube} className="text-black hover:text-white" />
                        </a>
                    </div>
                    <div className="mt-5">
                        <Image src={congchung} width={300}
                            alt="Logo"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center border-t-2 items-center  text-gray-500 py-4">
                <p>&copy; TRANG WEB NÀY ĐƯỢC DOÃN QUỐC HUY THIẾT KẾ TỪ TRANG WEB JEEPBICYCLE !</p>
            </div>
        </footer>
    )
}