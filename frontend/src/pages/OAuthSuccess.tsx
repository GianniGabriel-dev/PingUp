import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      console.error('❌ Error de autenticación:', error);
      // Redirigir a login con el error
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1000);
      return;
    }

    if (token) {
      try {

        setToken(token);
        
        
        // Redirigir al home después de guardar el token
        setTimeout(() => {
          navigate('/?modal=onboarding-profile', { replace: true });
        }, 800);
      } catch (err) {
        console.error('❌ Error al procesar el token:', err);
        navigate('/login', { replace: true });
      }
    } else {
      console.error('❌ No hay token en la URL');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1000);
    }
  }, [searchParams, navigate, setToken]);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-blue-500 text-lg">Completando autenticación...</p>
        <p className="text-white text-sm mt-2">No cierres esta página</p>
      </div>
    </div>
  );
};
