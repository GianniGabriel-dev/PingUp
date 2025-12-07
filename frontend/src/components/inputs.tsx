
export function Input({
  type,
  id,
  name,
  placeholder,
  error,

  ...rest
}: {
  type: string;   
  id: string;
  name: string;
  placeholder: string;
  error:string | undefined;


}) {
  return (
    <>
      <div className="bg-zinc-950  w-full rounded-lg">
        <div className="relative flex justify-center bg-inherit">
          <input
            type={type}
            id={id}
            name={name}
            defaultValue={""}
            className={`peer text-lg  bg-transparent  h-12 w-10/12 rounded-lg  placeholder-transparent ring-2 px-2 focus:outline-none
               ${error  ? "error ring-rose-500  text-rose-500 focus:ring-rose-500" :"text-gray-200 ring-gray-500 focus:ring-sky-600"}`}

            placeholder={placeholder}
            {...rest}
          />
          <label
            htmlFor={id}
            className={`absolute cursor-text left-1/12 -top-4 text-lg  bg-inherit mx-1 px-1 peer-placeholder-shown:text-xl
             peer-placeholder-shown:top-3 peer-focus:-top-4   peer-focus:text-lg transition-all
              ${error ? "peer-placeholder-shown:text-rose-500  text-rose-500 peer-focus:text-rose-500":"peer-placeholder-shown:text-gray-500 text-gray-500 peer-focus:text-sky-600"}
            `}
          >
            {placeholder}
          </label>
          
        </div>
        {error && (
          <div className="flex justify-center">
            <p className="text-rose-500 w-10/12 text-sm mt-1 ml-3">{error}</p>
          </div>
          )}
      </div>
      
    </>
  );
}
