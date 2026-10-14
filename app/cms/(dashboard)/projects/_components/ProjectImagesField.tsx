import { ImageDropzone } from "@/components/form/ImageDropzone";
import { MAX_GALLERY_IMAGES } from "@/lib/data/project-form-data";

type ProjectImagesFieldProps = {
  coverImage: string;
  galleryImages: string[];
  onCoverChange: (url: string) => void;
  onGalleryChange: (index: number, url: string) => void;
};

export function ProjectImagesField({
  coverImage,
  galleryImages,
  onCoverChange,
  onGalleryChange,
}: ProjectImagesFieldProps) {
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
          <span className="text-xs text-text-secondary">
            Gallery Images (Max {MAX_GALLERY_IMAGES})
          </span>
          <div className="grid grid-cols-5 gap-2">
            {galleryImages.map((imageUrl, index) => (
              <ImageDropzone
                key={index}
                className="h-28"
                label="Upload"
                ariaLabel={`Upload gallery image ${index + 1}`}
                imageUrl={imageUrl}
                onChange={(url) => onGalleryChange(index, url)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
