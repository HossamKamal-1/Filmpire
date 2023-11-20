import { Skeleton } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

function LazyImage(props) {
  const [isImageReadyToLoad, setIsImageReadyToLoad] = useState(false);
  const iObserverRef = useRef(null);
  const handleImageIntersection = (images) => {
    if (images[0].isIntersecting) {
      setIsImageReadyToLoad(true);
    }
  };
  const imageRefCallback = useCallback((imageNode) => {
    if (iObserverRef.current) iObserverRef.current.disconnect();
    iObserverRef.current = new IntersectionObserver(handleImageIntersection);
    if (!imageNode) {
      iObserverRef.current.disconnect();
      return;
    }
    iObserverRef.current.observe(imageNode);
  }, []);
  return isImageReadyToLoad ? (
    <img {...props} />
  ) : (
    <Skeleton variant='rounded' ref={imageRefCallback} height={350} />
  );
}

export default LazyImage;
