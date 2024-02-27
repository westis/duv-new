// src/utils/fetchEventResults.js
import axios from "axios";

const resultsBaseUrl = "https://statistik.d-u-v.org/json/mgetresultevent.php";

const convertPerformanceToSeconds = (performance) => {
  const parts = performance.split(":").map((part) => parseInt(part, 10)); // Convert each part to an integer
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // Convert to seconds
  }
  return 0; // Default value in case of unexpected format
};

export async function fetchEventResults(eventId, filters = {}) {
  const queryParams = new URLSearchParams({
    event: eventId,
    ...filters,
  }).toString();
  try {
    const response = await axios.get(`${resultsBaseUrl}?${queryParams}`);

    // Ensure your response.data.Resultlist or similar is the correct path to your results array
    const processedResultList = response.data.Resultlist.map((item) => ({
      ...item,
      PerformanceNumeric: convertPerformanceToSeconds(item.Performance),
    }));

    return {
      eventHeader: response.data.EvtHeader,
      resultList: processedResultList, // Now using the processed list with PerformanceNumeric
      filters: {
        ageCategories: response.data.FltCatValues.map((value, index) => ({
          value,
          label: response.data.FltCatLabels[index],
        })),
        countryList: response.data.FltCountryValues.map((code, index) => ({
          code,
          label: response.data.FltCountryLabels[index],
        })),
        // Add other filters as needed based on the API response
      },
    };
  } catch (error) {
    console.error("Error fetching event results:", error);
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
}
