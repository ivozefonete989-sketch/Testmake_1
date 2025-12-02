<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"/>
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1H5w8c2uvu76dYmnnpT7Ji5IXfDP03her

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ivozefonete989-sketch/Testmake_1)

Нажмите на кнопку выше для деплоя проекта на Netlify. После деплоя:

1. Перейдите в Site settings → Environment variables
2. Добавьте переменную окружения `GEMINI_API_KEY` со значением вашего Gemini API ключа
3. Сайт автоматически пересоберётся и будет доступен по публичной ссылке

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```
