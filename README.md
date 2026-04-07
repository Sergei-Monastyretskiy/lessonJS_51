# Express + Docker + MongoDB

Це навчальний проект, який демонструє створення Express додатка, який працює в Docker контейнері з інтеграцією MongoDB.

## 🚀 Функціонал

- Express сервер з REST API
- Підключення до MongoDB
- CRUD операції для тестових даних
- Docker контейнеризація
- Docker Compose для оркестрації сервісів
- Volumes для синхронізації коду під час розробки

## 📋 Вимоги

- Docker (версія 20.10 або вище)
- Docker Compose (версія 2.0 або вище)

## 🛠️ Інструкція з розгортання

### 1. Клонуйте репозиторій

```bash
git clone https://github.com/Sergei-Monastyretskiy/lessonJS_51.git
cd lessonJS_46
```

### 2. Запустіть Docker контейнери

```bash
docker-compose up
```

Або запустіть у фоновому режимі:

```bash
docker-compose up -d
```

### 3. Перевірте роботу додатка

Відкрийте браузер і перейдіть за адресою:
```
http://localhost:3000
```

Ви побачите вітальне повідомлення з інформацією про стан підключення до MongoDB.

## 📡 API Endpoints

### Головна сторінка
```
GET http://localhost:3000/
```

### Отримати всі items
```
GET http://localhost:3000/api/items
```

### Створити новий item
```
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "name": "Тестовий елемент",
  "description": "Опис елемента"
}
```

### Отримати item за ID
```
GET http://localhost:3000/api/items/:id
```

### Видалити item
```
DELETE http://localhost:3000/api/items/:id
```

## 🧪 Тестування

### 1. Перевірка головної сторінки

```bash
curl http://localhost:3000
```

### 2. Створення тестового item

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Тест\",\"description\":\"Тестовий опис\"}"
```

### 3. Отримання всіх items

```bash
curl http://localhost:3000/api/items
```

## 🔄 Автоматичне оновлення під час розробки

Завдяки налаштованим volumes у [docker-compose.yml](docker-compose.yml), зміни в коді автоматично відображаються в контейнері. Nodemon автоматично перезапускає сервер при збереженні файлів.

### Спробуйте:

1. Відкрийте [app.js](app.js)
2. Змініть вітальне повідомлення в головному маршруті
3. Збережіть файл
4. Оновіть сторінку в браузері

## 🛑 Зупинка контейнерів

```bash
docker-compose down
```

Для видалення даних MongoDB:

```bash
docker-compose down -v
```

## 📂 Структура проекту

```
.
├── app.js                 # Головний файл Express додатка
├── package.json           # Залежності Node.js
├── Dockerfile             # Docker конфігурація
├── docker-compose.yml     # Docker Compose конфігурація
├── .dockerignore          # Файли, які ігноруються при білді
├── .gitignore             # Файли, які ігноруються Git
└── README.md              # Документація
```

## 🔧 Корисні команди

### Переглянути логи

```bash
docker-compose logs -f
```

### Переглянути логи конкретного сервісу

```bash
docker-compose logs -f app
docker-compose logs -f mongodb
```

### Перезапустити контейнери

```bash
docker-compose restart
```

### Зупинити контейнери

```bash
docker-compose stop
```

### Видалити контейнери та образи

```bash
docker-compose down --rmi all
```

### Підключитися до MongoDB через термінал

```bash
docker exec -it mongodb mongosh
```

## 📝 Особливості конфігурації

### Dockerfile

- Базовий образ: `node:lts`
- Робоча директорія: `/app`
- Порт: `3000`
- Команда запуску: `node app.js`

### Docker Compose

- **Сервіс app**: Express додаток з nodemon для автоматичного перезапуску
- **Сервіс mongodb**: MongoDB база даних з persistent volumes
- **Volumes**: Синхронізація коду для розробки
- **Environment**: Змінна `MONGODB_URI` для підключення до бази
- **Depends_on**: Гарантує запуск MongoDB перед додатком

## 🎯 Критерії виконання

- ✅ Dockerfile створено з правильною конфігурацією
- ✅ Docker Compose налаштовано з двома сервісами
- ✅ Express додаток запускається та обробляє HTTP запити
- ✅ Volumes працюють для автоматичного оновлення коду
- ✅ MongoDB інтегровано через змінну MONGODB_URI
- ✅ Depends_on налаштовано для правильного порядку запуску

## 📸 Скріншоти

Додайте сюди скріншоти:
1. Вивід `docker-compose up`
2. Браузер з http://localhost:3000
3. Результати тестування API
4. Автоматичне оновлення коду після змін

## 📚 Корисні посилання

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 👤 Автор

Виконано в рамках завдання курсу Hillel IT School

## 📄 Ліцензія

ISC
