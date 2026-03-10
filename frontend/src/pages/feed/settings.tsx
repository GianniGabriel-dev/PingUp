import { useAuth } from "@/context/useAuth.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateLanguage } from "@/hooks/useUpdateLanguage.js";
import { LANGUAGES } from "@/lib/utils.js";

export function Settings() {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(user?.language);
  const { mutate: updateLanguage, isPending, error } = useUpdateLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    // Call mutation to save language preference
    updateLanguage(newLanguage);
  };

  const handleLogout = () => {};

  const handleEditProfile = () => {
    navigate("?modal=edit-profile");
  };

  const selectedLangObj = LANGUAGES.find(
    (lang) => lang.code === selectedLanguage,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className=" border-gray-600 p-4">
        <h1 className="text-3xl font-bold text-white">Ajustes</h1>
        <p className="text-gray-500 mt-1">
          Personaliza tu experiencia en PingUp
        </p>
      </div>

      {/* Settings Container */}
      {/* Language Settings */}
      <div className="p-6 hover:bg-neutral-950 transition-colors duration-200">
        <div className="mb-4">
          <label className="block text-white font-semibold text-lg mb-2">
            Idioma de Traducción
          </label>
          <p className="text-gray-500 text-sm">
            Selecciona el idioma en el que se desesas traducir los posts
          </p>
        </div>

        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          disabled={isPending}
          className="w-full bg-zinc-950 text-white border-2 border-gray-500 rounded-lg p-3  focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/50 transition-all duration-200 cursor-pointer hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>

        <div className="mt-4 p-3 bg-zinc-900 rounded-lg">
          <p className="text-gray-400 text-sm">
            <span className="text-sky-500 font-semibold">Idioma actual:</span>{" "}
            {selectedLangObj?.flag} {selectedLangObj?.name}
          </p>
          {isPending && (
            <p className="text-sky-400 text-sm mt-2">
              Guardando preferencia...
            </p>
          )}
          {error instanceof Error && (
            <p className="text-red-400 text-sm mt-2">
              Error al guardar: {error.message}
            </p>
          )}
        </div>
      </div>

      {/* Edit Profile */}
      <div className="p-6 hover:bg-zinc-900/50 transition-colors duration-200">
        <div className="mb-4">
          <label className="block text-white font-semibold text-lg mb-2">
            Editar Perfil
          </label>
          <p className="text-gray-500 text-sm">
            Actualiza tu nombre, biografía, avatar y banner para mostrar lo
            mejor de ti
          </p>
        </div>

        <button
          onClick={handleEditProfile}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Editar Perfil
        </button>
      </div>

      {/* Account Settings Section */}
      <div className="p-6 hover:bg-zinc-900/50 transition-colors duration-200">
        <div className="mb-4">
          <label className="block text-white font-semibold text-lg mb-2">
            Cuenta
          </label>
          <p className="text-gray-500 text-sm">
            Opciones relacionadas con tu cuenta
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Additional Info */}
      <div className="p-6 bg-zinc-900/30">
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            © 2026 PingUp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
