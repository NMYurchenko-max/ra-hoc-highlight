import React from 'react';
import ReactPlayer from 'react-player';

/**
 * Компонент Video с использованием React Player v4
 * 
 * @param {string} src - Ссылка на видео (YouTube, Vimeo, VK и т.д.)
 * @param {number} views - Количество просмотров
 * @param {string} [title] - Опциональный заголовок
 */
const Video: React.FC<{
  src: string; // Теперь это пропс src
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверка: является ли источник VK
  const isVK = src.includes('vk.com');
  const isLocal = src.startsWith('../'); // Локальный файл

  // Используем import.meta.glob для динамического импорта видеофайлов
  const videos = import.meta.glob<{ default: string }>('./../**/*.mp4', { eager: true });
  const videoPath = isLocal ? videos[src]?.default : src;
  return (
    <div className="item item-video">
      {isVK ? (
        // Для VK используем iframe напрямую
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
          {/*Проверяется, есть ли видео, если есть, то используется ReactPlayer */}
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
          <ReactPlayer
            src={src} // Внешнее видео (YouTube и т.д.)
            controls
            width="100%"
            height="315px"
          />
        </div>
      )}
      {title && <h3>{title}</h3>}
      <p className="views">Просмотров: {views}</p>
    </div>
  );
};

export default Video;


