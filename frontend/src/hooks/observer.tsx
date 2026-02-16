export const osbserverHook = (loadMoreRef: React.RefObject<HTMLElement | null>, hasNextPage: boolean, fetchNextPage: () => void)=>{
      //si no existe el ref o no hay más páginas que cargar, no se crea el observer
      if (!loadMoreRef.current) return;
      if (!hasNextPage) return;
  
      //Observer que detecta cuando se llega al final de la lista de comentarios para cargar más
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          //si el elemento es visible, se carga la siguiente página de comentarios
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        //threshold: 1 hace que el callback se ejecute cuando el 100% del elemento sea visible.
        { threshold: 1 },
      );
      observer.observe(loadMoreRef.current);
      //se desconecta el observer al desmontar el componente para evitar fugas de memoria
      return () => observer.disconnect();
}