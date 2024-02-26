// src/composables/useQueryString.js
import { ref } from "vue";

export function useQueryString() {
  const constructQueryString = (params) => {
    const queryParams = [];

    for (const key in params) {
      if (params[key]) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        );
      }
    }

    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  };

  return { constructQueryString };
}
