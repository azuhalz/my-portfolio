import { Plus } from "lucide-react";
import { ImageDropzone } from "@/components/form/ImageDropzone";

type ProjectImagesFieldProps = {
  images: string[]; // index 0 = cover, index 1 dst = gallery
  onCoverChange: (url: string) => void;
  onGalleryChange: (galleryIndex: number, url: string) => void;
  onAddGalleryImage: (url?: string) => void;
  onRemoveGalleryImage: (galleryIndex: number) => void;
};

export function ProjectImagesField({
  images,
  onCoverChange,
  onGalleryChange,
  onAddGalleryImage,
  onRemoveGalleryImage,
}: ProjectImagesFieldProps) {
  const coverImage = images[0] ?? "";
  const galleryImages = images.slice(1);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-text-secondary">
        Project Images / Gallery
      </span>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Cover */}
        <div className="flex flex-col gap-1.5 sm:w-2/5">
          <span className="text-xs text-text-secondary">Main Cover Image</span>
          <ImageDropzone
            className="h-28"
            label="Upload Main Image"
            hint="Recommended: 16:9, JPG or PNG"
            imageUrl={coverImage}
            onChange={onCoverChange}
          />
        </div>

        {/* Gallery */}
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs text-text-secondary">Gallery Images</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {galleryImages.map((imageUrl, index) => (
              <ImageDropzone
                key={index}
                className="h-28"
                label="Upload"
                ariaLabel={`Upload gallery image ${index + 1}`}
                imageUrl={imageUrl}
                onChange={(url) => {
                  if (url === "") {
                    onRemoveGalleryImage(index);
                  } else {
                    onGalleryChange(index, url);
                  }
                }}
              />
            ))}

            {/* Tombol Add Image slot baru */}
            <button
              type="button"
              onClick={() => onAddGalleryImage("")}
              className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/80 bg-background/40 p-2 text-text-secondary transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
            >
              <Plus size={20} />
              <span className="text-xs font-medium">Add Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
