export const LoginStep1 = ({
  setStep,
}: {
  setStep: (step: number) => void;
}) => {
  return (
    <section className="p-4">
      <div>
        <h2 className="text-3xl text-center mb-10 font-bold">Iniciar sesión en PingUp</h2>
      </div>
      {/*Botones de registro*/}
      <div className="flex text-xl  place-items-center flex-col gap-4">
        <div className=" w-10/12 w-sm-full" onClick={() => setStep(2)}>
          <button
            type="button"
            className="text-white w-full  hover:bg-blue-600  bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium 
                        rounded-lg  px-5 py-2.5 text-center"
          >
            Iniciar sesión con correo o usuario<div></div>
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
            className="text-white  w-full  hover:bg-blue-600  bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg 
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
            Iniciar sesión con google<div></div>
          </button>
        </div>
      </div>
    </section>
  );
};
