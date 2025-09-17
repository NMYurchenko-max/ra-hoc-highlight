# Инструкция по использованию cross-env и изменению команд в package.json

## Зачем нужен cross-env

Переменная окружения `NODE_OPTIONS` используется для настройки параметров Node.js, например, для увеличения лимита памяти при сборке проекта. Однако установка переменных окружения в командах package.json работает по-разному на разных операционных системах:

- В Linux и macOS можно писать напрямую: `NODE_OPTIONS=--max-old-space-size=8192 vite build`
- В Windows такая запись не работает, и возникает ошибка: `'NODE_OPTIONS' не является внутренней или внешней командой`

Для кроссплатформенной поддержки используется пакет `cross-env`, который позволяет задавать переменные окружения одинаково на всех ОС.

---

## Когда и как менять команды в package.json

### 1. Если в командах используется установка переменных окружения (например, NODE_OPTIONS)

- Для поддержки Windows и других ОС замените запись:

```json
"build": "NODE_OPTIONS=--max-old-space-size=8192 vite build"
```

на

```json
"build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build"
```

- Для этого необходимо установить пакет `cross-env` как dev-зависимость:

```bash
yarn add -D cross-env
```

или

```bash
npm install --save-dev cross-env
```

### 2. Если команда не использует переменные окружения, менять ничего не нужно.

---

## Пример из проекта

В проекте `ra-hoc-highlight` команды сборки и запуска используют увеличенный лимит памяти для избежания ошибок OOM:

```json
"dev": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vite",
"build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 tsc -b && vite build",
"preview": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vite preview"
```

Для проектов с большими медиафайлами или сложными зависимостями рекомендуется 16 ГБ (16384):

```json
"dev": "cross-env NODE_OPTIONS=--max-old-space-size=16384 vite",
"build": "cross-env NODE_OPTIONS=--max-old-space-size=16384 tsc -b && vite build",
"preview": "cross-env NODE_OPTIONS=--max-old-space-size=16384 vite preview"
```

Разница: 8192 = 8 ГБ, 16384 = 16 ГБ. Для небольших проектов с заглушками достаточно 8 ГБ.

---

## Код-сплиттинг в Vite для оптимизации бандла

Для улучшения производительности и избежания ошибок OOM (недостатка памяти) при сборке, можно использовать код-сплиттинг в `vite.config.ts`. Это позволяет разделить крупные библиотеки на отдельные чанки, которые загружаются лениво.

### Настройка в vite.config.ts

Добавьте опции `build.rollupOptions.output.manualChunks` для разделения библиотек и увеличьте `chunkSizeWarningLimit` до 1000 кБ, чтобы избежать предупреждений о больших чанках.

Пример:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-player': ['react-player'],
          'dashjs': ['dashjs'],
          'media-chrome': ['media-chrome'],
          'hls.js': ['hls.js'],
          // Другие крупные библиотеки
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Увеличить лимит до 1000 кБ
  },
})
```

Это разделит указанные библиотеки на отдельные чанки, улучшит кэширование и снизит нагрузку на память при сборке.

---

## Ленивая загрузка компонентов в React

Ленивая загрузка (lazy loading) позволяет загружать компоненты только при необходимости, уменьшая начальный размер бандла и потребление памяти.

### Реализация с React.lazy и Suspense

1. Импортируйте компоненты лениво:
   ```tsx
   const LazyComponent = React.lazy(() => import('./Component'));
   ```

2. Оберните в Suspense с fallback:
   ```tsx
   <Suspense fallback={<div>Загрузка...</div>}>
     <LazyComponent />
   </Suspense>
   ```

3. Для медиа-элементов добавьте `loading="lazy"`:
   ```tsx
   <img src="image.jpg" loading="lazy" alt="Изображение" />
   <video src="video.mp4" loading="lazy" controls />
   ```

В проекте `ra-hoc-highlight` ленивая загрузка применяется к медиа-компонентам в `App.tsx`, чтобы избежать загрузки всех компонентов сразу.

---

## Итог

- Используйте `cross-env` для установки переменных окружения в скриптах package.json, если проект должен работать на Windows.
- Устанавливайте `cross-env` как dev-зависимость.
- Меняйте команды в package.json, добавляя `cross-env` перед переменной окружения.
- Если не используете переменные окружения, менять команды не нужно.
- Применяйте код-сплиттинг в `vite.config.ts` для разделения крупных библиотек.
- Реализуйте ленивую загрузку компонентов для оптимизации производительности.

---

Если нужна помощь с настройкой или возникли вопросы — обращайтесь.
