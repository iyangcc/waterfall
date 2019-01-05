/**
 * Created by zhangziyang on 2018/1/14.
 */
/**
 * 功能：自定义提示框拖拽
 * @param ele 拖拽点击的位置
 * @param box 拖拽的范围盒子
 * @param target 拖拽的盒子
 * @constructor
 */
var boxleft = 0;
var boxtop = 0;
var marginLeft;
var marginTop;

var e_boxAll = document.querySelectorAll('.e-box');

(function(){
    for(var i = 0;i < e_boxAll.length;i++){
        boxtop =  e_boxAll[i].style.top;
        boxleft = e_boxAll[i].style.left;
    }
})();

//拖拽
function drag(ele,box,target) {
    ele.onmousedown = function (event) {
        event = event || window.event;
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        //鼠标点击后距离移动盒子的距离
        var x = pagex - target.offsetLeft;
        var y = pagey - target.offsetTop;
        box.onmousemove = function (event) {
            event = event || window.event;
            //清除之前样式里设置的偏移
            target.style.marginLeft = '0';
            target.style.marginTop = '0';
            var pageX = event.pageX || scroll().left + event.clientX;
            var pageY = event.pageY || scroll().top + event.clientY;

            //获取鼠标移动时距离主体的距离;
            var xx = pageX - x;
            var yy = pageY - y;

            if (xx < 0) {
                xx = 0;
            }
            if (yy < 0) {
                yy = 0;
            }
            if (xx > clinet().width - target.offsetWidth) {
                xx = clinet().width - target.offsetWidth;
            }
            if (yy > clinet().height - target.offsetHeight) {
                yy = clinet().height - target.offsetHeight;
            }

            target.style.left = xx + "px";
            target.style.top = yy + "px";

            //禁止文本选中（选中后取消）
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    box.onmouseup = function (event) {
        box.onmousemove = null;
    }
}

//提示信息盒子复位
function resetBox(){
    for(var i = 0;i < e_boxAll.length;i++){
        e_boxAll[i].style.top = boxtop;
        e_boxAll[i].style.left = boxleft;
        e_boxAll[i].style.marginLeft = -200+'px';
        e_boxAll[i].style.marginTop = -130+'px';
    }
}