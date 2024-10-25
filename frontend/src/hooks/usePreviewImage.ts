import { ChangeEvent, useState } from "react";

export const usePreviewImage = () => {
    const [preview, setPreview] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setPreview(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return { image, preview, setImage, previewImage };
}