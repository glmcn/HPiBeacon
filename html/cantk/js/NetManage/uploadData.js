//上传回调下标
var GNUpNumber = {
    ChatImage:1,
    ChatAudio:2
}
function  GNUploadData(){

}
GNUploadData.prototype.m_pGNUploadData = null;
GNUploadData.prototype.m_pSecsesFun = [];

//上传图片，上传文件的之前需要先获取上传图片类的对象，如 var p = GNUPloadData.create();
GNUploadData.create = function(){
	if (this.m_pGNUploadData ==null) {
		this.m_pGNUploadData = new GNUploadData();
	};
	return this.m_pGNUploadData;
}

//设置上传文件成功后的回调函数，文件上传成功后会调用，
//参数1：回调函数，
//参数2：上传回调函数的下标，后面调用的时候根据对应的下标来查找调用哪一个函数
//回调函数的参数：文件的名称
GNUploadData.prototype.setSecesFun = function(secsesFun,upNumber){
    this.m_pSecsesFun[upNumber] = secsesFun;
}


//开始上传文件，
//参数1：二进制文件
//参数2：文件类型（入"wav"/"png"等）
//参数3：用户名，用于识别，
//参数4：需要上传头像的回调函数
GNUploadData.prototype.init = function(file,fileType,userName,upNumber) {
	var fileObj = file; // 获取文件对象
            // FormData 对象
            var form = new FormData();
            form.append("author", userName);                        // 可以增加表单数据
            form.append("file", fileObj); 
            form.append("type", fileType);
            var  myThis = this;
            // 文件对象
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();//httpHost+
            xhr.open("post",httpHost+"/upload/", true);
            
            xhr.onreadystatechange = function () {
                if(xhr.readyState==4)
                {
                    //alert(xhr.responseText);
                    if(xhr.status == 200) {
                        //alert(xhr.responseText);
                        console.log("my upNumber = "+upNumber);
                        if (myThis.m_pSecsesFun[upNumber]!=null) {
                            var pData = eval("("+xhr.responseText+")");
                            myThis.m_pSecsesFun[upNumber](pData);
                        }else{
                            console.log("your callBackFun was not init,please  call setSecesFun before upload");
                        }
                    }
                    else {
                        alert("http status error:" + xhr.status);
                   }
                }
            }

            xhr.onerr = function(argument) {
                alert(argument);
            };
            xhr.send(form);
            
};