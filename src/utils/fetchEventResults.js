import axios from "axios";

// Define the base URL for fetching event results
const resultsBaseUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/mgetresultevent.php`;

// Define default parameters for event results fetching
export const defaultEventResultsParams = {
  cat: "all",
  country: "all",
  // Add other default parameters as needed
};

// Helper function to convert performance strings to numeric seconds
const convertPerformanceToSeconds = (performance) => {
  const parts = performance.split(":").map((part) => parseInt(part, 10)); // Convert each part to an integer
  return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : 0; // Convert to seconds or return 0 for unexpected format
};

// Function to fetch event results with optional filters
export async function fetchEventResults(eventId, filters = {}) {
  // Merge default parameters with passed filters, ensuring defaults are used if filters are missing
  const effectiveFilters = { ...defaultEventResultsParams, ...filters };

  // Construct the query string using URLSearchParams for robust encoding
  const queryParams = new URLSearchParams({
    event: eventId, // Ensure the event ID is always included
    ...effectiveFilters, // Include the merged filters
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
        // Update or adjust this part based on the actual API response structure
        ageCategories: response.data.FltCatValues.map((value, index) => ({
          value,
          label: response.data.FltCatLabels[index],
        })),
        countryList: response.data.FltCountryValues.map((code, index) => ({
          code,
          label: response.data.FltCountryLabels[index],
        })),
        // Include additional filter mappings as needed
      },
    };
  } catch (error) {
    console.error("Error fetching event results:", error);
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
}
