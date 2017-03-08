

url = 'https://docs.google.com/spreadsheets/d/1nK4XywW8SrsP2IkRaImwXg7BT_W_sNGDxtyrHJTesIU/pub?gid=0&single=true&output=csv';

callLoad = function(){

$.get(url, function(data) { 
	s=data;
	s=s.split('\n');
	
	console.log(s);
	
	
});

}
