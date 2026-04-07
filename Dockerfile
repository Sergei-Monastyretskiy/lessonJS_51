# Використовуємо офіційний образ Node.js LTS
FROM node:lts

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json та package-lock.json (якщо є)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту до контейнера
COPY . .

# Вказуємо, що додаток слухає на порту 3000
EXPOSE 3000

# Команда для запуску додатка
CMD ["node", "app.js"]
