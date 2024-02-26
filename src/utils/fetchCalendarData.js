// src/utils/fetchCalendarData.js
/**
 * Purpose: Fetch events from the /json/mcalendar.php endpoint.
 * Parameters:
 * year (optional, futur for future events, past1 for past year, or a specific year)
 * country (optional)
 * dist (distance, optional)
 * cup (optional)
 * rproof (ranking eligible. 0 for all, 1 for yes, 2 for no. optional)
 * norslt (no results, 1 to include events without results. optional)
 * page (optional, for handling pagination)
 */

import axios from "axios";

const baseUrl = "https://statistik.d-u-v.org/json/mcalendar.php";

export async function fetchCalendarData(params = {}) {
  const defaultParams = {
    year: "futur",
    dist: "all",
    country: "all",
    cups: "all",
    rproof: 0,
    mode: "list",
  };

  const mergedParams = { ...defaultParams, ...params };

  // Pagination and filtering parameters (if needed); update as necessary
  if (params.pagination) {
    mergedParams.page = params.pagination.page;
  }
  if (params.filters) {
    mergedParams.eventType = params.filters.eventType;
    mergedParams.dist = params.filters.dist;
  }

  // Construct the query string using URLSearchParams for robust encoding
  const queryString = new URLSearchParams(mergedParams).toString();

  try {
    const response = await axios.get(`${baseUrl}?${queryString}`);

    // Attempt to parse the JSON response
    try {
      console.log(response);

      return {
        events: response.data.Races,
        pagination: response.data.Pagination,
        filters: {
          yearList: response.data.FltYearlist,
          countryList: response.data.FltCountryValues.map((code, index) => ({
            code,
            label: response.data.FltCountryValues[index],
          })),
          distanceList: response.data.FltDistValue.map((value, index) => ({
            value,
            label: response.data.FltDistLabel[index],
          })),
          eventTypeList: response.data.FltEventTypes,
        },
      };
    } catch (parseError) {
      // Handle JSON parsing error
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Invalid JSON data");
    }
  } catch (fetchError) {
    // Handle errors related to the fetch request itself
    console.error("Error fetching data:", fetchError);
    if (fetchError.response) {
      // API might return an error status code and/or message
      throw new Error(
        `API Error: ${fetchError.response.status} - ${fetchError.response.statusText}`
      );
    } else {
      throw new Error("Network Error");
    }
  }
}

// TODO: Combined filter for country code and label
// "FltCountries": [
//   { "code": "SWE", "label": "Sweden" },
//   { "code": "GER", "label": "Germany" },
//   // ... and so on
// ]

// TODO: Separate FltEventTypes into FltTypeValuue and FltTypeLabel, to values and labels, to get the parameter values for each event type (don't  use surface as parameter)
// "FltEventTypes": [
//   { "value": "Trail", "label": "Trail Race" },
//   { "value": "Road", "label": "Road Race" },

//  TODO: Why is MaxPage never more than 10, even if we may use page=11 and beyond?
