import { useState, useCallback } from "react";
import { Upload, FileImage, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface DropZoneProps {
  onFileUpload?: (file: File) => void;
}

export const DropZone = ({ onFileUpload }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      onFileUpload?.(file);
      toast.success("Blueprint uploaded successfully!");
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      onFileUpload?.(file);
      toast.success("Blueprint uploaded successfully!");
    }
  }, [onFileUpload]);

  const clearFile = useCallback(() => {
    setUploadedFile(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
          ${isDragging 
            ? "glass-hover glow-md scale-[1.02]" 
            : "glass-hover"
          }
        `}
      >
        {/* Animated border gradient */}
        <div 
          className={`
            absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
            ${isDragging ? "opacity-100" : ""}
          `}
          style={{
            background: "linear-gradient(90deg, hsl(192 100% 50% / 0.3), hsl(217 100% 60% / 0.3), hsl(192 100% 50% / 0.3))",
            backgroundSize: "200% 100%",
            animation: isDragging ? "shimmer 2s linear infinite" : "none",
          }}
        />
        
        <div className="relative p-12">
          {!uploadedFile ? (
            <label className="cursor-pointer block">
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.dwg,.dxf"
                onChange={handleFileInput}
              />
              
              <div className="flex flex-col items-center gap-6">
                {/* Icon container */}
                <div 
                  className={`
                    p-6 rounded-2xl transition-all duration-500
                    ${isDragging 
                      ? "bg-primary/20 glow-sm" 
                      : "bg-secondary/50"
                    }
                  `}
                >
                  <Upload 
                    className={`
                      w-12 h-12 transition-all duration-500
                      ${isDragging 
                        ? "text-primary animate-float" 
                        : "text-muted-foreground"
                      }
                    `}
                  />
                </div>
                
                {/* Text content */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-medium text-foreground">
                    {isDragging ? "Release to upload" : "Drop your blueprint here"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    or click to browse • PDF, PNG, JPG, DWG, DXF
                  </p>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </div>
            </label>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-primary/20 glow-sm">
                  <FileImage className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium truncate max-w-xs">
                    {uploadedFile.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <button
                  onClick={clearFile}
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-destructive/20 transition-colors group"
                >
                  <X className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
