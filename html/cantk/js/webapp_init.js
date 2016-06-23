var gApp = null;

var userLoadApp = function(deviceData) {
	return false;
}
var x=50;var y=40;
function onDeviceReady()
{
	var loading = document.getElementById("loading");
	if(loading) {
		loading.style.display = "none";
	}

	cantkInitViewPort();
	window.setTimeout(function(){	
		if(!gApp)
		{
			var uiData = guiData ? guiData : gDeviceData;

			if(!userLoadApp(uiData)) {
				if(!uiData) {
					console.log("invalid uidata.");
					return;
				}
				
				if(CanTK.isMobile() || location.href.indexOf("action=run") > 0) {
					if(uiData.type === "ui-device") {
						gApp = webappRunWithDeviceData(uiData);
					}
					else {
						gApp = webappRunWithData(uiData);
					}
				}
				else {
					if(uiData.type === "ui-device") {
						gApp = webappPreviewWithDeviceData(uiData);
					}
					else {
						gApp = webappPreviewWithData(uiData);
					}
				}
			}
			var GNApp = GNAppManager.create();
			GNApp.init();
			// var  aa = new GNInterFace();
			// aa.init();
			// var p = new GNLogon();
			// p.init();
			//gApp.view.getScreen().find("GNMyLabel",true).setVisible(false);

		}
	}, 50);

	return;
};

CantkRT.init(onDeviceReady);
			
