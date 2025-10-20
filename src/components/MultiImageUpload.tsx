import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Eye, Loader2, Camera, Image, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { compressImage } from "@/utils/imageCompression";

interface BookImages {
  frontCover: string;
  backCover: string;
  insidePages: string;
}

interface MultiImageUploadProps {
  images?: string[] | BookImages;
  onImagesChange: (images: string[] | BookImages) => void;
  maxImages?: number;
  className?: string;
  variant?: "array" | "object";
  currentImages?: BookImages;
  disabled?: boolean;
}

const MultiImageUpload = ({
  images,
  onImagesChange,
  maxImages = 3,
  className = "",
  variant = "object",
  currentImages,
  disabled = false,
}: MultiImageUploadProps) => {
  const [isUploading, setIsUploading] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cameraInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Convert images to array format for consistent handling
  const getImageArray = (): string[] => {
    if (variant === "object") {
      const bookImages = (currentImages || images) as BookImages;
      if (!bookImages) return [];
      return [
        bookImages.frontCover,
        bookImages.backCover,
        bookImages.insidePages,
      ]
        .filter(Boolean)
        .slice(0, 3); // Limit to 3 images
    }
    return ((images || []) as string[]).slice(0, 3); // Limit to 3 images
  };

  // Convert array back to appropriate format
  const updateImages = (newImages: string[]) => {
    if (variant === "object") {
      const bookImages: BookImages = {
        frontCover: newImages[0] || "",
        backCover: newImages[1] || "",
        insidePages: newImages[2] || "",
      };
      onImagesChange(bookImages);
    } else {
      onImagesChange(newImages);
    }
  };

  const imageArray = getImageArray();

  const slots = [
    { label: "Front Cover", index: 0 },
    { label: "Back Cover", index: 1 },
    { label: "Inside Pages", index: 2 },
  ];

  const uploadImage = async (file: File): Promise<string> => {
    const compressed = await compressImage(file, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 0.8,
      format: "image/webp",
    });

    const fileName = `${Math.random()}.${compressed.extension}`;
    const filePath = `book-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("book-images")
      .upload(filePath, compressed.blob, {
        upsert: false,
        cacheControl: "31536000", // 1 year cache
        contentType: compressed.mimeType,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("book-images").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // File validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/heic",
      "image/heif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPG, PNG, HEIC, WebP)");
      return;
    }

    // Instant local preview while uploading
    const objectUrl = URL.createObjectURL(file);
    const tempImages = [...imageArray];
    tempImages[index] = objectUrl;
    updateImages(tempImages);

    setIsUploading((prev) => ({ ...prev, [index]: true }));

    try {
      const imageUrl = await uploadImage(file);
      const newImages = [...imageArray];
      newImages[index] = imageUrl;
      updateImages(newImages);
      toast.success(`${slots[index].label} uploaded successfully!`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Failed to upload ${slots[index].label}. Please try again.`);
      const newImages = [...imageArray];
      newImages[index] = "";
      updateImages(newImages);
    } finally {
      setIsUploading((prev) => ({ ...prev, [index]: false }));
      // Reset the input and cleanup preview URL
      try { URL.revokeObjectURL(objectUrl); } catch {}
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...imageArray];
    newImages[index] = "";
    updateImages(newImages);
    toast.success(`${slots[index].label} removed`);
  };

  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const triggerCameraInput = (index: number, facingMode: 'user' | 'environment' = 'environment') => {
    // For camera capture, we'll use the same file input but with capture attribute
    const input = cameraInputRefs.current[index];
    if (input) {
      // Set the capture mode dynamically
      input.setAttribute('capture', facingMode === 'user' ? 'user' : 'environment');
      input.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-3 gap-6"}`}
      >
        {slots.map((slot) => {
          const index = slot.index;
          const hasImage = imageArray[index];
          const isCurrentlyUploading = isUploading[index];

          return (
            <div key={slot.label} className="space-y-2">
              <h3
                className={`font-medium text-center ${isMobile ? "text-sm" : "text-base"}`}
              >
                {slot.label} <span className="text-red-500">*</span>
              </h3>

              <Card
                className={`${isMobile ? "h-40" : "h-48"} transition-all duration-200 hover:shadow-md`}
              >
                <CardContent className="p-4 h-full">
                  {hasImage ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-1 relative">
                        <img
                          src={hasImage}
                          alt={slot.label}
                          width="200"
                          height={isMobile ? "120" : "150"}
                          className={`w-full ${isMobile ? "h-24" : "h-32"} object-cover rounded mb-3 cursor-pointer shadow-sm`}
                          loading="lazy"
                          decoding="async"
                          onClick={() => setPreviewImage(hasImage)}
                        />
                      </div>
                      <div
                        className={`flex gap-2 justify-center ${isMobile ? "flex-row" : "flex-row"}`}
                      >
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setPreviewImage(hasImage)}
                          className={`${isMobile ? "flex-1 h-10 text-xs" : "min-h-[32px]"} touch-manipulation`}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {!disabled && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className={`${isMobile ? "flex-1 h-10 text-xs" : "min-h-[32px]"} touch-manipulation`}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-center space-y-3">
                      <div
                        className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} bg-gray-100 rounded-lg mx-auto flex items-center justify-center`}
                      >
                        {isCurrentlyUploading ? (
                          <Loader2
                            className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-blue-500 animate-spin`}
                          />
                        ) : (
                          <Camera
                            className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-gray-400`}
                          />
                        )}
                      </div>

                      {/* Hidden file inputs */}
                      {/* Gallery selection input */}
                      <input
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        type="file"
                        accept="image/*,image/heic,image/heif,image/webp"
                        onChange={(e) => handleFileUpload(e, index)}
                        className="hidden"
                        disabled={isCurrentlyUploading || disabled}
                      />

                      {/* Camera capture input */}
                      <input
                        ref={(el) => (cameraInputRefs.current[index] = el)}
                        type="file"
                        accept="image/*,image/heic,image/heif,image/webp"
                        onChange={(e) => handleFileUpload(e, index)}
                        className="hidden"
                        disabled={isCurrentlyUploading || disabled}
                        capture="environment"
                      />

                      {isMobile ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isCurrentlyUploading || disabled}
                              className={`w-full h-12 text-sm touch-manipulation`}
                            >
                              {isCurrentlyUploading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <Camera className="h-4 w-4 mr-2" />
                              )}
                              {isCurrentlyUploading
                                ? "Uploading..."
                                : `Add ${slot.label}`}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuItem onClick={() => triggerFileInput(index)}>
                              <Image className="mr-2 h-4 w-4" />
                              <span>Choose from Gallery</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => triggerCameraInput(index, 'environment')}>
                              <Camera className="mr-2 h-4 w-4" />
                              <span>Take Photo (Back Camera)</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => triggerCameraInput(index, 'user')}>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              <span>Take Photo (Front Camera)</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isCurrentlyUploading || disabled}
                          onClick={() => triggerFileInput(index)}
                          className={`w-full min-h-[44px] touch-manipulation`}
                        >
                          {isCurrentlyUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Upload className="h-4 w-4 mr-2" />
                          )}
                          {isCurrentlyUploading
                            ? "Uploading..."
                            : `Upload ${slot.label}`}
                        </Button>
                      )}

                      <p
                        className={`text-xs text-gray-500 text-center`}
                      >
                        {isMobile
                          ? "Gallery or Camera • PNG, JPG up to 10MB"
                          : "PNG, JPG up to 10MB"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <Button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 z-10"
              variant="secondary"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={previewImage}
              alt="Selected file preview"
              width="800"
              height="600"
              className="max-w-full max-h-[400px] object-contain rounded-lg shadow-md"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;
