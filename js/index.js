/**
 * Created by zhangziyang on 2018/1/12.
 */
imgLocation();

$(function() {
    // var load = $(".loading");
    var body = document.body;
    var eamil = document.getElementsByClassName("email")[0]
    var mask = document.getElementsByClassName("mask")[0];
    var e_box = document.getElementsByClassName("e-box")[0];
    var drop = e_box.firstElementChild || e_box.firstChild;
    var close = document.getElementsByClassName("close")[0];
    var retop = document.getElementsByClassName("retop")[0];

    eamil.onclick = function (event) {
        event = event || window.event;
        //阻止冒泡
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
        tipsum = 0;
        show(mask);
        $("#tips").hide();
        resetBox();
    }

    var pro7Hd = document.querySelector('.prompt_7 .hd');
    var pro15Hd = document.querySelector('.prompt_15 .hd');
    var ask = document.querySelector('.ask');
    var prom7 = document.querySelector('.prompt_7 .e-box');
    var prom15 = document.querySelector('.prompt_15 .e-box');

    drag(drop,mask,e_box);
    drag(pro7Hd,ask,prom7);
    drag(pro15Hd,ask,prom15);


    close.onclick = function () {
        hide(mask);
        window.clearInterval(tim);
    }

    $(".loading").on('click',function(){
      imgLocation();
      var t = setTimeout(uploadItem,250);
    });  
   
    //返回顶部
    retop.onmouseover = function () {
        retop.children[0].style.display = "inline-block";
        retop.children[1].style.backgroundColor = "#bdbdbd";
    }
    retop.onmouseout = function () {
        retop.children[0].style.display = "none";
        retop.children[1].style.backgroundColor = "#979797";
    }
    var leader = 0;
    var target = 0;
    var timer = null;
    window.onscroll = function () {
        var vale = scroll().top;
        vale > 0 ? show(retop) : hide(retop);
        leader = scroll().top; //模拟获取当前屏幕的top值
    }
    retop.onclick = function () {
        clearInterval(timer);
        timer = setInterval(function () {
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);   // 去往页面中的某个位置
            //console.log(leader);
            if (leader == target) {
                clearInterval(timer);
            }
        }, 15);
    }


});

function imgLocation(){
   // 发送ajax请求
   $.ajax({
       url:'php/index.php',
       method:'get',
       dataType:'json',
       success:function(data){
           // 数组  转化为 js数组
           // 包装为一个对象
           var backObj = {
               items:data
           };
           // 调用模板引擎 获取 生成的html
           var resultStr = template('template',backObj);

           // 添加到界面上
           $('.items').append(resultStr);

           // 直接调用 我们封装好的 瀑布流方法 即可完成布局
           // 需要导入 自己写的jq插件
           $('.items').waterfall();

       }
   })
}


