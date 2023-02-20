type ImageFile = File & { preview: string };

export const ResizeImage = async (file: File, outWidth: number, outHeight: number, quality?: number): Promise<ImageFile> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const elem = document.createElement("canvas");
                const width = img.width;
                const height = img.height;
                const size = Math.min(width, height);
                const offsetX = (width - size) / 2;
                const offsetY = (height - size) / 2;

                elem.width = outWidth;
                elem.height = outHeight;

                const ctx = elem.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, outWidth, outHeight);
                    ctx.canvas.toBlob(
                        (blob) => {
                            const file = new File([blob!], "image.jpg", {
                                type: "image/jpeg",
                                lastModified: Date.now(),
                            }) as ImageFile;
                            file.preview = URL.createObjectURL(file);
                            resolve(file);
                        },
                        "image/jpeg",
                        quality
                    );
                }
            };
        };
    });
};
