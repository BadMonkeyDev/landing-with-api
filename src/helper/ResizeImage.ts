type ImageFile = File & { preview: string };
type ImageOutput = "file" | "blob" | "base64";
type CropPosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

const getImageData = async (canvas: HTMLCanvasElement, output: ImageOutput, quality?: number) => {
    return new Promise<File | Blob | string>((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (output === "blob") {
                    resolve(blob!);
                } else if (output === "base64") {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob!);
                    reader.onload = () => {
                        const base64 = reader.result as string;
                        resolve(base64);
                    };
                } else {
                    const file = new File([blob!], "image.jpg", {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    }) as ImageFile;
                    file.preview = URL.createObjectURL(file);
                    resolve(file);
                }
            },
            "image/jpeg",
            quality
        );
    });
};

export const ResizeImage = async (
    input: File | string,
    outWidth: number,
    outHeight: number,
    quality?: number,
    output: ImageOutput = "file",
    cropPosition: CropPosition = "center"
): Promise<File | Blob | string> => {
    let img = new Image();
    if (typeof input === "string") {
        img.src = input;
    } else {
        img.src = URL.createObjectURL(input);
    }

    return new Promise((resolve) => {
        img.onload = () => {
            const elem = document.createElement("canvas");
            const width = img.width;
            const height = img.height;
            let offsetX = 0;
            let offsetY = 0;

            if (cropPosition === "center") {
                const size = Math.min(width, height);
                offsetX = (width - size) / 2;
                offsetY = (height - size) / 2;
            } else if (cropPosition === "top-left") {
                offsetX = 0;
                offsetY = 0;
            } else if (cropPosition === "top-right") {
                offsetX = width - Math.min(width, height);
                offsetY = 0;
            } else if (cropPosition === "bottom-left") {
                offsetX = 0;
                offsetY = height - Math.min(width, height);
            } else if (cropPosition === "bottom-right") {
                offsetX = width - Math.min(width, height);
                offsetY = height - Math.min(width, height);
            }

            const size = Math.min(width, height);

            elem.width = outWidth;
            elem.height = outHeight;

            const ctx = elem.getContext("2d");
            if (ctx) {
                ctx.drawImage(
                    img,
                    offsetX,
                    offsetY,
                    size,
                    size,
                    0,
                    0,
                    outWidth,
                    outHeight
                );
                getImageData(ctx.canvas, output, quality).then((result) => {
                    resolve(result);
                });
            }
        };
    });
};
