import { ReactNode } from "react";
import { CloseIcon, BackIcon } from "@/assets/icons/index.js";

interface AuthDialogProps {
  showLogo: boolean;
  open: boolean;
  onClose: () => void;
  step?: number;
  onStepBack?: () => void;
  showBackButton?: boolean;
  children: ReactNode;
}

export function AuthDialog({
  showLogo,
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
        className="bg-zinc-950 flex flex-col gap-6 rounded-2xl w-xl max-sm:h-full max-sm:rounded-none h-4/6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-center p-2.5 items-center">
          {showLogo && (
            <img
              width={40}
              height={40}
              src="/signalCircle.png"
              alt="Logo of PingUp"
            />
          )}

          {/* Muestra el botón de ir hacia atrás solo si showBackButton es true */}
          {showBackButton && onStepBack && (
            <button type="button" onClick={onStepBack}>
              <BackIcon
                size={30}
                className={
                  "absolute top-2 left-2 transition-all duration-300 rounded-3xl p-0.5 hover:bg-zinc-800"
                }
              />
              <span className="sr-only">Volver</span>
            </button>
          )}
          {/* Botón x para cerrar modal */}
          <button type="button" onClick={onClose}>
            <CloseIcon
              size={30}
              className={
                "absolute top-2 right-2 transition-all duration-300 rounded-3xl p-0.5 hover:bg-zinc-800"
              }
            />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </header>

        {/* Contenido dinámico */}
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
