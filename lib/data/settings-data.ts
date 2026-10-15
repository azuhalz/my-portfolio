export const MIN_PASSWORD_LENGTH = 8;

// Akun admin CMS (sementara data contoh, nanti dari backend)
export const accountData = {
  email: "ahmadzuhalzhafran@gmail.com",
};

export type PasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

export const initialPasswordFormData: PasswordFormData = {
  newPassword: "",
  confirmPassword: "",
};
