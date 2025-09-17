import React from 'react';

/**
 * Higher-Order Component (HOC) для обёртки медиа-блоков
 * @param {React.ComponentType} WrappedComponent - Компонент для оборачивания
 * @returns {Function} Новый компонент с логикой выбора Popular/New
 * Мы не удаляем views из props, а только извлекаем его для логики.
 * Остальные пропсы сохраняются в restProps.
 * Компонент WrappedComponent получает все оригинальные пропсы, включая views.
Это гарантирует, что типизация будет корректной.
 */
const withMediaWrapper = <T extends { views: number }>(
  WrappedComponent: React.ComponentType<T>
) => {
  return function MediaWrapper(props: T) {
    const { views } = props;

    // Определяем класс и бейджик на основе просмотров
    let wrapperClass = 'wrap-item-regular';
    let badgeText = '';

    if (views <= 100) {
      wrapperClass = 'wrap-item-new';
      badgeText = 'New';
    } else if (views > 1000) {
      wrapperClass = 'wrap-item-popular';
      badgeText = 'Popular';
    }

    return (
      <div className={wrapperClass}>
        {badgeText && <span className="label">{badgeText}</span>}
        {/* Передаём все пропсы, включая views */}
        {React.createElement(WrappedComponent, props)}
      </div>
    );
  };
};

export default withMediaWrapper;


