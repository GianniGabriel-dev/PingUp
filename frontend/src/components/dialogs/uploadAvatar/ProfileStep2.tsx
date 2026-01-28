import { useEffect, useState } from "react";
import { CropAvatar } from "./cropAvatar.js";
import { Slider } from "@/components/ui/slider"
import { normalizeImage } from "./hooks/normalizeImage.js";

type Props = {
  setStep: (step: number) => void;
  selectedFile:File
};

export const ProfileStep2 =({setStep, selectedFile }: Props)=>{
    const fileURL = URL.createObjectURL(selectedFile) 
    const [zoom, setZoom] = useState(1)
    const [imgSrc, setImgSrc] = useState<string | File>(fileURL)

    useEffect(()=>{
        normalizeImage(selectedFile, 536).then(setImgSrc)
    },[selectedFile])

    if(!imgSrc || !selectedFile) return null

    const onZoomChange = (zoom:number) => {
        setZoom(zoom)
    }
    return(
    <>
        <article className="p-4 flex-1 h-full max-sm:h-10/12 flex items-center justify-center bg-neutral-900">
            <CropAvatar selectedFile={imgSrc} zoom={zoom} onZoomChange={onZoomChange}/>
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
            <button className="text-zinc-950 bg-white hover:bg-white/55 cursor-pointer  h-10 w-5/12 max-sm:w-full text-xl   transition-all duration-300  font-bold rounded-3xl shadow">
                Confirmar
            </button>
        </footer>
    </>
)
}