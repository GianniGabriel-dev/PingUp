import { useEffect, useState } from "react";
import { CropAvatar, CroppedArea } from "./cropAvatar.js";
import { Slider } from "@/components/ui/slider";
import { normalizeImage } from "../../../hooks/normalizeImage.js";
import { getCroppedImage } from "../../../hooks/canvasHandler.js";

type Props = {
  setStep: (step: number) => void;
  selectedFile: File;
  onConfirm?: (canvas: HTMLCanvasElement, crop: CroppedArea) => void;
};

export const ProfileStep2 = ({ setStep, selectedFile, onConfirm }: Props) => {
  const fileURL = URL.createObjectURL(selectedFile);
  const [zoom, setZoom] = useState(1);
  const [imgSrc, setImgSrc] = useState<string>(fileURL);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);

  // cuando cambia el estado de selectedFile se normaliza la imagen y se actualiza el imgSrc
  useEffect(() => {
    normalizeImage(selectedFile, 536).then((result) => {
      if (typeof result === "string") {
        setImgSrc(result);
      } else {
        setImgSrc(URL.createObjectURL(result));
      }
    });
  }, [selectedFile]);

  if (!imgSrc || !selectedFile) return null; //no renderiza nada si no hay imagen

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };
  // función que se ejecuta al confirmar el recorte de la imagen
  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const canvas = await getCroppedImage(imgSrc, croppedAreaPixels);
    onConfirm?.(canvas, croppedAreaPixels);
    setStep(1); //volver al step 1 despues de confirmar
  };
  return (
    <>
      <article className="p-4 flex-1 h-full max-sm:h-10/12 flex items-center justify-center bg-neutral-900">
        <CropAvatar
          selectedFile={imgSrc}
          zoom={zoom}
          onZoomChange={onZoomChange}
          onCropComplete={(pixels) => setCroppedAreaPixels(pixels)}
        />
      </article>

      <footer className="p-2.5 flex max-sm:flex-col max-sm:h-2/12 justify-center  items-center gap-7 w-full  text-center bg-zinc-950 text-white rounded-b-2xl">
        <Slider
          className="w-7/12 max-sm:w-full h-3 bg-blue-400/40 rounded-full appearance-none cursor-pointer"
          defaultValue={[1]}
          value={[zoom]}
          step={0.1}
          aria-labelledby="Zoom"
          onValueChange={(values: number[]) => setZoom(values[0])}
          min={1}
          max={3}
        />
        <button
          onClick={handleConfirm}
          className="text-zinc-950 bg-white hover:bg-white/55 cursor-pointer  h-10 w-5/12 max-sm:w-full text-xl   transition-all duration-300  font-bold rounded-3xl shadow"
        >
          Confirmar
        </button>
      </footer>
    </>
  );
};
