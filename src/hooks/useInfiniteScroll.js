import { useCallback, useRef } from 'react';

const useInfiniteScroll = (page, totalPages, isFetching, nextPageHandler) => {
  const intObserverRef = useRef(null);
  const handleIntersection = useCallback(
    (nodes) => {
      if (nodes[0].isIntersecting && page !== totalPages) {
        nextPageHandler();
      } else if (page === totalPages) {
        intObserverRef.current.disconnect();
      }
    },
    [page, totalPages, nextPageHandler]
  );
  const lastNodeRef = useCallback(
    (lastNode) => {
      if (isFetching) {
        return;
      }

      if (intObserverRef.current) {
        intObserverRef.current.disconnect();
      }

      intObserverRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      if (lastNode) {
        intObserverRef.current.observe(lastNode);
      } else {
        // component unmounts
        intObserverRef.current.disconnect();
      }
    },
    [isFetching, handleIntersection]
  );

  return [lastNodeRef];
};
export default useInfiniteScroll;
