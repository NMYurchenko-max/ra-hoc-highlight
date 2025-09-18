/**
 * Представляет собой элемент медиа с различными свойствами.
 *
 *@Property Type -Тип элемента медиа (например, «видео», «Статья», «Изображение», «Аудио», «PDF»).
 *@Property SRC -URL -адрес источника элемента медиа (необязательно).
 *@property href -URL -адрес гиперссылки, связанный с элементом носителя (необязательно).
 *@property Views -количество просмотров, которые есть в Media.
 *@Property Title -заголовок элемента медиа (необязательно).
 *@property Описание -описание элемента медиа (необязательно).
 * Импортировать в коде: import { type MediaItem } from './models/type';
 *@example
 *{
 *type: 'video',
 *src: 'https://example.com/video.mp4',
 *href: 'https://example.com/article',
 *views: 100,
 *title: 'Example Video',
 *description: 'This is an example video.'
 *}
 */
// ./models/type.ts
export type MediaItem =
  | {
      id: number;
      type: 'video' | 'image' | 'audio' | 'pdf';
      src: string;
      views: number;
      title?: string;
    }
  | {
      id: number;
      type: 'article';
      href: string;
      views: number;
      title?: string;
    };



//Расширяем модуль react-player для отключения кнопки скачивания видео
/*
 * @module react-player
 * @interface Config
 * @property {Object} file - Конфигурация для файлов
 * Просто не вставляйте этот код, если не используете его в своем проекте.
 * Использование в коде для отключения кнопки скачивания видео:
 * import ReactPlayer from 'react-player';
 *<ReactPlayer
    src={src}
    controls
    width="100%"
    height="315px"
    config={{
      // Расширяем тип Config для поддержки `file`
      file: {
        attributes: {
          controlsList: 'nodownload',
 *      }
 *    }
 *  });
 * />

 */
declare module 'react-player' {
  interface Config {
    file?: {
      attributes?: {
        controlsList?: string;
      };
    };
  }
}

