import { useState } from "react";
import { Input } from "../inputs.js";

export default function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const closeModal = () => {
    setOpen(false);
    setStep(1);
  };
  return (
    <div className=" text-white">
      <button
        onClick={() => setOpen(true)}
        className=" p-1 text-sm cursor-pointer font-bold  hover:bg-blue-600  bg-blue-500 transition-all duration-300  rounded-xl shadow"
      >
        Registrarte
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-slate-500/40 z-50"
          onClick={() => closeModal()}
        >
          {/*-MODAL- El stop propagation hace que al pulsar el dailogo para escribir no se comporte como si se pulsara fuera y se cierra  */}
          <div
            className="bg-zinc-950 rounded-2xl p-6 w-full max-w-2xl max-h-10/12 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/*El paso 1 es donde el usuario decide si iniciar serion con google o crear una cuenta*/}
            {step === 1 && (
              <>
                <div className="flex justify-center items-center mb-4">
                  <h2 className="text-2xl  font-bold">Únete a PingUp</h2>
                  <button type="button" onClick={() => closeModal()}>
                    <svg
                      className="absolute top-2 right-2 transition-all duration-300 rounded-3xl p-0.5 w-5 h-5 hover:bg-zinc-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/*Botones de registro*/}
                <div className="flex   place-items-center flex-col gap-4">
                  <div
                    className=" w-10/12 w-sm-full"
                    onClick={() => setStep(2)}
                  >
                    <button
                      type="button"
                      className="text-white w-full  hover:bg-blue-600  bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium 
                      rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Crear cuentea<div></div>
                    </button>
                  </div>
                  <div className="flex items-center w-full gap-4">
                    <span className="flex-1 h-px bg-gray-600"></span>
                    <span className="text-gray-400">o</span>
                    <span className="flex-1 h-px bg-gray-600"></span>
                  </div>
                  <div className="w-10/12 w-sm-full">
                    <button
                      type="button"
                      className="text-white w-full  hover:bg-blue-600  bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm
                       px-5 py-2.5 text-center inline-flex items-center justify-between "
                    >
                      <svg
                        className="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Registrarse con google<div></div>
                    </button>
                  </div>
                </div>
              </>
            )}
            {/*El paso 2 es donde el usuario crea su cuenta en caso de elegir esa opcion*/}
            {step === 2 && (
              <>
                <div className="flex justify-center items-center mb-4">
                  <h2 className="text-2xl  font-bold">Crear cuenta</h2>
                  <button type="button" onClick={() => closeModal()}>
                    <svg
                      className=" absolute top-2 right-2 transition-all duration-300 rounded-3xl p-0.5 w-5 h-5 hover:bg-zinc-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="flex  flex-col gap-7">
                  <Input type="text" id="username" name="username" placeholder="Nombre de usuario"/>
                  <Input type="email" id="email" name="email" placeholder="Email"/>

                  <div className="flex  max-sm:gap-7 max-sm:flex-col ">
                    <Input type="password" id="password" name="password" placeholder="Contrseña"/>
                    <Input type="confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña"/>
                  </div>

                  <button
                    type="submit"
                    className="py-2 transition-all duration-300 hover:bg-blue-600  bg-blue-500  font-semibold rounded-xl shadow"
                  >
                    Crear cuenta
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
