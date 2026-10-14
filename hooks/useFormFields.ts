import { useState } from "react";

// State form sederhana: satu objek data + satu handler untuk mengubah tiap field.
export function useFormFields<T extends object>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);

  const handleFieldChange = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, handleFieldChange };
}
