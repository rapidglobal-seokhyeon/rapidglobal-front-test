type fetchUtils = {
  path: string;
  option?: RequestInit;
  apiErrorMessage?: string;
};

export const fetchUtils = async <T>({
  path,
  apiErrorMessage,
  option,
}: fetchUtils): Promise<T> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + path;
    const res = await fetch(url, option);

    if (!res.ok) {
      throw Error(apiErrorMessage || "API Error");
    }

    return res.json() as T;
  } catch (error) {
    console.error(error);
    throw Error("api error");
  }
};
