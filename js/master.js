var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var __M = {
	s: false
}

__M.on = function() {
	__M.i();
  if(typeof Main != 'undefined'){
		__M.s = true;
		Main.init();
	}
	else {
		__M.s = false;
		document.getElementById("__e").style.display = "block";
		widgetAPI.sendReadyEvent();
	}
}

__M.off = function() {
	if(__M.s)
		Main.onUnload();
}

__M.i = function() {
  document.getElementById("__k").focus();
}

__M.k = function() {
	if(__M.s)
		Main.keyDown(event);
	else {
		switch(event.keyCode){
			case tvKey.KEY_RETURN:
			case tvKey.KEY_PANEL_RETURN:
				widgetAPI.blockNavigation(event);
				widgetAPI.sendExitEvent();
			break;
			case tvKey.KEY_EXIT:
				widgetAPI.sendExitEvent();
			break;
		}
	}
}
