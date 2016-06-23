##重要的文件：  
`index.html`  测试时禁止手机缓存   

`GNAppMain.js`:    
  . `GNTestConnect()`连接到网关（修改ip）  
  . `pDataInteract.Logon()`登录到网关  
  
  . 接收数据实例：      
    在这里设置服务器发送数据的回调函数  
    参数：协议号，需要调用的函数(相当于handler)  


    pReciveCallBack.setYouReciveCallBack(GNProtocolNo.SCDebugInfo, recvCallBack);  
   回调函数:  
   msg[0]是总共的包长，msg[1]是协议号，后面的按照协议来定，  
`var recvCallBack = function (msg, a ,b) {`  
    `a = msg[2];`  
    `b = msg[3];`  
`}`  
  
  
`cantk/js/GNLogon.js`:  
  . `GNLogon.create()` 就能登录  
        需要修改登录的按键， 发送的内容
        
`cantk/js/GNNetManage.js`:  
  . 全局函数`GNWebSocketCilent.create();`  建立ws连接  
  . `wsUri` ip和端口  
  . `iIsConectSucess` 当前连接状态  
  . 成员函数 `close()` 关闭连接  
  . 修改连接成功，连接失败，连接错误，需要做的事情  

`cantk/js/webapp_init.js`:  
  . 加载所有界面。修改加载完成的操作

`GNiBeaconClient.js`:  
  . `initIbeacon()`开始监听/发送iBeacon信息  
       
       
       
