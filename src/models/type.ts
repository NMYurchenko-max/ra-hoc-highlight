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
export type MediaItem = {
  type: 'video' | 'article' | 'image' | 'audio' | 'pdf';
  src?: string;
  href?: string;
  views: number;
  title?: string;
  description?: string;
};
