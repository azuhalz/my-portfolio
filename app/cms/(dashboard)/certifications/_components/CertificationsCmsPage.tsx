"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddCertificationView } from "./AddCertificationView";
import { CertificationList } from "./CertificationList";
import { useDialog } from "@/hooks/useDialog";
import {
  certificationsData,
  type Certification,
} from "@/lib/data/certifications-data";

export function CertificationsCmsPage() {
  const { confirmAdd, notifyAdded, confirmDelete } = useDialog();
  const [certifications, setCertifications] =
    useState<Certification[]>(certificationsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = async (formData: Certification) => {
    const newCertification: Certification = {
      name: formData.name.trim(),
      issuer: formData.issuer.trim(),
      issuedDate: formData.issuedDate,
      expiryDate: formData.expiryDate || undefined,
      credentialUrl: formData.credentialUrl.trim(),
    };

    if (!(await confirmAdd("certification", newCertification.name))) return;

    setCertifications((prev) => [...prev, newCertification]);
    setIsAdding(false);
    await notifyAdded("certification");
  };

  const handleEdit = (certification: Certification) => {
    console.log("Edit certification:", certification);
  };

  const handleDelete = async (certification: Certification) => {
    if (await confirmDelete("certification", certification.name)) {
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
