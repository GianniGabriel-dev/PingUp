import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiErrors } from "@/lib/axios.js";
import { loginSchema } from "@/validations/authValidations.js";
import { Input } from "@/components/ui/inputs.js";

export function LoginStep2({
  handleSubmit,
  apiError,
  setApiError
}: {
  handleSubmit: (data:{
    identifier:string;
    password:string;
  })=> Promise<void>;
  apiError:ApiErrors;
  setApiError: React.Dispatch<React.SetStateAction<ApiErrors>>
}) {
  type LoginData= z.infer<typeof loginSchema>
  //se crea el hook de react-hook-form, se usa zod como validador y comprueba los campos al cambiar de foco , una vez haya un error al cambiar el valor, se vuelve a validar
  const{
    register,
    handleSubmit: rhfSubmit,
    formState: {errors},
  }=useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode:"onBlur",
    reValidateMode:"onChange"
  })
  //se obtiene el error de la api indicado (si existe)
  const getApiError = (field: string) => {
    return apiError?.find((err) => err.path === field)?.msg;
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl text-center font-bold">Iniciar sesión en PingUp</h2>
      <form onSubmit={rhfSubmit(handleSubmit)} className="flex  flex-col gap-10">
        <Input
          type="text"
          id="identifier"
          {...register("identifier", {
            onChange: () => {
              setApiError((prev) =>
                prev.filter((err) => err.path !== "identifier")
              );
            },
          })}
          placeholder="Email o nombre de usuario"
          error={errors.identifier?.message || getApiError("identifier")}
        />
          <Input
            type="password"
            id="password"
            {...register("password", {
              onChange: () => {
                setApiError((prev) =>
                  prev.filter((err) => err.path !== "password")
                );
              },
            })}
            placeholder="Contraseña"
            error={errors.password?.message || getApiError("password")}
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
