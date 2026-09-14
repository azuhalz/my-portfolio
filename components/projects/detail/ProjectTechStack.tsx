import { Code2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type ProjectTechStackProps = {
  techStack: string[];
};

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <Card className="p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-md text-primary">
          <Code2 size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
      </div>
      <div className="flex flex-wrap gap-3 pl-0 md:pl-12">
        {techStack.map((tech, index) => (
          <Badge key={index} className="px-4 py-2 text-sm">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
