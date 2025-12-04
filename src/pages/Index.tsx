import { DropZone } from "@/components/DropZone";
import { Layers } from "lucide-react";

const Index = () => {
  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
  };

  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <header className="flex items-center justify-center mb-20 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl glass glow-sm">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              Blueprint<span className="text-primary">Pro</span>
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center">
          <div className="text-center mb-16 space-y-4 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-foreground">Process Your </span>
              <span className="text-primary text-glow">Blueprints</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Upload architectural drawings and let our AI extract, analyze, and transform your designs.
            </p>
          </div>

          {/* Drop Zone */}
          <div className="w-full animate-fade-up-delay">
            <DropZone onFileUpload={handleFileUpload} />
          </div>

          {/* Feature hints */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-up-delay">
            {[
              { label: "Auto-detect layers" },
              { label: "Export to CAD" },
              { label: "AI measurements" },
            ].map((feature) => (
              <div 
                key={feature.label}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature.label}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
