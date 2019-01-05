/**
 * Created by zhangziyang on 2018/1/13.
 */

/*
	需求分析：
	当点击某个模块观看时，倒计时开始计时，当时间剩余总时间7S时提示弹出小礼品对话框，
	1.如果点击了领取则退出，如果选择否则继续计时，当倒计时时间等于0时，则调用停止等待时间函数
	2.当在计时途中点击了突出观看，则把剩余的倒计时总时间赋值给当前访问倒计时总时间。
	3.当再次点击该模块时，如果剩余总时间不等于0，则打开继续观看把上次剩余的时间继续计时。
	4.为了能够让每个对象记录自己的数据定义一个缓存，利用缓存为每个对象记录自己的数据。
 */



var myItems = createCache();

var timout = '';

//所有的item类数组
var itemsArr = new Array();
//初始化小礼品总个数
var totalSmallNum = 0;
//初始化大礼品总个数
var totalBigNum = 0;
//邮箱新提示数目初始化
var tipsum = 0;

//初始化当前item元素7s观看次数
var item7s = 0;
//初始化当前item元素15s观看次数
var item15s = 0;
// 初始化当前item元素总观看次数
var itemNum = 0;

window.onload = function(){
	var myItemArr = document.querySelectorAll('.item');

	setData(myItemArr);

	loadItem(myItemArr);

}

function loadItem(elearr){
	for(var k = 0;k < elearr.length;k++){
		myItems(("item"+k),elearr[k]);
		var myitem = myItems("item"+k);
	}
	setData(elearr);
}

function uploadItem(){
		var myItemarr = document.querySelectorAll('.item');
		loadItem(myItemarr);

}

//修改邮箱内的礼品数
function  reward(totalSmall,totalBig ){
	var  smallText = document.querySelector('#samllnum');
	var  bigText = document.querySelector('#bignum');
	smallText.innerHTML = totalSmall;
	bigText.innerHTML = totalBig;
}    

//修改邮箱提示数
function rewardTips(tipsNum){
	var tipsText = document.querySelector("#tips");
	if(tipsNum>0){
		show(tipsText);
		tipsText.innerHTML = tipsNum;
	}else{
		hide(tipsText);
	}
	//reward(s,b);
}

//修改当前元素7s的总数
function currentItem7(i){
	getFirstNode(myItems("item"+i).children[1]).innerHTML = itemsArr[i]['pr7s'];
	currentItemS(i);
}

 //修改当前元素15s的总数
function currentItem15(i){
	getFirstNode(myItems("item"+i).children[2]).innerHTML = itemsArr[i]['pr15s'];
	currentItemS(i);
}

 //修改当前元素观看的总数
function currentItemS(i){
	getFirstNode(myItems("item"+i).children[3]).innerHTML = itemsArr[i]['prsum'];
}

function setData(arr){
	for(var n = 0;n < arr.length;n++){
    //批量定义变量
	    var m = "item"+n.toString();
	    m = {};
	   	m['pr7s'] = 0;
	    m['pr15s'] = 0;
	    m['prsum'] = 0;
	    m['stime'] = 60;
	    m['wtime'] = 15;
	    m['utime'] = 0;
	    m['stopTimer'] = '';
	    itemsArr.push(m);
	    // console.log(m);
  	}
  	// console.log(itemsArr);
}

//创建缓存
function createCache(){
	//cache对象中以键值对的形式存储我们的缓存数据
	var cache = {};
	//index数组中该存储键，这个键是有顺序，可以方便我们做超出容量的处理
	var index = [];
	return function(key,value) {
		//如果传了值，就说名是设置值
		if(value !== undefined && key !== null){
			//将数据存入cache对象，做缓存
			cache[key] = value;
			//将键存入index数组中，以和cache中的数据进行对应
			index.push(key);
		}
		//如果键为空 则是获取该值得键
		else if(key === null){
			var car = {};
			for(var ky in cache){
				if(cache[ky] === value){
					return ky;
				}
			}
		}else{
			//如果没有传值，只传键，那就是获取值
			return cache[key];
		}
	}
}