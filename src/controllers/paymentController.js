import { snap } from "../config/midtrans.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/product.model.js";
import sequelize from "../config/sequelize.js";


export const createTransaction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { orderId, email, username, item_details } = req.body;

        if (!item_details || item_details.length === 0) {
            return res.status(400).json({ success: false, message: "Item details cannot be empty" });
        }

        let calculateGrossAmount = 0;
        const validatedItems = [];

        // Validasi harga dari database (Security)
        for (const item of item_details) {
            const product = await Product.findByPk(item.id);
            if (!product) {
                throw new Error(`Product with ID ${item.id} not found`);
            }
            
            const price = parseFloat(product.price);
            calculateGrossAmount += (price * item.quantity);
            
            validatedItems.push({
                id: item.id,
                price: price,
                quantity: item.quantity,
                name: product.productName
            });
        }

        // save To table Order
        const neworder = await Order.create({
            orderId: orderId,
            grossAmount: calculateGrossAmount,
            customerEmail: email,
            customerName: username, // Fixed: use username instead of undefined name
            status: 'pending'
        }, { transaction: t });

        // save to Table OrderItem
        for (const item of validatedItems) {
            await OrderItem.create({
                orderId: neworder.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }, { transaction: t });
        }

        // proses midtrans
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: calculateGrossAmount,
            },
            item_details: validatedItems.map(item => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name
            })),
            customer_details: {
                first_name: username,
                email: email
            }
        };

        const transaction = await snap.createTransaction(parameter);

        // Commit transaction if everything is okay
        await t.commit();

        res.status(201).json({
            success: true,
            message: "berhasil membuat transaksi",
            token: transaction.token,
            redirectUrl: transaction.redirect_url,
        });

    } catch (error) {
        // Rollback if any error occurs
        await t.rollback();
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Gagal membuat transaksi",
            error: error.message 
        });
    }
}

export const getOrdersByUser = async (req, res) => {
    try {
        const { email } = req.params;

        const orders = await Order.findAll({
            where: { customerEmail: email },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan riwayat pesanan",
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Gagal mendapatkan riwayat pesanan",
            error: error.message
        });
    }
};