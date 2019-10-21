var Main = {
	mac: null,
	token: null,
	url: 'server/img/',
	states: {
		keyboard: -1,
		login: 0,
		login_acess: 0.1,
		home: 2
	},
	preState: 0,
	state: 0,
	files: {
		token: "token.dat"
	}
}

/* create a new element html */
Main.createHTML = function(id, type, style, parent, text, itype, alterTag) {
	var element = document.createElement(type);
	element.setAttribute("id",id);
	if(type == 'div' && typeof alterTag != 'undefined')
	element.setAttribute('alter',alterTag);
	if(text != '' && (type == 'div' || type == 'a'))
		element.innerHTML = text;
	else if(text != '' && type == 'img')
		element.setAttribute('src',text);
	if(type == 'input' && text != '')
		element.setAttribute('placeholder',text);
	if(type == 'input' && itype != '')
		element.setAttribute('type',itype);
	if(style != '')
		element.className = style;
	if(parent == 'body')
		document.body.appendChild(element);
	else
		document.getElementById(parent).appendChild(element);
};

/* create list */
Main.createList = function(rows,items,parent) {
	for(var r=0; r<rows; r++) {
		Main.createHTML('home-list-title-'+(r+1),'a','home-list-title',parent,'');
		Main.createHTML('home-list-row-'+(r+1),'div','home-list-row',parent,'');
		for(var i=0; i<items; i++) {
			Main.createHTML('home-list-row-'+(r+1)+'-item-'+(i+1),'div','home-list-item','home-list-row-'+(r+1),'');
			Main.createHTML('','img','','home-list-row-'+(r+1)+'-item-'+(i+1),'');
		}
	}
}

/* create keyboard */
Main.createKeyboard = function(p){
	var v = [{i:[{v:'Q',s:1},{v:'W',s:1},{v:'E',s:1},{v:'R',s:1},{v:'T',s:1},{v:'Y',s:1},{v:'U',s:1},{v:'I',s:1},{v:'O',s:1},{v:'P',s:1}]},
		{i:[{v:'A',s:1},{v:'S',s:1},{v:'D',s:1},{v:'F',s:1},{v:'G',s:1},{v:'H',s:1},{v:'J',s:1},{v:'K',s:1},{v:'L',s:1},],p:true},
		{i:[{v:'Z',s:1},{v:'X',s:1},{v:'C',s:1},{v:'V',s:1},{v:'B',s:1},{v:'N',s:1},{v:'M',s:1},{v:'Ñ',s:1},{v:'',s:'a'},],p:true},
		{i:[{v:'1 2 3',s:2},{v:'__________________________',s:5},{v:'HECHO',s:2}],p:true}
	];
	var a = [['1','2','3','4','5','6','7','8','9','0'],['@','#','$','_','&','-','+','(',')'],
		['/','¿','?','¡','!',';',':',',','.'],['A B C','__________________________','HECHO',]
	];
	for(var r=0;r<v.length;r++) {
		Main.createHTML('keyboard-r-'+r,'div','keyboard-row'+(v[r].p ? ' keyboard-row-padding' : ''),p,'');
		for(var b=0;b<v[r].i.length;b++)
			Main.createHTML('keyboard-r-'+r+'-b-'+b,'div','keyboard-key-'+v[r].i[b].s+'x','keyboard-r-'+r,v[r].i[b].v,null,a[r][b]);
	}
}

/* create interface */
Main.createApp = function() {
	/* start screen */
	Main.createHTML('start','div','start-content','body','');
		Main.createHTML('start-logo','img','start-logo','start',Main.url+'logo.png');
		Main.createHTML('start-loading','img','start-loading','start','');
	/* login screen */
	Main.createHTML('login','div','login-content','body','');
		Main.createHTML('login-gradient','div','login-gradient','login','');
		Main.createHTML('login-logo','img','login-logo','login',Main.url+'logo.png');
		Main.createHTML('login-text','div','login-text','login','Peliculas y series en HD.');
		Main.createHTML('login-button','a','login-button','login','Ingresar');
		/* login access screen */
		Main.createHTML('login-access','div','login-access','login','')
			Main.createHTML('login-access-title','div','login-access-title','login-access','Ingresar');
			Main.createHTML('login-access-user','input','login-access-user','login-access','Usuario','text');
			Main.createHTML('login-access-pass','input','login-access-pass','login-access','Contraseña','password');
			Main.createHTML('login-access-button','a','login-access-button','login-access','Entrar');
	/* home screen */
	Main.createHTML('home','div','home-content','body','');
		Main.createHTML('home-background-full','div','home-background-full','home','');
			Main.createHTML('home-gradient-full','div','login-gradient','home-background-full','');
		Main.createHTML('home-background-parcial','div','home-background-parcial','home','');
			Main.createHTML('home-image-parcial','div','home-image-parcial','home-background-parcial','');
			Main.createHTML('home-gradient-parcial','div','home-gradient-parcial','home-background-parcial','');
					Main.createHTML('home-gradient-parcial-2','div','home-gradient-parcial-2','home-gradient-parcial','');
		Main.createHTML('home-info-one','div','home-info-one','home','');
			Main.createHTML('home-title','div','home-title','home-info-one','');
			Main.createHTML('home-description','div','home-description','home-info-one','');
			Main.createHTML('home-button-play','a','home-button-play','home-info-one','Reproducir');
			Main.createHTML('home-button-info','a','home-button-info','home-info-one','Información');
		Main.createHTML('home-info-two','div','home-info-two','home','');
			Main.createHTML('home-title-two','div','home-title-two','home-info-two','');
			Main.createHTML('home-description-two','div','home-description-two','home-info-two','');
		/* home list screen*/
		Main.createHTML('home-list','div','home-list','home','');
		/* constant home widget */
		Main.createHTML('home-logo-content','div','home-logo-content','home','');
		Main.createHTML('home-logo','img','home-logo','home-logo-content',Main.url+'logo.png');
	/* keyboard widget */
	Main.createHTML('keyboard','div','keyboard','body','');
		Main.createKeyboard('keyboard');
}

/* on init app */
Main.init = function() {
	Main.mac = document.getElementById("pluginNetwork").GetMAC();
	//Main.writeFile(["tokenoloroso","otro"],"token.dat");
	//Main.readFile(res,"token.dat");
	alert("MAC: " + Main.mac);
	Main.createApp();
  widgetAPI.sendReadyEvent();
	Display.showStart();
	Main.start();
}

/* login, before insert user and password */
Main.login = function(u,p) {
	Data.callbaks.user = function() {
		if(Data.user.status == 200) {
			Display.hideLoginAccess();
			Display.showHome();
		}
		else {
			alert('fail login');
		}
	}
	Server.login(Main.mac,u,p);
}

/* start app, with token storage */
Main.start = function() {
	var res = Main.getToken();
	if(res != null) {
		Data.callbaks.user = function() {
			if(Data.user.status == 200) {
				Data.callbaks.home = function() {
					Main.createList(3,10,'home-list');
					Display.hideStart();
					Display.showHome();
				}
				Server.home(Main.token);
			}
			else {
				Display.hideStart();
				Display.showLogin();
			}
		}
		Server.start(Main.mac,res)
	}
	else {
		Display.hideStart();
		Display.showLogin();
	}
}

/* on exit app */
Main.onUnload = function() {
  Player.deinit();
}

/* on key press */
Main.keyDown = function(event) {
  switch (Main.state) {
		case Main.states.keyboard:
			Keys.keyboard(event);
  	break;
		case Main.states.login:
			Keys.login(event);
  	break;
		case Main.states.login_acess:
			Keys.login_access(event);
  	break;
  	case Main.states.home:
			Keys.home(event);
  	break;
		default:
			alert('keyboard action screen not defined.');
		break;
  }
}

/* read token from file and set in app var */
Main.getToken = function() {
	var res = [];
	Main.readFile(res,Main.files.token);
	Main.token = res.length > 0 ? res[0] : null;
	return Main.token;
}

/* save file token and set in app var */
Main.setToken = function(token) {
	Main.token = token;
	Main.writeFile([token],Main.files.token);
}

/* file manage */
Main.readFile = function(d, e) {
  var c = new FileSystem();
  var b = c.openCommonFile(curWidget.id + "/" + e, "r");
  if(!b)
    b = c.openCommonFile(e, "r");
  if(b) {
    while(1) {
      var a = b.readLine();
      if(a == null)
        break;
      d.push(a);
    }
    c.closeCommonFile(b);
  }
}

Main.writeFile = function(d, e) {
  var c = new FileSystem();
  if(!c.isValidCommonPath(curWidget.id))
    c.createCommonDir(curWidget.id);
  var b = c.openCommonFile(curWidget.id + "/" + e, "w");
  if(b) {
    for(var a = 0; a < d.length; a++)
      b.writeLine(d[a]);
    c.closeCommonFile(b);
  }
};
