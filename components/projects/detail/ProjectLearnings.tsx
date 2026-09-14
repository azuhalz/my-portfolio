import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ProjectLearningsProps = {
  learnings: string[];
};

export function ProjectLearnings({ learnings }: ProjectLearningsProps) {
  return (
    <Card className="p-6 md:p-8 mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-md text-primary">
          <BookOpen size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">What I Learned</h2>
      </div>
      <ul className="space-y-3 pl-10 md:pl-12">
        {learnings.map((learning, index) => (
          <li
            key={index}
            className="flex gap-3 items-center text-text-secondary"
          >
            <span className="text-primary mt-1">✓</span>
            <span className="text-justify pr-12">{learning}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
