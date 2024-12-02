const apiUrl = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        processFetchedData(data.records);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

function processFetchedData(records) {
    const parsedData = records.map(record => ({
        nationality: record.record.fields.nationality,
        college: record.record.fields.colleges,
        program: record.record.fields.the_programs,
        enrollmentCount: record.record.fields.number_of_students
    }));
    console.log("Parsed Data:", parsedData);
}
// The fetched data will just be data.records.
fetchData();
