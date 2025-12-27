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
    setSearchParams(params);
  };

  return {
    isOpen,
    modalType,
    openModal,
    closeModal,
  };
}