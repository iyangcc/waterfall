/**
 * Created by zhangziyang on 2018/1/13.
 */
//定义总时间
var u;
var totalTime;

var timebox = document.getElementsByClassName("time")[0];
var timenum = timebox.children[0];
var ask = document.getElementsByClassName("ask")[0];
var box = document.getElementsByClassName("box")[0];
var video = box.getElementsByTagName("video")[0];
var prompt_7 = document.getElementsByClassName("prompt_7")[0];
var prompt_15 = document.getElementsByClassName("prompt_15")[0];
var proArr = document.getElementsByClassName("pro");
var btn = proArr[1].children[2];
var btn1 = proArr[0].children[1];
var btn2 = proArr[0].children[2];
var timer = '';

var exit = document.getElementsByClassName("exit")[0];


var pro15small = document.querySelector('.prompt_15 .small');
var pro15big = document.querySelector('.prompt_15 .big');

function breakTime(num){

    hide(prompt_15);
    hide(prompt_7);

    totalTime = itemsArr[num]['wtime'];

    u = itemsArr[num]['utime'];
    u++;
    itemsArr[num]['utime'] = u;
    //console.log(u);
    timenum.innerHTML = totalTime;
    //console.log(totalTime);
    totalTime--;
    itemsArr[num]['wtime'] = totalTime;

    if(u == 8){
        if(totalTime == -1){
            hide(prompt_7);
            show(prompt_15);
            hide(pro15big);
            show(pro15small);
            btn.onclick = function(){

                itemsArr[num]['wtime'] = totalTime;
                hide(ask);
                resetBox();
                fulVideo.pause();

                itemsArr[num]['pr7s']++;
                itemsArr[num]['prsum']++;
                totalSmallNum++;
                tipsum++;
                rewardTips(tipsum);
                reward(totalSmallNum,totalBigNum);
                window.clearInterval(tim);
                currentItem7(num);
                stoptimer60(num);
            }
        }else {
            video.pause();
            show(prompt_7);

            window.clearInterval(timer);
            //领取
            btn1.onclick = function () {
                // console.log(num);
                hide(ask);
                resetBox();
                fulVideo.pause();

                itemsArr[num]['utime'] = 0;
                //次数加1
                itemsArr[num]['pr7s']++;
                itemsArr[num]['prsum']++;


                window.clearInterval(tim);
                currentItem7(num);
                tipsum++;
                totalSmallNum++;
                //console.log(totalSmallNum);
                reward(totalSmallNum, totalBigNum);

                rewardTips(tipsum);

            };
            //否
            btn2.onclick = function () {
                hide(prompt_7);

                if (myItems("item" + num).children[0].tagName.toLowerCase() == 'video') {
                    video.play();
                }

                timer = setTimeout("breakTime(" + num + ")", 1000);

            }
        }
    }
    else{

        timer = setTimeout("breakTime("+num+")",1000);
        if(u == 16){
            show(prompt_15);
            hide(pro15small);
            show(pro15big);
            window.clearInterval(timer);
            //确定
            btn.onclick = function(){

                itemsArr[num]['wtime'] = 15;
                hide(ask);
                resetBox();
                fulVideo.pause();

                itemsArr[num]['pr15s']++;
                itemsArr[num]['prsum']++;
                totalBigNum++;
                tipsum++;
                rewardTips(tipsum);
                reward(totalSmallNum,totalBigNum);
                window.clearInterval(tim);
                currentItem15(num);
                stoptimer60(num);
            }
        }
    }
}