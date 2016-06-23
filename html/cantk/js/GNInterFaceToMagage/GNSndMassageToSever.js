//功能：将消息组包向服务器发送消息
//参数1：用户ID
//参数2：聊天类型（群聊还是单聊）
//参数3：消息类型（语音还是文本）
//参数2：消息文本（文本为字符，语音为URL）
//参数3：组ID（可以传可以不传，群聊时必须传）
//返回值：转换成utf16的二进制字符数组


function GNSendDataSet(){

}

	GNSendDataSet.prototype.m_pSendFun = [];
	GNSendDataSet.prototype.m_pGNSendDataSet = null; 
	//功能：创建单例对象
	//返回值：对象指针
	GNSendDataSet.create = function(){
		if (GNSendDataSet.m_pGNSendDataSet == null) {
			GNSendDataSet.m_pGNSendDataSet = new GNSendDataSet();	
		}
		return GNSendDataSet.m_pGNSendDataSet;
	}






	//将需要发送的两个数据组成一个数字
	GNSendDataSet.prototype.organizeData = function(Data1,data2,dataSize,front,back){
		var bCombBuffer = UIntToUIntBuffer(Data1,front);
		var bCombBuffer1 = UIntToUIntBuffer(data2,back);
		for (var i = front; i < front+back; i++) {
			bCombBuffer[i] = bCombBuffer1[i-front];
		};
		var iBuffer = UIntBufferToUInt(bCombBuffer);
		return iBuffer;
	}


	//通用发送数据,参数列表：协议号，后面是自己要发送的数据，按照参数列表的顺序传参
	GNSendDataSet.prototype.sendMessageToSever = function(iProtocolNum){
		
		var iLen = arguments.length;
		GNSendData[iProtocolNum] = {paramList:[[]]};
		for (var i = 1; i < arguments.length; i++) {
			GNSendData[iProtocolNum].paramList[0][i-1] = arguments[i];
		};
		this.massageToSever(iProtocolNum);
	}





//功能：向服务器发送消息
//参数1：协议号
//参数1：需要发送的数据
//返回值：转换成utf16的二进制字符数组
	GNSendDataSet.prototype.massageToSever = function(iProtocolNum,sendData){
		
		var pGNSendData = GNSendDataObject.create();
		var packLength = pGNSendData.combinationTheSendBuffer1(iProtocolNum);
		
		var pWebSocket = GNWebSocketCilent.create();
		//pWebSocket.
		if(sendData == undefined)
		{
			pWebSocket.sendMessage(pGNSendData.getSendDataArray(),packLength);
		}else{
			pWebSocket.sendMessage(sendData,packLength);
		}		
	}













	// GNSendDataSet.prototype.chatRecod = function(iProtocolNum,userID,chatType,ToUserID,recordType,recordText){
	// 	if (userID !=null&&userID != undefined) {
	// 		this.m_pSendFun[iProtocolNum] = this.chatRecod;
	// 		GNSendData[iProtocolNum] = {paramList:[[userID,chatType,ToUserID,recordType,recordText]]};
	// 		this.massageToSever(iProtocolNum);
	// 	}else
	// 	{
	// 		return null;
	// 	}
	// }
	GNSendDataSet.prototype.getChatRecod = function(iProtocolNum,userID,chatType,ToUserID,recordType,recordText){
		if (userID !=null&&userID != undefined) {
			this.m_pSendFun[iProtocolNum] = this.getChatRecod;
			GNSendData[iProtocolNum] = {paramList:[[userID,chatType,ToUserID,recordType,recordText]]};
			this.massageToSever(iProtocolNum);
		}else
		{
			return null;
		}
	}
	// 发送一条聊天信息
	// 参数列表： 
	//协议号 CSSendChatRecord

// GN_DEFINE_PROTOCOL( CSSendChatRecord,                                  // 发送一条聊天信息
//                                                                          // 参数列表：  
//   	GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(
//           GNParamType::UINT32,     // 用户id
//           GNParamType::UINT8,      // 聊天类型   聊天类型详见  GNRelationshipEnum
//           GNParamType::UINT32,     // 若聊天类型为单聊则此参数为用户id，若聊天类型为群聊则此参数为组id
//           GNParamType::UINT8,      // 记录类型   详见  GNChatRecordType
//           GNParamType::UINT8_ARRAY      // 记录文本
//  ))
	GNSendDataSet.prototype.setChatRecod = function(iProtocolNum,userID,chatType,ToUserID,recordType,recordText){
		if (userID !=null&&userID != undefined) {
			this.m_pSendFun[iProtocolNum] = this.setChatRecod;

			GNSendData[iProtocolNum] = {paramList:[[userID,chatType,ToUserID,recordType,recordText]]};
			this.massageToSever(iProtocolNum);
		}else
		{
			return null;
		}
	}
	// 用户上线
	// 参数列表：
	// 版本号
	// 用户名
	// 密码
// GN_DEFINE_PROTOCOL_VALUE(CSUserOnline,50,                                  // 用户上线
//                                                                           // 参数列表：  
//         GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(
//         GNParamType::UINT16,                                                // 版本号
//         GNParamType::STRING,                                                // 用户名
//         GNParamType::STRING                                                 // 密码
//         ))
	GNSendDataSet.prototype.userOnline = function(iProtocolNum,versionNum,userName,userPassWord){
		//console.log(versionNum);
		if (userName!=undefined &&userPassWord!=undefined&&versionNum!=undefined) {
			//this.m_pSendFun[iProtocolNum] = this.userOnline;
			this.sendMessageToSever(iProtocolNum,versionNum,userName,userPassWord);
			//GNSendData[iProtocolNum] = {paramList:[[versionNum,userName,userPassWord]]};
			//this.massageToSever(iProtocolNum);
		}else
		{
			return null;
		}
	}


// GN_DEFINE_PROTOCOL( 
//                         CSGetChatRecord,                                  // 获取某个聊天记录
//                                                                         // 参数列表：  
//         GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(
//                                                 GNParamType::UINT32,     // 用户id
//                                                 GNParamType::UINT8,      // 聊天类型    详见  GNRelationshipEnum
//                                                 GNParamType::UINT32,     // 若聊天类型为单聊则此参数为用户id，若聊天类型为群聊则此参数为组id
//                                                 GNParamType::UINT32      // 前3个字节表示本地最后一条聊天记录下标（若为0则表示获取最新记录），

// 后1个字节表示最多获取多少条聊天记录
//         ))
	//获取用户聊天记录（）参数5：代表要获取的消息的下标数，0默认最新消息，0默认最新5条消息，最大5条消息，
	GNSendDataSet.prototype.getUserOldChatRecord = function(iProtocolNum,chatType,ToUserID,lastRecordIndex,maxRecodeCount){
		//console.log(userID);
		if (ToUserID!=undefined) {
			this.m_pSendFun[iProtocolNum] = this.getUserOldChatRecord;
			var bCombBuffer = UIntToUIntBuffer(lastRecordIndex,3);
			var bCombBuffer1 = UIntToUIntBuffer(maxRecodeCount,1);
			for (var i = 3; i < 4; i++) {
				bCombBuffer[i] = bCombBuffer1[0];
			};
			var iBuffer = UIntBufferToUInt(bCombBuffer);
			GNSendData[iProtocolNum] = {paramList:[[chatType,ToUserID,iBuffer]]};
			this.massageToSever(iProtocolNum);
		}else
		{
			return null;
		}
	}


	//paramList:[[GNParamType.UINT32,GNParamType.UINT64]
	// 获取用户历史聊天列表信息
	//参数1：协议号 100
	// 用户id   
	// 前6个字节：用户本地最旧一条聊天消息时间戳  后2个字节：最多获取条数
// GN_DEFINE_PROTOCOL_VALUE(CSGetUserOldChatListInfo ,100,                   // 获取用户历史聊天列表信息
//                                                                          // 参数列表：  
//         GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(
//                                                 GNParamType::UINT32,     // 用户id                        
//                                                 GNParamType::UINT64      // 前6个字节：用户本地最旧一条聊天消息时间戳  后2个字节：最多获取条数
//         ))
	GNSendDataSet.prototype.getUserOldChatListInfo = function(iProtocolNum,lastTime,messageCount){
		this.m_pSendFun[iProtocolNum] = this.GetUserOldChatListInfo;
		var bCombBuffer = UIntToUIntBuffer(lastTime,6);
		var bCombBuffer1 = UIntToUIntBuffer(messageCount,2);
		for (var i = 6; i < 8; i++) {
			bCombBuffer[i] = bCombBuffer1[i-6];
		};
		var iBuffer = UIntBufferToUInt(bCombBuffer);

		GNSendData[iProtocolNum] = {paramList:[[iBuffer]]};
		this.massageToSever(iProtocolNum);
	}

	//标记一条聊天记录为已读信息
	// 参数列表： 
	//协议号  108
// GN_DEFINE_PROTOCOL( 
//     CSSendMarkChatRecord,                              // 发送一条标记聊天记录已读信息
//                                                                          // 参数列表：  
//         GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(
//                GNParamType::UINT32,     // 用户id
//                GNParamType::UINT32,     // 前3个字节表示本地已读最后一个聊天记录下标，后1个字节表示聊天类型   

// 聊天类型详见  GNRelationshipEnum
//                GNParamType::UINT32      // 若聊天类型为单聊则此参数为用户id，若聊天类型为群聊则此参数为组id   
               
//         ))
	GNSendDataSet.prototype.markMessageIsRead = function(iProtocolNum){
		// GNSendData[iProtocolNum] = {paramList:[[userID,iBuffer]]};
		// this.massageToSever(iProtocolNum);
	}

