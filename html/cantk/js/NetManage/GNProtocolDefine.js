var GNProtocolNo = {
SCDebugInfo : 0,
SCIncorrectVersion : 30,
CSUserReOnline : 31,
SCUserReOnlineBack : 32,
CSUserOffline : 51,
SCPushUserInfo : 60,
CSGetCaptcha : 80,
SCCaptchaBack : 81,
CSSendRegister : 82,
SCSendRegisterBack : 83,
CSSendLogin : 84,
SCSendLoginBack : 85,
CSGetPictureBeforeLogin : 86,
SCSendPicture : 87,
CSGetUserOldChatListInfo : 100,
CSGetUserOldChatListInfoBack : 101,
SCPushUserNewChatListInfo : 102,
CSGetChatRecord : 103,
SCGetChatRecordBack : 104,
SCPushChatRecord : 105,
CSSendChatRecord : 106,
SCSendChatRecordBack : 107,
CSSendMarkChatRecord : 108,
CSAddFriend : 200,
SCAddFriendReply : 201,
SCAddFriendRequest : 202,
CSReplyAddFriend : 203,
SCAddFriendResult : 204,
CSRemoveFriend : 205,
SCRemoveFriendResult : 206,
CSQueryUsrs : 207,
SCQueryUsrsReply : 208,
CSQueryGroupUsrs : 209,
SCQueryGroupUsrsReply : 210,
CSQueryUsrGroups : 211,
SCQueryUsrGroupsReply : 212,
CSCreateGroup : 213,
SCCreateGroupResult : 214,
CSQueryGroup : 215,
SCQueryGroupReply : 216,
CSAlterGroupInfo : 217,
SCAlterGroupInfo : 218,
CSAsk2JoinGroup : 219,
SCAsk2JoinGroupReply : 220,
SCInformGroupManagerAllowJoin : 221,
CSGroupManagerProcess : 222,
SCInformJoinGroupResult : 223,
CSQuitGroup : 224,
SCQuitGroupReply : 225,
CSKickGroupMember : 226,
SCKickGroupMemberReply : 227,
CSDissolveGroup : 228,
SCDissolveGroupReply : 229,
CSGetUsrFriends : 230,
SCGetUsrFriendsReply : 231,
CSGetUsrGroups : 232,
SCGetUsrGroupsReply : 233,
CSGetUsrFriendsInfo : 234,
SCGetUsrFriendsInfoReply : 235,

CSGetLeaveNumProtocol : 300,
SCGetLeaveNumProtocolBack : 301,
CSibeaconWelcomProtocol : 302,
SCibeaconWelcomProtocolBack : 303,
CSStartTestingProtocol : 304,
SCStartTestingProtocolBack : 305,

CSTestApp : 555,
SCTestApp : 556,

CSiBeaconTestOldversion : 996,
CSiBeaconTest : 998,
SCiBeaconTest : 999,
CSiBeaconNormalCheckIn : 1001,



}

var GNParamType = {
    UNKNOW : 0,
    STRING : 1,
    INT8 : 2,
    INT16 : 3,
    INT32 : 4,
    INT64 : 5,
    INT8_ARRAY : 6,
    INT16_ARRAY : 7,
    INT32_ARRAY : 8,
    INT64_ARRAY : 9,
    UINT8 : 10,
    UINT16 : 11,
    UINT32 : 12,
    UINT64 : 13,
    UINT8_ARRAY : 14,
    UINT16_ARRAY : 15,
    UINT32_ARRAY : 16,
    UINT64_ARRAY : 17,
    DATA : 18,
    OBJECT : 19,
    OBJECT_ARRAY : 20,
    
    
}



var GNProtocolData = new Array;

GNProtocolData[GNProtocolNo.SCDebugInfo] = { paramList:[[GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCIncorrectVersion] = { paramList:[[GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.CSUserReOnline] = { paramList:[[GNParamType.UINT16,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCUserReOnlineBack] = { paramList:[[GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.CSUserOffline] = { paramList:[[GNParamType.DATA]], handler:null };
GNProtocolData[GNProtocolNo.SCPushUserInfo] = { paramList:[[GNParamType.STRING,GNParamType.STRING,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING],[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING]]], handler:null };
GNProtocolData[GNProtocolNo.CSGetCaptcha] = { paramList:[[GNParamType.UINT32,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCCaptchaBack] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSSendRegister] = { paramList:[[GNParamType.UINT16,GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING,GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCSendRegisterBack] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSSendLogin] = { paramList:[[GNParamType.UINT16,GNParamType.UINT32,GNParamType.UINT8,GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCSendLoginBack] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSGetPictureBeforeLogin] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCSendPicture] = { paramList:[[GNParamType.UINT32,GNParamType.STRING,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT8,GNParamType.STRING]]], handler:null };
GNProtocolData[GNProtocolNo.CSGetUserOldChatListInfo] = { paramList:[[GNParamType.UINT64]], handler:null };
GNProtocolData[GNProtocolNo.CSGetUserOldChatListInfoBack] = { paramList:[[GNParamType.UINT8,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT8,GNParamType.UINT64]]], handler:null };
GNProtocolData[GNProtocolNo.SCPushUserNewChatListInfo] = { paramList:[[[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT8,GNParamType.UINT64]]], handler:null };
GNProtocolData[GNProtocolNo.CSGetChatRecord] = { paramList:[[GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCGetChatRecordBack] = { paramList:[[GNParamType.UINT8,GNParamType.UINT8,GNParamType.UINT32,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT64,GNParamType.STRING]]], handler:null };
GNProtocolData[GNProtocolNo.SCPushChatRecord] = { paramList:[[GNParamType.UINT32,GNParamType.INT8,GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT8,GNParamType.UINT64,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.CSSendChatRecord] = { paramList:[[GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT8,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCSendChatRecordBack] = { paramList:[[GNParamType.UINT8,GNParamType.UINT8,GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT64]], handler:null };
GNProtocolData[GNProtocolNo.CSSendMarkChatRecord] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.CSAddFriend] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCAddFriendReply] = { paramList:[[GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.SCAddFriendRequest] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.CSReplyAddFriend] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.SCAddFriendResult] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSRemoveFriend] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCRemoveFriendResult] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSQueryUsrs] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCQueryUsrsReply] = { paramList:[[GNParamType.UINT32,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32]]], handler:null };
GNProtocolData[GNProtocolNo.CSQueryGroupUsrs] = { paramList:[], handler:null };
GNProtocolData[GNProtocolNo.SCQueryGroupUsrsReply] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32]]], handler:null };
GNProtocolData[GNProtocolNo.CSQueryUsrGroups] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCQueryUsrGroupsReply] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32]]], handler:null };
GNProtocolData[GNProtocolNo.CSCreateGroup] = { paramList:[[GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCCreateGroupResult] = { paramList:[[GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.CSQueryGroup] = { paramList:[[GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCQueryGroupReply] = { paramList:[], handler:null };
GNProtocolData[GNProtocolNo.CSAlterGroupInfo] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCAlterGroupInfo] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.CSAsk2JoinGroup] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCAsk2JoinGroupReply] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.SCInformGroupManagerAllowJoin] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.CSGroupManagerProcess] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.SCInformJoinGroupResult] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSQuitGroup] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCQuitGroupReply] = { paramList:[[GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSKickGroupMember] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCKickGroupMemberReply] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSDissolveGroup] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCDissolveGroupReply] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.CSGetUsrFriends] = { paramList:[[GNParamType.DATA]], handler:null };
GNProtocolData[GNProtocolNo.SCGetUsrFriendsReply] = { paramList:[], handler:null };
GNProtocolData[GNProtocolNo.CSGetUsrGroups] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCGetUsrGroupsReply] = { paramList:[], handler:null };
GNProtocolData[GNProtocolNo.CSGetUsrFriendsInfo] = { paramList:[], handler:null };
GNProtocolData[GNProtocolNo.SCGetUsrFriendsInfoReply] = { paramList:[], handler:null };

GNProtocolData[GNProtocolNo.SCGetLeaveNumProtocolBack] = { paramList:[[GNParamType.UINT8]], handler:null };
GNProtocolData[GNProtocolNo.CSibeaconWelcomProtocol] = { paramList:[[GNParamType.STRING,GNParamType.STRING]], handler:null };
GNProtocolData[GNProtocolNo.SCibeaconWelcomProtocolBack] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.CSStartTestingProtocol] = { paramList:[[GNParamType.UINT64,GNParamType.STRING,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCStartTestingProtocolBack] = { paramList:[[GNParamType.UINT64,[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.STRING]]], handler:null };

GNProtocolData[GNProtocolNo.CSTestApp] = { paramList:[[GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCTestApp] = { paramList:[[GNParamType.UINT8_ARRAY]], handler:null };

GNProtocolData[GNProtocolNo.CSiBeaconTestOldversion] = { paramList:[[[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.UINT32]]], handler:null };
GNProtocolData[GNProtocolNo.CSiBeaconTest] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT32]], handler:null };
GNProtocolData[GNProtocolNo.SCiBeaconTest] = { paramList:[[[GNParamType.OBJECT_ARRAY,GNParamType.OBJECT,GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT32]]], handler:null };
GNProtocolData[GNProtocolNo.CSiBeaconNormalCheckIn] = { paramList:[[GNParamType.UINT32,GNParamType.UINT32,GNParamType.UINT32]], handler:null };

var GNVersionNo = 10000;