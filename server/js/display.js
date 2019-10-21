var Display = {
	keyboard_val: {
		input: null
	},
	timers: {
		loading: null
	},
	loading_index: 1
}

/* home screen */
Display.showHome = function() {
	Main.state = Main.states.home
	document.getElementById('home-background-full').style.backgroundImage = 'url(' + Data.getNewBackground() + ')';
	document.getElementById('home-title').innerText = Data.getNewTitle();
	document.getElementById('home-description').innerHTML = Data.getNewDescription();
	document.getElementById('home').style.display = "block";
	Display.refreshList();
	Display.setHomePosition();
}

Display.hideHome = function() {
	document.getElementById('home').style.display = "none";
}

Display.cut = function(s) {
	if(s.length > 350)
		if(s.indexOf(' ', 350) != -1)
			return (s.substring(0,(s.indexOf('.', 350) > 400) ?((s.indexOf(',', 350) > 400) ? s.indexOf(' ', 350) : s.indexOf(',', 350)) : s.indexOf('.', 350)))+'...';
		else
			return s;
	else
		return s;
}

Display.setHomePosition = function() {
	if(Keys.home_val.position.row == 0) {
		document.getElementById('home-info-one').style.display = "block";
		document.getElementById('home-info-two').style.display = "none";
		document.getElementById('home-list').style.top = "450px";
		Display.setElementStatus('home-button-info');
		Display.setElementStatus('home-button-play');
		document.getElementById('home-background-full').style.display = "block";
		document.getElementById('home-background-parcial').style.display = "none";
		if(Keys.home_val.position.button == 0)
			Display.setElementStatus('home-button-play','focus');
		else
			Display.setElementStatus('home-button-info','focus');
		Display.setItemStatus('home-list-row-1-item-1');
	}
	else {
		var select = 'home-list-row-1-item-1';
		document.getElementById('home-info-one').style.display = "none";
		document.getElementById('home-info-two').style.display = "block";
		document.getElementById('home-list').style.top = "360px";
		document.getElementById('home-background-full').style.display = "none";
		document.getElementById('home-background-parcial').style.display = "block";

		document.getElementById('home-image-parcial').style.backgroundImage = 'url(' + Data.getListBackground(Keys.home_val.position.row-1, Keys.home_val.position.column[Keys.home_val.position.row-1][0]) + ')';
		document.getElementById('home-title-two').innerText = Data.getListTitle(Keys.home_val.position.row-1, Keys.home_val.position.column[Keys.home_val.position.row-1][0]);
		document.getElementById('home-description-two').innerHTML = Display.cut(Data.getListDescription(Keys.home_val.position.row-1, Keys.home_val.position.column[Keys.home_val.position.row-1][0]));
		Display.setItemStatus(select,'select-border');
		Display.refreshList();
	}
}

Display.refreshList = function() {
	var srow = Keys.home_val.position.row == 0 ? 0 : Keys.home_val.position.row-1;


	for(var r=0; r<3; r++) {
		if(Keys.home_val.position.column[r][1])
			document.getElementById('home-list-row-'+(r+1)).className = "home-list-item-more";
		else
			document.getElementById('home-list-row-'+(r+1)).className = "home-list-row";
		var over = 0;
		for(var i=0; i<10; i++) {
			if((Keys.home_val.position.column[(srow+r)][0]+i) >= Data.home.data.items[(srow+r)].items.length)
				document.getElementById('home-list-row-'+(r+1)+'-item-'+(i+1)).firstChild.src = Data.getListImage((srow+r),((Data.home.data.items[(srow+r)].items.length - (Data.home.data.items[(srow+r)].items.length - i)) - over));
			else {
				over++;
				document.getElementById('home-list-row-'+(r+1)+'-item-'+(i+1)).firstChild.src = Data.getListImage((srow+r),(Keys.home_val.position.column[(srow+r)][0]+i));
			}
		}
	}
}

/* login access screen */
Display.showLoginAccess = function() {
	var l = Keys.login_access_val;
	var reset = l.previous == 0 ? "login-access-user" : (l.previous == 1 ? "login-access-pass" : "login-access-button");
	Display.setElementStatus(reset);
	var select = l.position == 0 ? "login-access-user" : (l.position == 1 ? "login-access-pass" : "login-access-button");
	Display.setElementStatus(select, 'focus');
	Main.state = Main.states.login_acess
	document.getElementById('login').style.display = "block";
	document.getElementById('login-access').style.display = "block";
}

Display.hideLoginAccess = function() {
	document.getElementById('login').style.display = "none";
	document.getElementById('login-access').style.display = "none";
}

/* login screen */
Display.showLogin = function() {
	Main.state = Main.states.login;
	document.getElementById('login').style.display = "block";
	document.getElementById('login-text').style.display = "block";
	document.getElementById('login-button').style.display = "block";
}

Display.hideLogin = function() {
	document.getElementById('login').style.display = "none";
	document.getElementById('login-text').style.display = "none";
	document.getElementById('login-button').style.display = "none";
}

/* start screen */
Display.showStart= function() {
	document.getElementById('start').style.display = "block";
	Display.startLoading();
}

Display.hideStart = function() {
	document.getElementById('start').style.display = "none";
	Display.stopLoading();
}

Display.startLoading = function() {
  Display.stopLoading();
  document.getElementById('start-loading').style.display = "block";
  document.getElementById('start-loading').src = Main.url + "loading/frame_" + Display.loading_index + ".png";
  Display.loading_index ++;
  if(Display.loading_index > 18)
    Display.loading_index = 1;
  Display.timers.loading = setTimeout("Display.startLoading();", 50);
}

Display.stopLoading = function() {
	document.getElementById('start-loading').style.display = "none";
  clearTimeout(Display.timers.loading);
}

/* generics functions*/
Display.setElementStatus = function(e,s) {
	e = document.getElementById(e);
	if(typeof s == 'undefined')
		e.className = e.className.replace(/ focus| select/g,'');
	else
		e.className = e.className.replace(/ focus| select/g,'') + ' ' + s;
}

Display.getDataUer = function() {
	var u = document.getElementById('login-access-user').value;
	var p = document.getElementById('login-access-pass').value;
	return {u:u,p:p};
}

Display.setItemStatus = function(e,s) {
	e = document.getElementById(e);
	if(typeof s == 'undefined')
		e.className = e.className.replace(/ select-border/g,'');
	else
		e.className = e.className.replace(/ select-border/g,'') + ' ' + s;
}

Display.setMoreRowItems = function(e,s) {
	e = document.getElementById(e);
	alert(e.className);
	if(typeof s == 'undefined')
		e.className = e.className.replace(/ home-list-item-more/g,'');
	else
		e.className = e.className.replace(/ home-list-item-more/g,'') + ' ' + s;
	alert(e.className);
}

/* keyboard widget */
Display.showKeyboard = function(screen, item) {
	Keys.keyboard_val = {type:0,position:{row:0,column:0},previous:{row:Keys.keyboard_val.position.row,column:Keys.keyboard_val.position.column},size:{row: 3,column: [9,8,8,2]}};
	Main.preState = Main.state;
	Main.state = Main.states.keyboard;
	if(screen == 'login-access') {
		Display.keyboard_val.input = item == 0 ? 'login-access-user' : 'login-access-pass';
		document.getElementById('login-access').style.top = '20px';
	}
	Display.setElementStatus(Display.keyboard_val.input,'select');
	document.getElementById('keyboard').style.display = "block";
	Display.moveKeyboard(Keys.keyboard_val);
}

Display.hideKeyboard = function(screen) {
	if(Keys.keyboard_val.type == 1)
	Display.changeKeyboard();
	Main.state = Main.preState;
	if(screen == 'login-access')
		document.getElementById('login-access').style.top = '170px';
	document.getElementById('keyboard').style.display = "none";
	Display.setElementStatus(Display.keyboard_val.input,'focus');
}

Display.moveKeyboard = function(s) {
	var h = document.getElementById('keyboard-r-'+s.previous.row+'-b-'+s.previous.column);
	h.className = h.className.replace(/ keyboard-key-focus/g,'');
	var f = document.getElementById('keyboard-r-'+s.position.row+'-b-'+s.position.column);
	f.className = f.className.replace(/ keyboard-key-focus/g,'') + ' keyboard-key-focus';
}

Display.setKeyboard = function(s, screen) {
	var e = document.getElementById(Display.keyboard_val.input);
	if(s.position.row == 2 && s.position.column == s.size.column[2])
	e.value = e.value.length > 0 ? e.value.slice(0,-1) : '';
	else if(s.position.row == 3) {
		if(s.position.column == 1)
		e.value = e.value + ' ';
		else if(s.position.column == 2)
		Display.hideKeyboard(screen);
		else
		Display.changeKeyboard();
	}
	else
	e.value = e.value + document.getElementById('keyboard-r-'+s.position.row+'-b-'+s.position.column).innerText;
}

Display.changeKeyboard = function() {
	Keys.keyboard_val.type = Keys.keyboard_val.type == 0 ? 1 : 0;
	for(var r=0;r<=Keys.keyboard_val.size.row;r++) {
		for(var b=0;b<=Keys.keyboard_val.size.column[r];b++) {
			var e = document.getElementById('keyboard-r-'+r+'-b-'+b);
			var value = e.innerText;
			e.innerText = e.getAttribute('alter');
			e.setAttribute('alter',value);
		}
	}
}
