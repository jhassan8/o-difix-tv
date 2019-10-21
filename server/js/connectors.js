var Connectors = {
	Servers : [],
	Categories : [],
	Videos : [],
	Movies : [],
	Movie : null,
	callback_new : null,
	callback_add : null,
	callback_servers : null,
	callback_categories : null,
	callback_movie : null,
	callback_video : null,
}

Connectors.redirect = function(server,url){
	Display.showLoading('Player');
  switch(server){
    case 'direct':
      Connectors.direct(url);
    break;
    case 'nv':
      Connectors.nowvideo(url);
    break;
    case 'vk':
      Connectors.vk(url);
    break;
    case 'strto':
      Connectors.streaminto(url);
    break;
    case 'vlock':
      Connectors.vodlocker(url);
    break;
    case 'zippyshare':
      Connectors.Zippyshare(url);
    break;
    case 'sprut':
      Connectors.sprutotv(url)
    break;
    case 'idowatch':
      Connectors.idowatch(url);
    break;
		case 'vxtrm':
			Connectors.vidxtreme(url);
		break;
		case 'allvid':
			Connectors.allvid(url);
		break;
		case 'playview':
			Connectors.playview(url);
		break;
		case 'openload':
			Connectors.openload(url);
		break;
		case 'playwatch':
			Connectors.playwatch(url);
		break;
		case 'usrcloud':
			Connectors.usrcloud(url);
		break;
		case 'thevideos':
			Connectors.thevideos(url);
		break;
		case 'rapidvideo':
			Connectors.rapidvideo(url);
		break;
  }
}

Connectors.direct = function(id){
	alert('direct');
  Player.setVideoURL(id);
	//Main.callback_subs = function(){
  	Player.handlePlayKey();
	//}
  return;
}

Connectors.rapidvideo = function(id){
	alert('rapidvideo');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText,'<source src="','"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'https://www.rapidvideo.com/e/'+ id +'&q=480p', true);
	xmlhttp.send();
}

Connectors.thevideos = function(id){
	alert('thevideos');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText,'file:"','"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://thevideos.tv/embed-'+id+'-640x269.html', true);
	xmlhttp.send();
}

Connectors.usrcloud = function(id){
	alert('usrcloud');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText,'<source src="','"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id, true);
	xmlhttp.send();
}

Connectors.playwatch = function(id){
	alert('playwatch');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = atob(Connectors.getString(xmlhttp.responseText,'tracker: "','"'));
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id, true);
	xmlhttp.send();
}

Connectors.openload = function(id){
	alert('openload');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = new Function("return " + xmlhttp.responseText + ";")()[0].url;
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://difix.esy.es/api/df/testMedia.php?type=op&id='+id.replace(/\\/g,""), true);
	xmlhttp.send();
}


Connectors.playview = function(id){
	alert('playview');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = xmlhttp.responseText.match(/https:\/\/video.googleusercontent.com\/(.{0,200})"/)[0].replace('"','');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id.replace(/\\/g,""), true);
	xmlhttp.send();
}

Connectors.allvid = function(id){
	alert('allvid');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText,'<iframe src="','"');
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					link = "function(p,a,c,k,e,d)"+Connectors.getString(xmlhttp.responseText,"eval(function(p,a,c,k,e,d)",".split('|')))",false)+".split('|'))";
					link = (new Function("return " + link + ";")()).match(/http(.{0,90})\/v.mp4/)[0];
					if(Connectors.errorRedirect(link))
						return;
					Player.setVideoURL(link);
					Player.handlePlayKey();
				}
			}
			xmlhttp.open("GET", link, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", "http://allvid.ch/embed-"+id.replace('http://allvid.ch/','')+".html", true);
	xmlhttp.send();
}

Connectors.Zippyshare = function(id)
{
	alert('Zippyshare');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var b = false;
			for(var i=0; i < 10 && b == false; i++){
				var link = Connectors.getString(myArr, '<script type="text/javascript">', "</script>");
				if(link.indexOf('dlbutton') != -1){
          link = link.replace("document.getElementById('dlbutton').omg","var locoman");
          link = link.replace("document.getElementById('dlbutton').omg", "locoman");
          link = link.replace("document.getElementById('omg').getAttribute('class');", '2');
          link = link.replace("document.getElementById('lang-one').", '');
          link = link.replace("document.getElementById('lang-one').", '');
          link = link.replace("document.getElementById('lang-one').", '');
					link = link.replace("document.getElementById('dlbutton').href", 'link');
					b=true;
				}
				else
					myArr = myArr.replace('<script type="text/javascript">' + link + '</script>','ErrorDifix');
			}
			if(link == '' || b == false){
				return;
			}
			link = id.substring(0, id.indexOf('.')) + '.zippyshare.com' + eval(link);
			link = link.replace('https://','http://');
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id, true);
	xmlhttp.send();
}

Connectors.nowvideo = function(id){
	alert('Nowvideo');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var key = Connectors.getString(xmlhttp.responseText, 'var fkzd="', '";');
			if(Connectors.errorRedirect(key))
				return;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					var link = Connectors.getString(xmlhttp.responseText, 'rl=', '&title=');
					if(Connectors.errorRedirect(link))
						return;
					Player.setVideoURL(link);
					Player.handlePlayKey();
				}
			}
			xmlhttp.open("GET", "http://www.nowvideo.sx/api/player.api.php?key=" + key + "&file=" + id, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", 'http://embed.nowvideo.sx/embed/?v=' + id, true);
	xmlhttp.send();
}

Connectors.vk = function(id){
	alert('VK');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = '';
			if(myArr.indexOf('"url480":"') != -1)
				link = Connectors.getString(myArr, '"url480":"', '"');
			else if(myArr.indexOf('"url360":"') != -1)
				link = Connectors.getString(myArr, '"url360":"', '"');
			else if(myArr.indexOf('"url720":"') != -1)
				link = Connectors.getString(myArr, '"url720":"', '"');
			else if(myArr.indexOf('"url240":"') != -1)
				link = Connectors.getString(myArr, '"url240":"', '"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
			return;
		}
	}
	xmlhttp.open("GET", id.replace(/\\/g,""), true);
	xmlhttp.send();
	return;
}

Connectors.streaminto = function(id){
	alert('Stremin.to');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			alert(xmlhttp.responseText);
			link = "function(p,a,c,k,e,d)"+Connectors.getString(xmlhttp.responseText,"eval(function(p,a,c,k,e,d)",".split('|')))",false)+".split('|'))";
			alert(link);
			link = (new Function("return " + link + ";")()).match(/http(.{0,90})\/v.mp4/)[0];
			alert(link);
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://streamin.to/embed-' + id + '.html', true);
	xmlhttp.send();
}

Connectors.idowatch = function(id){
	alert('Idowatch');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText, '"},{file: "', '"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://idowatch.net/' + id + '.html', true);
	xmlhttp.send();
}

Connectors.vodlocker = function(id){
	alert('Voldlocker');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText, 'file: "', '"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://vodlocker.com/embed-' + id + '.html', true);
	xmlhttp.send();
}

Connectors.sprutotv = function(id){
	alert('Spruto.tv');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var link = Connectors.getString(xmlhttp.responseText, 'file:"', '"');
			if(Connectors.errorRedirect(link))
				return;
			Player.setVideoURL(link);
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id.replace(/\\/g,""), true);
	xmlhttp.send();
}

Connectors.vidxtreme = function(id){
	alert('Vidxtreme');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var source = xmlhttp.responseText;
			var key = Connectors.getString(source, "|mp4|", "|file|");
			var ip = Connectors.getString(source,'|3D|','|download').replace(/\|\|/g, '|').split('|').reverse();
			if(ip.length < 4)
				ip = '';
			else
				ip = ip.toString().replace(/,/g,'.');
			if(Connectors.errorRedirect(key) || Connectors.errorRedirect(ip))
				return;
			Player.setVideoURL('http://'+ip+'/'+key+'/v.mp4');
			Player.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://vidxtreme.to/embed-' + id + '.html', true);
	xmlhttp.send();
}

Connectors.errorRedirect = function(link){
	if(link == ''){
		alert('Error');
    if(Data.Videos[Keys.select_quality+1] == null){
      Main.endVideo();
			Display.hideLoading('Player');
      return true;
    }
		Keys.select_quality++;
		Connectors.redirect(Data.Videos[Keys.select_quality].server,Data.Videos[Keys.select_quality].url);
		return true;
	}
	else
		return false;
}

Connectors.getString = function(s,i,f,a){
	var p,o,c,u;
	if(a == null)
		s = s.replace(/\\/g,'');
	if(s.indexOf(i) != -1){
		p = s.indexOf(i);
		o = s.substring(p + i.length);
		if(o.indexOf(f) != -1){
			c = o.indexOf(f);
			u = o.substring(0, c);
			return u;
		}
	}
	return '';
}
