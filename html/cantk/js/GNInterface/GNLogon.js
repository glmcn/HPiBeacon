

function GNLogon(){
}	
	GNLogon.prototype.m_pGNLogon = null;

	GNLogon.prototype.m_pMyLogonButton = null	//登录

	GNLogon.prototype.init = function(){
		var myThis = this;
		this.m_pMyLogonButton = gApp.view.getWindowManager().find("logonButton",true);	
		
		// 设置服务器向客户端回消息的回调函数，服务器向客户端发送消息的时候需要知道调用的是哪个函数
		{	//因为这是回调的函数在GNReciveCallBackArray类中，所以调用函数时需要先获得GNReciveCallBackArray的对象
			var pReciveCallBack = GNReciveCallBackArray.create();
			//功能：设置服务器发送数据的回调函数
			//参数1：协议号，
			//参数2：需要调用的函数
			//该函数的参数为一个数组msg[0]是总共的包长，msg[1]是协议号，后面的就按照你的协议来定，
			//GNProtocolData[GNProtocolNo.SCDebugInfo] = { paramList:[[GNParamType.STRING]], handler:null };
			//比如SCDebugInfo：自己的第一个string数据为：msg[2][0],
			pReciveCallBack.setYouReciveCallBack(GNProtocolNo.SCDebugInfo,this.debugInfo);
		}
	
		//发送数据
		this.m_pMyLogonButton.onClick = function(point,beforeChild){
			if(beforeChild == true){
				var pSendDataSet = GNSendDataSet.create();
				//向服务器发送数据
				//参数1：协议号
				//后面的参数必须按照自己的协议来定，不然发送出去的数据解包，封包时会出错，如果自己的协议中有些参数是由两个数据组成，
				//比如: GNParamType::UINT64      // 前6个字节：用户本地最旧一条聊天消息时间戳  后2个字节：最多获取条数
				//先调用GNSendDataSet类中的GNSendDataSet.prototype.organizeData = function(Data1,data2,dataSize,front,back)函数;
				//将该参数事先组合好，再发送，
				pSendDataSet.sendMessageToSever(GNProtocolNo.CSSendLogin,
					GNVersionNo,imageId,imageName,userName,passWord);
			}
		}
	}
	

	GNLogon.prototype.debugInfo = function(messge){
		var p = GNLogon.create();

	}

	GNLogon.create = function(){
		if(this.m_pGNLogon == null)
		{
			this.m_pGNLogon = new GNLogon();
			this.m_pGNLogon.init();
		}
		return this.m_pGNLogon;
	}