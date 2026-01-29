export const normalizeImage = (file: File, size:number): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
     if(img.width<size && img.height<size){
     // calcula cuanto escalar la imagen
      const scale = Math.max(size / img.width, size / img.height, 1);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      //se crea el canvas para redimensionar la imagen
      const ctx = canvas.getContext("2d")!;
      // Limpiar el canvas antes de dibujar
      ctx.clearRect(0, 0, size, size);
    
      const x = (size - newWidth) / 2;
      const y = (size - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight);        
      
      resolve(canvas.toDataURL("image/png"));
    };
}

    reader.readAsDataURL(file);
  });
};
