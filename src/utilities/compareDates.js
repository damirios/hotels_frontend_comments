import { months } from "./months";

export function compareDates(a, b) {
    
    const [dayA, monthStrA, yearA] = a.date.split(' ');
    const monthA = Object.entries(months).find((el) => el[1] === monthStrA)[0];
    const [hoursA, minutesA, secondsA] = a.time.split(':');
    const dateA = new Date(yearA, monthA - 1, dayA, +hoursA, +minutesA, +secondsA);

    const [dayB, monthStrB, yearB] = b.date.split(' ');
    const monthB = Object.entries(months).find((el) => el[1] === monthStrB)[0];    
    const [hoursB, minutesB, secondsB] = b.time.split(':');
    const dateB = new Date(yearB, monthB - 1, dayB, +hoursB, +minutesB, +secondsB);

    return dateB - dateA;
}