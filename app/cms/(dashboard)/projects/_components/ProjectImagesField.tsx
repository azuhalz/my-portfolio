import { ImageDropzone } from "@/components/form/ImageDropzone";
import { MAX_GALLERY_IMAGES } from "@/lib/data/projects-data";

type ProjectImagesFieldProps = {
  images: string[]; // index 0 = cover, index 1 dst = gallery
  onChange: (index: number, url: string) => void;
};

export function ProjectImagesField({
  images,
  onChange,
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
            imageUrl={images[0] ?? ""}
            onChange={(url) => onChange(0, url)}
          />
        </div>

        {/* Gallery */}
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs text-text-secondary">
            Gallery Images (Max {MAX_GALLERY_IMAGES})
          </span>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: MAX_GALLERY_IMAGES }, (_, index) => (
              <ImageDropzone
                key={index}
                className="h-28"
                label="Upload"
                ariaLabel={`Upload gallery image ${index + 1}`}
                imageUrl={images[index + 1] ?? ""}
                onChange={(url) => onChange(index + 1, url)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
