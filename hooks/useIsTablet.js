import useWindowSize from './useWindowSize';

const DEFAULT_BREAKPOINT_MIN = 768;
const DEFAULT_BREAKPOINT_MAX = 1024;

const useIsMobile = (min, max) => {
  const windowSize = useWindowSize('width');

  return (
    windowSize >= (min || DEFAULT_BREAKPOINT_MIN) && windowSize <= (max || DEFAULT_BREAKPOINT_MAX)
  );
};

export default useIsMobile;
