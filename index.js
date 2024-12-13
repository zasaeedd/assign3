// API endpoint URL to fetch data from data.gov.bh
const apiUrl =
  "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Main function to fetch from API
async function fetchData() {
  try {
    // Fetch data from API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    // JSON response
    const data = await response.json();
    console.log("Fetched Data:", data);
    // Process the results array from the response
    processFetchedData(data.results);
  } catch (error) {
    // Handle any errors during fetching or processing
    console.error("Error:", error.message);
  }
}

// Function to parse and process the fetched data
function processFetchedData(results) {
  // Map through results and extract relevant fields
  const parsedData = results.map((result) => ({
    year: result.year,
    semester: result.semester,
    program: result.the_programs,
    nationality: result.nationality,
    college: result.colleges,
    enrollmentCount: result.number_of_students,
  }));
  console.log("Parsed Data:", parsedData);
  // Populate the HTML table with parsed data
  populateTable(parsedData);
}

// Function to render data in the HTML table
function populateTable(data) {
  // Get reference to table body element
  const tableBody = document.querySelector("#data-table tbody");

  // Clear any existing table content
  tableBody.innerHTML = "";

  // Loop through data and create table rows and cells
  data.forEach((item) => {
    const row = document.createElement("tr");

    // Create table cells for each value in the item
    Object.values(item).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    // Add completed row to table body
    tableBody.appendChild(row);
  });
}

// Call the main function to start the data fetching process
fetchData();
