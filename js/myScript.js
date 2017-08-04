

var url = 'https://docs.google.com/spreadsheets/d/1nK4XywW8SrsP2IkRaImwXg7BT_W_sNGDxtyrHJTesIU/pubhtml';

var picWidth='140px';

function getBackCol(v){

	switch(v){
		case "LT": return "rgb( 0, 154, 198)";
		case "HUM": return "rgb( 139, 3, 4)";
		case "MED": return "rgb( 0, 66, 130)";
		case "SOTS": return "rgb( 240, 78, 35)";
	}
}

function getTextCol(v){

		
	switch(v){
		case "LT": return "#f0f0f0";
		case "HUM": return "#f0f0f0";
		case "MED": return "#f0f0f0";
		case "SOTS": return "#f0f0f0";
	}
	
	
	
}


callTabletop = function () {
    Tabletop.init( { key: url,
                     callback: showInfo,
                     simpleSheet: true } );
}

callLocalLoad = function () {
		
	var psv = d3.dsvFormat(";");
	d3.request(localcsv)
		.mimeType("text/plain")
		.response(function(xhr) { return psv.parse(xhr.responseText) })
		.get(function(data) {
			//console.log(data[1]);
			generateEntries(data);
		});
		
	//d3.csv(localcsv, function(data){generateEntries(data);} ); 
	
}


function showInfo(mydata, tabletop){
	
	d3.selectAll('#wait').remove();
	
	// generate DOMs for lectures
	var loengudData = tabletop.sheets("Loengud").all();
	
	generateEntries(loengudData);
	return;
	
}

function generateEntries(data){

	console.log(data.length);
	
	for (i=0; i<data.length; i++){
		d=data[i];
		tmp=getNumbers(d["Klass"]);
		d["klRangeMin"]=tmp[0];
		if (tmp.length>1){
			d["klRangeMax"]=tmp[tmp.length-1];
		}else{
			d["klRangeMax"]=tmp[0];
		}
		d["Tase"]=klassRange(d);
		//data[i]=d;
	}
	
	d3.selectAll('#wait').remove();
	
	var lectures=d3.select("#lectures");	
	
	// lecture entry
	lectures = lectures.selectAll("div").data(data).enter().
		append("div").attr("class","entry").style("margin-bottom","0px").attr("status","0"). //status refers to opened or closed box
		attr("rangefilter","true").
		attr("klRangeMin",function(d){ return d["klRangeMin"];}).
		attr("klRangeMax",function(d){ return d["klRangeMax"];});
			
		
	// single row info
	var shortrow = lectures.append('div').attr("class","shortrow").style("margin-bottom","0px").on('click', activate); 
	
	var row = shortrow.append('div').attr("class","shortname").style("margin-bottom","0px");
	
	var rowp = row.append('p').attr("class",'nametitle');
	rowp.append('span').
		text(function(d,i){return (i+1)+". ";});
	rowp.append('span').style('font-size','1.2em').
		text(function(d,i){return d["Lektor"]});
	rowp.append('span').attr("class","title").
		text(function(d){return ", "+d["Pealkiri"]});
		
	row.append('p').attr("class","toright").
		style('background',function(d){return getBackCol(d["Valdkond"])}).
		style('color',function(d){return getTextCol(d["Valdkond"])}).
		text(function(d,i){return d["Teema"]+", "+d["Tase"]});
	
		
	shortrow.append('p').attr("class","emptynamerow").style('display','none').
			text('[ Sulge ]');
	
	
	var expandable = lectures.append('div').attr("class","expandbox").
		style('display','none')
	
	
	// picture div floating left
	expandable.append('div').attr("class","pic").
		style('display', function(d){ if (d["Foto"]) return "inline"; else return "none"}).
		append('img').attr('width',picWidth).attr('src',function(d){ return d["Foto"]});
			
	
	// info div
	var info = expandable.append('div').attr("class","info");
	
	// header row
	var lecrow = info.append('div').attr("class","lechead");
	
	// faclulty and age group
	var infodiv = lecrow.append('div').attr("class","lecinfodiv");
	
	infodiv.style('background',function(d){return getBackCol(d["Valdkond"])}).
			style('color',function(d){return getTextCol(d["Valdkond"])});
	
	var fac = infodiv.append('p').attr("class","faculty").
		text(function(d){return d["Valdkond"]+" valdkond"});
	
	infodiv.append('p').attr("class","agegroup").
		text(function(d){return "sihtrühm: "+d["Tase"]});
	infodiv.append('p').attr("class","topic").
		text(function(d){return ""+d["Teema"]});
	
	// lector name and title
	var namediv = lecrow.append('div').attr("class","lecnamediv");
	namediv.append('p').attr("class","lectorname").style("margin-bottom","0.3em").style("line-height","1.5em").text(function(d){ return d["Lektor"]});
	namediv.append('p').attr("class","lectitle").text(function(d){ return d["Pealkiri"]});
	
	// descriotion, info, etc
	info.append('p').attr("class","leccontent").text(function(d){ return d["Kirjeldus"]});
	info.append('p').attr("class","leccontact").text(function(d){ return d["Kontakt"]});
	info.append('p').attr("class","lecextrainfo").
		text(function(d){ if (d["Lisainfo"]) return "Lisainfo: "+d["Lisainfo"]});
	
	
	
}


activate = function(d){
	
	var par = $(this).parent();
	var a = par.attr("status");

	if (a==0) {
		par.find('.shortname').css("display","none");
		par.find('.emptynamerow').css("display","block");
		par.find('.expandbox').css("display","inline");
		
	}	
	if (a==1) {
		par.find('.shortname').css("display","flex");
		par.find('.emptynamerow').css("display","none");
		par.find('.expandbox').css("display","none");
	}

	par.attr("status",1-a);
	
}

// slider changed
callChange = function(){
	//myFilt(activeFilt);
	d3.selectAll(".entry").style("display", function(d){ return checkDisplay(d);});	
}

checkDisplay = function(d){
	a=d["klRangeMin"];
	b=d["klRangeMax"];
	v=d["Valdkond"];
	tog=toggl[v];
	if ((slMin<=b && slMax >=a) && tog=='block'){
		return "block";
	}
	else{
		return "none";
	}
	
}

klassRange = function(d){
	s=d["klRangeMin"];
	if (d["klRangeMax"]>d["klRangeMin"]){
		s=s+"-" + d["klRangeMax"];
	}
	s=s+". kl";
	return s;
}


function myFilt(vald){
    activeFilt=vald;
	
	// change the colors of the selection buttons according to activation
    if (vald=="KOIK"){
        for (var key in toggl) {
            toggl[key]='block';
            d3.select("#"+key).style('background','');
        }
        d3.select("#KOIK").style('background','');
    }
    else{
        for (var key in toggl) {
            if (key==vald){
                toggl[key]='block';
                d3.select("#"+key).style('background','');
            }
            else{
                toggl[key]='none';
                d3.select("#"+key).style('background','gray');
            }
        }
        d3.select("#KOIK").style('background','gray');
    }
    
    callChange();
}


