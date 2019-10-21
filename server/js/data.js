var Data = {
	user: {},
	home: {},
	callbaks: {
		user: null,
		home: null
	}
}

/* set data of user on app and execute callback */
Data.setUser = function(d) {
	Data.user = d;
	if(Data.callbaks.user)
		Data.callbaks.user();
}

/* set data with list of items for home screen and execute callback */
Data.setHome = function(d) {
	for(var i=0; i<d.data.items.length; i++)
		Keys.home_val.position.column[i] = [0, false];
	Data.home = d;
	if(Data.callbaks.home)
		Data.callbaks.home();
}

/* getter and setter of basic data */
Data.getNewTitle = function() {
	return Data.home.data.new.name;
}

Data.getNewBackground = function() {
	return Data.home.data.new.background.replace('original','w1280');
}

Data.getNewDescription = function() {
	return Data.home.data.new.description;
}

Data.getListTitle = function(r,c) {
	return Data.home.data.items[r].items[c].name;
}

Data.getListBackground = function(r,c) {
	return Data.home.data.items[r].items[c].background.replace('original','w780');
}

Data.getListDescription = function(r,c) {
	return Data.home.data.items[r].items[c].description;
}

Data.getListImage = function(r,c) {
	return Data.home.data.items[r].items[c].image.replace('original','w154');
}
