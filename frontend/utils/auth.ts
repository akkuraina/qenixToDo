export const getStoredUser = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user");
};

export const setStoredUser = (email: string) => {
  localStorage.setItem("user", email);
};

export const clearStoredUser = () => {
  localStorage.removeItem("user");
};