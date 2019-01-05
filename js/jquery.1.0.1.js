/**
 * Created by zhangziyang on 2017/12/14.
 */

/**
 * 功能： 获取id
 * @param id
 * @returns {Element}
 */
function getELeId(id){
    return document.getElementById(id);
}

/**
 * 功能： 获取classname
 * @param cla
 * @returns {NodeList}
 */
function getEleClass(cla){
    return document.getElementsByClassName(cla);
}

/**
 * 功能： 给定元素查找他的第一个元素子节点，并返回
 * @param ele
 * @returns {Element|*|Node}
 */
function getFirstNode(ele){
    return ele.firstElementChild || ele.firstChild;
}

/**
 * 功能： 给定元素查找他的最后一个元素子节点，并返回
 * @param ele
 * @returns {Element|*|Node}
 */
function getLastNode(ele){
    return ele.lastElementChild || ele.lastChild;
}

/**
 * 功能： 给定元素查找他的下一个兄弟元素节点，并返回
 * @param ele
 * @returns {Element|*|Node}
 */
function getNextSlibing(ele){
    return ele.nextElementSibling || ele.nextSibling;
}

/**
 * 功能： 给定元素查找他的前一个兄弟元素节点，并返回
 * @param ele
 * @returns {Element|*|Node}
 */
function getPreviousSlibing(ele){
    return ele.previousElementSibling || ele.previousSibling;
}

/**
 * 功能： 给定元素查找他的指定的兄弟元素节点，并返回
 * @param ele  元素
 * @param index   索引值
 * @returns {*|HTMLElement}
 */
function getEleOfIndex(ele,index){
    return ele.parentNode.children[index];
}

/**
 * 功能： 给定元素查找他的所有兄弟元素节点，并返回
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
 * 功能：检测浏览器的宽高
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function clinet(){
    return {
        "width": window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        "height": window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

/**
 * 功能：浏览器卷去部分的兼容写法
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll(){
    return {
        "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        "left": window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}

/**
 * 功能：单属性缓动动画
 * @param ele 元素
 * @param attr 属性
 * @param target 目标值
 * @param t 时间
 */
function animate(ele,attr,target,t){
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //四部
        //获取当前元素的属性值
        var leader = parseInt(getStyle(ele,attr)) || 0;
        //1.获取步长
        var step = (target - leader)/10;
        //2.二次加工步长
        step = step>0?Math.ceil(step):Math.floor(step);
        leader = leader + step;
        //3.赋值
        ele.style[attr] = leader + "px";
        //4.清除定时器
        if(Math.abs(target-leader)<=Math.abs(step)){
            ele.style[attr] = target + "px";
            clearInterval(ele.timer);
        }
    },t);
}

/**
 * 功能：多属性缓动动画
 * @param ele 元素
 * @param json 多属性对象
 * @param t 时间
 */
function animates(ele,json,t){
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则
        var bool = true;
        //遍历属性和值，分别单独处理json
        //attr == k(键)    target == json[k](值)
        for(var k in json){
            //四步
            var leader = parseInt(getStyle(ele,k)) || 0;
            //1.获取步长
            var step = (json[k] - leader)/10;
            //2.二次加工步长
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //3.赋值
            ele.style[k] = leader + "px";
            //4.清除定时器
            //判断: 目标值和当前值的差大于步长，就不能跳出循环
            //不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
            if(json[k] !== leader){
                bool = false;
            }
        }
        //只有所有的属性都到了指定位置，bool值才不会变成false；
        if(bool){
            clearInterval(ele.timer);
        }
    },t);
}

/**
 * 功能：回调函数多属性动画
 * @param ele 元素
 * @param json json对象
 * @param fn 回调函数
 * @param n n取1为匀速
 * @param t 时间
 */
function animaten(ele,json,fn,n,t){
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则
        var bool = true;
        //遍历属性和值，分别单独处理json
        //attr == k(键)    target == json[k](值)
        for(var k in json){
            //四步
            var leader;
            //判断如果属性为opacity的时候特殊获取值 opacity是百分制为了方便计算
            if(k === "opacity"){
                leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }
            //1.获取步长
            var step = (json[k] - leader)/n;
            //2.二次加工步长
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //3.赋值
            ele.style[k] = leader + "px";
            //特殊情况特殊赋值
            if(k === "opacity"){
                ele.style[k] = leader/100;
                //兼容IE678
                ele.style.filter = "alpha(opacity="+leader+")";
                //如果是层级，一次行赋值成功，不需要缓动赋值
                //为什么？需求！
            }else if(k === "zIndex"){
                ele.style.zIndex = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
            //4.清除定时器
            //判断: 目标值和当前值的差大于步长，就不能跳出循环
            //不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
            if(json[k] !== leader){
                bool = false;
            }
        }
        //只有所有的属性都到了指定位置，bool值才不会变成false；
        if(bool){
            clearInterval(ele.timer);
            //所有程序执行完毕了，现在可以执行回调函数了
            //只有传递了回调函数，才能执行
            if(fn){
                fn();
            }
        }
    },t);
}

/**
 * 功能：检测屏幕的尺寸
 * @returns {{width: Number, height: Number}}
 */
function screen() {
    return {
        "width": window.screen.width,
        "height": window.screen.height
    }
}

/**
 * 功能：显示
 * @param ele
 */
function show(ele) {
    ele.style.display = "block";
}

/**
 * 功能：隐藏
 * @param ele
 */
function hide(ele) {
    ele.style.display = "none";
}

/**
 * 功能：兼容方法获取元素样式
 * @param ele 元素
 * @param attr 属性
 * @returns {*}
 */
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}
/**
 * 功能：去除字符串前后的空白字符
 * @param str 字符串
 * @returns {XML|string|void}
 */
function trim(str){
    var stri = str.replace(/(^\s+)|(\s+$)/g,"");
    return stri;
}