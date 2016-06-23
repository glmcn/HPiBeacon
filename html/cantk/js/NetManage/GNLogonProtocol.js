// var GNLogonProtocolNo = {
// 	CSGetCaptcha : 80,				// 获取验证码 
// 	SCCaptchaBack : 81,				// 验证码返回信息
// 	CSSendRegister : 82,			// 发送注册信息
// 	SCSendRegisterBack : 83,		// 发送注册返回信息
// 	CSSendLogin : 84,				// 发送登录信息
// 	SCSendLoginBack:85,				// 发送登录返回信息 
// 	CSGetPictureBeforeLogin : 86,	// 获取验证图片
// 	SCSendPicture : 87,				// 客户端登录时发送给客户端的验证图片
// }

// var GNLogonProtocolData = new Array;
// var GNLogonProtocol  = GNLogonProtocolData;
// var GNLogonProtocolNum = GNLogonProtocolNo;

// GNLogonProtocolData[GNLogonProtocolNo.CSGetCaptcha] = { paramList:[[GNParamType.STRING]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.SCCaptchaBack] = { paramList:[[GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT8]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.CSSendRegister] = { paramList:[[GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING,GNParamType.STRING,GNParamType.STRING]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.SCSendRegisterBack] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.CSSendLogin] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8,GNParamType.STRING,GNParamType.STRING]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.SCSendLoginBack] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.CSGetPictureBeforeLogin] = { paramList:[[GNParamType.UINT32]], handler:null };
// GNLogonProtocolData[GNLogonProtocolNo.SCSendPicture] = { paramList:[[GNParamType.UINT32,GNParamType.STRING,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT8,GNParamType.STRING]]], handler:null };
