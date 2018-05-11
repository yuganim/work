window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

var color = Chart.helpers.color;
var config = {
    type: 'radar',
    data: {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
            borderColor: window.chartColors.red,
            pointBackgroundColor: window.chartColors.red,
            data: [
                10, 
                9, 
                8, 
                7, 
                6, 
                5, 
                4
            ]
        }, {
            label: "My Second dataset",
            backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
            borderColor: window.chartColors.blue,
            pointBackgroundColor: window.chartColors.blue,
            data: [
                1, 
                2, 
                3, 
                4, 
                5, 
                6, 
                7
            ]
        },]
    },
    options: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Radar Chart'
        },
        scale: {
          ticks: {
            beginAtZero: true
          }
        }
    }
};

window.onload = function() {
    window.myRadar = new Chart(document.getElementById("cvs_radar"), config);
};