import React from 'react';

const Audio: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  // Проверяем, что src не пустой
  if (!src) {
    return (
      <div className="item item-audio">
        <p>Ошибка: Путь к аудио не указан</p>
      </div>
    );
  }

  // Проверяем, что views не пустой
  if (views === undefined || views === null) {
    return (
      <div className="item item-audio">
        <p>Ошибка: Количество прослушиваний не указано</p>
      </div>
    );
  }

  // Проверка: является ли источник Yandex Music
  const isYandexMusic = src.includes('music.yandex.ru');
  // Проверка: является ли источник VK Music
  const isVKMusic = src.startsWith('https://vk.com/audio');

  // Используем import.meta.glob для динамического импорта локальных аудиофайлов
  const audios = import.meta.glob<{ default: string }>(
    '../audio/**/*.{mp3,wav,aac}',
    { eager: true }
  );
  const audioPath = audios[src]?.default || src;

  // Логируем путь для диагностики
  console.log('Аудио-путь:', audioPath);

  return (
    <div className="item item-audio">
      {/* Для Yandex Music используем iframe */}
      {isYandexMusic ? (
        <iframe
          src={src}
          style={{
            border: 'none',
            width: '100%',
            height: '315px',
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
        <div className="audio-wrapper">
          <audio
            src={audioPath}
            controls
            style={{ width: '100%' }}
            onError={() => {
              console.error(`Ошибка загрузки аудио: ${audioPath}`);
            }}
          >
            Ваш браузер не поддерживает тег <code>audio</code>.
          </audio>
          {/* Сообщение об ошибке */}
          {!audioPath && (
            <p style={{ color: 'red' }}>Ошибка: Аудиофайл не найден</p>
          )}
        </div>
      )}
      {title && <h3>{title}</h3>}
      <p>Прослушиваний: {views}</p>
    </div>
  );
};

export default Audio;

