const Imageproducts = require('../models/imageproducts')

exports.getAllImageproducts = async (req, res) => {
	try {

		const imageproducts = await Imageproducts.getAllImageproducts();
		res.status(200).send(imageproducts);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getImageproductsById = async (req, res) => {
	try {
		const { id } = req.query;
		const imageproducts = await Imageproducts.getImageproductsById(id);
		if (!imageproducts) return res.status(404).send({ message: 'imageproducts không tìm thấy' });
		res.status(200).send(imageproducts);
	} catch (error) {
		res.status(500).send({ message: error.message });
	};
};

let pathIMG = '/public/images/default.jpeg';
exports.createImageproducts = async (req, res) => {
	try {
		const { product_id } = req.body;
		let idImage = pathIMG;
		if (req.file) {
			idImage = "/public/images/" + req.file.filename;
		}
		await Imageproducts.createImageproducts(product_id, idImage);
		res.status(201).send({ message: 'Tạo thành công', idImage });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};
exports.updateImageproducts = async (req, res) => {
	try {
		let { id, product_id, image } = req.body;
		if (!id || !product_id) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const path = await Imageproducts.getImageById(id);
		if (!image || image === "null" || image === "undefined") {
			if (path != pathIMG && path) {
				Imageproducts.deleteFile(path);
			}
			image = pathIMG;
		} else {
			image = path;
		}
		if(req.file) {
			if (path != pathIMG && path) {
				Imageproducts.deleteFile(path);
			}
			image = "/public/images/" + req.file.filename;
		}
		const updatedImageproducts = await Imageproducts.updateImageproducts(id, product_id, image);
		if (!updatedImageproducts) {
			return res.status(404).send({ message: 'Imageproducts not found' });
		}

		res.status(200).send({ message: 'Cập nhật Imageproducts thành công', updatedImageproducts });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	}
};


exports.deleteImageproducts = async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) {
			return res.status(400).send({ message: 'Vui lòng cung cấp ID hợp lệ' });
		}
		const path = await Imageproducts.getImageById(id);
		Imageproducts.deleteFile(path);
		const deleted = await Imageproducts.deleteOneImageproduct(id);
		if (!deleted) {
			return res.status(404).send({ message: 'Không tìm thấy Imageproducts' });
		}
		res.status(200).send({ message: 'Xóa Imageproducts thành công', deleted });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	}
};


