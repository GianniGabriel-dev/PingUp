import React from 'react'
import Cropper from 'react-easy-crop'

type CropAvatarProps={
    selectedFile:string
    zoom:number
    onZoomChange: (zoom: number) => void
}
export const CropAvatar = ({selectedFile, zoom, onZoomChange}:CropAvatarProps) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })

  const onCropChange = (crop: { x: number, y: number }) => {
    setCrop(crop)
  }

interface CroppedArea {
    x: number
    y: number
    width: number
    height: number
}

const onCropComplete = (croppedArea: CroppedArea, croppedAreaPixels: CroppedArea): void => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height)
}

  return (
    <>
      <div className="relative w-full h-full">
        <Cropper
          image={selectedFile}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
    </>
  )
}
