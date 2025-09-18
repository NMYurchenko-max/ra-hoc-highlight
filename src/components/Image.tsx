import React from 'react';

const Image: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверяем, что src не пустой
  if (!src) {
    return (
      <div className="item item-image">
        <p>Ошибка: Путь к изображению не указан</p>
      </div>
    );
  }

  // Используем import.meta.glob для динамического импорта изображений
  const images = import.meta.glob<{ default: string }>(
    '../**/*.{jpg,png,jpeg,gif}',
    { eager: true }
  );

  // Если локальный файл найден — используем его, иначе оригинальный src
  const imagePath = images[src]?.default || src;

  return (
    <div className="item item-image">
      <img
        src={imagePath}
        width={100}
        height={315}
        alt={title || 'Изображение'}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      {title && <h3>{title}</h3>}
      <p>Просмотров: {views}</p>
    </div>
  );
};

export default Image;
