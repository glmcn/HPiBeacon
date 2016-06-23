var  httpHost = "http://gion.f3322.net:8088";//gion.f3322.net
var  feelEifScr = "/assets/myAssess/image/eif/";
// 参数列表所选择的位数大小
var GNParamSize = {
    GNParamTypeLengthBitSize:4
}


var GNListType = {
    Messge:0,
    Friend:1
}
//不同类型的所对应的数据
var   DataForDifferentType = {
    //分别代表第几位的数字
    ONEUNKNOW:0,
    ONEUNSIZE:1,
    ONEHAVASIZE:2,
    ONEOBJ:3,
    ONEOTHERDATA:5,
    ONEOBJARRAY:4,

    TWOUNKNOW:0,
    TWOINTARRAY:1,
    TWOSTRING:2,
    

    THREEUNKNOW:0,
    THREEINT:1,
    THREEUINT:2,

    FOURUNKNOW:0,
    FOURTYPESIZ1:1,
    FOURTYPESIZ2:2,
    FOURTYPESIZ4:4,
    FOURTYPESIZ8:8,

    IORDERSLENGTH:2,    //协议长度
    STRINGLENGTH:1,     //记录有长度的数据的变量的长度
    PACKAGELENGTH:2,
    ARRAYLENGTH:1,


    ONE:1,
    TWO:2,
    THREE:3,
    FOUR:4,

    ISSENDDATA:1,
    ISRECIVEDATA:2,
    ISRECORDPARALENGTH:3,
    ISTHREEK:4
}

function  countGNParamTypeLength(one,two,three,four){
    var returnValue = 0;
    var youParamTypeArray = [one,two,three,four];
    for (var i = 0; i < youParamTypeArray.length; i++) {
         if(judgeParameter(youParamTypeArray[i])==undefined&&GNParamSize.GNParamTypeLengthBitSize!=youParamTypeArray.length)
         {
            return null;
         }else{
            //for (var j = 0; j < youParamTypeArray.length; j++) {
                returnValue += youParamTypeArray[i]*Math.pow(10,(GNParamSize.GNParamTypeLengthBitSize-1)-i);
            //};
         }
    };
    return  returnValue;
}
//共用4个十进制位代表不同类型     前四位固定作用，要添加新的功能只能在个位添加
//千位代表是普通类型还是复杂类型   0代表未定义  1代表普通类型（无长度）  2代表复杂类型（有长度）, 3代表object , ,4其他  
//百位代表   如果千位为1时没有任何意义为0   如果千位为2时：1代表普通数组  2代表字符     3 代表object数组
//十位代表   如果千位为1或者千位为2百位为1时  1代表有符号类型 2代表无符号类型    ，如果为其他的直接虑过
//个位代表 简单类型长度 ，复杂类型为0
var GNParamTypeLength  = [
    countGNParamTypeLength(0,0,0,0),
    countGNParamTypeLength(2,2,0,0),
    countGNParamTypeLength(1,0,1,1),
    countGNParamTypeLength(1,0,1,2),
    countGNParamTypeLength(1,0,1,4),
    countGNParamTypeLength(1,0,1,8),
    countGNParamTypeLength(2,1,1,1),
    countGNParamTypeLength(2,1,1,2),
    countGNParamTypeLength(2,1,1,4),
    countGNParamTypeLength(2,1,1,8),   
    countGNParamTypeLength(1,0,2,1),
    countGNParamTypeLength(1,0,2,2),
    countGNParamTypeLength(1,0,2,4),
    countGNParamTypeLength(1,0,2,8),
    countGNParamTypeLength(2,1,2,1),
    countGNParamTypeLength(2,1,2,2),
    countGNParamTypeLength(2,1,2,4),
    countGNParamTypeLength(2,1,2,8),   
    countGNParamTypeLength(5,0,0,0),
    countGNParamTypeLength(3,0,0,0),
    countGNParamTypeLength(4,0,0,0)
]

var GNSendData  = new Array;
//GNSendData[GNProtocolNo.UserOnline] = { paramList:[[18865,-14,"你好"]], handler:null };
//GNProtocolData[GNProtocolNo.UserOnline] = { paramList:[[GNParamType.UINT32,GNParamType.INT8,GNParamType.STRING]], handler:null };


// for (var i = 0; i < GNParamTypeLength.length; i++) {
//     console.log("我的名字为："+GNParamTypeLength[i]);
// };

function getGNParamTypeLength(){
    return GNParamTypeLength;
}

function  getGNProtocolData(){
    return GNProtocolData;
}

function getGNSendData(){
    return GNSendData;
}