"use strict";

const calendar = document.querySelector('.calendar'), // все вікно календарю
    top_clock = calendar.querySelector('#top_hour'), //година зверху
    top_date = calendar.querySelector('#top_date'), // дата під годиною
    mid_date = calendar.querySelector('#btn_date'), // дата над днями
    days = calendar.querySelector('.days'), // дні 
    weeks = calendar.querySelector('.calendar_week'), // панель с днями тижня
    top_month = calendar.querySelector('.calendar_month'), // дата над днями + стрілки
    new_monthes = calendar.querySelector('.monthes'), // місяці які заміняють дні
    new_years = calendar.querySelector('.years'), // роки які заміняють місяці
    btn_left = calendar.querySelector('#btn_left'), // ліва стрілка
    btn_right = calendar.querySelector('#btn_right'); // права стрілка

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
}; //(потрібно було вивести сюди для роботи ф-ції show_mid_date)

let mode = 1; // режим відображення (1 - дні/2 - місяці/3 - роки)

//ВИВОДИТЬ ГОДИНУ ЗВЕРХУ
function show_hour() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let now = new Date(Date.now());
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

//ВИВОДИТЬ ДАТУ ЗВЕРХУ
function show_date() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let now = new Date(Date.now());
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

    //Виводить дату в топі календаря
    top_date.innerHTML = `${day} ${monthes[month]} ${year} р.`;
}

//ВИВОДИТЬ СЕРЕДНЮ ДАТУ (ПОТРІБНО ДЛЯ ФУНКЦІОНАЛУ КНОПКИ ПІСЛЯ ЗМІНИ РЕЖИМУ ВІДОБРАЖЕННЯ)
function show_mid_date(a) {
    mid_date.innerHTML = a;
}
//ПРИХОВУЄ ВСІ ДНІ ТА ПОЗНАЧКИ ДНІВ ТИЖНЯ
function hide_days() {
    days.style.display = 'none';
    weeks.style.display = 'none';
}
//ПОКАЗУЄ ВСІ ДНІ ТА ПОЗНАЧКИ ДНІВ ТИЖНЯ
function show_days() {
    days.style.display = 'flex';
    weeks.style.display = 'flex';
    //Підганяє верстку
    top_month.style.marginBottom = '0';
}

//ДОДАЄ ДНІ
function add_days() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let now = new Date(Date.now());
    let month = now.getMonth();
    let dayOfMonth = now.getDate();
    let year = now.getFullYear();

    //Викликає ф-цію яка виводить дату над днями
    show_mid_date(`${monthes_2[month]} ${year} p.`);

    //Заповнює календар днями до 42
    for (let i = 1; i <= 35; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.innerHTML = i;
        days.append(day);
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

//ДОДАЄ МІСЯЦІ
function add_monthes() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let now = new Date(Date.now()),
        month = now.getMonth();

    const monthes = [
        'Січень', 'Лютий', 'Березень', 'Квітень',
        'Травень', 'Червень', 'Липень', 'Серпень',
        'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    // Додає перші 12 місяців
    for (let i = 1; i < 13; i++) {
        const month = document.createElement('div');
        month.classList.add('month');
        month.innerHTML = monthes[i - 1];
        new_monthes.append(month);
    }

}
add_monthes(); //викликаємо один раз щоб створити їх

//ПРИХОВУЄ МІСЯЦІ
function hide_monthes() {
    new_monthes.style.display = 'none';
}
hide_monthes(); //приховуємо одразу щоб були дні

//ПОКАЗУЄ МІСЯЦІ
function show_monthes() {
    new_monthes.style.display = 'flex';
}

//ДОДАЄ РОКИ
function add_years() {
    // Теперішні дані по даті
    let now = new Date(Date.now()),
        currentYear = now.getFullYear();

    // Додає 100 років назад та 100 років вперед від поточного року
    for (let i = currentYear - 100; i <= currentYear + 100; i++) {
        const year = document.createElement('div');
        year.classList.add('year');
        year.innerHTML = i;
        new_years.append(year);
    }
}

add_years(); //викликаємо один раз щоб створити їх

//ПРИХОВУЄ РОКИ
function hide_years() {
    new_years.style.display = 'none';
}
hide_years(); //приховуємо одразу щоб були дні

//ПОКАЗУЄ РОКИ
function show_years() {
    new_years.style.display = 'flex';
}

//ПЕРЕКЛЮЧАЄ РЕЖИМ ПЕРЕГЛЯДУ(ДНІ/МІСЯЦІ/РОКИ)
function switch_view() {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let now = new Date(Date.now()),
        month = now.getMonth(),
        year = now.getFullYear();

    mid_date.addEventListener('click', () => {
        if (mode == 1) {
            //Приховує дні
            hide_days();
            //Забирає назву місяця з сер.дати
            show_mid_date(`${year} p.`);
            //Вирівнює верстку для панелі з кнопками
            top_month.style.marginTop = '-12%';
            //Показує місяці
            show_monthes();

            mode++;
        } else if (mode == 2) {
            //Приховує місяці
            hide_monthes();
            //Змінює рік на доступні з сер.дати
            show_mid_date(`${year - 4} - ${year + 4}`);
            show_mid_date(`${year} p.`);
            //Показує роки
            show_years();
            // Прокручує до поточного року
            const currentYearElement = document.querySelector('.year.current');
            if (currentYearElement) {
                currentYearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            mode++;
        } else if (mode == 3) {
            //Приховує роки
            hide_years();
            //Повертає в назву дату 
            show_mid_date(`${monthes_2[month]} ${year}p.`);
            //Вирівнює верстку для панелі з кнопками
            top_month.style.marginTop = '0';
            //Показує дні
            show_days();

            mode = 1;
        }
    });
}


//ПРИСВОЮЄ КЛАС CURRENT ПОТОЧНОМУ ДНЮ/МІСЯЦЮ/РОКУ
function make_current(now) {
    //ТЕПЕРІШНІ ДАНІ ПО ДАТІ
    let day = now.getDate(),
        month = now.getMonth(),
        year = now.getFullYear();
    // Змінні з псевдо-масивами для днів , місяців та років
    const ds = calendar.querySelectorAll('.day'),
        ms = calendar.querySelectorAll('.month'),
        ys = calendar.querySelectorAll('.year');

    //Для днів:
    ds.forEach((e, num) => {
        if (num == day - 1) {
            //Додаємо поточному дню клас current
            e.classList.add('current');
            //Видаляємо іншим дням клас current
        } else {
            e.classList.remove('current');
        }
    });

    //Для місяців:
    ms.forEach((e, num) => {
        if (num == month && mid_date.innerHTML == `${year} p.`) {
            //Додаємо поточному місяцю клас current
            e.classList.add('current');
            //Видаляємо іншим місяцям клас current
        } else {
            e.classList.remove('current');
        }
    });

    //Для років:
    ys.forEach(y => {
        if (y.innerHTML.includes(year)) {
            //Додаємо поточному року клас current
            y.classList.add('current');
            //Видаляємо іншим рокам клас current
        } else {
            y.classList.remove('current');
        }
    });
}

//ФУНКЦІОНАЛ ДЛЯ РЕЖИМУ ПЕРЕГЛЯДУ РОКІВ
function choose_year() {
    let now = new Date(Date.now()),
        year = now.getFullYear();
    //Беремо всі роки і додаємо їм івент при натисканні
    calendar.querySelectorAll('.year').forEach((y, n) => {
        y.addEventListener('click', () => {
            //Приховуємо роки та показуємо місяці
            hide_years();
            show_monthes();
            //Виводимо вибраний рік в кнопку над місяцями
            if (100 > n) {
                show_mid_date(`${year - (100 - n)} p.`);
            } else if (100 < n) {
                show_mid_date(`${year + (n - 100)} p.`);
            }
            //Переводимо у відповідний режим перегляду
            mode = 2;
        });
    });
    //Додаємо функціонал стрілкам
    //ліва
    btn_left.addEventListener('mousedown', () => {
        if (mode == 3) {
            const a = setInterval(() => {
                new_years.scrollTop -= 2;
            }, 1);
            btn_left.addEventListener('mouseup', () => {
                clearInterval(a);
            });
        }
    });
    //права
    btn_right.addEventListener('mousedown', () => {
        if (mode == 3) {
            const b = setInterval(() => {
                new_years.scrollTop += 2;
            }, 1);
            btn_right.addEventListener('mouseup', () => {
                clearInterval(b);
            });
        }
    });
}

//[MODE CHECK]
setInterval(() => {
    console.log(`mode = ${mode}`);
}, 10);

// ВИКЛИКАНІ ФУНКЦІЇ
// Оновлює годину та дату кожну секунду
setInterval(() => {
    let now = new Date(Date.now());
    show_hour(now);
    show_date(now);
    make_current(now);
}, 10);
switch_view();
choose_year();
add_days(); // цю херню треба викликати після інших

