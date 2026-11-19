export const MIN_PASSWORD_LENGTH = 8;

export type AccountData = {
  name: string;
  email: string;
};

// Akun admin CMS (sementara data contoh, nanti dari backend)
export const accountData: AccountData = {
  name: "Zhafran",
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
