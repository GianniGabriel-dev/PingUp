import { SadIcon } from "@/assets/icons/SadIcon.js"

export const ErrorFindingUser = ({username, handleBack}: {username:string | undefined, handleBack: ()=>void}) => {
      return (
        <div className="w-full flex justify-center px-4 py-16">
          <div className="w-full max-w-md text-center">
            
            {/* Icon / ilustración simple */}
            <div className=" text-blue-500 mx-auto mb-6 flex items-center justify-center">
              <SadIcon size={70} className={"text-blue-500"} />
            </div>
    
            {/* Title */}
            <h2 className="text-2xl font-extrabold mb-2">
              Usuario no encontrado
            </h2>
    
            {/* Description */}
            <p className="text-gray-400 mb-6">
              No hemos podido encontrar a{" "}
              <span className="text-blue-500 font-semibold">
                @{username}
              </span>
            </p>
    
            {/* Button */}
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Volver atrás
            </button>
          </div>
        </div>
      )
}