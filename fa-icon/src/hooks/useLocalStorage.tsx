import { localStorageMethods } from "@/lib/constant";

const { SET, GET } = localStorageMethods;

export function useLocalStorage() {
  function localStorageUsage(method: string, key?: any, value?: any) {
    if (method === GET) {
      return localStorage.getItem(key);
    } else if (method === SET) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
  return [localStorageUsage];
}

export const clearLocalStorage = () => {
  localStorage.clear();
};
