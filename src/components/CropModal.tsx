import { useState, useCallback, SetStateAction } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/CropUtils"; // we'll make this helper

export default function CropModal({ imageUrl, onCancel, onSave }: { imageUrl: string; onCancel: () => void; onSave: (croppedImage: string) => void; }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number; }>({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = useCallback((_: any, croppedPixels: { width: number; height: number; x: number; y: number; }) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
    onSave(croppedImage);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[300px] bg-gray-200 rounded-lg overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
        >
          Save
        </button>
      </div>
    </div>
  );
}
