import { useCallback, useState, useEffect } from 'react';

function getSize(type) {
  if (type === 'height') {
    return window.innerHeight;
  }

  if (type === 'width') {
    return window.innerWidth;
  }
}

function useWindowSize(type = 'width') {
  const [windowSize, setWindowSize] = useState();

  const handleResize = useCallback(() => {
    setWindowSize(getSize(type));
  }, [setWindowSize, type]);

  useEffect(() => {
    if (type === 'height') {
      setWindowSize(window.innerHeight);
    }

    if (type === 'width') {
      setWindowSize(window.innerWidth);
    }
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
