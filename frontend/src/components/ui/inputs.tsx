export function Input({
  value,
  type,
  id,
  name,
  placeholder,
  error,

  ...rest
}: {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  error: string | undefined;
}) {
  return (
    <>
      <div className="bg-zinc-950  w-full rounded-lg">
        <div className="relative flex justify-center bg-inherit">
          <input
            {...(value !== undefined ? { value } : {})}
            type={type}
            id={id}
            name={name}
            className={`peer text-lg  bg-transparent  h-12 w-10/12 rounded-lg  placeholder-transparent ring-2 px-2 focus:outline-none
               ${error ? "error ring-rose-500  text-rose-500 focus:ring-rose-500" : "text-gray-200 ring-gray-500 focus:ring-sky-600"}`}
            placeholder={placeholder}
            {...rest}
          />
          <label
            htmlFor={id}
            className={`absolute cursor-text left-1/12 -top-4 text-lg  bg-inherit mx-1 px-1 peer-placeholder-shown:text-xl
             peer-placeholder-shown:top-3 peer-focus:-top-4   peer-focus:text-lg transition-all
              ${error ? "peer-placeholder-shown:text-rose-500  text-rose-500 peer-focus:text-rose-500" : "peer-placeholder-shown:text-gray-500 text-gray-500 peer-focus:text-sky-600"}
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

export function Textarea({
  value,
  id,
  name,
  placeholder,
  error,
  maxLength,
  ...rest
}: {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  name: string;
  placeholder: string;
  error?: string | undefined;
  maxLength?: number;
}) {
  return (
    <>
      <div className="bg-zinc-950 w-full rounded-lg mt-8 mb-4">
        <div className="relative flex justify-center bg-inherit">
          <textarea
            {...(value !== undefined ? { value } : {})}
            id={id}
            name={name}
            maxLength={maxLength}
            className={`peer text-lg bg-transparent w-10/12 rounded-lg placeholder-transparent ring-2 px-2 py-2 focus:outline-none resize-none h-24
               ${error ? "error ring-rose-500 text-rose-500 focus:ring-rose-500" : "text-gray-200 ring-gray-500 focus:ring-sky-600"}`}
            placeholder={placeholder}
            {...rest}
          />
          <label
            htmlFor={id}
            className={`absolute cursor-text left-1/12 -top-4 text-lg bg-inherit mx-1 px-1 peer-placeholder-shown:text-xl
             peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-lg transition-all
              ${error ? "peer-placeholder-shown:text-rose-500 text-rose-500 peer-focus:text-rose-500" : "peer-placeholder-shown:text-gray-500 text-gray-500 peer-focus:text-sky-600"}
            `}
          >
            {placeholder}
          </label>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-10/12 flex justify-between items-center mt-1">
            {error && <p className="text-rose-500 text-sm ml-3">{error}</p>}
            {value && maxLength && (
              <p
                className={`text-sm ml-auto ${
                  value.length >= maxLength
                    ? "text-rose-500"
                    : value.length >= maxLength * 0.9
                      ? "text-yellow-500"
                      : "text-gray-500"
                }`}
              >
                {value.length}/{maxLength}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
