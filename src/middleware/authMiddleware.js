import jwt from "jsonwebtoken";

// Middleware ini bertugas mengecek apakah user mengirimkan token yang valid
export const verifyToken = (req, res, next) => {
    // 1. Ambil token dari header 'Authorization'
    // Format biasanya: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Jika token tidak ada, kirim error
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Akses ditolak, silakan login terlebih dahulu" 
        });
    }

    // 3. Verifikasi token menggunakan secret key
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                success: false,
                message: "Token tidak valid atau sudah kadaluwarsa" 
            });
        }

        // 4. Jika valid, simpan data user ke dalam req.user agar bisa dipakai di controller
        req.user = decoded;
        next(); // Lanjut ke proses berikutnya
    });
};
