

url = 'https://docs.google.com/spreadsheets/d/1nK4XywW8SrsP2IkRaImwXg7BT_W_sNGDxtyrHJTesIU/pub?gid=0&single=true&output=csv';

// manually made to match with the ones on the Google Drive table
var groupNames = ["Loengud", "Programmid"];
var allData = [ [], []];

callLoad = function(){

$.get(url, function(data) { 
	s=data;
	s=s.split('\n');
	
	console.log(s);
	
	var groupID=0;

	// read and parse the data
	for (i=0; i<s.length; i++){
		a=s[i];
		a=a.split(',');
		
		if (a[0]=="" || a[0]=="Lektor"){continue;}
		if (a[1]==""){
			//console.log(a[0])
			switch(a[0]){
				case groupNames[0]: groupID=0; break;
				case groupNames[1]: groupID=1; break;
				default: groupID=0; break;
			}
			continue;
		}
		
		d={lektor:a[0], pealkiri:a[1], kirjeldus:a[2]};
		allData[groupID].push(d);
	}
	
	console.log(allData);
	
});

}
