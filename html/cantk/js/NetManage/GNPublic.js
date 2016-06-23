//功能：做参数参数判断的
//参数1：需要判断的参数
//参数2：默认参数(如果传入该参数则返回默认参数，如果不传入则返回未定义)
function  judgeParameter(parameter,youValue)
{
	if(parameter != undefined)
	{
		return parameter;
	}else
	{
		if(youValue == undefined)
		{
			return undefined;
		}else
		{	
			return youValue
		}
	}
}
