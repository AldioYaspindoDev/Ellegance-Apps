// // src/scripts/cleanup.js
// import sequelize from '../config/sequelize.js';

// const cleanupDatabase = async () => {
//     try {
//         console.log("--- Memulai Pembersihan Index Duplikat ---");
        
//         // 1. Ambil semua index dari tabel users
//         const [results] = await sequelize.query("SHOW INDEX FROM users");
        
//         // 2. Filter index yang perlu dihapus (semua yang berhubungan dengan email)
//         // Kita biarkan PRIMARY key tetap ada.
//         const indexesToDrop = results
//             .filter(idx => idx.Key_name !== 'PRIMARY')
//             .map(idx => idx.Key_name);

//         // Menghilangkan duplikasi nama index dari hasil query
//         const uniqueIndexesToDrop = [...new Set(indexesToDrop)];

//         if (uniqueIndexesToDrop.length === 0) {
//             console.log("Tidak ada index duplikat yang ditemukan.");
//         } else {
//             for (const indexName of uniqueIndexesToDrop) {
//                 console.log(`Menghapus index: ${indexName}...`);
//                 // Query untuk menghapus index
//                 await sequelize.query(`ALTER TABLE users DROP INDEX \`${indexName}\``);
//             }
//             console.log(`Berhasil menghapus ${uniqueIndexesToDrop.length} index.`);
//         }

//         console.log("--- Pembersihan Selesai! ---");
//         process.exit(0);
//     } catch (error) {
//         console.error("Gagal membersihkan database:", error.message);
//         process.exit(1);
//     }
// };

// cleanupDatabase();

// src/scripts/cleanup.js
import sequelize from '../config/sequelize.js';

const cleanTableIndexes = async (tableName) => {
    try {
        console.log(`--- Membersihkan Index di Tabel: ${tableName} ---`);
        // Mengambil daftar index dari tabel
        const [results] = await sequelize.query(`SHOW INDEX FROM ${tableName}`);
        
        // Ambil nama-nama index yang bukan PRIMARY KEY
        const indexesToDrop = results
            .filter(idx => idx.Key_name !== 'PRIMARY')
            .map(idx => idx.Key_name);

        // Hilangkan nama yang duplikat dari array
        const uniqueIndexesToDrop = [...new Set(indexesToDrop)];

        if (uniqueIndexesToDrop.length === 0) {
            console.log(`Tidak ada index duplikat di tabel ${tableName}.`);
            return;
        }

        // Hapus satu per satu
        for (const indexName of uniqueIndexesToDrop) {
            console.log(`Menghapus index: ${indexName} dari ${tableName}...`);
            await sequelize.query(`ALTER TABLE ${tableName} DROP INDEX \`${indexName}\``);
        }
        console.log(`Berhasil membersihkan ${tableName}.`);
    } catch (err) {
        console.error(`Gagal membersihkan ${tableName}:`, err.message);
    }
};

const runCleanup = async () => {
    try {
        // Membersihkan kedua tabel yang bermasalah
        await cleanTableIndexes('users');
        await cleanTableIndexes('buckets');
        
        console.log("--- SEMUA PEMBERSIHAN SELESAI ---");
        process.exit(0);
    } catch (error) {
        console.error("Terjadi kesalahan fatal:", error.message);
        process.exit(1);
    }
};

runCleanup();
