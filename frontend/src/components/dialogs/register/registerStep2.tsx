import { Input } from "../../inputs.js";

export function RegisterStep2({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl text-center font-bold">Crea tu cuenta</h2>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-10">
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Nombre de usuario"
        />
        <Input type="email" id="email" name="email" placeholder="Email" />

        <div className="flex  max-sm:gap-10 max-sm:flex-col ">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Contrseña"
          />
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white w-11/12 text-2xl py-2 transition-all duration-300 hover:bg-blue-600 bg-blue-500 font-bold rounded-3xl shadow"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}
