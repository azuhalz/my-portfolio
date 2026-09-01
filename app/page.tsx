import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Card
        children={
          <Image
            src="/images/projects/dashboard-analytics.png"
            alt="Dashboard Analytics"
            width={500}
            height={300}
          />
        }
      />
      <Card
        children={
          <Image
            src="/images/projects/dashboard-analytics.png"
            alt="Dashboard Analytics"
            width={500}
            height={300}
          />
        }
      />
      <Card
        children={
          <Image
            src="/images/projects/dashboard-analytics.png"
            alt="Dashboard Analytics"
            width={500}
            height={300}
          />
        }
      />
    </div>
  );
}
