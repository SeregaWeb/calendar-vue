    Vue.component("calendar",{
        template: 
        `
        <ul class="calendar-app">
            <li class="first-li">
                    <button @click="prev" class="btn btn-left"></button>
                    <h3>{{dateNaw}}</h3>
                    <button @click="next" class="btn btn-right"></button>
            </li>

            <li v-if="mondeyStart == true" v-for="(day, index) in deysInMonday" :key="index">
                    <span v-if="index < 5 " class="days-header">{{day}}</span>
                    <span v-else class="wekend days-header">{{day}}</span>
                    
            </li>
            <li v-for="(days, index)  in dateInM" >
                <span v-if="index == weekendDays(index) && days.cl == true &&index+1 != currentDay" @click='showDate(days.day)' class="wekend-day"> {{days.day}} </span>
                <span v-if="index+1 == currentDay" class="tooday" @click='showDate(days.day)'>  {{days.day}} </span>
                
                <span v-if="index != weekendDays(index) && days.cl == true" @click='showDate(days.day)' > {{days.day}} </span>
                <span v-else-if= "days.cl == false" class="next-mounth"> {{days.day}}</span>
            </li>

            <li v-if="mondeyStart != true" v-for="(day, index) in deysInVc" :key="index">
                    <span v-if="index > 0 && index < 6" class="days-header">{{day}}</span>
                    <span v-else class="wekend days-header">{{day}}</span>
            </li>
            <li v-if="mondeyStart != true" v-for="(days, index)  in dateInM" >
                <span v-if="index == weekendDays(index) && days.cl == true &&index != currentDay" @click='showDate(days.day)' class="wekend-day"> {{days.day}} </span>
                <span v-if="index == currentDay" class="tooday" @click='showDate(days.day)'>  {{days.day}} </span>
                
                <span v-if="index != weekendDays(index) && days.cl == true" @click='showDate(days.day)' > {{days.day}} </span>
                <span v-else-if= "days.cl == false" class="next-mounth"> {{days.day}}</span>
            </li>
        </ul>
        `,
        data: function() {
            return {
                date: new Date(), 
                mountCheckd: 0,
                yearCheckd: 0, 
                // текущая дата, статическая инициализирую в created !
                mondeyStart: true,
                deysInMonday: ['пн','вт',"ср","чт","пт","сб","вс"],
                //формат вывода дней недели
                deysInVc: ['вс','пн',"вт","ср","чт","пт","сб"],
                jsMounth: [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                    ],
                dateInM: [] ,
                //пустой массив для инициализации значениями
                currentDay: 0,
                currentMount: 0,
                currentYear: 0,
                //день месяц и год для манипуляции с календарем  
            }
        },
        methods: {
           weekendDays(day){
                //---метод который высчитывает выходные для календаря с понедельника
                if(this.mondeyStart == true){
                    var Weekend = [5,6,12,13,19,20,26,27,33,34,40,41]; 
                }else{
                    var Weekend = [0,6,7,13,14,20,21,27,28,34,35,41]; 
                }
                //индексы выходных
                var value = -1;
                // отрицательное значение , что бы не вывело первый элемент как выходной 
                Weekend.forEach(function(val) {
                    if(val == day){
                        //функция принимает на вход id недели 
                        //если есть совпадение с моим массивом я присваиваю значение 
                        value = val;
                    }
                });
                return value;
            },
            dateInit(action){
                d = this.date ;
                // обьект дата 
                
                this.currentDay = d.getDate();

                if(+action){
                    this.currentMount += action;

                    if( this.currentMount > 11){
                        this.currentMount = 0;
                        this.currentYear +=1; 
                
                    }else if( this.currentMount < 0){
                        this.currentMount = 11;
                        this.currentYear -=1; 
                    }
                }else{
                    this.currentMount = d.getMonth();
                    this.currentYear = d.getFullYear(); 
                } 
                // месяц и год
                
                if(this.currentMount == this.mountCheckd && 
                    this.currentYear == this.yearCheckd)
                    {
                        this.currentDay = d.getDate(); 
                    }else{
                        this.currentDay = 0;
                    }
                // проверка на текущий день 

                this.dateNaw = this.jsMounth[this.currentMount] + " - " +  this.currentYear + "г.";
                // распечатка на главной 
                
                var monthStart = new Date( this.currentYear,  this.currentMount, 1); 
                var monthEnd = new Date( this.currentYear,  this.currentMount+1, 1);
                // вернет текущий и предыдущий месяц
                var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
                // если отнять дату от даты , она вернет время в мс 
    
                // это узнать количество дней в этои месяце
                // console.log(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(currentYear, currentMount, 1).getDay()])
                monthStart = new Date( this.currentYear,  this.currentMount, 1); 
                monthEnd = new Date( this.currentYear,  this.currentMount-1, 1);
                var monthPrewLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
                // получаю дни дни прошлого месяца 
                var monthPrewLength = Math.ceil(-monthPrewLength); 
                //округляю к большему , и перевожу отрицательное число в положительное 
    
                var dayStart = [new Date( this.currentYear,  this.currentMount, 1).getDay()][0];
                if(this.mondeyStart == true){
                    dayStart -= 1;
                } 
                // узнаю с какого дня начался мес.
                
                var count = 1;
                // счетчик дней после конца месяца
                var countDayPrevMounth = 0;
                // счетчик дней предыдущего месяца 
                var dayInArr = 0;
                // счетчик для текущего месяца 
    
                //массив заполняется данными 
                for(i=0; i<42; i++){
                    if(i < dayStart ){
                        // до начала месяца , если месяц начался не с понедельника
                        this.dateInM[i] = { 
                            day: 0,
                            cl: false
                        };
                        countDayPrevMounth ++; 
                        // считаю сколько дней в предыдущем месяце мне нужно заполнить
                        monthLength ++
                        // считаю на сколько больше мне нужно распечатать из за предыдущего месяца
                    }else if(i < monthLength){
                        //заполняем наш текущий месяц 
                        this.dateInM[i] = {
                            day:++dayInArr,
                            cl: true
                        }; 
                    }else{
                        // начало следующего месяца , когда уже закончили заполнять наш текущий месяц
                        this.dateInM[i] = { 
                            day: count++,
                            cl: false
                        };
                    }
                }
    
                // в цыкле заменяю 0 на числа предыдущено месяца 
                for(i = countDayPrevMounth - 1; i >= 0 ; i--){
                    this.dateInM[i].day = monthPrewLength
                    monthPrewLength--;
                }
            },
            prev(){
                var a = -1
                this.dateInit(a);
            },
            next(){
                var a = 1
                this.dateInit(a);
            }, 
            showDate(day){
                    
                alert("День - "+day +"\nМесяц - "+this.jsMounth[this.currentMount]+"\nГод - "+this.currentYear);
            }
        },
        created(){
           this.dateInit();
           this.currentDay = d.getDate(); 
           this.currentMount = d.getMonth();
           this.currentYear = d.getFullYear();

           this.mountCheckd = this.currentMount;
           this.yearCheckd = this.currentYear;
        }
    })
    
    
    var app = new Vue({
        
        
    });

    app.$mount('#app');
    //монтируем объект к айди 

    //таск
    //сделать календарь который может строится с понедельника и с вс 
    // var app = new Vue({
    //     data: function() {
    //         return {
    //             date: new Date(), 
    //             mountCheckd: 0,
    //             yearCheckd: 0, 
    //             // текущая дата, статическая инициализирую в created !
    //             deysInMonday: ['пн','вт',"ср","чт","пт","сб","вс"],
    //             //формат вывода дней недели
    //             deysInVc: ['вс','пн',"вт","ср","чт","пт","сб"],
    //             jsMounth: [
    //                 'Январь',
    //                 'Февраль',
    //                 'Март',
    //                 'Апрель',
    //                 'Май',
    //                 'Июнь',
    //                 'Июль',
    //                 'Август',
    //                 'Сентябрь',
    //                 'Октябрь',
    //                 'Ноябрь',
    //                 'Декабрь',
    //                 ],
    //             dateInM: [] ,
    //             //пустой массив для инициализации значениями
    //             currentDay: 0,
    //             currentMount: 0,
    //             currentYear: 0,
    //             //день месяц и год для манипуляции с календарем  
    //         }
    //     },
    //     methods: {
    //        weekendDays(day){
    //             //---метод который высчитывает выходные для календаря с понедельника
    //             var Weekend = [5,6,12,13,19,20,26,27,33,34,40,41]; 
    //             //индексы выходных
    //             var value = -1;
    //             // отрицательное значение , что бы не вывело первый элемент как выходной 
    //             Weekend.forEach(function(val) {
    //                 if(val == day){
    //                     //функция принимает на вход id недели 
    //                     //если есть совпадение с моим массивом я присваиваю значение 
    //                     value = val;
    //                 }
    //             });
    //             return value;
    //         },
    //         dateInit(action){
    //             d = this.date ;
    //             // обьект дата 
                
    //             this.currentDay = d.getDate();

    //             if(+action){
    //                 this.currentMount += action;

    //                 if( this.currentMount > 11){
    //                     this.currentMount = 0;
    //                     this.currentYear +=1; 
                
    //                 }else if( this.currentMount < 0){
    //                     this.currentMount = 11;
    //                     this.currentYear -=1; 
    //                 }
    //             }else{
    //                 this.currentMount = d.getMonth();
    //                 this.currentYear = d.getFullYear(); 
    //             } 
    //             // месяц и год
                
    //             if(this.currentMount == this.mountCheckd && 
    //                 this.currentYear == this.yearCheckd)
    //                 {
    //                     this.currentDay = d.getDate(); 
    //                 }else{
    //                     this.currentDay = 0;
    //                 }
    //             // проверка на текущий день 

    //             this.dateNaw = this.jsMounth[this.currentMount] + " - " +  this.currentYear + "г.";
    
    //             var monthStart = new Date( this.currentYear,  this.currentMount, 1); 
    //             var monthEnd = new Date( this.currentYear,  this.currentMount+1, 1);
    //             // вернет текущий и предыдущий месяц
    //             var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    //             // если отнять дату от даты , она вернет время в мс 
    
    //             // это узнать количество дней в этои месяце
    //             // console.log(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(currentYear, currentMount, 1).getDay()])
    //             monthStart = new Date( this.currentYear,  this.currentMount, 1); 
    //             monthEnd = new Date( this.currentYear,  this.currentMount-1, 1);
    //             var monthPrewLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
    //             // получаю дни дни прошлого месяца 
    //             var monthPrewLength = Math.ceil(-monthPrewLength); 
    //             //округляю к большему , и перевожу отрицательное число в положительное 
    
    //             var dayStart = [new Date( this.currentYear,  this.currentMount, 1).getDay()][0]; 
    //             // узнаю с какого дня начался мес.
                
    //             var count = 1;
    //             // счетчик дней после конца месяца
    //             var countDayPrevMounth = 0;
    //             // счетчик дней предыдущего месяца 
    //             var dayInArr = 0;
    //             // счетчик для текущего месяца 
    
    //             //массив заполняется данными 
    //             for(i=0; i<42; i++){
    //                 if(i < dayStart-1 ){
    //                     // до начала месяца , если месяц начался не с понедельника
    //                     this.dateInM[i] = { 
    //                         day: 0,
    //                         cl: false
    //                     };
    //                     countDayPrevMounth ++; 
    //                     // считаю сколько дней в предыдущем месяце мне нужно заполнить
    //                     monthLength ++
    //                     // считаю на сколько больше мне нужно распечатать из за предыдущего месяца
    //                 }else if(i < monthLength){
    //                     //заполняем наш текущий месяц 
    //                     this.dateInM[i] = {
    //                         day:++dayInArr,
    //                         cl: true
    //                     }; 
    //                 }else{
    //                     // начало следующего месяца , когда уже закончили заполнять наш текущий месяц
    //                     this.dateInM[i] = { 
    //                         day: count++,
    //                         cl: false
    //                     };
    //                 }
    //             }
    
    //             // в цыкле заменяю 0 на числа предыдущено месяца 
    //             for(i = countDayPrevMounth - 1; i >= 0 ; i--){
    //                 this.dateInM[i].day = monthPrewLength
    //                 monthPrewLength--;
    //             }
    //         },
    //         prev(){
    //             var a = -1
    //             this.dateInit(a);
    //         },
    //         next(){
    //             var a = 1
    //             this.dateInit(a);
    //         }, 
    //         showDate(day){
                    
    //             alert("День - "+day +"\nМесяц - "+this.jsMounth[this.currentMount]+"\nГод - "+this.currentYear);
    //         }
    //     },
    //     created(){
    //        this.dateInit();
    //        this.currentDay = d.getDate(); 
    //        this.currentMount = d.getMonth();
    //        this.currentYear = d.getFullYear();

    //        this.mountCheckd = this.currentMount;
    //        this.yearCheckd = this.currentYear;
    //     //    this.dateNaw.maunth = this.currentMount;
    //     //    this.dateNaw.year = this.currentYear;
    //     //    this.$set(this.dateNaw.maunth, this.currentMount)
    //     }
        
    // });

    // app.$mount('#app');
    // //монтируем объект к айди 

    // //таск
    // //сделать календарь который может строится с понедельника и с вс 
