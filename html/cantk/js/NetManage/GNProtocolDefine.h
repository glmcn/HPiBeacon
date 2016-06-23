/********************************************************************

	文件名  : 	GNPROTOCOLDEFINE.H

	创建作者:	HADU

	创建时间:	2016.4.26  12:25

	文件描述:   协议定义文件

	修改记录：

*********************************************************************/

#include <Server/GNProtocolDefine.h>

#ifndef GN_DEFINE_PROTOCOL_USER_CREATE_ENABLE
#define GN_DEFINE_PROTOCOL_USER_CREATE_ENABLE

// 协议开始
GN_DEFINE_PROTOCOL_BEGIN

// 例如：
//GN_DEFINE_PROTOCOL( GN_DEFINE_PROTOCOL_VALUE(GetUserData,200),
//    GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(GNParamType::UINT16,GNParamType::INT16_ARRAY,GNParamType::STRING))
//GN_DEFINE_PROTOCOL(GetUserData1,
//    GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(GNParamType::UINT16,GNParamType::DATA))
// 或者设置分段值
//GN_DEFINE_PROTOCOL( GN_DEFINE_PROTOCOL_VALUE(GetUserData,100),
//    GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(GNParamType::UINT16,GNParamType::INT8_ARRAY,GNParamType::INT32),
//    GN_DEFINE_PROTOCOL_PARAM_TYPE_LIST_GROUP(GNParamType::UINT16,GNParamType::INT16_ARRAY,GNParamType::INT16_ARRAY))

#include "ServerProtocolDefine/GNCommonServerProtocolDefine.h"

/////////////////////////////////////////////////////



/////////////////////////////////////////////////////

#include "ServerProtocolDefine/GNTestServerProtocolDefine.h"

// 协议结束
GN_DEFINE_PROTOCOL_END

#endif
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            