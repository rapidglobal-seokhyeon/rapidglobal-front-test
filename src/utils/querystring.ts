type QueryStringPayloadType = {
  [K in string]: string | number | boolean | any;
};
type MakeQueryStringLoopType = (
  payload: QueryStringPayloadType,
  first?: boolean
) => string;

export const makeQueryString: MakeQueryStringLoopType = (
  payload,
  first = true
) => {
  let query = "";

  if (typeof payload !== "object") {
    return "";
  }

  for (const key in payload) {
    const value =
      typeof payload[key] === "string"
        ? payload[key] || null
        : payload[key] ?? null;

    if (value !== null && typeof value === "object") {
      query += `&${key}=${JSON.stringify(value)}`;

      continue;
    } else {
      query += `&${key}=${value}`;

      if (first) {
        query = query.replace(/^&/, "?");
      }
    }
  }

  return query;
};

export const encodeString = (str: any): string => encodeURIComponent(str);
