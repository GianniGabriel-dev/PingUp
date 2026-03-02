import React from 'react'
import Cropper from 'react-easy-crop'

export interface CroppedArea {
  x: number
  y: number
  width: number
  height: number
}

type CropBannerProps = {
  selectedFile: string
  zoom: number
  onZoomChange: (zoom: number) => void
  onCropComplete?: (croppedAreaPixels: CroppedArea) => void
}

export const CropBanner = ({ selectedFile, zoom, onZoomChange, onCropComplete }: CropBannerProps) => {
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
        aspect={16 / 9}
        cropShape="rect"
        showGrid={false}
        onCropChange={handleCropChange}
        onCropComplete={handleCropComplete}
        onZoomChange={onZoomChange}
      />
    </div>
  )
}
