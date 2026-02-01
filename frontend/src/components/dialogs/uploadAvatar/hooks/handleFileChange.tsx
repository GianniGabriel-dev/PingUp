type UseFileUploadProps = {
  maxSizeMB?: number;
  allowedTypes?: string[];
};

export const useFileUpload = ({
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: UseFileUploadProps) => {
  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) return false;

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) return false;

    return true;
  };

  return { validateFile };
};
