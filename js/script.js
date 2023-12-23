"use strict";

const calendar = document.querySelector('.window'),
      calendar_top = calendar.querySelector('.window_top'),
      btn_next_month = calendar.querySelector('#btn_month_right'),
      btn_prev_month = calendar.querySelector('#btn_month_left'),
      month_name = calendar.querySelector('#month_name'),
      days_bar = calendar.querySelector('.days_bar'),
      last_days_list= calendar.querySelectorAll('.days_last p'),
      day = calendar.querySelector('.day');

// ЗАМІТКА!
// Легшим рішенням для нашого календаря буде просто приховувати непотрібні дні
// та знову їх показувати , коли потрібно.

// Уявімо що в місяці 30 днів , отже нам потрібно приховати останній. 
// // Використаємо змінну last_days_list яка є псевдо масивом з трьома останніми числами (29, 30 ,31):
// last_days_list[2].style.display = 'none';

// Тепер в наступному місяці нам треба повернути цей день :
// last_days_list[2].style.display = 'flex';
// *flex - щоб не зламати стилі.


const month_names = ["Січень", "Лютий", "Березень",
                     "Квітень", "Травень", "Червень", 
                     "Липень", "Серпень", "Вересень", 
                     "Жовтень", "Листопад", "Грудень"];

let month_num = 1;

// ЗМІНЮЄ ЗОБРАЖЕННЯ ДЛЯ ВЕРХНЬОЇ ЧАСТИНИ 
const month_change_img = function() {
    calendar_top.style.backgroundImage = `url("../image/${month_num}.png")`;
};

// ЗМІНЮЄ КОЛЬОРИ НАЗВИ МІСЯЦЯ + ПАНЕЛІ З ДНЯМИ ТИЖНЯ
const month_change_color = function() {
    if (month_num == 12 || month_num == 1 || month_num == 2) {
        month_name.classList.remove("color_spring");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_winter");
        days_bar.style.backgroundColor = "rgb(51, 93, 209)";
    } else if (month_num == 3 || month_num == 4 || month_num == 5) {
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_spring");
        days_bar.style.backgroundColor = "rgb(51, 209, 91)";
    } else if (month_num == 6 || month_num == 7 || month_num == 8) {
        month_name.classList.remove("color_spring");
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_summer");
        days_bar.style.backgroundColor = "rgb(255, 3, 3)";
    } else {
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_spring");
        month_name.classList.add("color_autumn");
        days_bar.style.backgroundColor = "rgb(250, 164, 5)";
    }
};

// ЗМІНИ В МІСЯЦІ ПО НАТИСКУ КНОПОК
const change_month = function(next, prev) {
    // Вибір наступного місяця
    next.addEventListener('click', () => {
        if (month_num < 12) {
            month_num++;
        } else {
            month_num = 1;
        }
        // зміна імені
        month_name.innerHTML = month_names[(month_num - 1)];            
        // зміна кольору
        month_change_color();
        //зміна зображення
        month_change_img();
        // !!!
        // ТУТ ДОДАТИ ФУНКЦІЮ
    });

    // Вибір попереднього місяця
    prev.addEventListener('click', () => {
        if (month_num > 1) {
            month_num--;
        } else {
            month_num = 12;
        }
        // зміна імені
        month_name.innerHTML = month_names[(month_num - 1)];
        // зміна кольору
        month_change_color();
        //зміна зображення
        month_change_img();
        // !!!
        // ТУТ ТАКОЖ ДОДАТИ ЇЇ
    });
};

// ВИКЛИКАНІ ФУНКЦІЇ

change_month(btn_next_month, btn_prev_month);
month_change_img();


