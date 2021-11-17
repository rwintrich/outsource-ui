import * as momentImport from 'moment';

const moment = momentImport;

function isSameDay(firstDate: Date, secondDate: Date) {
    return moment(firstDate).isSame(secondDate, 'day');
}

function checkExceedsDays(dateCompared: Date, referenceDate: Date, days: number) {
    return moment(dateCompared).isAfter(moment(referenceDate).add(days, 'day'), 'day');
}

/**
 * verifica se a primeira data passada é menor que a segunda
 * @param firstDate to happen
 * @param secondDate to happen
 */
function compare(firstDate: Date, secondDate: Date) {
    return moment(firstDate).isBefore(secondDate, 'day');
}

/**
 * Retorna a data atual
 */
const today = new Date(new Date().setHours(0, 0, 0, 0));


/**
 * Retorna a data atual formatada en-Us
 */
const todayFormatted = moment(today).format('YYYY-MM-DD');

/**
 * Retorna o dia atual
 */
const currentDay = new Date().getDay();


/**
 * Retorna o mês atual (mês - 1)
 */
const currentMonth = new Date().getMonth();

/**
 * Retorna o ano atual completo (YYYY)
 */
const currentYear = new Date().getFullYear();

/**
 * Retorna o último dia do mês atual
 * 30 ou 31 (28 ou 29 em fevereiro)
 */
function lastDayMonth(year?: number | any, month?: number | any) {
    return new Date(year !== null ? year : currentYear, month !== null ? month : currentMonth, 0).getDate();
}

function substractMonth(date: momentImport.MomentInput, month: number): momentImport.Moment {
    return moment(date).subtract(month, 'month');
}

function sumDateMonth(date: momentImport.MomentInput, monthInput: number) {
    const month = Number(moment(date).format('MM')) + monthInput;
    const day = moment(date).format('DD');

    return moment(new Date(
        currentYear,
        month,
        Number(day),
        0, 0, 0, 0
    )).toDate();
}

/**
 * Monta uma data com os valores informados / data atuais
 * @param year Ano a ser setado podendo ser nulo, inserindo a data atual
 * @param month Mês a ser setado podendo ser nulo, inserindo a data atual
 * @param day Dia a ser setado podendo ser nulo, inserindo a data atual
 */
function setDate(year: number, month: number, day: number) {
    return moment(new Date(
        year ? year : currentYear,
        month !== null && (month >= 0 && month < 12) ? month : currentMonth,
        day ? day : currentDay,
        0, 0, 0, 0
    )).toDate();
}

function formatHour(hour: momentImport.MomentInput) {
    return moment(hour).format('HH:mm');
}

function toDate(date: momentImport.MomentInput) {
    return moment(date).toDate();
}

/**
 * Formata a data para TimeStamp en-Us / pt-Br
 * @param date Data informada a ser convertida
 * @param timestamp True: converte para timestamp en-Us, False: converte timestamp pr-Br
 */
function formatDateHourTimestamp(date: momentImport.MomentInput, timestamp: boolean) {
    if (!date) return null;
    return timestamp ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : moment(date).format('DD/MM/YYYY HH:mm:ss');
}

function formatDateTime(date: momentImport.MomentInput) {
    if (!date) return null;
    return moment(date).format('DD/MM/YYYY HH:mm');
}

/**
 * Formatar data padrões en-Us / pt-Br
 * @param date Data a ser formatada
 * @param americanDate se True, formata para padrão Americano, False formata padrão Brasileiro
 */
function formatDate(date: momentImport.MomentInput, americanDate: boolean) {
    return date && (americanDate ? moment(date).format('YYYY-MM-DD') : moment(date).format('DD/MM/YYYY'));
}

/**
 * 
 * @param date data original
 * @param numberOfMonths número de meses que serão acrescentados
 */
function addMonths(date: Date, numberOfMonths: number) {
    date.setMonth(date.getMonth() + numberOfMonths);
    return date;
}

/**
 * 
 * @param date data original
 * @param numberOfMonths número de meses que serão subtraídos
 */
function subMonths(date: Date, numberOfMonths: number) {
    date.setMonth(date.getMonth() - numberOfMonths);
    return date;
}

function eachDayOfInterval(interval: { start: Date, end: Date }) {
    const dates = new Array<Date>();
    let date = new Date(interval.start);
    do {
        dates.push(date);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    } while (compare(date, interval.end) || isSameDay(date, interval.end));

    return dates;
}

function endOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1, -3, 0, -1);
}

function endOfWeek(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay(), -3, 0, -1);
}

function weekDay(date: Date) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days[date.getDay()];
}

function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth());
}

function startOfWeek(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
}


/**
 * @returns final do dia da data @param date  informada
 */
function startOfTheDay(date: string | Date): string {
    if (date == null) return null || "";
    if (typeof date === 'string') {
        const startDateAsArray = date && date.split('-');
        return formatDateHourTimestamp(new Date(+startDateAsArray[0], +startDateAsArray[1] - 1, +startDateAsArray[2], 0, 0, 0), true) || "";
    } else {
        return formatDateHourTimestamp(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), true) || "";
    }
}

/**
 * @returns final do dia da data @param date  informada
 */
function endOfTheDay(date: string | Date): string {
    if (date == null) return null || "";
    if (typeof date === 'string') {
        const endDateAsArray = date && date.split('-');
        return formatDateHourTimestamp(new Date(+endDateAsArray[0], +endDateAsArray[1] - 1, +endDateAsArray[2], 23, 59, 59), true) || "";
    } else {
        return formatDateHourTimestamp(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59), true) || "";
    }
}

export {
    isSameDay, checkExceedsDays, compare, today, todayFormatted, currentDay,
    currentMonth, currentYear, lastDayMonth, substractMonth, sumDateMonth, setDate,
    formatHour, toDate, formatDateHourTimestamp, formatDateTime, formatDate, addMonths,
    eachDayOfInterval, endOfMonth, endOfWeek, weekDay, startOfMonth, startOfWeek, subMonths, endOfTheDay, startOfTheDay
};
