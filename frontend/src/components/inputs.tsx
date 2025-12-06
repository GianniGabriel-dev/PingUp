export function Input({
  type,
  id,
  name,
  placeholder,
}: {
  type: string;
  id: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="bg-zinc-950  w-full rounded-lg">
      <div className="relative flex justify-center bg-inherit">
        <input
          type={type}
          id={id}
          name={name}
          className="peer text-lg  bg-transparent  h-12 w-10/12 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 
          ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className="absolute cursor-text left-1/12 -top-4 text-lg text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xl
          peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-sky-600 peer-focus:text-lg transition-all"
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
}
