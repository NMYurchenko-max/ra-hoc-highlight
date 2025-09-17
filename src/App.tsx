import React from 'react';
import withMediaWrapper from './components/withMediaWrapper';
import { type MediaItem } from './models/type';
import mediaData from './dataSources/media.json';
import './App.css';

// Лениво загружаемые обёрнутые компоненты
const LazyWrappedVideo = React.lazy(() =>
  import('./components/Video').then(module => ({
    default: withMediaWrapper(module.default)
  }))
);

const LazyWrappedArticle = React.lazy(() =>
  import('./components/Article').then(module => ({
    default: withMediaWrapper(module.default)
  }))
);

const LazyWrappedImage = React.lazy(() =>
  import('./components/Image').then(module => ({
    default: withMediaWrapper(module.default)
  }))
);

const LazyWrappedAudio = React.lazy(() =>
  import('./components/Audio').then(module => ({
    default: withMediaWrapper(module.default)
  }))
);

const LazyWrappedPdf = React.lazy(() =>
  import('./components/Pdf').then(module => ({
    default: withMediaWrapper(module.default)
  }))
);

const App: React.FC = () => {
  const mediaItems = mediaData as MediaItem[];

  return (
    <div id="root">
      <div className="media-gallery-header">
        <h1>Media Gallery</h1>
      </div>
      <div className="media-gallery">
        <React.Suspense fallback={<div>Загрузка...</div>}>
          {mediaItems.map((item, index) => {
            switch (item.type) {
              case 'video':
                return (
                  <LazyWrappedVideo
                    key={index}
                    src={item.src || ''}
                    views={item.views}
                    title={item.title || ''}
                  />
                );
              case 'article':
                return (
                  <LazyWrappedArticle
                    key={index}
                    href={item.href || ''}
                    views={item.views}
                    title={item.title || ''}
                  />
                );
              case 'image':
                return (
                  <LazyWrappedImage
                    key={index}
                    src={item.src || ''}
                    views={item.views}
                    title={item.title || ''}
                  />
                );
              case 'audio':
                return (
                  <LazyWrappedAudio
                    key={index}
                    src={item.src || ''}
                    views={item.views}
                    title={item.title || ''}
                  />
                );
              case 'pdf':
                return (
                  <LazyWrappedPdf
                    key={index}
                    src={item.src || ''}
                    views={item.views}
                    title={item.title || ''}
                  />
                );
              default:
                return null;
            }
          })}
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;



