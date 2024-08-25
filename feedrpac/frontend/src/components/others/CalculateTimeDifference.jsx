// Calculate the difference between the time of report submission and the current time.
export const CalculateTimeDifference = (submittedTime) => {
  const now = new Date();

  // Parse the submitted time string into a Date object
  const submittedDate = new Date(submittedTime);

  // Check if the submittedDate is a valid date
  if (isNaN(submittedDate.getTime())) {
    console.error('Invalid date:', submittedTime);
    return 'Invalid date';
  }

  const differenceInMilliseconds = now - submittedDate;
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  console.log('Current Time:', now);
  console.log('Submitted Time:', submittedTime);

  // Check the calculated time difference and return the appropriate human-readable string.
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} hours ago`;
  } else {
    // Calculate the difference in days
    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays} days ago`;
  }
};

// const testDate = '2024-08-25T12:51:11.783+00:00';
// console.log(CalculateTimeDifference(testDate));