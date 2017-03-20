
var url = 'https://docs.google.com/spreadsheets/d/1nK4XywW8SrsP2IkRaImwXg7BT_W_sNGDxtyrHJTesIU/pubhtml';

var picWidth='140px';


callTabletop = function () {
    Tabletop.init( { key: url,
                     callback: showInfo,
                     simpleSheet: true } );
}

function showInfo(mydata, tabletop){
	
	d3.selectAll('#wait').remove();
	
	//console.log(tabletop.foundSheetNames);
	
	// generate DOMs for lectures
	var activeData = tabletop.sheets("Loengud").all();
	
	//console.log(lecData);
	var lectures=d3.select("#lectures");	
	
	// lecture entry
	lectures = lectures.selectAll("div").data(activeData).enter().append("div").attr("class","entry");
	
	var shortrow = lectures.append('div').attr("class","shortrow"); 
	shortrow.append('p').attr("class","shortname").
		text(function(d){return "<b>"+d["Lektor"]+"</b>, "+d["Pealkiri"]}).
		on('click', activate);
	
	var expandable = lectures.append('div').attr("class","expandbox").
		style('display','none'); 
	
	
	// picture div floating left
	expandable.append('div').attr("class","pic").
		style('display', function(d){ if (d["Foto"]) return "inline"; else return "none"}).
		append('img').attr('src',function(d){ return d["Foto"]}).attr('width',picWidth);
			
	
	// info div
	var info = expandable.append('div').attr("class","info");
	
	// header row
	var lecrow = info.append('div').attr("class","lechead");
	
	// faclulty and age group
	var infodiv = lecrow.append('div').attr("class","lecinfodiv");
	infodiv.append('p').attr("class","faculty").text(function(d){return "valdkond: "+d["Valdkond"]});
	infodiv.append('p').attr("class","agegroup").text(function(d){return "sihtrühm: "+d["Kooliaste"]});
	
	// lector name and title
	var namediv = lecrow.append('div').attr("class","lecnamediv");
	namediv.append('p').attr("class","lectorname").text(function(d){ return d["Lektor"]});
	namediv.append('p').attr("class","lectitle").text(function(d){ return d["Pealkiri"]});
	
	// descriotion, info, etc
	info.append('p').attr("class","leccontent").text(function(d){ return d["Kirjeldus"]});
	info.append('p').attr("class","leccontact").text(function(d){ return d["Kontakt"]});
	info.append('p').attr("class","lecextrainfo").
		text(function(d){ if (d["Lisainfo"]) return "Lisainfo: "+d["Lisainfo"]});
	


	// generate DOMs for programs
	activeData = tabletop.sheets("Programmid").all();	
	var programs=d3.select("#programs");	
	programs.selectAll("div").data(activeData).enter().append("div").attr("class","entry").
		append('p').attr("class","lecname").text(function(d){ return d["Lektor"]}).
		append('p').attr("class","title").text(function(d){ return d["Pealkiri"]}).
		append('p').attr("class","content").text(function(d){ return d["Kirjeldus"]});
		
}

activate = function(d){
	
	var par = $(this).parent().parent();
	console.log(par);
	par.find('.expandbox').css("display","inline");	
}
