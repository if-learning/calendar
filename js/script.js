"use strict";

const calendar = document.querySelector('.window'),
      calendar_top = calendar.querySelector('.window_top'),
      btn_next_month = calendar.querySelector('#btn_month_right'),
      btn_prev_month = calendar.querySelector('#btn_month_left'),
      month_name = calendar.querySelector('#month_name');

const month_names = ["Січень", "Лютий", "Березень",
                     "Квітень", "Травень", "Червень", 
                     "Липень", "Серпень", "Вересень", 
                     "Жовтень", "Листопад", "Грудень"];

let month_num = 1;

// ЗМІНЮЄ ЗОБРАЖЕННЯ ДЛЯ ВЕРХНЬОЇ ЧАСТИНИ 
const month_change_img = function() {
    calendar_top.style.backgroundImage = `url("../image/${month_num}.png")`;
};

// ЗМІНЮЄ КОЛЬОРИ НАЗВИ МІСЯЦЯ
const month_change_color = function() {
    if (month_num == 12 || month_num == 1 || month_num == 2) {
        month_name.classList.remove("color_spring");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_winter");
    } else if (month_num == 3 || month_num == 4 || month_num == 5) {
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_spring");
    } else if (month_num == 6 || month_num == 7 || month_num == 8) {
        month_name.classList.remove("color_spring");
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_autumn");
        month_name.classList.add("color_summer");
    } else {
        month_name.classList.remove("color_winter");
        month_name.classList.remove("color_summer");
        month_name.classList.remove("color_spring");
        month_name.classList.add("color_autumn");
    }
};

// ЗМІНЮЄ ЗОБРАЖЕННЯ ДЛЯ МІСЯЦЯ
const month_change_image = function() {
    
};

// ЗМІНИ В МІСЯЦІ ПО НАТИСКУ КНОПОК
const change_month = function(next, prev) {
    // Вибір наступного місяця
    next.addEventListener('click', () => {
        //анімація зникнення
        if (month_num < 12) {
            month_num++;
        } else {
            month_num = 1;
        }
        // зміна імені
        month_name.innerHTML = month_names[(month_num - 1)];            
        // зміна кольору
        month_change_color();
        console.log(month_num);
        //зміна зображення
        month_change_img();
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
        console.log(month_num);
        //зміна зображення
        month_change_img();
    });
};

// ВИКЛИКАНІ ФУНКЦІЇ

change_month(btn_next_month, btn_prev_month);
month_change_img();


