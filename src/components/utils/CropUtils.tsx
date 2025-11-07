export const getCroppedImg = (imageSrc: string, crop: any): Promise<string> => {
  const image = new Image();
  image.crossOrigin = "anonymous"; 
  image.src = imageSrc;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  return new Promise((resolve) => {
    image.onload = () => {
      const { x, y, width, height } = crop;
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(image, x, y, width, height, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};
