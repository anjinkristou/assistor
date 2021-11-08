export type Credentials = {
  access_token: string;
  refresh_token: string;
  permissions: string;
};

const CREDENTIALS_LOCAL_STORAGE_ITEM = "credentials";

export function isAuthenticated(): boolean {
  return Boolean(getCredentials());
}

export function setCredentials(credentials: Credentials) {
  localStorage.setItem(
    CREDENTIALS_LOCAL_STORAGE_ITEM,
    JSON.stringify(credentials)
  );
}

export function getCredentials(): Credentials | null {
  const raw = localStorage.getItem(CREDENTIALS_LOCAL_STORAGE_ITEM);
  if (raw === null) {
    return null;
  }
  return JSON.parse(raw);
}

export function removeCredentials(): void {
  localStorage.removeItem(CREDENTIALS_LOCAL_STORAGE_ITEM);
}