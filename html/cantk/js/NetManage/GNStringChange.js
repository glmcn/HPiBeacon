    //功能：将utf16转换成为utf8
    //参数1：需要转换的字符串
    //返回值：转换成utf8的二进制字符数组
   function UTF16ToUTF8(youString){ 
        if(!youString){  
            return 0;  
        }  
          
        var i, code, ret = [], len = youString.length;  
        for(i = 0; i < len; i++){  
            code = youString.charCodeAt(i);  
            if(code > 0x0 && code <= 0x7f){  
                //单字节  
                //UTF-16 0000 - 007F  
                //UTF-8  0xxxxxxx  
                ret.push(youString.charAt(i));  
            }else if(code >= 0x80 && code <= 0x7ff){  
                //双字节  
                //UTF-16 0080 - 07FF  
                //UTF-8  110xxxxx 10xxxxxx  
                ret.push(  
                    //110xxxxx  
                    String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),  
                    //10xxxxxx  
                    String.fromCharCode(0x80 | (code & 0x3f))  
                );  
            }else if(code >= 0x800 && code <= 0xffff){  
                //三字节  
                //UTF-16 0800 - FFFF  
                //UTF-8  1110xxxx 10xxxxxx 10xxxxxx  
                ret.push(  
                    //1110xxxx  
                    String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),  
                    //10xxxxxx  
                    String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),  
                    //10xxxxxx  
                    String.fromCharCode(0x80 | (code & 0x3f))  
                );  
            }  
        }     
    
        var temp = Array.prototype.map.call(ret, function( c )
        { 
            return c.charCodeAt(0); 
        } );  
        temp[temp.length] = 00;
        return temp;  
    }

//功能：将utf8转换成为utf16
//参数1：需要转换的字符串
//返回值：转换成utf16的二进制字符数组
function  UTF8ToUTF16(youBitArray,began,end) {

    if(!youBitArray){  
        return;  
    }  
    var stringArray=String.fromCharCode.apply(null,youBitArray) 
    var iBegan = judgeParameter(began,0);
    var len = judgeParameter(end,stringArray.length);
    var i, codes, bytes, ret = [];  
    for(i = began; i < len; i++){  
        codes = [];  
        codes.push(stringArray.charCodeAt(i));  
        if(((codes[0] >> 7) & 0xff) == 0x0){  
            //单字节  0xxxxxxx  
            ret.push(stringArray.charAt(i));  
        }else if(((codes[0] >> 5) & 0xff) == 0x6){  
            //双字节  110xxxxx 10xxxxxx  
            codes.push(stringArray.charCodeAt(++i));  
            bytes = [];  
            bytes.push(codes[0] & 0x1f);  
            bytes.push(codes[1] & 0x3f);  
            ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));  
        }else if(((codes[0] >> 4) & 0xff) == 0xe){  
            //三字节  1110xxxx 10xxxxxx 10xxxxxx  
            codes.push(stringArray.charCodeAt(++i));  
            codes.push(stringArray.charCodeAt(++i));  
            bytes = [];  
            bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));  
            bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));            
            ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));  
        }  
    }  
    return ret.join(''); 

    //console.log("我的名字为："+String.fromCharCode(a1,a2,a3));//String.fromCharCode(a1,a2,a3);
}