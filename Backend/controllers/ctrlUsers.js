const Users = require('../models/users')
const Image = require('../models/imageproducts');
const Cart = require('../models/cart');
const Feedbacks = require('../models/feedbacks');
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.getAllUsers();
        res.status(200).send(users);
    } catch (error) {

        res.status(500).send({ message: error.message });
    };
};

exports.getUsersById = async (req, res) => {
    try {
        const users = await Users.getUsersById(req.query.id);
        if (!users) return res.status(404).send({ message: 'users không tìm thấy' });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};
let pathIMG = '/public/images/default.jpeg';
exports.createUsers = async (req, res) => {
    try {
        const { username, password, name, birthday, sex, address, email, phone, role_user, ban } = req.body;
        if (!username || !password || !name || !birthday || !sex || !address || !email || !phone || !role_user) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc" });
        }
        if (req.file) {
            pathIMG = "/public/images/" + req.file.filename;
        }
        const usersId = await Users.createUsers(username, password, name, birthday, sex, address, email, phone, pathIMG, role_user, ban);

        res.status(201).send({ message: "Tạo thành công", usersId });
    } catch (error) {
        res.status(500).send({ message: "Lỗi server", error: error.message });
    }
};

exports.updateUsers = async (req, res) => {
    try {
        const { id } = req.query;
        let {
            username, password, name, birthday, sex,
            address, email, phone, image, role_user, ban
        } = req.body;

        const userData = await Users.getUsersById(id);
        if (!userData) {
            return res.status(404).send({ message: 'Users not found' });
        }
        if (!req.file) {
            if (!image || image === "null" || image === "undefined") {
                if (userData.image && userData.image !== pathIMG) {
                    Image.deleteFile(userData.image);
                }
                image = pathIMG;
            } else {
                image = userData.image;
            }
        }
        if (req.file) {
            if (userData.image && userData.image !== pathIMG) {
                Image.deleteFile(userData.image);
            }
            image = "/public/images/" + req.file.filename;
        }

        const updatedUsers = await Users.updateUsers(
            id, username, password, name, birthday, sex,
            address, email, phone, image, role_user, ban
        );

        if (!updatedUsers) {
            return res.status(400).send({ message: 'Cập nhật thất bại' });
        }

        res.status(200).send({ message: 'Cập nhật Users thành công', updatedUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    }
};


exports.deleteUsers = async (req, res) => {
    try {
        const { id } = req.query;
        const userData = await Users.getUsersById(id);
        const cart = await Cart.getCartById(id);
        if (!userData) {
            return res.status(404).send({ message: 'Users không tồn tại' });
        }
        if (cart) {
            await Cart.deleteCartDetail(cart.id);
        }
        await Cart.deleteCartUser(id);
        await Feedbacks.deleteFeedbackByUser(id);
        const deletedUsers = await Users.deleteUsers(id);
        if (userData.image) {
            Image.deleteFile(userData.image);
        }
        res.status(200).send({ message: 'Xóa Users thành công', deletedUsers });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
};


