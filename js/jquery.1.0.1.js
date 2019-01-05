/**
 * Created by zhangziyang on 2017/12/14.
 */

/**
 * ���ܣ� ��ȡid
 * @param id
 * @returns {Element}
 */
function getELeId(id){
    return document.getElementById(id);
}

/**
 * ���ܣ� ��ȡclassname
 * @param cla
 * @returns {NodeList}
 */
function getEleClass(cla){
    return document.getElementsByClassName(cla);
}

/**
 * ���ܣ� ����Ԫ�ز������ĵ�һ��Ԫ���ӽڵ㣬������
 * @param ele
 * @returns {Element|*|Node}
 */
function getFirstNode(ele){
    return ele.firstElementChild || ele.firstChild;
}

/**
 * ���ܣ� ����Ԫ�ز����������һ��Ԫ���ӽڵ㣬������
 * @param ele
 * @returns {Element|*|Node}
 */
function getLastNode(ele){
    return ele.lastElementChild || ele.lastChild;
}

/**
 * ���ܣ� ����Ԫ�ز���������һ���ֵ�Ԫ�ؽڵ㣬������
 * @param ele
 * @returns {Element|*|Node}
 */
function getNextSlibing(ele){
    return ele.nextElementSibling || ele.nextSibling;
}

/**
 * ���ܣ� ����Ԫ�ز�������ǰһ���ֵ�Ԫ�ؽڵ㣬������
 * @param ele
 * @returns {Element|*|Node}
 */
function getPreviousSlibing(ele){
    return ele.previousElementSibling || ele.previousSibling;
}

/**
 * ���ܣ� ����Ԫ�ز�������ָ�����ֵ�Ԫ�ؽڵ㣬������
 * @param ele  Ԫ��
 * @param index   ����ֵ
 * @returns {*|HTMLElement}
 */
function getEleOfIndex(ele,index){
    return ele.parentNode.children[index];
}

/**
 * ���ܣ� ����Ԫ�ز������������ֵ�Ԫ�ؽڵ㣬������
 * @param ele
 * @returns {newarr}
 */
function getAllSlibing(ele){
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i = 0;i < arr.length;i++){
        if(arr[i] !== ele){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * ���ܣ����������Ŀ��
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function clinet(){
    return {
        "width": window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        "height": window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

/**
 * ���ܣ��������ȥ���ֵļ���д��
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll(){
    return {
        "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        "left": window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}

/**
 * ���ܣ������Ի�������
 * @param ele Ԫ��
 * @param attr ����
 * @param target Ŀ��ֵ
 * @param t ʱ��
 */
function animate(ele,attr,target,t){
    //���嶨ʱ��
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //�Ĳ�
        //��ȡ��ǰԪ�ص�����ֵ
        var leader = parseInt(getStyle(ele,attr)) || 0;
        //1.��ȡ����
        var step = (target - leader)/10;
        //2.���μӹ�����
        step = step>0?Math.ceil(step):Math.floor(step);
        leader = leader + step;
        //3.��ֵ
        ele.style[attr] = leader + "px";
        //4.�����ʱ��
        if(Math.abs(target-leader)<=Math.abs(step)){
            ele.style[attr] = target + "px";
            clearInterval(ele.timer);
        }
    },t);
}

/**
 * ���ܣ������Ի�������
 * @param ele Ԫ��
 * @param json �����Զ���
 * @param t ʱ��
 */
function animates(ele,json,t){
    //���嶨ʱ��
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //����ԭ��
        var bool = true;
        //�������Ժ�ֵ���ֱ𵥶�����json
        //attr == k(��)    target == json[k](ֵ)
        for(var k in json){
            //�Ĳ�
            var leader = parseInt(getStyle(ele,k)) || 0;
            //1.��ȡ����
            var step = (json[k] - leader)/10;
            //2.���μӹ�����
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //3.��ֵ
            ele.style[k] = leader + "px";
            //4.�����ʱ��
            //�ж�: Ŀ��ֵ�͵�ǰֵ�Ĳ���ڲ������Ͳ�������ѭ��
            //������С���������Ŀ��λ�ú͵�ǰλ�ò���ȣ��Ͳ�����������ʱ����
            if(json[k] !== leader){
                bool = false;
            }
        }
        //ֻ�����е����Զ�����ָ��λ�ã�boolֵ�Ų�����false��
        if(bool){
            clearInterval(ele.timer);
        }
    },t);
}

/**
 * ���ܣ��ص����������Զ���
 * @param ele Ԫ��
 * @param json json����
 * @param fn �ص�����
 * @param n nȡ1Ϊ����
 * @param t ʱ��
 */
function animaten(ele,json,fn,n,t){
    //���嶨ʱ��
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //����ԭ��
        var bool = true;
        //�������Ժ�ֵ���ֱ𵥶�����json
        //attr == k(��)    target == json[k](ֵ)
        for(var k in json){
            //�Ĳ�
            var leader;
            //�ж��������Ϊopacity��ʱ�������ȡֵ opacity�ǰٷ���Ϊ�˷������
            if(k === "opacity"){
                leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }
            //1.��ȡ����
            var step = (json[k] - leader)/n;
            //2.���μӹ�����
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //3.��ֵ
            ele.style[k] = leader + "px";
            //����������⸳ֵ
            if(k === "opacity"){
                ele.style[k] = leader/100;
                //����IE678
                ele.style.filter = "alpha(opacity="+leader+")";
                //����ǲ㼶��һ���и�ֵ�ɹ�������Ҫ������ֵ
                //Ϊʲô������
            }else if(k === "zIndex"){
                ele.style.zIndex = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
            //4.�����ʱ��
            //�ж�: Ŀ��ֵ�͵�ǰֵ�Ĳ���ڲ������Ͳ�������ѭ��
            //������С���������Ŀ��λ�ú͵�ǰλ�ò���ȣ��Ͳ�����������ʱ����
            if(json[k] !== leader){
                bool = false;
            }
        }
        //ֻ�����е����Զ�����ָ��λ�ã�boolֵ�Ų�����false��
        if(bool){
            clearInterval(ele.timer);
            //���г���ִ������ˣ����ڿ���ִ�лص�������
            //ֻ�д����˻ص�����������ִ��
            if(fn){
                fn();
            }
        }
    },t);
}

/**
 * ���ܣ������Ļ�ĳߴ�
 * @returns {{width: Number, height: Number}}
 */
function screen() {
    return {
        "width": window.screen.width,
        "height": window.screen.height
    }
}

/**
 * ���ܣ���ʾ
 * @param ele
 */
function show(ele) {
    ele.style.display = "block";
}

/**
 * ���ܣ�����
 * @param ele
 */
function hide(ele) {
    ele.style.display = "none";
}

/**
 * ���ܣ����ݷ�����ȡԪ����ʽ
 * @param ele Ԫ��
 * @param attr ����
 * @returns {*}
 */
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}
/**
 * ���ܣ�ȥ���ַ���ǰ��Ŀհ��ַ�
 * @param str �ַ���
 * @returns {XML|string|void}
 */
function trim(str){
    var stri = str.replace(/(^\s+)|(\s+$)/g,"");
    return stri;
}