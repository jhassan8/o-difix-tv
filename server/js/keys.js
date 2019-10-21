var Keys = {
	login_access_val: {
		position: 0,
		previous: 2,
		size: 2
	},
	keyboard_val: {
		type: 0,
		position: {
			row: 0,
			column: 0
		},
		previous: {
			row: 0,
			column: 0
		},
		size: {
			row: 3,
			column: [9,8,8,2]
		}
	},
	home_val: {
		position: {
			row: 0,
			column: [],
			button: 0
		},
		size: [3,10,2],
		previous: {
			button: 0,
			row: 0
		}
	}
}

/* home screen key event */
Keys.home = function() {
	switch(event.keyCode) {
		case tvKey.KEY_UP:
			Keys.home_val.previous.row = Keys.home_val.position.row;
			if(Keys.home_val.position.row > 0)
				Keys.home_val.position.row--;
			//alert(Keys.home_val.position.row);
			Display.setHomePosition();
		break;
		case tvKey.KEY_DOWN:
			Keys.home_val.previous.row = Keys.home_val.position.row;
			if(Keys.home_val.position.row == Data.home.data.items.length)
				Keys.home_val.position.row = 0;
			else
				Keys.home_val.position.row++;
			//alert(Keys.home_val.position.row);
			Display.setHomePosition();
		break;
		case tvKey.KEY_LEFT:
			if(Keys.home_val.position.row == 0) {
				if(Keys.home_val.position.button != 0)
					Keys.home_val.position.button--;
				//alert(Keys.home_val.position.button);
			}
			else {
				if(Keys.home_val.position.column[Keys.home_val.position.row-1][0] != 0)
					Keys.home_val.position.column[Keys.home_val.position.row-1][0]--;
				else if(Keys.home_val.position.column[Keys.home_val.position.row-1][1])
					Keys.home_val.position.column[Keys.home_val.position.row-1][0] = Data.home.data.items[Keys.home_val.position.row-1].items.length - 1;
				//alert(Keys.home_val.position.column[Keys.home_val.position.row-1][0]);
			}
			Display.setHomePosition();
		break;
		case tvKey.KEY_RIGHT:
			if(Keys.home_val.position.row == 0) {
				if(Keys.home_val.position.button == 0)
					Keys.home_val.position.button++;
				//alert(Keys.home_val.position.button);
			}
			else {
				if(Keys.home_val.position.column[Keys.home_val.position.row-1][0] != (Data.home.data.items[Keys.home_val.position.row-1].items.length - 1))
					Keys.home_val.position.column[Keys.home_val.position.row-1][0]++;
				else
					Keys.home_val.position.column[Keys.home_val.position.row-1][0] = 0;
				if(Keys.home_val.position.column[Keys.home_val.position.row-1][0] > 0 || Keys.home_val.position.column[Keys.home_val.position.row-1][1])
					Keys.home_val.position.column[Keys.home_val.position.row-1][1] = true;
				//alert(Keys.home_val.position.column[Keys.home_val.position.row-1][0]);
				//alert(Data.home.data.items[Keys.home_val.position.row-1].items.length - 1);
			}
			Display.setHomePosition();
		break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
		break;
	}
}

/* keyboard widget key event */
Keys.keyboard = function(event) {
	switch(event.keyCode) {
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			widgetAPI.blockNavigation(event);
			Display.hideKeyboard('login-access');
		break;
		case tvKey.KEY_UP:
			Keys.keyboard_val.previous.row = Keys.keyboard_val.position.row;
			Keys.keyboard_val.previous.column = Keys.keyboard_val.position.column;
			if(Keys.keyboard_val.position.row == 0) {
				Keys.keyboard_val.position.row = Keys.keyboard_val.size.row;
				var col = Keys.keyboard_val.position.column;
				Keys.keyboard_val.position.column = col < 3 ? 0 : (col < 7 ? 1 : 2);
			}
			else
				Keys.keyboard_val.position.row--;
			Display.moveKeyboard(Keys.keyboard_val);
		break;
		case tvKey.KEY_DOWN:
			Keys.keyboard_val.previous.row = Keys.keyboard_val.position.row;
			Keys.keyboard_val.previous.column = Keys.keyboard_val.position.column;
			if(Keys.keyboard_val.position.row == Keys.keyboard_val.size.row) {
				Keys.keyboard_val.position.row = 0;
				var col = Keys.keyboard_val.position.column;
				Keys.keyboard_val.position.column = col == 0 ? 1 : (col == 1 ? 4 : (col == 2 ? 8 : 0));
			}
			else
				Keys.keyboard_val.position.row++;
			Display.moveKeyboard(Keys.keyboard_val);
		break;
		case tvKey.KEY_LEFT:
			Keys.keyboard_val.previous.row = Keys.keyboard_val.position.row;
			Keys.keyboard_val.previous.column = Keys.keyboard_val.position.column;
			if(Keys.keyboard_val.position.column == 0)
				Keys.keyboard_val.position.column = Keys.keyboard_val.size.column[Keys.keyboard_val.position.row];
			else
				Keys.keyboard_val.position.column--;
			Display.moveKeyboard(Keys.keyboard_val);
		break;
		case tvKey.KEY_RIGHT:
			Keys.keyboard_val.previous.row = Keys.keyboard_val.position.row;
			Keys.keyboard_val.previous.column = Keys.keyboard_val.position.column;
			if(Keys.keyboard_val.position.column == Keys.keyboard_val.size.column[Keys.keyboard_val.position.row])
				Keys.keyboard_val.position.column = 0;
			else
				Keys.keyboard_val.position.column++;
			Display.moveKeyboard(Keys.keyboard_val);
		break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			Display.setKeyboard(Keys.keyboard_val,'login-access');
		break;
	}
}

/* login access screen key event*/
Keys.login_access = function(event) {
	switch(event.keyCode) {
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			widgetAPI.blockNavigation(event);
			Display.hideLoginAccess();
			Display.showLogin();
		break;
		case tvKey.KEY_UP:
			if(Keys.login_access_val.position > 0) {
				Keys.login_access_val.previous = Keys.login_access_val.position;
				Keys.login_access_val.position--;
				Display.showLoginAccess();
			}
		break;
		case tvKey.KEY_DOWN:
			if(Keys.login_access_val.position < Keys.login_access_val.size) {
				Keys.login_access_val.previous = Keys.login_access_val.position;
				Keys.login_access_val.position++;
				Display.showLoginAccess();
			}
		break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(Keys.login_access_val.position < Keys.login_access_val.size)
				Display.showKeyboard('login-access', Keys.login_access_val.position);
			else {
				var d = Display.getDataUer();
				Main.login(d.u,d.p);
			}
		break;
	}
}

/* login screen key event */
Keys.login = function(event) {
	switch(event.keyCode) {
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			Display.hideLogin();
			Display.showLoginAccess();
		break;
	}
}

//
// Keys.stateSearch = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			if(Main.state_back_three == Main.state_list)
// 				Display.showListContainer();
// 			else
// 				Display.showListChannelsContainer();
// 			Main.state = Main.state_back_three;
// 			if(Keys.search_keyboard_key_select[0] == 2)
// 				Keys.search_keyboard_key_select_back[0] = 1;
// 			else
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 			Keys.select_item_search[0] = 0;
// 			Keys.select_item_search[1] = 0;
// 			Keys.select_item_search[2] = 0;
// 			Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 			Keys.search_keyboard_key_select[0] = 0;
// 			Keys.search_keyboard_key_select[1] = 0;
// 			document.getElementById("list-search-master-text").innerHTML = '';
// 			widgetAPI.putInnerHTML(document.getElementById("list-bar-top-menu-name"), Data.getNameCategory(Main.unselected_category-4));
// 			Display.hideListSearchContainer();
// 			Display.hideListSearch();
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.search_keyboard_key_select[1] > 0 && Keys.search_keyboard_key_select[0] != 2){
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 				Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 				Keys.search_keyboard_key_select[1]--;
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 2){
// 				if(Keys.select_item_search[1] > 0){
// 					Keys.select_item_search[1]--;
// 					Keys.select_item_search[2]--;
// 					Display.changeSelectSearchList(Keys.select_item_search);
// 				}
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.search_keyboard_key_select[1] < Keys.search_keyboard_key_limit[1] && Keys.search_keyboard_key_select[0] != 2){
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 				Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 				if(Keys.search_keyboard_key_select_back[0] == Keys.search_keyboard_key_limit[0] && Keys.search_keyboard_key_select_back[1] == 17)
// 					return;
// 				Keys.search_keyboard_key_select[1]++;
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 2){
// 				if(Keys.select_item_search[1] < 6){
// 					Keys.select_item_search[1]++;
// 					Keys.select_item_search[2]++;
// 					Display.changeSelectSearchList(Keys.select_item_search);
// 				}
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Keys.search_keyboard_key_select[0] > 0 && Keys.search_keyboard_key_select[0] != 2){
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 				Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 				Keys.search_keyboard_key_select[0]--;
// 				if(Keys.search_keyboard_key_select[1] == 17)
// 					Keys.search_keyboard_key_select[1] = 21;
// 				else if(Keys.search_keyboard_key_select[1] == 9)
// 					Keys.search_keyboard_key_select[1] = 10;
// 				else if(Keys.search_keyboard_key_select[1] > 9 && Keys.search_keyboard_key_select[1] < 17)
// 					Keys.search_keyboard_key_select[1] = Keys.search_keyboard_key_select[1]+2;
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 2 && Keys.select_item_search[2]-7 < 0){
// 				Keys.search_keyboard_key_select[0]--;
// 				Display.changeSelectSearchList([10,10]);
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 2){
// 				Keys.select_item_search[0] --;
// 				Keys.select_item_search[2] -= 7;
// 				Display.changeSelectSearchList(Keys.select_item_search);
// 				Display.reloadListSearch(Keys.select_item_search);
// 			}
// 		break;
// 		case tvKey.KEY_DOWN:
// 			if(Keys.search_keyboard_key_select[0] < Keys.search_keyboard_key_limit[0]){
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 				Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 				Keys.search_keyboard_key_select[0]++;
// 				if(Keys.search_keyboard_key_select[1] > 8 && Keys.search_keyboard_key_select[1] < 12)
// 					Keys.search_keyboard_key_select[1] = 9;
// 				else if(Keys.search_keyboard_key_select[1] > 11 && Keys.search_keyboard_key_select[1] < 19)
// 					Keys.search_keyboard_key_select[1] = Keys.search_keyboard_key_select[1]-2;
// 				else if(Keys.search_keyboard_key_select[1] > 18)
// 					Keys.search_keyboard_key_select[1] = 17;
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 1 && Data.Search.length > 0){
// 				Keys.search_keyboard_key_select_back[0] = Keys.search_keyboard_key_select[0];
// 				Keys.search_keyboard_key_select_back[1] = Keys.search_keyboard_key_select[1];
// 				Keys.search_keyboard_key_select[0]++;
// 				if(Keys.select_item_search[2] >= Data.Search.length){
// 					Keys.select_item_search[0] = 0;
// 					Keys.select_item_search[1] = 0;
// 					Keys.select_item_search[2] = 0;
// 				}
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,null);
// 				Display.changeSelectSearchList(Keys.select_item_search);
// 			}
// 			else if(Keys.search_keyboard_key_select[0] == 2){
// 				if(Keys.select_item_search[2]+7 < Data.Search.length){
// 					Keys.select_item_search[0] ++;
// 					Keys.select_item_search[2] += 7;
// 		      Display.changeSelectSearchList(Keys.select_item_search);
// 					Display.reloadListSearch(Keys.select_item_search);
// 		    }
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.search_keyboard_key_select[0] == 1 && Keys.search_keyboard_key_select[1] == 17){
// 				var text = document.getElementById("list-search-master-text").innerHTML;
// 				if(text.length > 3){
// 					Server.InitMoviesSearch(text.toLowerCase());
// 					Data.callback_search = function(){
// 						Display.showListSearchContainer();
// 						Display.reloadListSearch(Keys.select_item_search);
// 					}
// 				}
// 			}
// 			else if(Keys.search_keyboard_key_select[0] != 2)
// 				Display.writeSearchKeyboard(Keys.search_keyboard_key_select);
// 			else{
// 				Server.loadMovie(Keys.select_item_search[2]);
// 				Data.callback_movie = function(){
// 					Main.state_back = Main.state;
// 					Main.state = Main.state_select;
// 					Display.showSelect(Keys.select_item_search[2]);
// 					Display.hideList();
// 				}
// 			}
// 		break;
// 	}
// }
//
//
// Keys.stateMenuSub = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Keys.select_submenu[1] = 0;
// 			Main.state = Main.state_menu;
// 			Display.hideSubMenu(Keys.select_submenu);
// 		break;
//     case tvKey.KEY_DOWN:
// 			if(Keys.select_submenu[1] < Keys.select_submenu[2]){
// 				Keys.select_submenu[1]++;
// 				Display.showSubMenu(Keys.select_submenu);
// 			}
// 			else{
// 				Keys.select_submenu[1] = 0;
// 				Keys.position_menu++;
// 				Main.selected_category++;
// 				Main.state = Main.state_menu;
// 				Display.hideSubMenu(Keys.select_submenu,true);
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Keys.select_submenu[1] > 0){
// 				Keys.select_submenu[1]--;
// 				Display.showSubMenu(Keys.select_submenu);
// 			}
// 			else{
// 				Keys.select_submenu[1] = 0;
// 				Main.state = Main.state_menu;
// 				Display.hideSubMenu(Keys.select_submenu);
// 			}
// 		break;
// 		case tvKey.KEY_LEFT:
// 			Keys.select_submenu[1] = 0;
// 			Main.state = Main.state_menu;
// 			Display.hideSubMenu(Keys.select_submenu);
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			Keys.select_submenu[1] = 0;
// 			Main.state = Main.state_list;
// 			Display.hideSubMenu(Keys.select_submenu);
// 			Display.hideMenu();
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.select_submenu[0] == 3){
// 				Main.selected_server = Keys.select_submenu[1];
// 				Keys.select_left_list = 0;
// 				Keys.select_top_list = 0;
// 				Keys.select_item = 0;1
// 				Keys.select_top = 0;
// 				Main.unselected_category = 4;
// 				Keys.select_submenu[1] = 0;
// 				Main.state = Main.state_menu;
// 				Display.hideSubMenu(Keys.select_submenu);
// 				Server.loadCategories(Data.Servers[Main.selected_server].id);
// 				Data.callback_categories = function(){
// 					Main.createCategories();
// 					Display.showMenu(Main.selected_category,Keys.position_menu);
// 					Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 					Server.InitMovies(Data.getIDCategory(Main.unselected_category-4).replace('&','%26'));
// 					Data.callback_new = function(){
// 						widgetAPI.putInnerHTML(document.getElementById("list-bar-top-menu-name"), Data.getNameCategory(Main.unselected_category));
// 						Display.reloadList();
// 						Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 					}
// 				}
// 			}
// 			else if(Keys.select_submenu[0] == 4){
// 				Main.selected_audio = Keys.select_submenu[1];
// 				Keys.select_submenu[1] = 0;
// 				Main.state = Main.state_menu;
// 				Display.hideSubMenu(Keys.select_submenu);
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
// 			else if(Keys.select_submenu[0] == 5){
// 				Main.selected_quality = Keys.select_submenu[1];
// 				Keys.select_submenu[1] = 0;
// 				Main.state = Main.state_menu;
// 				Display.hideSubMenu(Keys.select_submenu);
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
// 		break;
// 	}
// }
//
// Keys.stateMenu = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Main.state = Main.state_back_three;
// 			Display.hideMenu();
// 		break;
//     case tvKey.KEY_DOWN:
// 			if(Main.selected_category < Data.getCategoriesCount()-1+4){
// 				Keys.position_menu++;
// 				Main.selected_category++;
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Main.selected_category > 1){
// 				if(Keys.position_menu > 1)
// 					Keys.position_menu--;
// 				Main.selected_category--;
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			Main.state = Main.state_back_three;
// 			Display.hideMenu();
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Main.selected_category > 3){
// 				Main.state = Main.state_list;
// 				Main.state_back_three = Main.state;
// 				Display.showListContainer();
// 				Display.hideListChannelsContainer();
// 				Display.hideMenu();
// 				Server.InitMovies(Data.getIDCategory(Main.selected_category-4).replace('&','%26'));
// 				Keys.select_left_list = 0;
// 				Keys.select_top_list = 0;
// 				Keys.select_item = 0;1
// 				Keys.select_top = 0;
// 				Main.unselected_category = Main.selected_category;
// 				Data.callback_new = function(){
// 					Display.reloadList();
// 					Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 				}
// 			}
// 			else if(Main.selected_category == 1){
// 				Main.state = Main.state_search;
// 				widgetAPI.putInnerHTML(document.getElementById("list-bar-top-menu-name"), 'Buscar');
// 				Display.hideMenu();
// 				Display.hideListContainer();
// 				Display.hideListChannelsContainer();
// 				Display.changeSelectSearchKeyboard(Keys.search_keyboard_key_select_back,Keys.search_keyboard_key_select);
// 				Display.showListSearch();
// 			}
// 			else if(Main.selected_category == 2){
// 				Main.state = Main.state_channels;
// 				Main.state_back_three = Main.state;
// 				Server.loadChannels();
// 				Data.callback_channels = function(){
// 					Display.reloadListChannels(Keys.select_list_channel);
// 					Display.changeSelectChannelsList(Keys.select_list_channel);
// 					Display.showListChannelsContainer();
// 					Display.hideListContainer();
// 					Display.hideMenu();
// 				}
// 			}
// 			else if(Main.selected_category == 3){
// 				Keys.select_submenu[0] = 3;
// 				Keys.select_submenu[2] = document.getElementById('list-menu-static-subitem-3').getElementsByTagName('div').length-1;
// 				Keys.select_submenu[3] = document.getElementById('list-menu-static-subitem-3').style.top;
// 				Display.showSubMenu(Keys.select_submenu);
// 				Main.state = Main.state_submenu;
// 			}
// 		break;
// 	}
// }
//
// Keys.stateList = function(event){
// 	switch(event.keyCode){
//     case tvKey.KEY_DOWN:
// 			if(Keys.select_item+21 > Data.getCountMovies()-1){
// 				Main.addServer();
// 			}
// 	    if(Keys.select_top_list < Keys.max_top_list && Keys.select_item+7 < Data.getCountMovies()){
// 	      Keys.select_top_list++;
// 				Keys.select_item += 7;
// 	      Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 	    }
// 			else if(Keys.select_item+7 < Data.getCountMovies()){
// 				Keys.select_item += 7;
// 				Keys.select_top++;
// 				Display.reloadList();
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 	    if(Keys.select_top_list > 0){
// 	      Keys.select_top_list--;
// 				Keys.select_item -= 7;
// 	      Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 	    }
// 			else if(Keys.select_item-7 >= 0){
// 				Keys.select_item -= 7;
// 				Keys.select_top--;
// 				Display.reloadList();
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.select_left_list < Keys.max_left_list && Keys.select_item < Data.getCountMovies()-1){
//         Keys.select_left_list++;
// 				Keys.select_item++;
//         Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
//       }
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.select_left_list == 0){
// 				Main.state = Main.state_menu;
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
//       else if(Keys.select_left_list > 0){
// 				Keys.select_left_list--;
// 				Keys.select_item--;
// 				Display.changeSelectList(Keys.select_left_list, Keys.select_top_list);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			// if(Data.getNameServer(Main.selected_server) == 'TV en Vivo' && document.getElementById("category_menu").innerHTML.indexOf('Buscar') == -1){
// 			// 	Main.state_back = Main.state;
// 			// 	Main.state = Main.state_player;
// 			// 	widgetAPI.putInnerHTML(document.getElementById("title_bar_player"),Data.Movies[Keys.select_item].name);
// 			// 	Player.setVideoURL(Data.Movies[Keys.select_item].url+'|COMPONENT=HLS');
// 			// 	Player.handlePlayKey();
// 			// 	Display.showLoading('Player');
// 			// 	Display.hideList();
// 			// 	Display.showPlayer();
// 			// }
// 			// else{
// 				Server.limit = false;
// 				Main.threadState = false;
// 				Server.loadMovie(Keys.select_item);
// 				Data.callback_movie = function(){
// 					Main.state_back = Main.state;
// 					Main.state = Main.state_select;
// 					Display.showSelect(Keys.select_item);
// 					Display.hideList();
// 				}
// 			// }
// 		break;
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 		break;
// 	}
// }
//
// Keys.stateSelect = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Main.state = Main.state_back;
// 			if(Main.state == Main.state_list){
// 				Keys.select_select=1;
// 				Display.hideSelect();
// 				Display.showList();
// 				Display.reloadList();
// 			}
// 			else if(Main.state == Main.state_search){
// 				Keys.select_select=1;
// 				Display.hideSelect();
// 				Display.showList();
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.select_select < Keys.limit_select){
// 				Keys.select_select++;
// 				Display.setSelectButton(Keys.select_select);
// 			}
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.select_select > 1){
// 				Keys.select_select--;
// 				Display.setSelectButton(Keys.select_select);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.select_select == 1 && Data.Movie.type == 'Movie'){
// 				Server.loadVideo();
// 				Data.callback_video = function(){
// 					Keys.select_play_name = Data.Movie.name;
// 					Keys.select_play[2] = Data.getCountVideos()-1;
// 					Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					Main.state_back_two = Main.state;
// 					Main.state = Main.state_play;
// 				}
// 			}
// 			else if(Keys.select_select == 1 && Data.Movie.type == 'Serie'){
// 				Keys.select_serie[1] = Data.Movie.view.season;
// 				Keys.select_serie[4] = Data.Movie.view.episode;
// 				Server.loadVideo(Data.getSeasonNumber(Keys.select_serie[1]),Data.getEpisodeNumber(Keys.select_serie[1],Keys.select_serie[4]));
// 				Data.callback_video = function(){
// 					Keys.select_play[2] = Data.getCountVideos()-1;
// 					Keys.select_play_name = Data.getEpisodeName(Keys.select_serie[1],Keys.select_serie[4]);
// 					Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 					Main.state_back_two = Main.state;
// 					Main.state = Main.state_play;
// 				}
// 			}
// 			else if(Keys.select_select == 2 && Data.Movie.type == 'Movie'){
// 				alert('Play trailer');
// 				Server.loadVideoTrailer(Data.getTrailerMovie());
// 				Keys.select_play_name = Data.Movie.name+' Trailer';
// 				Display.hideSelect();
// 				Display.showPlayer();
// 				Main.state_back_two = Main.state;
// 				Main.state = Main.state_player;
// 				Display.showLoading('Player');
// 				Data.callback_video = function(){
// 					if(Data.Videos[0] != null && Data.Videos[0].server == 'direct')
// 						Connectors.redirect(Data.Videos[0].server,Data.Videos[0].url);
// 					else{
// 						Main.endVideo();
// 						if(Main.state_back == Main.state_search)
// 							Display.showSelect(Keys.select_item_search[2]);
// 						else
// 							Display.showSelect(Keys.select_item);
// 						Display.setSelectButton(Keys.select_select);
// 						Main.state = Main.state_back_two;
// 					}
// 				}
// 			}
// 			else if(Keys.select_select == 2 && Data.Movie.type == 'Serie'){
// 				Main.state = Main.state_serie;
// 				Display.hideBannerData();
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 		break;
// 	}
// }
//
// Keys.stateSerie = function(){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
//       Keys.select_serie = [1,0,0,0,0,0];
// 			Main.state = Main.state_select;
// 			Display.setSelectButton(Keys.select_select);
// 			Display.showBannerData();
// 			Display.hideBannerSerie();
// 		break
// 		case tvKey.KEY_LEFT:
// 			if(Keys.select_serie[0] == 1){
// 				Keys.select_serie[0]--;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 			else{
// 				Keys.select_serie = [1,0,0,0,0,0];
// 				Main.state = Main.state_select;
// 				Display.setSelectButton(Keys.select_select);
// 				Display.showBannerData();
// 				Display.hideBannerSerie();
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.select_serie[0] == 0){
// 				Keys.select_serie[0]++;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 		break;
// 		case tvKey.KEY_DOWN:
// 			if(Keys.select_serie[0] == 0 && Keys.select_serie[2] < Data.getSeasonsCount()-1){
// 				if(Keys.select_serie[3] < 6)
// 					Keys.select_serie[3]++;
// 				Keys.select_serie[2]++;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 			else if(Keys.select_serie[0] == 1 && Keys.select_serie[4] < Data.getEpisodesCount(Keys.select_serie[1])-1){
// 				if(Keys.select_serie[5] < 6)
// 					Keys.select_serie[5]++;
// 				Keys.select_serie[4]++;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Keys.select_serie[0] == 0 && Keys.select_serie[2] > 0){
// 				if(Keys.select_serie[3] > 0)
// 					Keys.select_serie[3]--;
// 				Keys.select_serie[2]--;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 			else if(Keys.select_serie[0] == 1 && Keys.select_serie[4] > 0){
// 				if(Keys.select_serie[5] > 0)
// 					Keys.select_serie[5]--;
// 				Keys.select_serie[4]--;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.select_serie[0] == 0){
// 				Keys.select_serie[1] = Keys.select_serie[2];
// 				Keys.select_serie[4] = 0;
// 				Keys.select_serie[5] = 0;
// 				Keys.select_serie[0] = 1;
// 				Display.showBannerSerie(Keys.select_serie);
// 			}
// 			else{
// 				Server.loadVideo(Data.getSeasonNumber(Keys.select_serie[1]),Data.getEpisodeNumber(Keys.select_serie[1],Keys.select_serie[4]));
// 				Data.callback_video = function(){
// 					Keys.select_play[2] = Data.getCountVideos()-1;
// 					Keys.select_play_name = Data.getEpisodeName(Keys.select_serie[1],Keys.select_serie[4]);
// 					Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 					Main.state_back_two = Main.state;
// 					Main.state = Main.state_play;
// 				}
// 			}
// 		break;
// 	}
// }
//
// Keys.statePlayer = function(){
// 	switch(event.keyCode){
// 		case tvKey.KEY_YELLOW:
// 			if(Player.state_fullscreen){
// 				Player.state_fullscreen = false;
// 				Player.setFullscreen(Player.state_fullscreen);
// 			}
// 			else{
// 				Player.state_fullscreen = true;
// 				Player.setFullscreen(Player.state_fullscreen);
// 			}
// 		break;
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Main.endVideo();
// 			if(Main.state_back == Main.state_search)
// 				Display.showSelect(Keys.select_item_search[2]);
// 			else if(Main.state_back == Main.state_channels)
// 				Display.showList();
// 			else
// 				Display.showSelect(Keys.select_item);
// 			Display.setSelectButton(Keys.select_select);
// 			Main.state = Main.state_back_two;
// 		break;
// 		break;
//     case tvKey.KEY_PLAY:
// 			Display.showPlayerBar(Keys.select_play_name);
// 			Player.handlePlayKey();
// 		break;
//     case tvKey.KEY_STOP:
// 			Main.endVideo();
// 		break;
//     case tvKey.KEY_PAUSE:
// 			Display.showPlayerBar(Keys.select_play_name);
// 			Player.pauseVideo();
// 		break;
// 		case tvKey.KEY_VOL_UP:
//     case tvKey.KEY_PANEL_VOL_UP:
// 			if(Audio.getMute() == true)
// 				Audio.setMute(false);
// 			Audio.setRelativeVolume(0);
// 			Display.showVolume();
//     break;
//     case tvKey.KEY_VOL_DOWN:
//     case tvKey.KEY_PANEL_VOL_DOWN:
// 			if(Audio.getMute() == true)
// 				Audio.setMute(false);
// 			Audio.setRelativeVolume(1);
// 			Display.showVolume();
// 		break;
// 		case tvKey.KEY_INFO:
// 			Display.showPlayerBar(Keys.select_play_name);
// 		break;
// 		case tvKey.KEY_FF:
// 			Keys.stateSkip = true;
// 			if(Keys.typeSkip == Player.REWIND && Keys.valueSkip != 0)
// 				Keys.valueSkip = -1*Keys.valueSkip;
// 			Keys.typeSkip = Player.FORWARD;
// 			Keys.valueSkip = Keys.valueSkip + (Display.totalTime*0.02)/1000;
// 			clearTimeout(Keys.timerSkip);
// 			Keys.timerSkip = setTimeout('Main.FBsend('+Player.FORWARD+');', 3000)
// 			Display.showFB();
// 		break;
// 		case tvKey.KEY_RW:
// 			Keys.stateSkip = true;
// 			if(Keys.typeSkip == Player.FORWARD && Keys.valueSkip != 0)
// 				Keys.valueSkip = -1*Keys.valueSkip;
// 			Keys.typeSkip = Player.REWIND;
// 			Keys.valueSkip = Keys.valueSkip + (Display.totalTime*0.02)/1000;
// 			clearTimeout(Keys.timerSkip);
// 			Keys.timerSkip = setTimeout('Main.FBsend('+Player.REWIND+');', 3000)
// 			Display.showFB();
// 		break;
// 	}
// }
//
// Keys.stateLogin = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Main.selected_login_button > 1){
// 				Main.selected_login_button--;
// 				Display.showLogin(Main.selected_login_button);
// 			}
// 		break;
// 		case tvKey.KEY_DOWN:
// 			if(Main.selected_login_button < 3){
// 				Main.selected_login_button++;
// 				Display.showLogin(Main.selected_login_button);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Main.selected_login_button == 2 || Main.selected_login_button == 1){
// 				Keys.login_keyboard_key_select = [0,0];
// 				Main.state = Main.state_login_keyboard;
// 				Display.showLoginKeyboard(Main.selected_login_button,Keys.login_keyboard_key_select_back);
// 			}
// 			else{
// 				var user = document.getElementById("login-form-txt-user").innerHTML;
// 				var pass = document.getElementById("login-form-txt-pass").innerHTML;
// 				if(user.length < 4 || pass.length < 4)
// 					alert('Complete');
// 				else
// 					Main.loginAPI(user.toUpperCase(),pass.toUpperCase());
// 			}
// 		break;
// 	}
// }
//
// Keys.stateLoginKeyboard = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 			Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 			Main.state = Main.state_login;
// 			Display.hideLoginKeyboard();
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Keys.login_keyboard_key_select[0] > 0){
// 				Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 				Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 				Keys.login_keyboard_key_select[0]--;
// 				if(Keys.login_keyboard_key_select_back[0] == Keys.login_keyboard_key_limit[0])
// 					if(Keys.login_keyboard_key_select_back[1] == 1 || Keys.login_keyboard_key_select_back[1] == 2)
// 						Keys.login_keyboard_key_select[1] = 2;
// 					else if(Keys.login_keyboard_key_select_back[1] == 3)
// 						Keys.login_keyboard_key_select[1] = 4;
// 				Display.changeSelectLoginKeyboard(Keys.login_keyboard_key_select_back,Keys.login_keyboard_key_select);
// 			}
// 		break;
// 		case tvKey.KEY_DOWN:
// 			if(Keys.login_keyboard_key_select[0] < Keys.login_keyboard_key_limit[0]){
// 				Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 				Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 				Keys.login_keyboard_key_select[0]++;
// 				if(Keys.login_keyboard_key_select_back[0] == Keys.login_keyboard_key_limit[0]-1)
// 					if(Keys.login_keyboard_key_select_back[1] == 0 || Keys.login_keyboard_key_select_back[1] == 1)
// 						Keys.login_keyboard_key_select[1] = 0;
// 					else if(Keys.login_keyboard_key_select_back[1] == 3 || Keys.login_keyboard_key_select_back[1] == 4)
// 						Keys.login_keyboard_key_select[1] = 3;
// 				Display.changeSelectLoginKeyboard(Keys.login_keyboard_key_select_back,Keys.login_keyboard_key_select);
// 			}
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.login_keyboard_key_select[1] > 0){
// 				Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 				Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 				Keys.login_keyboard_key_select[1]--;
// 				Display.changeSelectLoginKeyboard(Keys.login_keyboard_key_select_back,Keys.login_keyboard_key_select);
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.login_keyboard_key_select[1] < Keys.login_keyboard_key_limit[1]){
// 				Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 				Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 				if(Keys.login_keyboard_key_select_back[0] == Keys.login_keyboard_key_limit[0] && Keys.login_keyboard_key_select_back[1] == 3)
// 					return;
// 				Keys.login_keyboard_key_select[1]++;
// 				Display.changeSelectLoginKeyboard(Keys.login_keyboard_key_select_back,Keys.login_keyboard_key_select);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.login_keyboard_key_select[0] == Keys.login_keyboard_key_limit[0] && Keys.login_keyboard_key_select[1] == 3){
// 				Main.state = Main.state_login;
// 				Keys.login_keyboard_key_select_back[0] = Keys.login_keyboard_key_select[0];
// 				Keys.login_keyboard_key_select_back[1] = Keys.login_keyboard_key_select[1];
// 				Display.hideLoginKeyboard();
// 			}
// 			else
// 				Display.writeLoginKeyboard(Keys.login_keyboard_key_select,Main.selected_login_button);
// 		break;
// 	}
// }
//
// Keys.statePlay = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Keys.select_play = [2,0,0,0,0,0,0];
// 			if(Data.Movie.type == 'Movie')
// 				Display.hidePlayMovie();
// 			else
// 				Display.hidePlayEpisode();
// 			Main.state = Main.state_back_two;
// 		break;
// 		case tvKey.KEY_UP:
// 			if(Keys.select_play[0] == 2 && Data.getCountVideos() > 0){
// 				Keys.select_play[0]--;
// 				if(Data.Movie.type == 'Movie')
// 					Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 				else
// 					Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 			}
// 			else if(Keys.select_play[0] == 1){
// 				if(Keys.select_play[2] > 0){
// 					Keys.select_play[2]--;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 			else{
// 				if(Keys.select_play[4] > 0){
// 					Keys.select_play[4]--;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 		break;
// 		case tvKey.KEY_DOWN:
// 			if(Keys.select_play[0] == 0){
// 				if(Keys.select_play[4] < Data.getCountLangMovie()-1){
// 					Keys.select_play[4]++;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 				else if(Keys.select_play[4] == 1){
// 					Keys.select_play[0] = 2;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 			else if(Keys.select_play[0] == 1){
// 				if(Keys.select_play[2] < Data.getCountVideos()-1){
// 					Keys.select_play[2]++;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 				else if(Keys.select_play[2] == Data.getCountVideos()-1){
// 					Keys.select_play[0] = 2;
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.select_play[0] == 0){
// 				Keys.select_play[0]++;
// 				if(Data.Movie.type == 'Movie')
// 					Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 				else
// 					Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.select_play[0] == 1){
// 				Keys.select_play[0]--;
// 				if(Data.Movie.type == 'Movie')
// 					Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 				else
// 					Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 			}
// 		break;
// 		// pos col 0 - sel button 1 - sel l1 2 - unsel l1 3 - sel l2 4 - unsel l2 5 - back unsel l2 6
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			if(Keys.select_play[0] == 2){
// 				if(Data.getCountVideos() > 0){
// 					if(Data.Movie.type == 'Movie')
// 						Display.hidePlayMovie();
// 					else
// 						Display.hidePlayEpisode();
// 					Display.hideSelect();
// 					Display.showPlayer();
// 					Main.state = Main.state_player;
// 					if(Data.Videos.subtitle != null){
// 						Server.loadSubtitle(Data.Videos.subtitle);
// 						Data.callback_subtitles = function(){
// 							document.getElementById("subtitle").style.display="block";
// 							Connectors.redirect(Data.Videos.links[Keys.select_play[3]].server,Data.Videos.links[Keys.select_play[3]].url);
// 							Keys.select_play = [2,0,0,0,0,0,0];
// 						}
// 					}
// 					else{
// 						Connectors.redirect(Data.Videos.links[Keys.select_play[3]].server,Data.Videos.links[Keys.select_play[3]].url);
// 						Keys.select_play = [2,0,0,0,0,0,0];
// 					}
// 				}
// 				else{
// 					Display.hideSelect();
// 					Display.showList();
// 					Display.hideListContainer();
// 					Display.showListSearch();
// 					Display.hidePlayEpisode();
// 					Display.hidePlayMovie();
// 					Keys.select_serie = [1,0,0,0,0,0];
// 					Display.showBannerData();
// 					Display.hideBannerSerie();
// 					Keys.select_select=1;
// 					Main.state = Main.state_search;
// 					document.getElementById("list-search-master-text").innerHTML = Data.getNameEnMovie();
// 					if(Data.getNameEnMovie().length > 3){
// 						Server.InitMoviesSearch(Data.getNameEnMovie().toLowerCase());
// 						Data.callback_search = function(){
// 							Display.showListSearchContainer();
// 							Display.reloadListSearch(Keys.select_item_search);
// 						}
// 					}
// 				}
// 			}
// 			else if(Keys.select_play[0] == 1){
// 				if(Keys.select_play[2] != Keys.select_play[3]){
// 					Keys.select_play[3] = Keys.select_play[2];
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 			else{
// 				if(Keys.select_play[4] != Keys.select_play[5]){
// 					Keys.select_play[5] = Keys.select_play[4];
// 					if(Data.Movie.type == 'Movie')
// 						Display.showPlayMovie(Keys.select_play_name,Keys.select_play);
// 					else
// 						Display.showPlayEpisode(Keys.select_play_name,Keys.select_play);
// 				}
// 			}
// 		break;
// 	}
// }
//
// Keys.stateNextEpisode = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 			Display.hideNextEpisode();
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			Main.startVideo();
// 		break;
// 		case tvKey.KEY_VOL_UP:
// 		case tvKey.KEY_PANEL_VOL_UP:
// 			Keys.statePlayer(event);
// 		break;
// 		case tvKey.KEY_VOL_DOWN:
// 		case tvKey.KEY_PANEL_VOL_DOWN:
// 			Keys.statePlayer(event);
// 		break;
// 	}
// }
//
//
// Keys.stateChannels = function(event){
// 	switch(event.keyCode){
// 		case tvKey.KEY_DOWN:
// 	    if(Keys.select_list_channel[0] < 3 && Keys.select_list_channel[2]+3 < Data.getCountChannels()){
// 	      Keys.select_list_channel[0]++;
// 				Keys.select_list_channel[2] += 3;
// 	      Display.changeSelectChannelsList(Keys.select_list_channel);
// 	    }
// 			else if(Keys.select_list_channel[2]+3 < Data.getCountChannels()){
// 				Keys.select_list_channel[2] += 3;
// 				Keys.select_list_channel[3]++;
// 				Display.reloadListChannels(Keys.select_list_channel);
// 			}
// 		break;
// 		case tvKey.KEY_UP:
// 	    if(Keys.select_list_channel[0] > 0){
// 	      Keys.select_list_channel[0]--;
// 				Keys.select_list_channel[2] -= 3;
// 	      Display.changeSelectChannelsList(Keys.select_list_channel);
// 	    }
// 			else if(Keys.select_list_channel[2]-3 >= 0){
// 				Keys.select_list_channel[2] -= 3;
// 				Keys.select_list_channel[3]--;
// 				Display.reloadListChannels(Keys.select_list_channel);
// 			}
// 		break;
// 		case tvKey.KEY_RIGHT:
// 			if(Keys.select_list_channel[1] < 2 && Keys.select_list_channel[2] < Data.getCountChannels()-1){
//         Keys.select_list_channel[1]++;
// 				Keys.select_list_channel[2]++;
//         Display.changeSelectChannelsList(Keys.select_list_channel);
//       }
// 		break;
// 		case tvKey.KEY_LEFT:
// 			if(Keys.select_list_channel[1] == 0){
// 				Main.state = Main.state_menu;
// 				Display.showMenu(Main.selected_category,Keys.position_menu);
// 			}
//       else if(Keys.select_list_channel[1] > 0){
// 				Keys.select_list_channel[1]--;
// 				Keys.select_list_channel[2]--;
// 				Display.changeSelectChannelsList(Keys.select_list_channel);
// 			}
// 		break;
// 		case tvKey.KEY_ENTER:
// 		case tvKey.KEY_PANEL_ENTER:
// 			Keys.select_play_name = Data.Channels[Keys.select_list_channel[2]].name;
// 			Display.showPlayer();
// 			Player.setVideoURL(Data.Channels[Keys.select_list_channel[2]].url+'|COMPONENT=HLS');
// 			Player.handlePlayKey();
// 			Display.showLoading('Player');
// 			Display.hideList();
// 			Main.state_back = Main.state;
// 			Main.state_back_two = Main.state;
// 			Main.state = Main.state_player;
// 		break;
// 		case tvKey.KEY_RETURN:
// 		case tvKey.KEY_PANEL_RETURN:
// 			widgetAPI.blockNavigation(event);
// 		break;
// 	}
// }
