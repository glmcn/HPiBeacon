
//功能：设置接收函数的回调函数，接收后自动分发到 协议号所对对应的地方，
//参数1：需要验证的字符串
//参数1：需要验证的字符串
//返回值：转换成utf16的二进制字符数组



//pGNSendDataObject.combinationTheSendBuffer1(GNProtocolNo.UserOnline);
var pGNSendDataObject = null;
var pGNReciveDataObject = null;
//var  reciveDataReadCount = 0; // 记录需要读取的字符串读取到什么地方了
var reciveDataObject = [] ;	  //接收数据
var reciveObjectI = 0;		  //接收数据I值
var reciveObjectJ = 0;		  // 接收数据j值



function GNReciveDataObject(){
}
	GNReciveDataObject.prototype.m_pGNReciveDataObject = null;
	GNReciveDataObject.prototype.m_pReciveDataReadCount = 0;
	GNReciveDataObject.prototype.m_pReciveDataObject = [];

	GNReciveDataObject.prototype.m_pReciveObjectI = 0;
	GNReciveDataObject.prototype.m_pReciveObjectJ = 0;
	GNReciveDataObject.prototype.m_pReciveObjectK = 0;
	GNReciveDataObject.prototype.m_pReciveObjectL = 0;
	GNReciveDataObject.prototype.m_pReciveObjectM = 0;
	GNReciveDataObject.prototype.m_iOrder = 0;
	GNReciveDataObject.prototype.paramLenght = 0;

	GNReciveDataObject.create = function(){
		if(this.m_pGNReciveDataObject == null)
		{
			this.m_pGNReciveDataObject = new GNReciveDataObject();

		}
		pGNReciveDataObject = this.m_pGNReciveDataObject;
		return this.m_pGNReciveDataObject;
	}
	GNReciveDataObject.init = function(){

	}

	GNReciveDataObject.prototype.getPackageLength = function(youReciveData){
		var  iOrder = UIntBufferToUInt(youReciveData,this.m_pReciveDataReadCount,this.m_pReciveDataReadCount+DataForDifferentType.PACKAGELENGTH);
		this.m_pReciveDataReadCount += DataForDifferentType.PACKAGELENGTH;
		this.m_pReciveDataObject[0] = iOrder;
		return iOrder;
	}
	GNReciveDataObject.prototype.getIProtocol = function(){
		return this.m_iOrder;
	}
	GNReciveDataObject.prototype.getReciveData = function(){
		return this.m_pReciveDataObject;
	}
	GNReciveDataObject.prototype.getIOrder=function (youReciveData){
		var  iOrder = UIntBufferToUInt(youReciveData,this.m_pReciveDataReadCount,this.m_pReciveDataReadCount+DataForDifferentType.IORDERSLENGTH);
		this.m_pReciveDataReadCount += DataForDifferentType.IORDERSLENGTH;
		this.m_pReciveDataObject[1] = iOrder;
		this.m_iOrder = iOrder;
		return iOrder;
	}


	//功能：检测参数类型是否正确
	//参数1：需要验证的字符串
	//参数2：
	//返回值：转换成utf16的二进制字符数组
	GNReciveDataObject.prototype.checkTheReciveBuffer=function  (youReciveData1){
		console.log("成都1"+youReciveData1.size);

		this.m_pReciveDataReadCount = 0;
		var youReciveData = new Uint8Array(youReciveData1);

		console.log("www"+youReciveData[0])
		var dataLength = this.getPackageLength(youReciveData);
		
		var iOrder = this.getIOrder(youReciveData);
		//if(youReciveData != undefined)
		//{
			var paramList = getGNProtocolData()[iOrder].paramList;
			
			var iPackTemp = DataForDifferentType.IORDERSLENGTH+DataForDifferentType.PACKAGELENGTH;
			//var iDataLength = judgeParameter(dataLength,this.m_pReciveObjectI <paramList.length);
			for (this.m_pReciveObjectI = 0;this.m_pReciveObjectI <paramList.length ; this.m_pReciveObjectI++) {
				this.m_pReciveDataObject[this.m_pReciveObjectI+2] = [];
				if(dataLength!=undefined)
				{
					if(dataLength != this.m_pReciveDataReadCount-iPackTemp)
					{
						for (this.m_pReciveObjectJ = 0; this.m_pReciveObjectJ < paramList[this.m_pReciveObjectI].length; this.m_pReciveObjectJ++) {
							//参数列表中的类型检测
							console.log("我的名字为："+GNParamTypeLength[paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ]]);
							console.log("我的名字为："+Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-1));
							//if(paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ].length==undefined){
								checkOne(DataForDifferentType.ISRECIVEDATA,paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ],DataForDifferentType.ONE,youReciveData);
							//}
							// else{
							// 	checkOne(DataForDifferentType.ISRECIVEDATA,paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ][this.m_pReciveObjectK],DataForDifferentType.ONE,youReciveData);
							// 	//m_pReciveObjectK++;
							//}
							//reciveDataReadCount++;

							console.log("diyi:"+this.m_pReciveDataObject[this.m_pReciveObjectI+2][this.m_pReciveObjectJ]);
	
						};
					}else{
						this.m_pReciveDataReadCount = DataForDifferentType.IORDERSLENGTH;
					}
				}//正式使用时不需要
				else{
					for (this.m_pReciveObjectJ = 0; this.m_pReciveObjectJ < paramList[this.m_pReciveObjectI].length; this.m_pReciveObjectJ++) {
						//参数列表中的类型检测
						console.log("我的名字为："+GNParamTypeLength[paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ]]);
						console.log("我的名字为："+Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-1));
					
						checkOne(DataForDifferentType.ISRECIVEDATA,paramList[this.m_pReciveObjectI][this.m_pReciveObjectJ],DataForDifferentType.ONE,youReciveData);
						//reciveDataReadCount++;
						console.log("diyi:"+this.m_pReciveDataObject[this.m_pReciveObjectI+2][this.m_pReciveObjectJ]);
		
					};				
				}

			};
			getGNProtocolData()[iOrder].paramList.handler = this.m_pReciveDataObject;
			
			if(this.m_pReciveDataReadCount == DataForDifferentType.IORDERSLENGTH)
			{
				return "参数不匹配"
			}

			
		//}else
		//{
		//	return undefined;
		//}
	}

//GNSendDataObject.create();
function  GNSendDataObject() {
}

	GNSendDataObject.prototype.m_pGNSendDataObject = null;
	////发送数据数组
	GNSendDataObject.prototype.m_psendDataObject = null;
	//接收数据I值
	GNSendDataObject.prototype.m_isendObjectI = 0;
	// 接收数据j值
	GNSendDataObject.prototype.m_isendObjectJ = 0;
	GNSendDataObject.prototype.m_isendObjectK = 0;
	GNSendDataObject.prototype.m_iOrder = 0;
	GNSendDataObject.prototype.m_iSendDataCount = 0;
	GNSendDataObject.prototype.m_iParamLenght = 0;
	GNSendDataObject.create = function(bufferSize)
	{
		if(this.m_pGNSendDataObject ==null)
		{
			this.m_pGNSendDataObject = new GNSendDataObject();
			this.m_pGNSendDataObject.init(bufferSize);

		}
		pGNSendDataObject = this.m_pGNSendDataObject;
		return this.m_pGNSendDataObject;
	}
	GNSendDataObject.prototype.getIProtocol = function(){
		return this.m_iOrder;
	}
	GNSendDataObject.prototype.getSendDataArray = function(){
		return this.m_psendDataObject;
	}

	GNSendDataObject.prototype.init= function(bufferSize){
		//if(bufferSize)
		var dataArray = new ArrayBuffer(judgeParameter(bufferSize,1024));
		this.m_psendDataObject = new Uint8Array(dataArray);
	}

	GNSendDataObject.prototype.pushSendDataObject= function(iData,iTypeSize,funName){
		console.log("currentData = "+ iData);
		var pTemp = funName(iData,iTypeSize);
		var iTe = this.m_iSendDataCount;
		for (var i = iTe; i < iTe+iTypeSize; i++) {
			this.m_psendDataObject[i] = pTemp[i-iTe];
			this.m_iSendDataCount++;
		};
	}
	
	GNSendDataObject.prototype.getPackageLength = function(paramList,youSendArray){
		for(this.m_isendObjectI = 0; this.m_isendObjectI < paramList.length; this.m_isendObjectI++)
		{
			for (this.m_isendObjectJ = 0; this.m_isendObjectJ < paramList[this.m_isendObjectI].length; this.m_isendObjectJ++)
			{
				checkOne(DataForDifferentType.ISRECORDPARALENGTH,paramList[this.m_isendObjectI][this.m_isendObjectJ],DataForDifferentType.ONE,youSendArray);	
			}			
		}

		return  this.m_iParamLenght;
	}

	//功能：检测接收字符串中的每一个数据是否正确
	//参数1：需要验证的字符串
	//参数1：需要验证的字符串
	//返回值：转换成utf16的二进制字符数组	
	GNSendDataObject.prototype.combinationTheSendBuffer1 = function(iOrder)
	{
		this.m_iOrder = iOrder;
		//this.m_iSendDataCount 
		this.m_iSendDataCount = 0;
		this.m_iParamLenght = 0;
		if(iOrder!=undefined){
			var  youSendArray = getGNSendData()[iOrder].paramList;

			paramList = getGNProtocolData()[iOrder].paramList;
			var packageLength = this.getPackageLength(paramList,youSendArray)+DataForDifferentType.IORDERSLENGTH; 
			this.m_iSendDataCount = 0;
			this.m_iParamLenght = 0;
			for (var i = 0; i < pGNSendDataObject.m_psendDataObject.length; i++) {
				pGNSendDataObject.m_psendDataObject[i] = 0;
			};
			//pGNSendDataObject.m_psendDataObject

			//var iTe = UIntToUIntBuffer(packageLength,DataForDifferentType.PACKAGELENGTH);
			
	    	console.log("1 the packge length = "+packageLength);
			this.pushSendDataObject(packageLength,DataForDifferentType.PACKAGELENGTH,UIntToUIntBuffer);
			console.log("2 the iOrder  Count = " + iOrder);
			this.pushSendDataObject(iOrder,DataForDifferentType.IORDERSLENGTH,UIntToUIntBuffer);

			
			//var iOrder = getIOrder(youReciveData);
		
	 	
		
			
			//var sendDataParamList = ;
			for (this.m_isendObjectI = 0; this.m_isendObjectI  <paramList.length; this.m_isendObjectI++) {
				//reciveDataObject[sendObjectI+1] = [];
				for (this.m_isendObjectJ = 0; this.m_isendObjectJ < paramList[this.m_isendObjectI].length; this.m_isendObjectJ++) {
					//参数列表中的类型检测
					console.log("我的名字为："+GNParamTypeLength[paramList[this.m_isendObjectI ][this.m_isendObjectJ]]);
					console.log("我的名字为："+Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-1));
					//if(paramList[this.this.m_isendObjectI ][this.m_isendObjectJ].length==undefined){
						checkOne(DataForDifferentType.ISSENDDATA,paramList[this.m_isendObjectI][this.m_isendObjectJ],DataForDifferentType.ONE,youSendArray);
					// }else{
					// 	checkOne(DataForDifferentType.ISSENDDATA,GNParamTypeLength[paramList[this.m_isendObjectI ][this.m_isendObjectJ]][this.m_isendObjectK],DataForDifferentType.ONE,youSendArray);
					// }
					//reciveDataReadCount++;
					//console.log("diyi:"+reciveDataObject[sendObjectI+1][sendObjectJ]);
	
				};
			};
			getGNSendData()[iOrder].paramList.handler = pGNSendDataObject.m_psendDataObject; 
			return packageLength+DataForDifferentType.PACKAGELENGTH;
		}else
		{
			return undefined;
		}
	}
// var pGNSendDataObject = GNSendDataObject.create();
// GNSendData[100] = {paramList:[[3896,8360372232565966108]]};
// pGNSendDataObject.combinationTheSendBuffer1(100);



// var dataArray = new ArrayBuffer(1024);
// var sendDataObject=			//发送数据数组
// var sendDataReadCount = 0;
// var sendObjectI = 0;		  //接收数据I值
// var sendObjectJ = 0;		  // 接收数据j值

// 	var a = 12;
// var myDataArray = new ArrayBuffer(a);
// var a22=new Uint8Array(myDataArray);
// a22[0] = 14;
// a22[1] = GNProtocolNo.CSGetUserOldChatListInfo;
// a22[2] = 0;
// a22[3] = 1;
// a22[4] = 0;
// a22[5] = 0; 
// a22[6] = 0;
// a22[7] = 0;
// a22[8] = 0;
// a22[9] = 0;	
// a22[10] =0;
// a22[11] = 0;
// a22[9] = 0;	
// a22[10] =20;
// a22[11] = 0;

// // var aaaa = UTF16ToUTF8("你");
// // console.log("nidfg"+aaaa);
//  var appp= GNReciveDataObject.create();
//  appp.checkTheReciveBuffer(a22);

//uint类型
//功能：uint数组类型转换成为UINT变量（无符号）
//参数1：需要转换的数组
//参数2：结束位置 可以传可以不传，不传默认到数组结束
//参数3：初始位置  可以传可以不传，不传默认从0开始 ,如果第二个参数没有不需要传入时需要用undefiend代替
//返回值：uint变量  
function  UIntBufferToUInt(youReciveData,began,end)
{
	if(youReciveData != undefined)
	{
		var returnValue=0;
		var  iEnd= judgeParameter(end,youReciveData.length);
		var iBegan = judgeParameter(began,0);
		var iTypeSize = iEnd - iBegan;
		for (var i = iBegan; i < iEnd; i++) {
			var ii = iEnd-1-(i-iBegan);
			returnValue = returnValue + Math.floor(youReciveData[ii]*Math.pow(16,(iTypeSize-1-(i-iBegan))*2)) ;
		};
		return  returnValue;

	}else
	{
		return undefined;
	}
}

//功能：int数组类型转换成为INT变量（有符号）
//参数1：需要转换的数组
//参数2：结束位置 可以传可以不传，不传默认到数组结束
//参数3：初始位置  可以传可以不传，不传默认从0开始,如果第二个参数没有不需要传入时需要用undefiend代替
//返回值：uint变量  
function  IntBufferToInt(youReciveData,began,end)
{
	if(youReciveData != undefined)
	{

		var returnValue=0;
		var iEnd = judgeParameter(end,youReciveData.length);
		var iBegan = judgeParameter(began,0);
		var iTypeSize = iEnd - iBegan; 
		var iF = Math.floor(youReciveData[iEnd-1]/128)*(youReciveData[iEnd-1]-256);
		var iZ = (Math.floor(youReciveData[iEnd-1]/128)^1)*youReciveData[iEnd-1];
		returnValue = (iF+iZ)*Math.pow(16,(iTypeSize-1)*2);
		//returnValue += UIntBufferToUInt(youReciveData,iBegan+1,iEnd)
		for (var i = iBegan; i < iEnd-1; i++) {

			returnValue = returnValue + youReciveData[iTypeSize-1-(i-iBegan)]*Math.pow(16,(iTypeSize-2-(i-iBegan))*2);
		};
		return  returnValue;
	}else{
		return undefined;
	}
	
}


//uint类型
//功能：uint变量类型转换成为UINT数组（无符号）
//参数1：需要转换的变量
//参数2：结束位置 可以传可以不传，不传默认到数组结束
//参数3：初始位置  可以传可以不传，不传默认从0开始 ,如果第二个参数没有不需要传入时需要用undefiend代替
//返回值：uint变量  
function  UIntToUIntBuffer(youSendData,UIntSize)
{
	if(youSendData != undefined)
	{

		var returnValue=[];

		for (var i = 0; i < UIntSize; i++) {
			//为了得到其中的每个字节的数据
			var it = (255*Math.floor(Math.pow(16,(UIntSize-1-i)*2)));
			var ir = 0;
			var iIndex = 0;
			if(UIntSize==8&&UIntSize-1-i>=4){
				var yTemp = parseInt(youSendData/Math.floor(Math.pow(16,8))) ;
				var iTemp = parseInt(it/Math.floor(Math.pow(16,8)));
				ir = yTemp&iTemp;
				iIndex = (UIntSize-1-i)-4;
			}else{
				ir = youSendData&it;
				iIndex = (UIntSize-1-i);
			}
			returnValue[UIntSize-1-i] = ir>>iIndex*8;
		};
		return  returnValue;		
	}else
	{
		return undefined;
	}

}

//功能：int变量类型转换成为INT数组（有符号）
//参数1：需要转换的数组
//参数2：结束位置 可以传可以不传，不传默认到数组结束
//参数3：初始位置  可以传可以不传，不传默认从0开始,如果第二个参数没有不需要传入时需要用undefiend代替
//返回值：uint变量  
function  IntToIntBuffer(youSendData,UIntSize)
{
	if(youSendData != undefined)
	{

		var returnValue=[];
		var itt = youSendData&(255*Math.floor(Math.pow(16,(UIntSize-1)*2)));
		var ip = itt>>((UIntSize-1)*8);

		var iF = Math.floor(ip/128)*(ip-256);
		var iZ = (Math.floor(ip/128)^1)*ip;
		
		returnValue[0] = (iF+iZ)*Math.pow(16,(UIntSize-1)*2);
		for (var i = 1; i < UIntSize-1; i++) {
			//为了得到其中的每个字节的数据
			var it = (255*Math.floor(Math.pow(16,(UIntSize-2-i)*2)));
			var ir = youSendData&it;

			returnValue[UIntSize-2-i] = ir>>(UIntSize-2-i)*8;
		};
		return  returnValue;		
	}else
	{
		return undefined;
	}	
}

//IntToIntBuffer(-10788,2);



//共用4个十进制位代表不同类型     前四位固定作用，要添加新的功能只能在个位添加
//千位代表是普通类型还是复杂类型   0代表未定义  1代表普通类型（无长度）  2代表复杂类型（有长度）, 3代表object , ,4其他  
//百位代表   如果千位为1时没有任何意义为0   如果千位为2时：1代表普通数组  2代表字符     3 代表object数组
//十位代表   如果千位为1或者千位为2百位为1时  1代表有符号类型 2代表无符号类型    ，如果为其他的直接虑过
//个位代表 简单类型长度 ，复杂类型为0
function checkFour(paramListData,iSubData,youReciveData)
{
	var iSubDataTemp = judgeParameter(iSubData,DataForDifferentType.FOUR);
	var iFourTemp = Math.floor(paramListData%Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-3)/Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));
	return iFourTemp;
}

 	

function checkThree(isSendOrRecive,paramListData,iSubData,youReciveData,objectZ)
{
	// var iSubDataTemp = judgeParameter(iSubData,DataForDifferentType.THREE);
	// var iThreeTemp = Math.floor(paramListData%Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-2)/Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));
	// var iFourTemp = Math.floor(paramListData%Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubData));

	var iSubDataTemp = judgeParameter(iSubData,DataForDifferentType.THREE);
	var iThreeTemp = Math.floor(paramListData/Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));
	var iFourTemp = Math.floor(paramListData%Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));

	switch (iThreeTemp)
	{
		case DataForDifferentType.THREEUNKNOW:
			return undefined;
			break;
		case DataForDifferentType.THREEINT://有符号的
			if (Math.floor(isSendOrRecive/10) != DataForDifferentType.ISTHREEK)
				setObjectUInt(Math.floor(isSendOrRecive%10),youReciveData,iFourTemp,IntBufferToInt,IntToIntBuffer,objectZ);
			else
				setObjectUInt1(Math.floor(isSendOrRecive%10),youReciveData,iFourTemp,IntBufferToInt,IntToIntBuffer,objectZ);
			return  iFourTemp;
			break;
		case DataForDifferentType.THREEUINT:
			if (Math.floor(isSendOrRecive/10) != DataForDifferentType.ISTHREEK)
				setObjectUInt(Math.floor(isSendOrRecive%10),youReciveData,iFourTemp,UIntBufferToUInt,UIntToUIntBuffer,objectZ);
			else
				setObjectUInt1(Math.floor(isSendOrRecive%10),youReciveData,iFourTemp,UIntBufferToUInt,UIntToUIntBuffer,objectZ);
			
			return iFourTemp;
			break;
	}
}
//功能：设置接收对象
//参数1：接收的数据
//参数2：需要转换的大小,需要调用的转换int类型的函数
//参数2：数组的第3级对象
//返回值：转换成utf16的二进制字符数组
function setObjectUInt(isSendOrRecive,youReciveData,iFourTemp,funName1,funName2,objectZ)
{
	if (iFourTemp != undefined&&isSendOrRecive!=undefined) {
		if(isSendOrRecive == DataForDifferentType.ISRECIVEDATA)
		{
			if(objectZ != undefined)
			{
				pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][objectZ] = funName1(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
			}else
			{
				pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ] = funName1(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
			}
			pGNReciveDataObject.m_pReciveDataReadCount+=iFourTemp;
		}else 
		{
			if(isSendOrRecive == DataForDifferentType.ISSENDDATA)
			{
				if(objectZ != undefined)
				{
					console.log("3 the sendData is "+youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][objectZ]);
					pGNSendDataObject.pushSendDataObject(youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][objectZ],iFourTemp,funName2);
				}else
				{
					console.log("4 the sendData1 is "+youReciveData[pGNSendDataObject.m_isendObjectI]);
					console.log("4 the sendData is "+youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ]);
					pGNSendDataObject.pushSendDataObject(youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ],iFourTemp,funName2);
				}				
			}else
			{
				pGNSendDataObject.m_iParamLenght+=iFourTemp;
			}
			//.m_psendDataObject[pGNSendDataObject.m_iSendDataCount]
		}

	};
}

function setObjectUInt1(isSendOrRecive,youReciveData,iFourTemp,funName1,funName2,objectZ)
{
	if (iFourTemp != undefined&&isSendOrRecive!=undefined) {
		if(isSendOrRecive == DataForDifferentType.ISRECIVEDATA)
		{
			if(objectZ != undefined)
			{
				pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectK][pGNReciveDataObject.m_pReciveObjectL][objectZ] = funName1(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
				pGNReciveDataObject.m_pReciveObjectK++;
			}else
			{
				pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectK][pGNReciveDataObject.m_pReciveObjectL] = funName1(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
			}
			pGNReciveDataObject.m_pReciveDataReadCount+=iFourTemp;
			pGNReciveDataObject.m_pReciveObjectL++;
		}else 
		{
			if(isSendOrRecive == DataForDifferentType.ISSENDDATA)
			{
				if(objectZ != undefined)
				{
					pGNSendDataObject.m_isendObjectK++;
					pGNSendDataObject.pushSendDataObject(youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][pGNSendDataObject.m_isendObjectK][objectZ],iFourTemp,funName2);
				}else
				{
					pGNSendDataObject.pushSendDataObject(youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][pGNSendDataObject.m_isendObjectK],iFourTemp,funName2);
				}				
			}else
			{
				pGNSendDataObject.m_iParamLenght+=iFourTemp;
			}
			pGNSendDataObject.m_isendObjectK++;
			//.m_psendDataObject[pGNSendDataObject.m_iSendDataCount]
		}

	};
}
//功能：设置接收对象
//参数1：接收的数据
//参数2：需要转换的大小
//参数2：数组的第3级对象
//返回值：转换成utf16的二进制字符数组
function setReciveObjectInt(isSendOrRecive,youReciveData,iFourTemp,objectZ)
{
	if (youReciveData != undefined&&iFourTemp != undefined) {
		if(objectZ != undefined)
		{
			pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][objectZ] = IntBufferToInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
		}else
		{
			pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ] = IntBufferToInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
		}
	};
}
// function setReciveObject2()
// {
// 	reciveDataObject[reciveObjectI][reciveObjectJ][] = UIntBufferToUInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+iFourTemp);
// }

function checkReciveJOrK(){
	//if(getGNProtocolData()[iOrder].paramList =)
}
function  setObjArrayData(isSendOrRecive,paramListData,iSubData,youReciveData){
	if(isSendOrRecive ==  DataForDifferentType.ISRECIVEDATA)
	{
		var sLength = UIntBufferToUInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.STRINGLENGTH);
		//for (var i = 0; i < sLength; i++) {
		pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ] = UTF8ToUTF16(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.STRINGLENGTH,pGNReciveDataObject.m_pReciveDataReadCount+sLength);				
		pGNReciveDataObject.m_pReciveDataReadCount+=sLength+DataForDifferentType.STRINGLENGTH;
	}else 
	{
		var iString;
		// if(youReciveData!=undefined)
		// {

		// }
		iString = youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ];
		var iStringTemp = UTF16ToUTF8(iString);
		var iStringLenBuffer = UIntToUIntBuffer(iStringTemp.length,DataForDifferentType.STRINGLENGTH);
		for(var i = 0;i<DataForDifferentType.STRINGLENGTH;i++)
		{
			pGNSendDataObject.m_psendDataObject[pGNSendDataObject.m_iSendDataCount+i] = iStringLenBuffer[i]
		}
		pGNSendDataObject.m_iSendDataCount+=DataForDifferentType.STRINGLENGTH;
		pGNSendDataObject.m_iParamLenght+= DataForDifferentType.STRINGLENGTH+iStringTemp.length;
		if(isSendOrRecive == DataForDifferentType.ISSENDDATA)
		{
			for (var i = 0; i < iStringTemp.length; i++) {
				pGNSendDataObject.m_psendDataObject[pGNSendDataObject.m_iSendDataCount] = iStringTemp[i];
				pGNSendDataObject.m_iSendDataCount++;
			};
		}
	
	}
}
function  setObjArrayData1(isSendOrRecive,paramListData,iSubData,youReciveData){
	if(isSendOrRecive ==  DataForDifferentType.ISRECIVEDATA)
	{
		var sLength = UIntBufferToUInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.STRINGLENGTH);
		//for (var i = 0; i < sLength; i++) {
		pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectK][pGNReciveDataObject.m_pReciveObjectL] = UTF8ToUTF16(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.STRINGLENGTH,pGNReciveDataObject.m_pReciveDataReadCount+sLength);				
		pGNReciveDataObject.m_pReciveDataReadCount+=sLength+DataForDifferentType.STRINGLENGTH;
		pGNReciveDataObject.m_pReciveObjectL++;
	}else 
	{
		var iString;
		iString = youReciveData[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][pGNSendDataObject.m_isendObjectK];
		var iStringTemp = UTF16ToUTF8(iString);
		var iStringLenBuffer = UIntToUIntBuffer(iStringTemp.length,DataForDifferentType.STRINGLENGTH);
		for(var i = 0;i<DataForDifferentType.STRINGLENGTH;i++)
		{
			pGNSendDataObject.m_psendDataObject[pGNSendDataObject.m_iSendDataCount+i] = iStringLenBuffer[i]
		}
		pGNSendDataObject.m_iSendDataCount+=DataForDifferentType.STRINGLENGTH;
		pGNSendDataObject.m_iParamLenght+= DataForDifferentType.STRINGLENGTH+iStringTemp.length;
		if(isSendOrRecive == DataForDifferentType.ISSENDDATA)
		{
			
			for (var i = 0; i < iStringTemp.length; i++) {
				pGNSendDataObject.m_psendDataObject[pGNSendDataObject.m_iSendDataCount] = iStringTemp[i];
				pGNSendDataObject.m_iSendDataCount++;
			};
		}
		pGNSendDataObject.m_isendObjectK++;
	}
}
function checkTwo(isSendOrRecive,paramListData,iSubData,youReciveData)
{
	if(paramListData != undefined)
	{
		var iSubDataTemp = judgeParameter(iSubData,DataForDifferentType.TWO);
		var iTwoTemp = Math.floor(paramListData/Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));
		var iThreeTemp = Math.floor(paramListData%Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp));
		
		var paramListDataTemp = paramListData;

		
		switch (iTwoTemp)
		{
			case DataForDifferentType.TWOUNKNOW:
				return null;
				break;
			case DataForDifferentType.TWOINTARRAY:
				//根据实际数组中第一个存储长度的数据来决定for循环的次数，

				var sLength = UIntBufferToUInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.STRINGLENGTH);
				if (isNaN(sLength)==true) {
					sLength = pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+1].length;
				};
				pGNReciveDataObject.m_pReciveDataReadCount+=DataForDifferentType.STRINGLENGTH;
				//if(pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ].length!=undefined)
				//{
				if (pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2]!=null) {
					if(Math.floor(isSendOrRecive/10) !=DataForDifferentType.ISTHREEK){
						pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ] = [];
					}else{
						pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectK] = [];
					}
				};

				
				for (var i = 0; i < sLength; i++) {
					checkThree(isSendOrRecive1,iThreeTemp,DataForDifferentType.THREE,youReciveData,i);
				};
				break;
			case DataForDifferentType.TWOSTRING:
				if(Math.floor(isSendOrRecive/10) !=DataForDifferentType.ISTHREEK){
					setObjArrayData(Math.floor(isSendOrRecive%10),paramListData,iSubData,youReciveData);
				}else{
					setObjArrayData1(Math.floor(isSendOrRecive%10),paramListData,iSubData,youReciveData);
				}
				
				return sLength;
				//};
				break;

		}	
	}else
	{
		return null;
	}

}

var pTempK = 0;
//将数组的K坐标自家
function addK(isSendOrRecive){
	var iKTemp = 0;
	if(isSendOrRecive == DataForDifferentType.ISRECIVEDATA) {
		pTempK++;
		iKTemp = pTempK;
	}else
	{
		pTempK++;
		iKTemp = pTempK;	
	}
	return iKTemp;
}

function getObj(isSendOrRecive,youObject)
{
	switch (isSendOrRecive){
		case DataForDifferentType.ISSENDDATA:
			return youObject.
			break;
		case DataForDifferentType.ISRECIVEDATA:
			break;
		case DataForDifferentType.ISRECORDPARALENGTH:
			break;
		case DataForDifferentType.ISTHREEK:
			break;
	}
}
//功能：检查第一个类型是否正确
//参数1：需要检测的类型所对应的数值
//参数2：除以10的次方时需要减去的数字，业就是需要计算的对应数值的位数
//参数3：需要转换成对象的接收数组
//isObj: 如果为对象从1开始，如果为对象数组从0开始
//返回值：转换成utf16的二进制字符数组
function  checkOne(isSendOrRecive,youParamList,iSubData,youReciveData,isObj){
	
	if(youParamList !=undefined)
	{
		var paramListData;
		 if(youParamList.length !=undefined){
		 	paramListData = getGNParamTypeLength()[youParamList[0]];
		 	this.m_isendObjectK++;
		 	this.m_pReciveObjectK++;
		}else{
			paramListData =  getGNParamTypeLength()[youParamList];
		}
		 
		//var iOneTemp;
		var iSubDataTemp = judgeParameter(iSubData,DataForDifferentType.ONE)

		var	iOneTemp = Math.floor(paramListData/parseInt(Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp)));

		//下一个需要参与计算的数据
		var iTwotemp = 	Math.floor(paramListData%parseInt(Math.pow(10,GNParamSize.GNParamTypeLengthBitSize-iSubDataTemp)));
		switch (iOneTemp)
		{
			case DataForDifferentType.ONEUNKNOW://无
				return undefined;
				break;
			case DataForDifferentType.ONEUNSIZE://没有大小的普通数据pGNReciveDataObject.m_pReciveDataReadCount +=
				checkThree(isSendOrRecive,iTwotemp,DataForDifferentType.THREE,youReciveData);
				//console.log("nideshuju:"+pGNReciveDataObject.m_pReciveDataReadCount);
				break;
			case DataForDifferentType.ONEHAVASIZE://有大小的数据pGNReciveDataObject.m_pReciveDataReadCount+=
				checkTwo(isSendOrRecive,iTwotemp,DataForDifferentType.TWO,youReciveData);
				break;
			case DataForDifferentType.ONEOBJ:
				//youParamaList = [];
				

				for (var i = judgeParameter(isObj,1); i < getGNProtocolData()[pGNReciveDataObject.getIProtocol()].paramList[pGNReciveDataObject.m_pReciveObjectI][pGNReciveDataObject.m_pReciveObjectJ].length; i++) {
				// var iKTemp = 0;
				// if(isSendOrRecive == ISRECIVEDATA) {
				// 	this.m_pReciveObjectK++;
				// 	iKTemp = this.m_pReciveObjectK;
				// }else
				// {
				// 	this.m_isendObjectK++;
				// 	iKTemp = this.m_isendObjectK;	
				// }
				//for (var i = 0; i < judgeParameter(isObj,1); i++) {
					var ii = DataForDifferentType.ISTHREEK*10+isSendOrRecive%10;

					if(isSendOrRecive%10 == DataForDifferentType.ISRECIVEDATA)
						checkOne(ii, getGNProtocolData()[pGNReciveDataObject.getIProtocol()].paramList[pGNReciveDataObject.m_pReciveObjectI][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectL+2],DataForDifferentType.ONE,youReciveData);
					else{
						checkOne(ii, getGNProtocolData()[pGNSendDataObject.getIProtocol()].paramList[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][pGNReciveDataObject.m_pReciveObjectL+2],DataForDifferentType.ONE,youReciveData);
					}			
				};

				//};
				//if()
				break;
			case DataForDifferentType.ONEOBJARRAY:
				// 			for (var i = judgeParameter(isObj,1); i < youParamList.length; i++) {
				// 	checkOne(isSendOrRecive,youParamList[i],iSubData,youReciveData,isObj);
				// };
				
				//this.m_pReciveObjectK++;
				// var iKTemp = 0;
				// if(isSendOrRecive == ISRECIVEDATA) {
				// 	this.m_pReciveObjectK++;
				// 	iKTemp = this.m_pReciveObjectK;
				// }else
				// {
				// 	this.m_isendObjectK++;
				// 	iKTemp = this.m_isendObjectK;	
				// }
				var sLength = UIntBufferToUInt(youReciveData,pGNReciveDataObject.m_pReciveDataReadCount,pGNReciveDataObject.m_pReciveDataReadCount+DataForDifferentType.ARRAYLENGTH);
				pGNReciveDataObject.m_pReciveDataReadCount+=DataForDifferentType.ARRAYLENGTH;
				if(isSendOrRecive%10 == DataForDifferentType.ISRECIVEDATA){
					pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ] = [];
					pGNReciveDataObject.m_pReciveObjectK = 0;
				}
				for (var i = 0; i < sLength; i++) {

					if(isSendOrRecive%10 == DataForDifferentType.ISRECIVEDATA)
					{
						//checkThree(isSendOrRecive,DataForDifferentType.ARRAYLENGTH,DataForDifferentType.FOUR,youReciveData);
						pGNReciveDataObject.m_pReciveDataObject[pGNReciveDataObject.m_pReciveObjectI+2][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectK]= [];
						pGNReciveDataObject.m_pReciveObjectL = 0;
						
						pTempK = 0;
						checkOne(DataForDifferentType.ISTHREEK*10+isSendOrRecive, getGNProtocolData()[pGNReciveDataObject.getIProtocol()].paramList[pGNReciveDataObject.m_pReciveObjectI][pGNReciveDataObject.m_pReciveObjectJ][pGNReciveDataObject.m_pReciveObjectL+1],DataForDifferentType.ONE,youReciveData,2);	
					}
					else{
						checkOne(DataForDifferentType.ISTHREEK*10+isSendOrRecive, getGNProtocolData()[pGNSendDataObject.getIProtocol()].paramList[pGNSendDataObject.m_isendObjectI][pGNSendDataObject.m_isendObjectJ][pGNReciveDataObject.m_pReciveObjectL+1],DataForDifferentType.ONE,youReciveData,2);					
					}
					pGNReciveDataObject.m_pReciveObjectK++;
				};
				break;
			case DataForDifferentType.ONEOTHERDATA:

				break;

		}	
	}
}


// var myDataArray = new ArrayBuffer(12);
// var a=new Uint8Array(myDataArray);
// a[0] = 50;
// a[1] = 220;
// a[2] = 40;
// a[3] = 204;
// a[4] = 179; 
// a[5] = 1;
// a[6] = 228;
// a[7] = 189;
// a[8] = 160;
//console.log("你好u啊："+UTF16ToUTF8("你")) ;

//var iOrder = IntBufferToInt(a,0,4);
//checkTheReciveBuffer(a);

	//checkTheReciveBuffer(GNProtocolNo.UserOnline,);

