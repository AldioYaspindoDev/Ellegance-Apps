import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const GetAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            success: true,
            message: "berhasil mendapatkan data",
            data: users
        })
    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal mendapatkan data",
            error: error.message
        })
    }
}

export const Register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(404).json({
                message: "data harus diisi",
            })
        }

        const hash_password = await argon2.hash(password);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hash_password,
        });

        res.status(200).json({
            success: true,
            message: "berhasil membuat akun",
            data: newUser
        });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal membuat akun",
            error: error.message
        });
    }
}

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).json({
                message: "data harus diisi",
            })
        }

        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(404).json({
                message: "user tidak ditemukan",
            })
        }

        const isPassword = await argon2.verify(user.password, password);

        if(!isPassword){
            return res.status(400).json({
                message: "password salah",
            })
        };

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        },
         process.env.JWT_SECRET || 'secret',
        {
            expiresIn: "1d"
        });
        
        res.status(200).json({
            success: true,
            message: "berhasil login",
            token: token,
            data: user
        });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal login",
            error: error.message
        });
    }
}

export const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
         res.status(200).json({
            success: true,
            message: "berhasil mendapatkan user",
            data: user
        });

    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal mendapatkan user",
            error: error.message
        });
    }
}

export const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
         if(!username || !email || !password){
            return res.status(404).json({
                message: "data tidak lengkap",
            })
        }
        
        const hash_password = await argon2.hash(password);
        
        await User.update({
            username, email, password: hash_password
        }, { where: { id } });

        const updatedUser = await User.findByPk(id);

        res.status(200).json({
            success: true,
            message: "berhasil update",
            data: updatedUser
        });

    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal update",
            error: error.message
        });
    }
}

export const DeleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                message: "data tidak ditemukan",
            })
        }
        await User.destroy({ where: { id } });
         res.status(200).json({
            success: true,
            message: "berhasil delete"
        });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: "gagal delete",
            error: error.message
        });
    }
}

export const GetMe = async (req, res) => {
    try {
        // req.user didapat dari middleware verifyToken
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role'] // Kita tidak mengirim password
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data user berhasil diambil",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}