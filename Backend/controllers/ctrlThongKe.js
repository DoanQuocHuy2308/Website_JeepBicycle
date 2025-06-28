const ThongKe = require('../models/thongke')

exports.ThongKeProductByType = async (req, res) => {
    try {
        const data = await ThongKe.ThongKeProductByType();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
exports.ThongKeDonHangTheoThang = async (req, res) => {
    try {
        const data = await ThongKe.ThongKeDonHangTheoThang();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
exports.thongkeKhachHangMuaNhieu = async (req, res) => {
    try {
        const data = await ThongKe.thongkeKhachHangMuaNhieu();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
