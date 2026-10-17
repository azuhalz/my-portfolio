"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddCertificationView } from "./AddCertificationView";
import { CertificationList } from "./CertificationList";
import {
  certificationsData,
  type Certification,
} from "@/lib/data/certifications-data";

export function CertificationsCmsPage() {
  const [certifications, setCertifications] =
    useState<Certification[]>(certificationsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: Certification) => {
    const newCertification: Certification = {
      name: formData.name.trim(),
      issuer: formData.issuer.trim(),
      issuedDate: formData.issuedDate,
      expiryDate: formData.expiryDate || undefined,
      credentialUrl: formData.credentialUrl.trim(),
    };

    setCertifications((prev) => [...prev, newCertification]);
    setIsAdding(false);
  };

  const handleEdit = (certification: Certification) => {
    console.log("Edit certification:", certification);
  };

  const handleDelete = (certification: Certification) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${certification.name}"?`)) {
      setCertifications((prev) =>
        prev.filter((item) => item !== certification),
      );
    }
  };

  return (
    <CmsPageContainer size="form">
      {isAdding ? (
        <AddCertificationView
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <CertificationList
          certifications={certifications}
          onAdd={() => setIsAdding(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
