"use strict";

const calendar = document.querySelector('.calendar'), // все вікно календарю
    top_clock = calendar.querySelector('#top_hour'), //година зверху
    top_date = calendar.querySelector('#top_date'), // дата під годиною
    mid_date = calendar.querySelector('#btn_date'), // дата над днями
    days = calendar.querySelector('.days');

// //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
// const now = new Date(Date.now());
// let year = now.getFullYear(),
//     month = now.getMonth(),
//     day = now.getDay(),
//     hours = now.getHours(),
//     minutes = now.getMinutes(),
//     seconds = now.getSeconds();

//ВИВОДИТЬ ГОДИНУ ЗВЕРХУ
function show_hour(now) {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    //Дописує нулі якщо число менше 10-и
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    //Виводить актуальну годину
    top_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

//ВИВОДИТЬ ДАТУ ЗВЕРХУ (+ДАТА НАД ДНЯМИ)
function show_date(now) {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();

    //Місяці в родовому відмінку
    const monthes = {
        0: "січня",
        1: "лютого",
        2: "березня",
        3: "квітня",
        4: "травня",
        5: "червня",
        6: "липня",
        7: "серпня",
        8: "вересня",
        9: "жовтня",
        10: "листопада",
        11: "грудня"
    };

    const monthes_2 = {
        0: "січень",
        1: "лютий",
        2: "березень",
        3: "квітень",
        4: "травень",
        5: "червень",
        6: "липень",
        7: "серпень",
        8: "вересень",
        9: "жовтень",
        10: "листопад",
        11: "грудень"
    };

    //Виводить дату в топі календаря
    top_date.innerHTML = `${day} ${monthes[month]} ${year} р.`;
    //Виводить дату над днями тижня
    mid_date.innerHTML = `${monthes_2[month]} ${year} p.`;
}

// СТВОРЮЄ ТА ДОДАЄ ДНІ
function add_days() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    const now = new Date(Date.now());
    const month = now.getMonth();
    const dayOfMonth = now.getDate();

    //Заповнює календар днями до 42
    for (let i = 1; i < 43; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.innerHTML = i;
        days.append(day);

        //Додає клас current-day для поточного дня
        if (i === dayOfMonth && (i <= 31 || (i <= 29 && month === 1) || (i <= 30 && month !== 1))) {
            day.classList.add('current-day');
        }
    }

    //Масив зі всіма днями
    const days_all = calendar.querySelectorAll('.day');

    //Визначає кількість днів у лютому враховуючи високосний рік
    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInFebruary = isLeapYear(now.getFullYear()) ? 29 : 28;

    //Редагує зайві дні 
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        for (let i = 31; i < 43; i++) {
            days_all[i].innerHTML = i - 30;
            days_all[i].classList.remove('day');
            days_all[i].classList.add('day_last');
        }
    } else if (month == 1) {
        for (let i = 29; i < 43; i++) {
            days_all[i].innerHTML = i - (31 - daysInFebruary);
            days_all[i].classList.remove('day');
            days_all[i].classList.add('day_last');
        }
    } else {
        for (let i = 30; i < 43; i++) {
            days_all[i].innerHTML = i - (30 - daysInFebruary);
            days_all[i].classList.remove('day');
            days_all[i].classList.add('day_last');
        }
    }
}

// ВИКЛИКАНІ ФУНКЦІЇ
// Оновлює годину та дату кожну секунду
setInterval(() => {
    const now = new Date(Date.now());
    show_hour(now);
    show_date(now);
}, 1000);

// Викликає функцію для додавання днів
add_days();