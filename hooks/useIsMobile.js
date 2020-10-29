import useWindowSize from './useWindowSize';

const DEFAULT_BREAKPOINT = 728;

const useIsMobile = (breakpoint) => {
  const windowSize = useWindowSize('width');

  return windowSize < (breakpoint || DEFAULT_BREAKPOINT);
};

export default useIsMobile;
