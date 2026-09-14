import { FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ProjectOverviewProps = {
  overview: string;
};

export function ProjectOverview({ overview }: ProjectOverviewProps) {
  return (
    <Card className="p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-md text-primary">
          <FileText size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Project Overview</h2>
      </div>
      <p className="text-justify text-text-secondary leading-relaxed pl-0 md:px-12">
        {overview}
      </p>
    </Card>
  );
}
