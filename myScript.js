
url = 'https://docs.google.com/spreadsheets/d/1nK4XywW8SrsP2IkRaImwXg7BT_W_sNGDxtyrHJTesIU/pubhtml';


callTabletop = function () {
    Tabletop.init( { key: url,
                     callback: showInfo,
                     simpleSheet: true } );
}

function showInfo(mydata, tabletop){
	
	//console.log(tabletop.foundSheetNames);
	
	// generate DOMs for lectures
	var activeData = tabletop.sheets("Loengud").all();
	//console.log(lecData);
	var lectures=d3.select("#lectures");	
	lectures.selectAll("div").data(activeData).enter().append("div").attr("class","entry").
		append('p').attr("class","lecname").text(function(d){ return d["Lektor"]}).
		append('p').attr("class","title").text(function(d){ return d["Pealkiri"]}).
		append('p').attr("class","content").text(function(d){ return d["Kirjeldus"]});


	// generate DOMs for programs
	activeData = tabletop.sheets("Programmid").all();	
	var programs=d3.select("#programs");	
	programs.selectAll("div").data(activeData).enter().append("div").attr("class","entry").
		append('p').attr("class","lecname").text(function(d){ return d["Lektor"]}).
		append('p').attr("class","title").text(function(d){ return d["Pealkiri"]}).
		append('p').attr("class","content").text(function(d){ return d["Kirjeldus"]});
		
}
