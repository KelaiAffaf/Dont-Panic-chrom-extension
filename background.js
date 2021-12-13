var hiddenTabs=[];
var tmpId ; 
var ids = [];
var state =  'visible';
function setBadge(text){
	chrome.browserAction.setBadgeText({text:text});
	chrome.browserAction.setBadgeBackgroudColor({color:[250,0,0,1]});
} ; 
function resetBadge(){
		chrome.browserAction.setBadgeText('');
}; 
chrome.browserAction.onClicked.addListener(function(currentTab){
	var win = window ;
	// get all opend tabs 
	var windowId = currentTab.windowId;
	if (state === 'visible') {
		hiddenTabs = [];
		ids =[];
		chrome.tabs.getAllInWindow(windowId,function(tabs){
		//for (var i = 0; i >= tabs.length; i++) {
		//	hiddenTabs.push(tabs[i]);
		//}
		ids = tabs.map(function(t){
			hiddenTabs.push({index:t.index,url:t.url});
			return t.id ; 
		});
		// create a temorary tab
	    chrome.tabs.create({url:"chrome://newtab"},function(tab){
      tmpId = tab.id;
	        });
	//delete all open tabs 
      chrome.tabs.remove(ids); 

      state = 'hidden';
       setBadgeText(hiddenTabs.length());


	});

	}else{
		// display the hidden tab 
		hiddenTabs.map(function(tab){
			chrome.tabs.create(tab) ;
		}) ; 
		// remove the temporary TAb 
		chrome.tabs.remove(tmpId);
		state ='visible'; 
	resetBadge();

		
	}
	

});