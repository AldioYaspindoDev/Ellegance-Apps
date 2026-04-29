import Bucket, { BucketItems } from "../models/bucket.js";
import Product from "../models/product.model.js";

export const addToBucket = async (req, res) => {
    try {
        const { userId, productId, selectedSize, quantity } = req.body;

        // 1. Cari bucket aktif milik user
        // Logika: Kita cari bucket yang statusnya 'active'. 
        // Jika user sudah punya keranjang yang belum dicheckout, kita pakai itu.
        let bucket = await Bucket.findOne({
            where: { userId, status: 'active' }
        });

        // 2. Jika tidak ada bucket aktif, buat bucket baru
        if (!bucket) {
            bucket = await Bucket.create({ userId, status: 'active' });
        }

        // 3. Cek apakah barang dengan ID dan Ukuran yang sama sudah ada di keranjang
        // Logika: Jika barang yang sama (termasuk ukurannya) sudah ada, kita cukup update jumlahnya.
        let item = await BucketItems.findOne({
            where: {
                BucketId: bucket.id,
                productId,
                selectedSize
            }
        });

        if (item) {
            // 4. Jika barang sudah ada, tambahkan quantity-nya
            item.quantity += parseInt(quantity) || 1;
            await item.save();
        } else {
            // 5. Jika barang belum ada, buat data baru di BucketItems
            item = await BucketItems.create({
                BucketId: bucket.id,
                productId,
                selectedSize,
                quantity: parseInt(quantity) || 1
            });
        }

        res.status(200).json({
            success: true,
            message: "Barang berhasil dimasukkan ke keranjang",
            data: item
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Gagal memasukkan barang ke keranjang",
            error: error.message
        });
    }
};

export const getBucket = async (req, res) => {
    try {
        const { userId } = req.params;

        // Mencari bucket aktif beserta isi barangnya (include BucketItems)
        const bucket = await Bucket.findOne({
            where: { userId, status: 'active' },
            include: [
                { 
                    model: BucketItems, 
                    as: 'items',
                    // Kita juga ingin mengambil detail produknya (nama, harga, dll)
                    include: [{ model: Product, as: 'product' }]
                }
            ]
        });

        if (!bucket) {
            return res.status(200).json({
                success: true,
                message: "Keranjang masih kosong",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan isi keranjang",
            data: bucket
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mendapatkan isi keranjang",
            error: error.message
        });
    }
};

export const deleteBucketItem = async(req, res) => {
    try {
        const { id } = req.params;

        const item = await BucketItems.findByPk(id);

        if(!item) {
            return res.status(404).json({
                success: false,
                message: "item tidak ditemukan"
            });
        }

        await item.destroy();

        res.status(200).json({
            success: true,
            message: "item berhasil dihapus dari keranjang"
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: "gagal delete item dari keranjang",
            error: error.message
        });
    }
}