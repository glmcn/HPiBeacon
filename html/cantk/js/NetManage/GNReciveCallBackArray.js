
function  GNReciveCallBackArray (){
}

GNReciveCallBackArray.prototype.youReciveCallBackArray = [];
GNReciveCallBackArray.prototype.m_pGNReciveCallBackArray = null;

GNReciveCallBackArray.create = function(){
	if(this.m_pGNReciveCallBackArray ==null)
	{
		this.m_pGNReciveCallBackArray = new GNReciveCallBackArray();
	}
	return this.m_pGNReciveCallBackArray;
}

GNReciveCallBackArray.prototype.setYouReciveCallBack = function(iOrder,youCallBack){
	this.youReciveCallBackArray[iOrder] = youCallBack;
}

GNReciveCallBackArray.prototype.getYouReciveCallBack = function(iOrder){
	return  this.youReciveCallBackArray[iOrder];
}