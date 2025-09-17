import React from 'react';

const Pdf: React.FC<{
  src: string;
  views: number;
  title?: string;
}> = ({ src, views, title }) => {
  return (
    <div className="item item-pdf">
      <iframe
        src={src}
        width="100%"
        height="315px"
        title={title || "PDF"}
        loading="lazy"
      />
      {title && <h3>{title}</h3>}
      <p className="views">Просмотров: {views}</p>
    </div>
  );
};

export default Pdf;
