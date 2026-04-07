const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expressapp';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Схема для тестових даних
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', ItemSchema);

// Головна сторінка
app.get('/', (req, res) => {
    res.json({
        message: 'Вітаємо! Express додаток працює в Docker контейнері! 🚀',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'підключено ✓' : 'не підключено ✗'
    });
});

// Отримати всі items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Створити новий item
app.post('/api/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({
            success: true,
            message: 'Item створено!',
            data: item
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Отримати item за ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item не знайдено'
            });
        }
        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Видалити item
app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item не знайдено'
            });
        }
        res.json({
            success: true,
            message: 'Item видалено!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Підключення до MongoDB та запуск сервера
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✓ Підключено до MongoDB');
        app.listen(PORT, () => {
            console.log(`✓ Сервер запущено на порту ${PORT}`);
            console.log(`✓ Відкрийте http://localhost:${PORT} у браузері`);
        });
    })
    .catch((error) => {
        console.error('✗ Помилка підключення до MongoDB:', error.message);
        process.exit(1);
    });

// Обробка помилок підключення
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
