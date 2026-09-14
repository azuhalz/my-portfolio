import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Certification } from "@/lib/certifications-data";

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="p-4 flex flex-col justify-between">
      {/* Nama & Info Sertifikasi */}
      <div>
        <p className="text-white text-lg font-semibold">{certification.name}</p>
        <p className="text-primary">{certification.issuer}</p>
        <p className="text-text-secondary">{certification.date}</p>
      </div>

      {/* Tombol Show Credential */}
      <Button
        variant="outline"
        href={certification.credentialUrl}
        className="mt-4"
        target="_blank"
      >
        Show credential ↗
      </Button>
    </Card>
  );
}
