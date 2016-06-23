
/*************************
 * 
 模块：管理连接服务器 Gion
 * 
 *************************/

//在此更改ip和端口
wsUri = "ws://192.168.2.233:2999";
var wsObj = null;
var zzz = 0;
//阻塞连接到服务器
function GNTryConnect() {


}


//返回当前连接状态
function GNTestConnect() {

    if (!iIsConectSucess) {
        wsObj = GNWebSocketCilent.create();
    }
    return iIsConectSucess;
}


/************************** */
//接收数据实例
function eno() {
    //在这里设置服务器发送数据的回调函数
    //参数：协议号，需要调用的函数(相当于handler)
    pReciveCallBack.setYouReciveCallBack(GNProtocolNo.SCDebugInfo, recvCallBack);

}

//回调函数实例
var recvCallBack = function (msg) {
    //msg[0]是总共的包长，
    //msg[1]是协议号，
    //后面的按照协议来定，
    a = msg[2];
    b = msg[3];
}

/*************************
 * 
 模块：管理收发数据类
 * 
 *************************/
function GNDataInteract() {

}

GNDataInteract.prototype.pDataInteract = null;
GNDataInteract.prototype.pReciveCallBack = null;
GNDataInteract.prototype.pSendDataSet = null;

GNDataInteract.create = function () {
    if (this.pDataInteract == null) {
        this.pDataInteract = new GNDataInteract();
        this.pDataInteract.init();
    }
    return this.pDataInteract;

}

GNDataInteract.prototype.init = function () {

    this.pSendDataSet = GNSendDataSet.create();
    this.pReciveCallBack = GNReciveCallBackArray.create();

}

//注册所有回调函数
GNDataInteract.prototype.regst = function () {
    this.pReciveCallBack.setYouReciveCallBack(protocolNo, arr[protocolNo])
}


GNDataInteract.prototype.Logon = function (userID) {
    //暂时无需密码登录
    this.pSendDataSet.sendMessageToSever(GNProtocolNo.CSUserReOnline, GNVersionNo, userID);

}

GNDataInteract.prototype.testLogon = function (userID) {
    //暂时无需密码登录
    this.pSendDataSet.sendMessageToSever(GNProtocolNo.CSUserReOnline, GNVersionNo, userID);

}
/************************************ */
GNDataInteract.prototype.TestApp = function (data) {
    this.pReciveCallBack.setYouReciveCallBack(GNProtocolNo.SCTestApp, this.recvTestApp);
    this.pSendDataSet.sendMessageToSever(GNProtocolNo.CSTestApp, data);

}

GNDataInteract.prototype.recvTestApp = function (msg) {
    console.log(msg[0]);
    console.log(msg[1]);
    console.log(msg[2]);
    console.log(msg[2][0]);
    console.log(msg[2].length);
    console.log(msg[3]);

}

/*************************************** */
GNDataInteract.prototype.ibeaconWelcom = function (name, phone_number) {
    this.pReciveCallBack.setYouReciveCallBack(GNProtocolNo.SCibeaconWelcomProtocolBack, this.ibeaconWelcomBack);
    this.pSendDataSet.sendMessageToSever(GNProtocolNo.CSibeaconWelcomProtocol, name, phone_number);

}
//迎宾
GNDataInteract.prototype.ibeaconWelcomBack = function (msg) {
    console.log("包长：" + msg[0]);
    console.log("协议：" + msg[1]);

    console.log("返回值：" + msg[2][0]);
    var AppManager = GNAppManager.get();
    //AppManager.self == AppManager.


}

/*************************
 * 
 模块：用户信息储存
 * 
 *************************/
function clientInfo() {
}

clientInfo.state = 0;

//定义所有状态
var stateDefine = {
    index: 0,
    connected: 2,
    disconnected: 1,
}

/*************************
 * 
 模块：管理界面类
 * 
 *************************/
function GNAppManager() {

}

//this指针
GNAppManager.prototype.pGNAppManager = null;
GNAppManager.prototype.pDataInteract = null;
//登录窗口
GNAppManager.prototype.winLog = null;
//用户页面
GNAppManager.prototype.page_userIndex = null;

GNAppManager.prototype.page_view_signup = null;
//简历系统
GNAppManager.prototype.page_resume = null;
GNAppManager.prototype.page_insertInfo = null;
GNAppManager.prototype.page_insertInfo_2 = null;
GNAppManager.prototype.page_view_aptm = null;
GNAppManager.prototype.page_resumeIndex = null;
GNAppManager.prototype.page_rs_search = null;
//考试系统
GNAppManager.prototype.page_testIndex = null;
GNAppManager.prototype.page_testLib = null;
GNAppManager.prototype.page_testSearch = null;
GNAppManager.prototype.page_testView = null;
GNAppManager.prototype.page_test = null;
GNAppManager.prototype.page_myTest = null;


//GNAppManager.prototype.page_testView = null;
//当前位置
GNAppManager.prototype.self = null;
GNAppManager.prototype.back = null;
//当前状态
GNAppManager.prototype.state = null;



//实例这个类
GNAppManager.create = function () {
    if (this.pGNAppManager == null) {
        this.pGNAppManager = new GNAppManager();
        this.pGNAppManager.getDataInteract();
    }
    return this.pGNAppManager;
}

GNAppManager.get = function () {
    if (this.pGNAppManager == null) {
        this.pGNAppManager = new GNAppManager();
    }
    return this.pGNAppManager;
}
//获取数据交互对象
GNAppManager.prototype.getDataInteract = function () {
    this.pDataInteract = GNDataInteract.create();
}

//找到相应名字的元素
GNAppManager.prototype.getElement = function (name) {
    return gApp.view.getWindowManager().find(name, true);
}

//进入相应页面
GNAppManager.prototype.gotoWindow = function (win) {
    //传给下一个窗口的参数
    var initData = {};
    this.back = win;
    win.openWindow(win.name,
        function (retData) { console.log("window closed."); }, true, initData);
}
//返回上一页面
GNAppManager.prototype.goBack = function (win) {
    var initData = {};
    win.openWindow(this.back.name,
        function (retData) { console.log("window closed."); }, true, initData);
}


/**********功能：在屏幕中央打印等待消息******* */
//找到当前窗口的加载器
GNAppManager.prototype.waitbox = null;
GNAppManager.prototype.waitText = null;
GNAppManager.prototype.isWaiting = false;


GNAppManager.prototype.getWaitbox = function (win) {
    //找到加载图标
    // this.waitbox = win.find("wait-box");
    // if (this.waitbox != null) {
    //      this.waitbox.setEnable(true);
    //      this.waitbox.setVisible(true);
    // }


    //找到加载文字
    this.waitText = win.find("wait-test");
    if (this.waitText != null) {
        this.waitText.setEnable(true);
        this.waitText.setVisible(true);
    }

}


GNAppManager.prototype.setWaitTest = function (str) {
    this.waitText.text = str;
}

//等待中
GNAppManager.prototype.waiting = function (dosomething, time) {

    this.isWaiting = true;

    var intervalId;
    var iCount = 0;

    var gg = this;

    intervalId = setInterval(
        function () {
            if (iCount >= time) {

                clearInterval(intervalId);
                gg.endWaiting();
                return iCount;
            } else {
                if (dosomething != null) dosomething();
                iCount++;
            }

        }, 1000);
}


GNAppManager.prototype.endWaiting = function () {
    if (null != this.waitText) {

        this.waitText.setVisible(false);
        this.waitText.setEnable(false);
    }
    if (null != this.waitbox) {
        this.waitbox.setVisible(false);
        this.waitbox.setEnable(false);
    }
    this.waitbox = null;
    this.waitText = null;
    this.isWaiting = false;
}


//在窗口中间打印等待消息
//参数为： 窗口，消息 ，等待期间的回调函数(什么都不做请传入null) , 等待秒数
GNAppManager.prototype.debugInfo = function (window, info, dosomething, time) {
    this.getWaitbox(window);
    this.setWaitTest(info);
    this.waiting(dosomething, time);
}


/******************************* */


//连接成功事件
GNAppManager.prototype.onConnected = function () {
    var AppManager = this;

    switch (this.self) {
        case this.winLog:
            //登录
            this.getWaitbox(this.winLog);
            this.setWaitTest("成功");
            this.waiting(null, 2);
            this.pDataInteract.testLogon(0);

            this.gotoWindow(AppManager.winLog);

            break;
        case this.winResume:

            break;
        case this.page_view_signup:
            //已匿名身份登录网关
            AppManager.pDataInteract.testLogon(0);

            break;
        case this.page_userIndex:

            break;
        default:
            if (this.self == null) this.init();
            break;
    }


}

//连接失败/断开
GNAppManager.prototype.onDisconnected = function () {
    var AppManager = this;
    switch (this.self) {
        case this.winLog:
            this.getWaitbox(AppManager.winLog);

            this.setWaitTest("连接失败");
            this.waiting(null, 1);

            break;
        case this.winResume:

            break;
        case this.page_view_signup:
            this.debugInfo(this.page_view_signup, "连接失败", null, 1);

            break;
        case this.page_userIndex:

            break;
        default:
            if (this.self == null) this.init();
            break;
    }


}



//成功登录时触发
GNAppManager.prototype.onLogon = function () {


    var AppManager = this;

    switch (this.self) {
        case this.winLog:
            this.winLog.openWindow

            break;
        case this.winResume:

            break;
        case this.page_view_signup:

            break;
        case this.page_userIndex:

            break;
        default:
            if (this.self == null) this.init();
            break;
    }

}
//退出/注销系统时触发
GNAppManager.prototype.onExit = function () {

}


//所有界面初始化
GNAppManager.prototype.init = function () {

    var AppManager = this;
    this.getDataInteract();

    //这里找出所有窗口
    AppManager.winLog = AppManager.getElement("WelcomeLoge");
    AppManager.winResume = AppManager.getElement("page_resume");
    AppManager.page_view_signup = AppManager.getElement("page_view_signup");
    AppManager.page_userIndex = AppManager.getElement("page_userIndex");
    //简历系统
    AppManager.page_resume = AppManager.getElement("page_resume");
    AppManager.page_insertInfo = AppManager.getElement("page_insertInfo");
    AppManager.page_insertInfo_2 = AppManager.getElement("page_insertInfo_2");
    AppManager.page_view_aptm = AppManager.getElement("page_view_aptm");
    AppManager.page_resumeIndex = AppManager.getElement("page_resumeIndex");
    AppManager.page_rs_search = AppManager.getElement("page_rs_search");
    //考试系统
    AppManager.page_testIndex = AppManager.getElement("page_testIndex");
    AppManager.page_testLib = AppManager.getElement("page_testLib");
    AppManager.page_testSearch = AppManager.getElement("page_testSearch");
    AppManager.page_testView = AppManager.getElement("page_testView");
    AppManager.page_test = AppManager.getElement("page_test");
    AppManager.page_myTest = AppManager.getElement("page_myTest");



    //设置各个窗口的onOpen()事件，获取当前窗口的所有控件，给当前窗口的控件添加事件
    //首页
    AppManager.winLog.onOpen = function (data) {

        AppManager.self = this;

        var button_interview = AppManager.winLog.find("button_interview");
        var buttonLogon = AppManager.winLog.find("button_login");
        var button_passby = AppManager.winLog.find("button_passby");



        button_interview.onClick = function (point) {
            
            var initData = {};
            AppManager.gotoWindow(AppManager.page_view_signup);
        }


        buttonLogon.onClick = function (point) {

            AppManager.getWaitbox(AppManager.winLog);
            //AppManager.setWaitTest("连接中");
            //var iRet = GNTestConnect();
            AppManager.gotoWindow(AppManager.page_userIndex);

        }

        button_passby.onClick = function (params) {

        }

    }


    //用户首页
    AppManager.page_userIndex.onOpen = function () {

    }


    //面试首页
    AppManager.page_view_signup.onOpen = function () {


        AppManager.self = this;
        GNTestConnect();


        var button_send = this.find("button_send");
        var button_back = this.find("button_back");
        //提交数据
        button_send.onClick = function (point) {

            var name = AppManager.page_view_signup.find("ui-color-tile-general/name").text;
            var phone_number = AppManager.page_view_signup.find("ui-color-tile-general/phone_number").text;
            //检测是否为空
            console.log(name);
            console.log(phone_number);

            AppManager.pDataInteract.ibeaconWelcom(name, phone_number);

        }



        button_back.onClick = function (point) {
            var initData = {};
            this.openWindow(AppManager.winLog.name,
                function (retData) { console.log("window closed."); }, true, initData);

        }

    }
    //面试信息页面
    AppManager.winResume.onOpen = function () {
        AppManager.self = this;

    }
}

