var Server = {
	urls: {
		api_d: "http://192.168.0.104/api/v2/"
	}
}

/* rest service with login in the app */
Server.login = function(mac,user,pass){
	alert(Server.urls.api_d+"login");
	alert("mac="+mac+"&username="+user+"&password="+pass);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", Server.urls.api_d+"login", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = new Function("return " + xmlhttp.responseText + ";")();
			if(response.status == 200)
				Main.setToken(response.data.token);
			Data.setUser(response);
		}
	}
	xmlhttp.send("mac="+mac+"&username="+user+"&password="+pass);
}

/* rest service with verify of token prevous logeed */
Server.start = function(mac,token){
	alert(Server.urls.api_d+"start");
	alert("mac="+mac+"&token="+token);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", Server.urls.api_d+"start", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = new Function("return " + xmlhttp.responseText + ";")();
			if(response.status == 200 && response.data.token != token)
				Main.setToken(response.data.token);
			Data.setUser(response);
		}
	}
	xmlhttp.send("mac="+mac+"&token="+token);
}

/* rest service with the data of home page categories and list */
Server.home = function(token){
	alert(Server.urls.api_d+"home");
	alert('token='+token);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", Server.urls.api_d+"home", true);
	xmlhttp.setRequestHeader('TOKEN', token);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = new Function("return " + xmlhttp.responseText + ";")();
			if(response.status == 200)
				Data.setHome(response);
		}
	}
	xmlhttp.send();
}
