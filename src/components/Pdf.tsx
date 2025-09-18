import React from 'react';

/**
 * Компонент Pdf для отображения PDF-файлов
 * @param {string} src - Путь к PDF-файлу (локальный или внешний)
 * @param {number} views - Количество просмотров
 * @param {string} [title] - Опциональный заголовок
 */
const Pdf: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверки на пустые значения
  if (!src) return <div>Ошибка: Путь к PDF не указан</div>;
  if (views === undefined || views === null) return <div>Ошибка: Количество просмотров не указано</div>;
  if (views < 0) return <div>Ошибка: Количество просмотров не указано</div>

  // Используем import.meta.glob для динамического импорта локальных PDF-файлов
  const pdfs = import.meta.glob<{ default: string }>(
    '../**/*.pdf',
    { eager: true }
  );

  // Если локальный файл найден — используем его, иначе оригинальный src
  const pdfPath = pdfs[src]?.default || src;

  return (
    <div className="item item-pdf">
      <iframe
        src={pdfPath} // ❗ Используем pdfPath вместо src
        width="100%"
        height="315px"
        title={title || "PDF"}
        loading="lazy"
        style={{ overflow: 'hidden', objectFit: 'cover', border: 'none' }}
      />
      {title && <h3>{title}</h3>}
      <p className="views">Просмотров: {views}</p>
      </div>
  );
};

export default Pdf;
