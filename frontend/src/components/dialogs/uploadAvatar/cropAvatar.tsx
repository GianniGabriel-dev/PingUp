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
  onCropComplete?: (croppedAreaPixels: CroppedArea) => void // callback al padre
}

export const CropAvatar = ({ selectedFile, zoom, onZoomChange, onCropComplete }: CropAvatarProps) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })

  const handleCropChange = (crop: { x: number, y: number }) => setCrop(crop)

  const handleCropComplete = (_: any, croppedPixels: CroppedArea) => {
    if (onCropComplete) onCropComplete(croppedPixels)
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
