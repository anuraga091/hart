export function calculateAge(dobTimestamp) {
    const dob = new Date(dobTimestamp);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    
    // If the current month is before the birth month, or it's the birth month but the current day is before the birth day, decrease age by 1
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
}