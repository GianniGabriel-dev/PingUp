// getCroppedImage.ts
export interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getCroppedImage(
  imageSrc: string,
  crop: CroppedArea,
): Promise<HTMLCanvasElement> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return canvas;
}

// pasa la foto recortada en canvas a un archivo webp optimizando la calidad para reducir tamaño para subirlo mas rápidamente
export const canvasToFile = async (
  canvas: HTMLCanvasElement,
): Promise<File> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      resolve(new File([blob], "avatar.webp", { type: "image/webp" }));
    }, 
    "image/webp",
    0.85
  );
  });
};
