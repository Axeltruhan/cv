/**
 * Convert a File object to a data URL
 * @param file The file to convert
 * @returns A Promise that resolves with the data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Validates if a file is an image and within size limits
 * @param file The file to validate
 * @param maxSizeInMB Maximum file size in MB
 * @returns An object with validation result and error message
 */
export function validateImageFile(file: File, maxSizeInMB: number = 5): { valid: boolean; message?: string } {
  if (!file.type.match('image.*')) {
    return {
      valid: false,
      message: 'Il file selezionato non è un\'immagine valida. Formati supportati: JPG, PNG, GIF.'
    };
  }
  
  const fileSizeInMB = file.size / (1024 * 1024);
  if (fileSizeInMB > maxSizeInMB) {
    return {
      valid: false,
      message: `L'immagine è troppo grande. La dimensione massima consentita è ${maxSizeInMB}MB.`
    };
  }
  
  return { valid: true };
}
