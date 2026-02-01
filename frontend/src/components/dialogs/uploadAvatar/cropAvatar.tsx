import React from 'react'
import Cropper from 'react-easy-crop'

export interface CroppedArea {
  x: number
  y: number
  width: number
  height: number
}

type CropAvatarProps = {
  selectedFile: string
  zoom: number
  onZoomChange: (zoom: number) => void
  onCropComplete?: (croppedAreaPixels: CroppedArea) => void 
}

export const CropAvatar = ({ selectedFile, zoom, onZoomChange, onCropComplete }: CropAvatarProps) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })

  // maneja la posición del área de recorte mientras el usuario arrastra la imagen (solo estado visual)
  const handleCropChange = (crop: { x: number; y: number }) => setCrop(crop)

  // devuelve el área de recorte FINAL en píxeles reales cuando el usuario termina de mover o hacer zoom
  const handleCropComplete = (_: unknown, croppedPixels: CroppedArea) => {
    onCropComplete?.(croppedPixels)
  }

  return (
    <div className="relative w-full h-full">
      <Cropper
        image={selectedFile}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={handleCropChange}
        onCropComplete={handleCropComplete}
        onZoomChange={onZoomChange}
      />
    </div>
  )
}
