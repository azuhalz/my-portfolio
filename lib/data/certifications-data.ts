export type Certification = {
  name: string;
  issuer: string;
  issuedDate: string; // format "YYYY-MM"
  expiryDate?: string; // format "YYYY-MM", kosong = tidak ada masa berlaku
  credentialUrl: string;
};

export const certificationsData: Certification[] = [
  {
    name: "Learn to Build Back-End Applications for Beginners",
    issuer: "Dicoding Indonesia",
    issuedDate: "2024-03",
    expiryDate: "2027-03",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ02VQGRX65",
  },
  {
    name: "Learn to Build Web Applications with React",
    issuer: "Dicoding Indonesia",
    issuedDate: "2023-11",
    expiryDate: "2026-11",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVDQ0YQZN9",
  },
  {
    name: "Learn Front-End Web Development for Beginners",
    issuer: "Dicoding Indonesia",
    issuedDate: "2023-11",
    expiryDate: "2026-11",
    credentialUrl: "https://www.dicoding.com/certificates/GRX5QN002Z0M",
  },
  {
    name: "Learning JavaScript Programming Basics",
    issuer: "Dicoding Indonesia",
    issuedDate: "2023-11",
    expiryDate: "2026-11",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVDQNNJZN9",
  },
  {
    name: "Learning Web Programming Basics",
    issuer: "Dicoding Indonesia",
    issuedDate: "2024-01",
    expiryDate: "2027-01",
    credentialUrl: "https://www.dicoding.com/certificates/53XEYDJ9YPRN",
  },
  {
    name: "Learn Git Basics with GitHub",
    issuer: "Dicoding Indonesia",
    issuedDate: "2023-03",
    expiryDate: "2026-03",
    credentialUrl: "https://www.dicoding.com/certificates/MEPJK7E4JX3V",
  },
];

// ===== Form CMS (Add/Edit Certification) =====

export type CertificationFormData = {
  name: string;
  issuer: string;
  issuedDate: string; // format "YYYY-MM" dari input type="month"
  expiryDate: string; // kosong = tidak ada masa berlaku
  credentialUrl: string;
};

export const initialCertificationFormData: CertificationFormData = {
  name: "",
  issuer: "",
  issuedDate: "",
  expiryDate: "",
  credentialUrl: "",
};
