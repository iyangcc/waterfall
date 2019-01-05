/**
 * Created by zhangziyang on 2018/1/3.
 */
//添加插件
$.fn.extend({
    waterfall:function(){
        //步骤1
        //1定义$_变量 方便 观察
        var $_this = this;
        var totalWidth = $_this.width();
        var itemWidth = $_this.children('.item').width();
        var colNum = Math.floor(totalWidth/itemWidth);
        //1.4间距 （总宽度-个数*子元素宽度）/（个数-1）
        var margin = (totalWidth-colNum*itemWidth)/(colNum-1);

        // 步骤2
        //2.1 高度数组
        var heightArr = [];
        for(var i = 0;i < colNum;i++){
            heightArr[i] = 0;
        }
        //2.2 循环子元素 获取数组中最小的索引
        // 修改当前循环的元素的 top 以及 left值
        // jq中 循环数组的方法
        $_this.children('.item').each(function(index,element){
            //获取当前循环子元素的高度
            var currentHeight = $(element).height();
            // 计算该元素放在哪个位置
            // 先假设索引为0的是最小值
            var minIndex = 0;
            var minHeight = heightArr[0];
            for(var i = 0;i < heightArr.length;i++){
                if(heightArr[i] < minHeight){
                    minHeight = heightArr[i];
                    minIndex = i;
                }
            }
            //循环完最小的高度及最小的索引值
            //设置给当前循环的子元素
            //top 高度为计算出来的最小高度
            //left 左间距为 宽度*索引 + 索引*间距
            $(element).css({
                top: minHeight,
                left: minIndex*itemWidth+minIndex*margin
            });
            //2.3 修改2.1中创建的高度数组
            // 修改minIndex对应的值
            minHeight += currentHeight;
            //加上间距 提高视觉效果
            minHeight += margin;
            //赋值给高度数组
            heightArr[minIndex] = minHeight;
        });

        //步骤3 最大值保存
        var maxHeight = heightArr[0];
        for (var i = 0; i < heightArr.length; i++) {
            if(heightArr[i]>maxHeight){
                maxHeight = heightArr[i];
            }
        }
        $_this.height(maxHeight);
    }
});