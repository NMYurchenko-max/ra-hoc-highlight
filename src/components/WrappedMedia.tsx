// src/components/MediaWrappers.tsx
import withMediaWrapper from './withMediaWrapper';
import Video from './Video';
import Article from './Article';
import Image from './Image';
import Audio from './Audio';
import Pdf from './Pdf';

export { default as WrappedVideo } from './Video';
export { default as WrappedArticle } from './Article';
export { default as WrappedImage } from './Image';
export { default as WrappedAudio } from './Audio';
export { default as WrappedPdf } from './Pdf';

// Или с HOC
export const HOCWrappedVideo = withMediaWrapper(Video);
export const HOCWrappedArticle = withMediaWrapper(Article);
export const HOCWrappedImages = withMediaWrapper(Image);
export const HOCWrappedAudio = withMediaWrapper(Audio);
export const HOCWrappedPdf = withMediaWrapper(Pdf);
