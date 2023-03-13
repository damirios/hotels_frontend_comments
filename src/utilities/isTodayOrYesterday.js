import { months } from "./months";

export function isTodayOrYesterday(dateStr) {
    const [date, monthStr, year] = dateStr.split(' ');
    const month = Object.entries(months).find((el) => el[1] === monthStr)[0];
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayMidnight = new Date(todayYear, todayMonth, todayDate);
    
    const commentDay = new Date(year, month - 1, date);

    const timeDiffInHours = (commentDay - todayMidnight) / (60 * 60 * 1000);
    if (timeDiffInHours === 0) {
        return {status: true, date: 'сегодня'};
    } else if (timeDiffInHours === -24) {
        return {status: true, date: 'вчера'};
    }

    return {status: false};
}