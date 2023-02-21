
function getfilter(){
    console.log("da click")
    var select1 = document.getElementById('filtermonth');
    var select2 = document.getElementById('filteryear');

    var filtermonth = select1.options[select1.selectedIndex].value;
    var filteryear = document.getElementById('filtermonth').value;

    var filteryear = select2.options[select2.selectedIndex].value;
    var filteryear = document.getElementById('filteryear').value;
    console.log(filtermonth)
    console.log(filteryear)
}

// logic doanh thu thang:
let Revenue_total_last_month = 20000000;
let Revenue_total_in_month = 10000000;
let revenue_percent;

// doanh thu
let Revenue_total_month = document.querySelector('.Revenue_total_span');
Revenue_total_month.innerHTML = Revenue_total_in_month;

//%doanh thu
if(Revenue_total_in_month - Revenue_total_last_month < 0 ){
    revenue_percent = -(Math.abs(Revenue_total_in_month - Revenue_total_last_month)/Revenue_total_last_month)*100;
    revenue_percent= revenue_percent.toFixed(2);
}
else{
    revenue_percent= (Math.abs(Revenue_total_in_month - Revenue_total_last_month)/Revenue_total_last_month)*100;
    revenue_percent= revenue_percent.toFixed(2);
}

document.querySelector('.Revenue_total_span_2').innerHTML = revenue_percent + '<span>%</span>';


//doanh thu laptop
let revenue_laptop = 7000000;
let revenue_laptop_percent = (revenue_laptop/Revenue_total_in_month)*100;

document.querySelector('.Revenue_detail_span_2').innerHTML= revenue_laptop_percent + '<span>%</span>';

//doanh thu phu kien
document.querySelector('.Revenue_detail_span_3').innerHTML= 100 - revenue_laptop_percent + '<span>%</span>';

// console.log("chuoi JSON: " + JSON.stringify(revenue_laptop_percent));







