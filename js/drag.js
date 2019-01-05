/**
 * Created by zhangziyang on 2018/1/14.
 */
/**
 * ���ܣ��Զ�����ʾ����ק
 * @param ele ��ק�����λ��
 * @param box ��ק�ķ�Χ����
 * @param target ��ק�ĺ���
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

//��ק
function drag(ele,box,target) {
    ele.onmousedown = function (event) {
        event = event || window.event;
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        //�����������ƶ����ӵľ���
        var x = pagex - target.offsetLeft;
        var y = pagey - target.offsetTop;
        box.onmousemove = function (event) {
            event = event || window.event;
            //���֮ǰ��ʽ�����õ�ƫ��
            target.style.marginLeft = '0';
            target.style.marginTop = '0';
            var pageX = event.pageX || scroll().left + event.clientX;
            var pageY = event.pageY || scroll().top + event.clientY;

            //��ȡ����ƶ�ʱ��������ľ���;
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

            //��ֹ�ı�ѡ�У�ѡ�к�ȡ����
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    box.onmouseup = function (event) {
        box.onmousemove = null;
    }
}

//��ʾ��Ϣ���Ӹ�λ
function resetBox(){
    for(var i = 0;i < e_boxAll.length;i++){
        e_boxAll[i].style.top = boxtop;
        e_boxAll[i].style.left = boxleft;
        e_boxAll[i].style.marginLeft = -200+'px';
        e_boxAll[i].style.marginTop = -130+'px';
    }
}