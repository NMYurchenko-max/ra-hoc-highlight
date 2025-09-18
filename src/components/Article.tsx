import React from 'react';

/**
 * Компонент Article для отображения статьи
 * 
 * @param {string} [title] - Опциональный заголовок статьи.
 * @param {number} views - Обязательное количество прочтений.
 * @param {string} [href] - Опциональная ссылка на полную статью.
 * @param {string} [description] - Опциональное краткое описание статьи.
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
          // Отображаем ссылку, если href указан
          <a href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : (
          // Отображаем простой текст, если ссылка отсутствует
          <span>{title}</span>
        )}
      </h3>
      {/* Отображаем описание, если оно есть */}
      {description && <p className="description">{description}</p>}
      {/* Отображаем количество прочтений */}
      <p className="views">Прочтений: {views}</p>
    </div>
  );
};

export default Article;

