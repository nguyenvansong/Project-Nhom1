google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawBasic);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['DELL', 10],
      ['ASUS', 2],
      ['HP', 3],
      ['APPLE', 5],
    ]);

    var options = {
      title:''
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }


  // Biểu đồ 2

  // function drawBasic() {
  //   var data = google.visualization.arrayToDataTable([
  //     ['Year', 'Visitations', { role: 'style' } ],
  //     ['2010', 10, 'color: gray'],
  //     ['2020', 14, 'color: #76A7FA'],
  //     ['2030', 16, 'opacity: 0.2'],
  //     ['2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
  //     ['2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
  //   ]);}

  function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Doanh thu');

      //doan thu thang truyen vao`.
      var t1 = 1000000000;
      var t2 = 1000000000;
      var t3 =300000000;
      var t4 = 400000000;
      var t5 = 500000000;
      var t6 = 600000000;
      var t7 = 700000000;
      var t8 = 800000000;
      var t9 = 900000000;
      var t10 = 100000000;
      var t11 = 1100000000;
      var t12 = 1200000000;

      data.addRows([
        [{v: [1], f: 'tháng 1'}, t1],
        [{v: [2], f: 'tháng 2'}, t2],
        [{v: [3], f:'tháng 3'}, t3],
        [{v: [4], f: 'tháng 4'}, t4],
        [{v: [5], f: 'tháng 5'}, t5],
        [{v: [6], f: 'tháng 6'}, t6],
        [{v: [7], f: 'tháng 7'}, t7],
        [{v: [8], f: 'tháng 8'}, t8],
        [{v: [9], f: 'tháng 9'}, t9],
        [{v: [10], f: 'tháng 10'}, t10],
        [{v: [11], f: 'tháng 11'}, t11],
        [{v: [12], f: 'tháng 12'}, t12],
      ]);

      var options = {
        // title: 'Thống kê doanh thu trong năm: ',
        hAxis: {
          title: 'Tháng trong năm',
          format: '',
          viewWindow: {
            // min: [1],
            // max: [12]
          }
        },
        vAxis: {
          // title: 'doanh thu theo tháng'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }