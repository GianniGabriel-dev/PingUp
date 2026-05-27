export const osbserverHook = (loadMoreRef: React.RefObject<HTMLElement | null>, hasNextPage: boolean, fetchNextPage: () => void, isFetchingNextPage: boolean)=>{
      if (!loadMoreRef.current) return;
      if (!hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0 },
      );
      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
}