 var twitterList = [];
 var stockList = [];
 var companyList = [];
 var companiesScore = [];
 var companiesName = [];
 var companiesTweets = [];

 $(document).ready(function() {

     getData();

     function getData() {
         $.get("/api/lists", function(data) {

             twitterList = [];
             stockList = [];
             companyList = [];

             for (var i = 0; i < data.length; i++) {
                 twitterList.push(data[i].company_lists.twitter_handle);
                 stockList.push(data[i].company_lists.stock_sym);
                 companyList.push(data[i].company_lists.company_name);
             }
             // console.log("twitter list " + twitterList);
             // console.log("stock list " + stockList);
             // console.log("company list" + companyList);

             var newChartData = {
                 handles: twitterList
             }

             $.post("api/chartData", newChartData, function(data) {
                 // console.log(data);
                 for (var j = 0; j < data.length; j++) {
                     companiesName.push(data[j].company);
                     companiesScore.push(data[j].score);
                     companiesTweets.push(data[j].popular);
                 }

             });

         });

     }

     setTimeout(runChart, 3000);
     setTimeout(runTweets, 3000);
 });



 //////////////////////////////// CHARTJS ////////////////////////////////////////
 var runChart = function() {

     var ctx = document.getElementById("myChart").getContext('2d');

     var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: companiesName,
             datasets: [{
                 label: 'Twitter Trending Score',
                 data: companiesScore,
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba(75, 192, 192, 0.2)',
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)'
                 ],
                 borderColor: [
                     'rgba(255,99,132,1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)'
                 ],
                 borderWidth: 1
             }]
         },
         options: {
             scales: {
                 yAxes: [{
                     ticks: {
                         beginAtZero: true
                     }
                 }]
             }
         }
     });
 }


var runTweets = function(){

    for (z = 0; z < companiesName.length; z++){

    var tweet = $("<p>").text(companiesTweets[z]).css("color","red").css("font-size","15px");
    var company = $("<p>").text(companiesName[z]).css("font-size","17px").css("font-weight","bold");   
    $("#tweets").append(company, tweet);



    }
}

 ////////////////////////////////////////////////////////////////////////////////////////
