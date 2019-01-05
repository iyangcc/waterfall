///**
// * Created by zhangziyang on 2018/1/13.
// */

//定义60s倒计时定时器
var stopTimer;
//定义60s页面更新定时器
var sti;

//获取相关dom元素
var ask = document.getElementById('reveal');
var fulVideo = getELeId('fullVideo');
var fulImg = getELeId('fullImg');
var suere60 = getELeId('suere60');

var pro6msk = document.querySelector('#prom');
var pro6m = document.querySelector('#prom s');
var pro6s = document.querySelector('#prom .content');
var pro6sc = document.querySelector('#prom .success');

//鼠标点击
function loadImg(event){
    var event = arguments.callee.caller.arguments[0] || window.event;

    //触发当前事件的对象
    var obj = event.srcElement ? event.srcElement : event.target;
    var objpar = obj.parentElement;
    var parid = myItems(null,objpar);
    //记录是第几个item
    var objnum = parid.slice(4);
    var nm = parseInt(objnum);
    // console.log(typeof nm);
    window.clearInterval(itemsArr[nm]['stopTimer']);

    //console.log(itemsArr[nm]['utime']);
    if(itemsArr[nm]['utime'] === 16 || itemsArr[nm]['wtime'] === -1){
        seeAfter(nm);
        window.clearInterval(timer);
    }else{
        var url = '';
        var curl = obj.src;
        //裁剪src
        var index = curl.lastIndexOf('/');
        var data = parseInt(curl.substring(index+1,curl.length-4));
        var $obj = $(obj);
        url = curl.slice(0,index+1);

        reveal(obj,curl,url,data);

        breakTime(nm);
    }
}

//鼠标移入图片轮播
var t = '';
function Carousel(event){
        //兼容获取事件firefox
       var event = arguments.callee.caller.arguments[0] || window.event;
      //获取触发事件的当前对象
       var obj = event.srcElement ? event.srcElement : event.target;
       var url = obj.src;
      //裁剪src
       var index = url.lastIndexOf('/');
       var data = parseInt(url.substring(index+1,url.length-4));
       var $obj = $(obj);
       url = url.slice(0,index+1);
        //判断如果是img标签则进去
        if(obj.tagName.toLowerCase() == 'img') {
            //判断如果对象里包含gif则判定是gif图，因此上传图片的时候判断不能为gif.jpg
            if (obj.src.match(/^((?!gif).)*$/i)) {
                t = setInterval(function () {
                    data--
                    if (data <= 0) {
                        data = 5;
                    }
                    var atr = url + data + ".jpg";
                    $obj.attr('src', atr);
                }, 1000);
            }else{
                var atr = url + data + ".gif";
                    $obj.attr('src', atr);
            }
        }
}

//鼠标离开事件
function stopCar(event){
    var event = arguments.callee.caller.arguments[0] || window.event;
      //获取触发事件的当前对象
    var obj = event.srcElement ? event.srcElement : event.target;
    var index = obj.src.lastIndexOf('/');
    var data = obj.src.substring(index+1,obj.src.length-4);
    var url = obj.src.slice(0,index+1);
    if(obj.src.match(/^((?!\.gif$).)*$/i)){
        clearInterval(t);
    }else{
         $(obj).attr('src',url+data+".jpg");
    }
}

//弹出层轮播
var tim = '';
function reveal(ele,curl,url,num){
    show(ask);
    //获取到该对象的标签名
    var eleTag = ele.tagName.toLowerCase();
    if(ele.src.match(/^((?!\.gif$).)*$/i)){
         if(eleTag === 'img'){
            hide(fulVideo);
            show(fulImg);
            fulImg.src = curl;
            fulImg.style.marginTop = (fulImg.offsetHeight)/2*-1+'px';
            tim = setInterval(function(){
                num--
                if(num<=0){
                    num = 5;
                }
                var atr = url + num + ".jpg";
                fulImg.setAttribute('src',atr);
            },1000);
        }else{
            hide(fulImg);
            fulVideo.src = curl;
             fulVideo.autoplay = 'autoplay';
             show(fulVideo);
         }
    }else{
        hide(fulVideo);
        show(fulImg);
        fulImg.src = curl;
        fulImg.style.marginTop = (fulImg.offsetHeight)/2*-1+'px';
    }
}
//点击退出观看
function Out(){
    hide(ask);
    window.clearInterval(tim);
    window.clearInterval(timer);
    fulVideo.pause()
}

//60s提示
function seeAfter(num){
    show(pro6msk);
    show(pro6s);
    hide(pro6sc);
    pro6m.innerHTML = itemsArr[num]['stime'];
    stoptimer60(num);
    sti = setInterval(function(){
        pro6m.innerHTML = itemsArr[num]['stime'];
    },1000);
    suere60.onclick=function(){
        //清除更新页面的定时器，防止其他对象计时之后的冲突
        window.clearInterval(sti);
        hide(pro6msk);
    }
}

//视频移入播放
function startplay(event){
    var event = arguments.callee.caller.arguments[0] || window.event;
    //获取事件源
    var obj = event.srcElement ? event.srcElement : event.target;
    obj.play();
    //设置默认播放音量为0.1，当点击播放后自动恢复1
    obj.volume = 0.1;
}

//视频移除停止播放
function endplay(event){
    var event = arguments.callee.caller.arguments[0] || window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    //通过改变播放的当前进度，模拟返回第一帧
    obj.currentTime = 0;
    obj.pause();

}

//60s倒计时定时器
function stoptimer60(num){
    itemsArr[num]['stopTimer'] = setInterval(function(){
        if(itemsArr[num]['stime'] > 0){
            var i = itemsArr[num]['stime']--;
            //console.log(i);
        }else{
            itemsArr[num]['utime'] = 0;
            itemsArr[num]['stime'] = 60;
            itemsArr[num]['wtime'] = 15;
            window.clearInterval(sti);
            hide(pro6s);
            show(pro6sc);
            window.clearInterval(itemsArr[num]['stopTimer']);
        }
    },1000);
}