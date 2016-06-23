var userID = userID = Math.floor(Math.random() * 100) + 1;
var ibeaconManager;


function initIbeacon() {
	ibeaconManager = GNNewIbeacon.getIbeaconManager();
	dialog("init");
	if (ibeaconManager != null) {
		dialog("搜索iBeacon...");
		
		ibeaconManager.onLeScan = function (beacons) 
		{
				dialog("find:"+ beacons.major);
				var pSendDataSet = GNSendDataSet.create();

				pSendDataSet.sendMessageToSever(998,
												beacons.major, beacons.time.sec, beacons.time.nsec );
		}
		ibeaconManager.setScanEnable(true);
		
	}
	else {
		//dialog("fail get beacons");
		dialog("您可能没有下载app或者没有打开蓝牙");
	}
	if(ibeaconManager){
		setInterval(function () {
		ibeaconManager.setScanEnable(false);
		ibeaconManager.setScanEnable(true);},5000);
	}
}


function testM() {
	GNTestLogon(); 
	setTimeout("initIbeacon()",1500);

}
