const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const SendEmail = require('../middleware/email')
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
    }
    const user = await Users.login(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role_user,
      },
      process.env.KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error('Lỗi server login:', error);
    return res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
exports.register = async (req, res) => {
    try {
        const { username, password, name, birthday, address, email, phone } = req.body;
        if (!username || !password || !name || !birthday || !address || !email || !phone) {
            return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
        }
        const user = await Users.register(username, password, name, birthday, address, email, phone);
        res.status(201).send({ message: 'Đăng ký thành công', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: 'Vui lòng cung cấp email' });
        }
        const user = await Users.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'Email này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Email đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}

exports.getUserByPhone = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).send({ message: 'Vui lòng cung cấp số điện thoại' });
        }
        const user = await Users.getUserByPhone(phone);
        if (!user) {
            return res.status(404).send({ message: 'Số điện thoại này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Số điện thoại đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.getUserByUsername = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).send({ message: 'Vui lòng cung cấp tên đăng nhập' });
        }
        const user = await Users.getUserByUsername(username);
        if (!user) {
            return res.status(404).send({ message: 'Tên đăng nhập này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Tên đăng nhập đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
let otpStore = new Map();
exports.forgotPasswordByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Vui lòng cung cấp email" });
        }

        const user = await Users.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "Email không tồn tại" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 5 * 60 * 1000;

        otpStore.set(email, { otp, expiresAt, id:user.id });
        const subject = "Xác thức OTP";
        const message = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05); padding: 30px;">
        <h2 style="color: #2c7be5; text-align: center;">Xác thực đặt lại mật khẩu</h2>
        <p>Xin chào <strong>${user.name || ''}</strong>,</p>
        <p>Bạn hoặc ai đó đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p>Mã OTP xác thực của bạn là:</p>
        <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; background-color: #f0f4ff; padding: 15px 30px; border-radius: 8px; display: inline-block; color: #2c7be5; letter-spacing: 4px;">
                ${otp}
            </span>
        </div>
        <p>Mã OTP có hiệu lực trong <strong>2 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 14px; color: #999;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p style="font-size: 14px; color: #999;">Trân trọng,<br/>Đội ngũ hỗ trợ</p>
    </div>
</div>
`;

        const result = await SendEmail.sendEmail(email, subject, message);

        if (!result) {
            return res.status(500).send({ message: "Gửi email OTP thất bại" });
        }

        res.status(200).send({ message: "Gửi OTP thành công", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const saved = otpStore.get(email);

        if (!saved) return res.status(400).json({ message: 'OTP không tồn tại' });
        if (Date.now() > saved.expiresAt)
            return res.status(400).json({ message: 'OTP đã hết hạn' });

        if (otp !== saved.otp.toString())
            return res.status(400).json({ message: 'OTP không đúng' });
        otpStore.set(email, { ...saved, verified: true });

        res.json({ message: 'Xác minh OTP thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const saved = otpStore.get(email);

        if (!saved || !saved.verified) {
            return res.status(400).send({ message: "OTP chưa được xác thực hoặc hết hạn" });
        }
        if (!password) {
            return res.status(400).send({ message: "Vui lòng nhập mật khẩu mới" });
        }

        const updated = await Users.updatePassword(saved.id, password);
        if (!updated) {
            return res.status(500).send({ message: "Cập nhật mật khẩu thất bại" });
        }
        otpStore.delete(email);

        res.status(200).send({ message: "Đặt lại mật khẩu thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

exports.checkPassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        const check = await Users.checkPassword(id, password);
        res.status(200).send({ check }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        const check = await Users.updatePassword(id, password);
        res.status(200).send({ check }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};


