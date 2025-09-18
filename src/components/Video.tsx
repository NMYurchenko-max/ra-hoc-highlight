import React from 'react';
import ReactPlayer from 'react-player';

/**
 * Компонент Video с использованием React Player v4
 * Отображает видео из различных источников: YouTube, Vimeo, VK и локальные файлы `.mp4`.
 * Поддерживает отображение заголовка и количества просмотров.
 * `allow = "autoplay; fullscreen"` для поддержки воспроизведения и полноэкранного режима.
 * `loading = "lazy"` откладывает загрузку до видимости элемента.
 * `controls` включает стандартные элементы управления.
 * @param {string} src - Ссылка на видео (YouTube, Vimeo, VK и т.д.)
 * @param {number} views - Количество просмотров
 * @param {string} [title] - Опциональный заголовок
 */
const Video: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверяем, что src не пустой
  if (!src) {
    return (
      <div className="item item-video">
        <p>Ошибка: Путь к видео не указан</p>
      </div>
    );
  }

  // Проверяем, что views не пустой
  if (views === undefined || views === null) {
    return (
      <div className="item item-video">
        <p>Ошибка: Количество просмотров не указано</p>
      </div>
    );
  }

  // Проверка: является ли источник VK
  const isVK = src.includes('vk.com');
  // Проверка: является ли источник локальным файлом
  const isLocal = src.startsWith('../');

  // Используем import.meta.glob для динамического импорта локальных видеофайлов
  const videos = import.meta.glob<{ default: string }>(
    '../**/*.mp4', // Упрощённый путь
    { eager: true }
  );
  const videoPath = isLocal ? videos[src]?.default : src;

  return (
    <div className="item item-video">
      {/* Отображение iframe для видео из VK */}
      {isVK ? (
        <iframe
          src={src}
          allow="autoplay; fullscreen"
          title={title || ''}
          width="100%"
          height="315px"
          loading="lazy"
        />
      ) : isLocal ? (
        <div className="react-player-wrapper">
          {/* Проверка наличия локального видео */}
          {videoPath ? (
            <ReactPlayer
              src={videoPath}
              controls
              width="100%"
              height="315px"
            />
          ) : (
            <p>Видео не найдено</p>
          )}
        </div>
      ) : (
        <div className="react-player-wrapper">
          {/* Отображение внешнего видео (например, YouTube) */}
          <ReactPlayer
            src={src}
            controls
            width="100%"
            height="315px"
          />
        </div>
      )}

      {/* Отображение заголовка, если он указан */}
      {title && <h3>{title}</h3>}
      {/* Отображение количества просмотров */}
      <p className="views">Просмотров: {views}</p>
    </div>
  );
};

export default Video;
