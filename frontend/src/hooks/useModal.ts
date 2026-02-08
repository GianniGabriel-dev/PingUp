import { useSearchParams } from 'react-router-dom';

export function useModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  //se obtiene ?modal=tipoDelModal de los parámetros de la URL
  const modalType = searchParams.get('modal');
  // El modal está abierto si modalType tiene algún valor
  const isOpen = !!modalType;

  //si coincidel la URL con el tipo de modal, se abre ese modal
  const openModal = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('modal', type);
    setSearchParams(params);
  };

  
  const closeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('modal');
    //replace:true para que al cerrar el modal no se guarde el estado del modal en el historial del navegador, evitando que al hacer click en "atrás" se vuelva a abrir el modal
    setSearchParams(params, {replace:true});
  };

  return {
    isOpen,
    modalType,
    openModal,
    closeModal,
  };
}