var wsUri = "ws:gion.f3322.net:12345";

function GNWebSocketCilent() {
}

GNWebSocketCilent.prototype.m_pGNWebSocket = null;
GNWebSocketCilent.prototype.m_pWebsocket = null;
GNWebSocketCilent.prototype.m_pGNReciveCallBack = null;
GNWebSocketCilent.prototype.m_bIsSocketClose = false;
GNWebSocketCilent.prototype.m_aSendMessgeQuene = [];
var iIsConectSucess = 0;

GNWebSocketCilent.create = function () {
    if (this.m_pGNWebSocket == null) {
        this.m_pGNWebSocket = new GNWebSocketCilent();

        this.m_pGNWebSocket.createWebSocket();
    }
    return this.m_pGNWebSocket;
}
GNWebSocketCilent.distory = function () {
    this.m_pGNWebSocket = null;
}

GNWebSocketCilent.prototype.createWebSocket = function () {

    if (!this.m_bIsSocketClose) {
        
        try {
            this.m_pWebsocket = new WebSocket(wsUri);
            this.m_pWebsocket.binaryType = "arraybuffer";
        } catch (e) {
            alert("服务器连接失败");
            return;
        }

        this.m_pWebsocket.onopen = this.sOpen;
        this.m_pWebsocket.onerror = this.sError;
        this.m_pWebsocket.onmessage = this.sMessage;
        this.m_pWebsocket.onclose = this.sClose;

    }
    else{
        console.log("已经连接");
    }
}

function getIsConectSucess() {
    return iIsConectSucess;
}

GNWebSocketCilent.prototype.sOpen = function (evt) {
    this.m_pGNReciveCallBack = GNReciveCallBackArray.create();
    iIsConectSucess = 1;
    var myThis = GNWebSocketCilent.create();

    if (myThis.m_aSendMessgeQuene.length != 0) {
        for (var i = 0; i < myThis.m_aSendMessgeQuene.length; i++) {
            myThis.sendMessageTo(myThis.m_aSendMessgeQuene[i].m_aSendBuffer, myThis.m_aSendMessgeQuene[i].m_iPackLength);
            myThis.m_aSendMessgeQuene.pop();
        };
    };
    
    console.log("连接成功：" + wsUri);
    myThis.m_bIsSocketClose = true;
    

    var AppManager = GNAppManager.create();
    AppManager.onConnected();

}

GNWebSocketCilent.prototype.sError = function (evt) {
    iIsConectSucess = 0;
    var myThis = GNWebSocketCilent.create();
    myThis.m_bIsSocketClose = false;
    console.log("连接错误");
}

GNWebSocketCilent.prototype.sMessage = function (msg) {
    //alert('server says:'+msg.data);
    var pGNReciveDataObject = GNReciveDataObject.create();
    //console.log("changdu"+msg.data.size);
    pGNReciveDataObject.checkTheReciveBuffer(msg.data);
    var iProtocol = pGNReciveDataObject.getIProtocol();
    console.log('server says:'+iProtocol)
    this.m_pGNReciveCallBack.getYouReciveCallBack(iProtocol)(pGNReciveDataObject.getReciveData());
}

GNWebSocketCilent.prototype.sClose = function (evt) {
    var myThis = GNWebSocketCilent.create();
    myThis.m_bIsSocketClose = false;
    console.log("连接中断");
    myThis.m_pWebsocket = null;
    //alert('connect close');

    var AppManager = GNAppManager.create();
    AppManager.onDisconnected();
}


GNWebSocketCilent.prototype.sendMessageTo = function (aSendBuffer, packLength) {
    var myThis = GNWebSocketCilent.create();
    var myDataArray = new ArrayBuffer(packLength);
    var sendBuffer = new Uint8Array(myDataArray);
    for (var i = 0; i < packLength; i++) {
        sendBuffer[i] = aSendBuffer[i];
    };
    //alert(' says To server:'+sendBuffer);
    myThis.m_pWebsocket.send(sendBuffer);
}


GNWebSocketCilent.prototype.sendMessage = function (aSendBuffer, packLength) {
    if (aSendBuffer != undefined) {
        //if (this ) {};
        //var sendBuffer = aSendBuffer.slice(0,packLength);
        if (this.m_bIsSocketClose == false || this.m_pWebsocket == null) {
            GNWebSocketCilent.distory();
            var p = GNWebSocketCilent.create();
            var pProject = { m_aSendBuffer: aSendBuffer, m_iPackLength: packLength };
            this.m_aSendMessgeQuene.push(pProject);
        } else {
            this.sendMessageTo(aSendBuffer, packLength);
        }
    } else {
        alert("发送数据出错");
        return null;
    }
}

GNWebSocketCilent.prototype.close = function () {
    this.m_pWebsocket.close();
}

//var tt = GNWebSocketCilent.create();
