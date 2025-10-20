export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0..1
  format?: "image/webp" | "image/jpeg";
}

export interface CompressionResult {
  blob: Blob;
  mimeType: string;
  extension: string;
  width: number;
  height: number;
}

const loadImageBitmap = async (file: File): Promise<ImageBitmap | HTMLImageElement> => {
  try {
    if ("createImageBitmap" in window && typeof createImageBitmap === "function") {
      return await createImageBitmap(file);
    }
  } catch {}

  // Fallback via HTMLImageElement
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
};

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> => {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.8,
    format = "image/webp",
  } = options;

  // If very small already, skip expensive work
  if (file.size < 150 * 1024) {
    return {
      blob: file,
      mimeType: file.type || "application/octet-stream",
      extension: (file.name.split(".").pop() || "").toLowerCase() || "jpg",
      width: 0,
      height: 0,
    };
  }

  let source: ImageBitmap | HTMLImageElement;
  try {
    source = await loadImageBitmap(file);
  } catch {
    // If decode fails (e.g., HEIC in unsupported browsers), upload original
    return {
      blob: file,
      mimeType: file.type || "application/octet-stream",
      extension: (file.name.split(".").pop() || "").toLowerCase() || "jpg",
      width: 0,
      height: 0,
    };
  }

  const srcWidth = (source as any).width;
  const srcHeight = (source as any).height;
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);
  const targetWidth = Math.max(1, Math.round(srcWidth * ratio));
  const targetHeight = Math.max(1, Math.round(srcHeight * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      blob: file,
      mimeType: file.type || "application/octet-stream",
      extension: (file.name.split(".").pop() || "").toLowerCase() || "jpg",
      width: srcWidth,
      height: srcHeight,
    };
  }

  // Draw with high quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if ("close" in (source as any)) {
    // ImageBitmap path
    // @ts-ignore
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    try { (source as any).close?.(); } catch {}
  } else {
    ctx.drawImage(source as HTMLImageElement, 0, 0, targetWidth, targetHeight);
  }

  const mimeType = format;
  const extension = format === "image/webp" ? "webp" : "jpg";

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b || file), mimeType, quality)
  );

  return { blob, mimeType, extension, width: targetWidth, height: targetHeight };
};
