import { ReactNode } from "react";
// @ts-expect-error no types available
import backIcon from "../../assets/back.svg";
// @ts-expect-error no types available
import cross from "../../assets/cross.svg";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  step?: number;
  onStepBack?: () => void;
  showBackButton?: boolean;
  children: ReactNode;
}

export function AuthDialog({
  open,
  onClose,
  onStepBack,
  showBackButton = false,
  children,
}: AuthDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-500/40 z-50"
      onClick={onClose}
    >
      {/* Modal - El stopPropagation hace que al pulsar el diálogo para escribir no se comporte como si se pulsara fuera para cerrarlo */}
      <div
        className="bg-zinc-950 flex flex-col gap-6 rounded-2xl p-4 w-xl max-sm:h-full max-sm:rounded-none h-4/6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center">
          <img
            width={50}
            height={50}
            src="/signalCircle.png"
            alt="Logo of PingUp"
          />

          {/* Muestra el botón de ir hacia atrás solo si showBackButton es true */}
          {showBackButton && onStepBack && (
            <button type="button" onClick={onStepBack}>
              <img
                src={backIcon}
                width={30}
                height={30}
                className="absolute top-2 left-2 transition-all duration-300 rounded-3xl p-0.5 hover:bg-zinc-800"
                alt="Volver"
              />
              <span className="sr-only">Volver</span>
            </button>
          )}
          {/* Botón x para cerrar modal */}
          <button type="button" onClick={onClose}>
            <img
              width={30}
              height={30}
              className="absolute top-2 right-2 transition-all duration-300 rounded-3xl p-0.5 hover:bg-zinc-800"
              alt="Cerrar"
              src={cross}
            />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        {/* Contenido dinámico */}
        {children}
      </div>
    </div>
  );
}
