/**
 * Created by zhangziyang on 2018/1/3.
 */
//��Ӳ��
$.fn.extend({
    waterfall:function(){
        //����1
        //1����$_���� ���� �۲�
        var $_this = this;
        var totalWidth = $_this.width();
        var itemWidth = $_this.children('.item').width();
        var colNum = Math.floor(totalWidth/itemWidth);
        //1.4��� ���ܿ��-����*��Ԫ�ؿ�ȣ�/������-1��
        var margin = (totalWidth-colNum*itemWidth)/(colNum-1);

        // ����2
        //2.1 �߶�����
        var heightArr = [];
        for(var i = 0;i < colNum;i++){
            heightArr[i] = 0;
        }
        //2.2 ѭ����Ԫ�� ��ȡ��������С������
        // �޸ĵ�ǰѭ����Ԫ�ص� top �Լ� leftֵ
        // jq�� ѭ������ķ���
        $_this.children('.item').each(function(index,element){
            //��ȡ��ǰѭ����Ԫ�صĸ߶�
            var currentHeight = $(element).height();
            // �����Ԫ�ط����ĸ�λ��
            // �ȼ�������Ϊ0������Сֵ
            var minIndex = 0;
            var minHeight = heightArr[0];
            for(var i = 0;i < heightArr.length;i++){
                if(heightArr[i] < minHeight){
                    minHeight = heightArr[i];
                    minIndex = i;
                }
            }
            //ѭ������С�ĸ߶ȼ���С������ֵ
            //���ø���ǰѭ������Ԫ��
            //top �߶�Ϊ�����������С�߶�
            //left ����Ϊ ���*���� + ����*���
            $(element).css({
                top: minHeight,
                left: minIndex*itemWidth+minIndex*margin
            });
            //2.3 �޸�2.1�д����ĸ߶�����
            // �޸�minIndex��Ӧ��ֵ
            minHeight += currentHeight;
            //���ϼ�� ����Ӿ�Ч��
            minHeight += margin;
            //��ֵ���߶�����
            heightArr[minIndex] = minHeight;
        });

        //����3 ���ֵ����
        var maxHeight = heightArr[0];
        for (var i = 0; i < heightArr.length; i++) {
            if(heightArr[i]>maxHeight){
                maxHeight = heightArr[i];
            }
        }
        $_this.height(maxHeight);
    }
});