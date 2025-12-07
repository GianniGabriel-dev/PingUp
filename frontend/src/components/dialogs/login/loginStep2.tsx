import { Input } from "../../inputs.js";

export function LoginStep2({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl text-center font-bold">Iniciar sesión en PingUp</h2>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-10">
        <Input
          type="text"
          id="identifier"
          name="identifier"
          placeholder="Email o nombre de usuario"
        />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Contrseña"
          />
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white w-11/12 text-2xl py-2 transition-all duration-300 hover:bg-blue-600 bg-blue-500 font-bold rounded-3xl shadow"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
