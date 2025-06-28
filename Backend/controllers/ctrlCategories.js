const Categories = require('../models/categories')
const Image = require('../models/imageproducts');
exports.getAllCategories = async (req, res) => {
	try {

		const categories = await Categories.getAllCategories();
		res.status(200).send(categories);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getCategoriesAndQuantity = async (req, res) => {
	try {

		const categories = await Categories.getCategoriesAndQuantity();
		res.status(200).send(categories);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};


exports.getCategoriesById = async (req, res) => {
	try {

		const categories = await Categories.getCategoriesById(req.query.id);
		if (!categories) return res.status(404).send({ message: 'categories không tìm thấy' });
		res.status(200).send(categories);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
const DEFAULT_IMAGE = "/public/images/default.jpeg"; 

exports.createCategories = async (req, res) => {
    try {
        const { name, description } = req.body;
        let imagePath = DEFAULT_IMAGE;

        if (req.file) {
            imagePath = "/public/images/" + req.file.filename;
        }

        const categoriesId = await Categories.createCategories(name, description, imagePath);
        res.status(201).send({ message: 'Tạo thành công', categoriesId });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    }
};

exports.updateCategories = async (req, res) => {
    try {
        const { id } = req.query;
        const { name, description } = req.body;
        let imagePath = req.body.image;
        const categoriesData = await Categories.getCategoriesById(id);

        if (!req.file) {
            if (!imagePath || imagePath === "null" || imagePath === "undefined") {
                if (categoriesData.image && categoriesData.image !== DEFAULT_IMAGE) {
                    Image.deleteFile(categoriesData.image);
                }
                imagePath = DEFAULT_IMAGE;
            } else {
                imagePath = categoriesData.image;
            }
        } else {
            if (categoriesData.image && categoriesData.image !== DEFAULT_IMAGE) {
                Image.deleteFile(categoriesData.image);
            }
            imagePath = "/public/images/" + req.file.filename;
        }

        const updatedCategories = await Categories.updateCategories(id, name, description, imagePath);
        if (!updatedCategories) {
            return res.status(404).send({ message: 'Categories not found' });
        }

        res.status(200).send({ message: 'Cập nhật Categories thành công', updatedCategories });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    }
};

exports.deleteCategories = async (req, res) => {
	try {
		const { id } = req.query;
		const categoriesData = await Categories.getCategoriesById(id);
		pathIMG = categoriesData.image;
		if (categoriesData.image) {
			Image.deleteFile(categoriesData.image);
		}
		const deletedCategories = await Categories.deleteCategories(id);
		res.status(200).send({ message: 'Xóa Categories  thành công', deletedCategories });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

