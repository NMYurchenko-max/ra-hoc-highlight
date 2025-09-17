## React. Mark popular media using HOC - Media Gallery

Подсвечивание блоков со статьями и видеозаписями с использованием Higher-Order Component (HOC).

### Демонстрация на GitHub Actions
![CI](https://github.com/NMYurchenko-max/ra-hoc-highlight/actions/workflows/web.yml/badge.svg)

[Deploy](https://nmyurchenko-max.github.io/ra-hoc-highlight/)

### 🌐 Живая демонстрация
![Скриншот приложения](./src/assets/media-gallery.png)


<video controls src="src/assets/media-gallery.mp4" title="Title" width="640" height="360"></video>

[Видео демонстрации](./src/assets/media-gallery.mp4)

### 📋 Задача

[Netology.Task](https://github.com/netology-code/ra16-homeworks/blob/ra-51/hoc/highlight/README.md)

###  Технологии

- **GitHub Actions** для CI/CD
- **React 19** с TypeScript
- **Vite** для сборки
- **CSS Modules** для стилизации
- **Использование TypeScript generics**:
  * для типобезопасности, позволил объединить в один компоненты Popular/New и упростил типобезопасность HOC.
  * Объединение медиоконтента в один компонент `MediaList` для упрощения работы с медиа-данными, и многократного переиспользования без дублирования кода.

## 📁 Структура проекта

```
src/
├── components/
│   ├── Article.tsx       # Компонент для статей
│   ├── Audio.tsx         # Компонент для аудио
│   ├── Image.tsx         # Компонент для изображений
│   ├── index.ts          # Экспорты компонентов
│   ├── Pdf.tsx           # Компонент для PDF
│   ├── Video.tsx         # Компонент для видео
│   ├── withMediaWrapper.tsx  # HOC для обёртки медиа
│   └── WrappedMedia.tsx  # Обёрнутый медиа-компонент
├── dataSources/
│   ├── localData.ts      # Локальные данные
│   └── media.json        # Данные медиа
├── models/
│   └── type.ts           # Типы данных
├── assets/               # Ассеты
├── audio/                # Аудио файлы
├── img/                  # Изображения
├── pdf/                  # PDF файлы
└── video/                # Видео файлы
```

### Реализация HOC withMediaWrapper

```tsx
const withMediaWrapper = <T extends { views: number }>(
  WrappedComponent: React.ComponentType<T>
) => {
  return function MediaWrapper(props: T) {
    const { views } = props;

    // Определяем класс и бейджик на основе просмотров
    let wrapperClass = 'wrap-item-regular';
    let badgeText = '';

    if (views <= 100) {
      wrapperClass = 'wrap-item-new';
      badgeText = 'New';
    } else if (views > 1000) {
      wrapperClass = 'wrap-item-popular';
      badgeText = 'Popular';
    }

    return (
      <div className={wrapperClass}>
        {badgeText && <span className="label">{badgeText}</span>}
        {/* Передаём все пропсы, включая views */}
        {React.createElement(WrappedComponent, props)}
      </div>
    );
  };
};
```

### Логика подсветки
- **Popular**: views >= 1000
- **New**: views <= 100

### Типы объеденены в один тип Media (благодаря generics)

```ts
type Media = VideoMedia | ArticleMedia;
interface BaseMedia {
  views: number;
  type: MediaType;
}
```
## Использование

```bash
# Клонирование репозитория
clone https://github.com/NMYurchenko-max/ra-hoc-highlight.git

# Установка зависимостей
cd ra-hoc-highlight
yarn install

# Запуск в режиме разработки
yarn dev

# Сборка для продакшена
yarn build

# Предпросмотр сборки
yarn preview

# Запуск тестов
yarn test

# Проверка типов
yarn typecheck

# Линтинг
yarn lint
```

## 📄 Лицензия

Авторские права (c) 2025 Н.Юрченко
[Лицензия ISC](LICENSE)

## PS:

1. В `React-player` v3 API изменился: пропса url больше нет,
вместо него используется src и внутри пакета имеет свои типы.
2. YouTube в России не работает, возможно поэтому его ссылки сбрасываются.
3. У меня не все задуманное получилось:
 - добавить в совместное использование галлереей (код прописан в компонентах)
  вариант загрузки из папок `src/img, video, audio`;
 - не удалось добавить iframe от "Янедекс музыка", и  ссылки на файлы облаков,...;
 - в связи с особенностями различных медиа переопеделяла визуализацию компанентов в App.css
  вручную для сохранения архитектуры галлереи.

🙏 Заранее благодарю если вы сочтете возможным поделиться опытом решения указанных проблем,
  это практически план будущих улучшений.

---

## Оптимизация производительности и устранение ошибки OOM

В проект были внесены следующие улучшения для повышения производительности 
и устранения ошибки недостатка памяти (OOM) при сборке:

- В `vite.config.ts` реализован код-сплиттинг (code splitting), 
  который разделяет крупные библиотеки (`react-player`, `dashjs`, `media-chrome`, `hls.js`) 
  на отдельные чанки. Это позволяет загружать их лениво и улучшает кэширование.
- Увеличен лимит предупреждения о размере чанка до 1000 кБ, 
  чтобы избежать лишних предупреждений при сборке.
- В `App.tsx` реализована ленивя загрузка (lazy loading) медиа-компонентов
  с использованием `React.lazy` и `Suspense`.
- В компонентах `Video.tsx` и `Image.tsx` добавлен атрибут `loading="lazy"` для медиа-элементов,
   что позволяет браузеру загружать их по мере необходимости.

Улучшены производительность загрузки и рендеринга, 
однако для загрузки реального медиоконтента по ссылкам GitHub Actions недостаточно памяти.
