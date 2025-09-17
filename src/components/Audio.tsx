import React from 'react';

const Audio: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверка: является ли источник Yandex Music
  const isYandexMusic = src.includes('music.yandex.ru');
  // Проверка: является ли источник VK Music (более гибкий поиск)
  const isVKMusic = src.startsWith('https://vk.com/audio');

  return (
    <div className="item item-audio">
      {isYandexMusic ? (
        // Для Yandex Music используем iframe с размерами, как у видео
        <iframe
          src={src}
          style={{
            border: 'none',
            width: '100%',
            height: '315px', // ← Высота как у видео
          }}
          allow="clipboard-write"
          title={title || 'Yandex Music'}
          loading="lazy"
        />
      ) : isVKMusic ? (
        // Для VK Music используем iframe
        <iframe
          src={src}
          width="100%"
          height="315px"
          title={title || 'VK Music'}
          loading="lazy"
        />
      ) : (
        // Для остальных аудио используем стандартный <audio>
        <audio
          src={src}
          controls
          style={{ width: '100%' }}
        />
      )}
      {title && <h3>{title}</h3>}
      <p>Прослушиваний: {views}</p>
    </div>
  );
};

export default Audio;
