function convertISTtoUTC(istDateString) {
    // Check if the input string is already in UTC (ends with 'Z' or includes '+00:00')
    if (istDateString.endsWith('Z') || istDateString.includes('+00:00')) {
        return istDateString; // It's already in UTC, return as is
    }

    // Create a Date object from the IST date string
    const istDate = new Date(istDateString);

    // Check if the date is valid
    if (isNaN(istDate.getTime())) {
        throw new Error("Invalid date format. Please use 'YYYY-MM-DDTHH:mm:ss' or a similar valid format.");
    }

    // Get the IST offset (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds

    // Convert IST to UTC by subtracting the offset
    const utcDate = new Date(istDate.getTime() - istOffset);

    // Return the UTC time in ISO format
    return utcDate.toISOString();
}