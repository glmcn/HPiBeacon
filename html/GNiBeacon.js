	function GNJSNIObj()
	{

	}

	GNJSNIObj.prototype.mId = -1;

	GNJSNIObj.prototype.init = function(className) {
		
		var ret = 1;

		try
		{
			do
			{
				var strObj = GNJSNI.createObject(className);

				var obj = JSON.parse(strObj);

				if(!obj.ret)
				{
					console.log("GNJSNIObj createObject error : " + obj.msg);
					break;
				}

				this.mId = obj.id;

				ret = 0;
			}
			while(false);
		}
		catch(e)
		{
			console.log("GNJSNIObj createObject Exception: " + e.message);
		}
		
		return ret;
	}

	GNJSNIObj.prototype.callMethod = function(funName) {

		var ret = {};
		ret.ret = false;

		try
		{
			do
			{
				if(-1 == this.mId)
				{
					console.log("GNJSNIObj callMethod error : not init obj");
					break;
				}

				var args = "";
				for(var i = 1; i < arguments.length; i++)
				{
					args += "," + arguments[i];
				}

				var strRet = GNJSNI.callMethod("" + this.mId + "," + funName + "" + args);
				var retObj = JSON.parse(strRet);

				if(!retObj.ret)
				{
					console.log("GNJSNIObj callMethod error : " + retObj.msg);
					break;
				}

				ret = retObj;
			}
			while(false);
		}
		catch(e)
		{
			console.log("GNJSNIObj callMethod Exception: " + e.message);
		}
		
		return ret;
	}

	GNJSNIObj.prototype.destroy = function() {

		var ret = 1;

		try
		{
			do
			{
				if(-1 == this.mId)
				{
					console.log("GNJSNIObj destroy error : not init obj");
					break;
				}

				var strObj = GNJSNI.deleteObject("" + this.mId);

				var obj = JSON.parse(strObj);

				if(!obj.ret)
				{
					console.log("GNJSNIObj destroy error : " + obj.msg);
					break;
				}

				this.mId = -1;

				ret = 0;
			}
			while(false);
		}
		catch(e)
		{
			console.log("GNJSNIObj destroy Exception: " + e.message);
		}
		
		return ret;
	}


	/*
		本地实现的Ibeacon功能类

		使用示例：
				// 获取ibeaconManager对象
				var ibeaconManager = GNIbeacon.getIbeaconManager();
				if(ibeaconManager)
				{
					// 设置iBeacon变更信息回调函数
					ibeaconManager.onBeaconsDiscovered = function(beacons) {
						// 在此接收beacons数据

						// beacons :  装有多个ibeacon信息的js数组
									  [
									  	// 第一ibeacon信息对象
										{
											// ibeacon的每个信息请具体查阅相关文档
											name:,                  
											major:,
											minor:,
											ProximityUUID:,
											macAddress:,
											distance:,
											proximity:,
											measuredPower:,
											power:,
											rssi:,
											describeContents:,
										}，
										// 第二ibeacon信息对象
										...
									  ]
					}
					
					// 开启测距功能
					ibeaconManager.setRangingEnable(true);
				}
				else
				{
					// 获取ibeaconManager对象失败，详情请查看控制台输出错误提示信息
				}

	*/
	function GNIbeacon()
	{

	}

	GNIbeacon.prototype = new GNJSNIObj();

	/*
		@ 设置是否打开测距
		@ param enable {boolean}  true：表示打开 false：表示关闭
		@ return  {ret:true}
	*/
	GNIbeacon.prototype.setRangingEnable = function(enable) {
		return this.callMethod("setRangingEnable","" + enable);
	}

	/*
		@ 设置测距搜索间隔时间
		@ param time  {number} 时间
		@ return  {ret:true}
	*/
	GNIbeacon.prototype.setRangingExpirationMill = function(time) {
		return this.callMethod("setRangingExpirationMill","" + time);
	}

	GNIbeacon.prototype.mIbeaconManager = null;


	/*
		@ 获取Ibeacon管理对象
		@ return  {GNIbeacon}    Ibeacon管理对象
	*/
	GNIbeacon.getIbeaconManager = function() {	
		if(null == this.mIbeaconManager){

			this.mIbeaconManager = new GNIbeacon();
			if(!(this.mIbeaconManager != null && 0 == this.mIbeaconManager.init("JsIbeacon")))
			{
				this.mIbeaconManager = null;
			}
		}

		return this.mIbeaconManager;
	}

	function GNJSNIOnBeaconsDiscovered(id,strBeacons)
	{
		try
		{
			console.log("GNJSNIOnBeaconsDiscovered:" + strBeacons);
			var beacons = JSON.parse(strBeacons);

			// call back user fun
			var ibeaconManager = GNIbeacon.getIbeaconManager();
			if(ibeaconManager.onBeaconsDiscovered)
			{
				ibeaconManager.onBeaconsDiscovered(beacons);
			}
		}
		catch(e)
		{
			console.log("GNJSNIOnBeaconsDiscovered Exception:" + e.message);
		}
	}




	function GNNewIbeacon()
	{

	}

	GNNewIbeacon.prototype = new GNJSNIObj();

	GNNewIbeacon.getIbeaconManager = function() {	
		if(!this.mIbeaconManager){

			this.mIbeaconManager = new GNNewIbeacon();
			if(!(this.mIbeaconManager != null && 0 == this.mIbeaconManager.init("JsNewIbeacon")))
			{
				this.mIbeaconManager = null;
			}
		}

		return this.mIbeaconManager;
	}

	/*
		@ 设置设置扫描开启或关闭
		@ param time  {enable} 是否开启
		@ return  {ret:true}
	*/
	GNNewIbeacon.prototype.setScanEnable = function(enable) {
		return this.callMethod("setScanEnable","" + enable);
	}


	/*
		事例：
			var ibeaconManager = GNNewIbeacon.getIbeaconManager();
			if(ibeaconManager != null) {
				ibeaconManager.onLeScan = function(data) {
					  
					  data {
							rssi：
							uuid：
							major：
							minor：
							power：
							time：{
								sec：		// 1970年1月1日开始了多少秒
								nsec：		// 纳秒
							}
					  }
								
					  
				}
			}
	*/
	function GNJSNIOnLeScans(id,strBeacons)
	{
		try
		{
			console.log("GNOnLeScan:" + strBeacons);
			var beacons = JSON.parse(strBeacons);

			// call back user fun
			var ibeaconManager = GNNewIbeacon.getIbeaconManager();
			if(ibeaconManager.onLeScan)
			{
				ibeaconManager.onLeScan(beacons);
			}
		}
		catch(e)
		{
			console.log("GNOnLeScan Exception:" + e.message);
		}
	}