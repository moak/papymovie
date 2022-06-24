import useWindowSize from './useWindowSize';

const DEFAULT_BREAKPOINT = 728;

const useIsMobile = (breakpoint) => {
  const windowSize = useWindowSize('width') || 400;

  const isMobile = windowSize < (breakpoint || DEFAULT_BREAKPOINT);

  return isMobile;
};

export default useIsMobile;
