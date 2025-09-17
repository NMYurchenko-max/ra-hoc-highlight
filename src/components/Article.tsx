import React from 'react';

/**
 * Компонент Article для отображения статьи
 * 
 * @param {string} title - Заголовок статьи
 * @param {number} views - Количество просмотров (обязательный пропс)
 * @param {string} [href] - Опциональная ссылка на статью
 * @param {string} [description] - Описание статьи
 */
const Article: React.FC<{
  title?: string;
  views: number; // Обязательный пропс
  href?: string; // Используем href вместо url для ясности
  description?: string;
}> = ({ title, views, href, description }) => {
  return (
    <div className="item item-article">
      <h3>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </h3>
      {description && <p className="description">{description}</p>}
      <p className="views">Прочтений: {views}</p>
    </div>
  );
};

export default Article;
