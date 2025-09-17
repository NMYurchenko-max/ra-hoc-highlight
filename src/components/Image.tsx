import React from 'react';

const Image: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Используем import.meta.glob для динамического импорта изображений
  const images = import.meta.glob<{ default: string }>('**/*.jpg', { eager: true });
  const imagePath = images[src]?.default || src;

  return (
    <div className="item item-image">
      <img
        src={imagePath}
        width="100%"
        height="315px"
        alt={title || 'Изображение'} // Подпись по умолчанию
        loading="lazy"
      />
      {title && <h3>{title}</h3>} {/* Отображаем заголовок только если он есть */}
      <p>Просмотров: {views}</p>
    </div>
  );
};

export default Image;

