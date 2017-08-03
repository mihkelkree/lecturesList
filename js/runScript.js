var slMax=0;
var slMin=0;

var activeFilt ='KOIK';


$(document).ready(function() {
    //callLocalLoad();
    callTabletop();
            
    $('#slide').slider({
        id: "mySlider",
        tooltip: 'always',
        min: 5, max: 12, range: true, value: [5, 12],
      // callback
        formatter: function formatter(val) {
          if (Array.isArray(val)) {
            slMin=val[0];
            slMax=val[1];
            return val[0] + ". kl -  " + val[1] + ". kl";
          } else {
            return val;
          }
        },
        
        slide: function(e,u){
            console.log("test");
        }
        
    }).on('slideStop', callChange);
    
});


d3.select("#KOIK").on('click', function(){myFilt("KOIK");});
d3.select("#LT").on('click', function(){myFilt("LT");});
d3.select("#MED").on('click', function(){myFilt("MED");});
d3.select("#HUM").on('click', function(){myFilt("HUM");});
d3.select("#SOTS").on('click', function(){myFilt("SOTS");});


var toggl={};
toggl["LT"]='block';
toggl["MED"]='block';
toggl["HUM"]='block';
toggl["SOTS"]='block';