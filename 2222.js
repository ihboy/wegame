$(function(){
    var flag2 ,flag3,flag4,flag5;
    addEvent(window,'scroll',function(){
        var top = $(document).scrollTop();
        var h = $(document).height();//ҳ���ܸ߶�
        var h1 = $(window).height(); //ҳ����ʾ����߶�
        if((top/h1)>1&&(top/h1)<=2){
            if(!flag2){
                flag2 = true;
                _hmt.push(['_trackEvent', 'sem_scroll', h1 , "�û�������"+2+"��"]);
            }
        }else if((top/h1)>2&&(top/h1)<=3){
            if(!flag3){
                flag3 = true;
                _hmt.push(['_trackEvent', 'sem_scroll', h1 , "�û�������"+3+"��"]);
            }
        }else if((top/h1)>3&&(top/h1)<=4){
            if(!flag4){
                flag4 = true;
                _hmt.push(['_trackEvent', 'sem_scroll', h1 , "�û�������"+4+"��"]);
            }
        }else if((top/h1)>4&&(top/h1)<=5){
            if(!flag5){
                flag5 = true;
                _hmt.push(['_trackEvent', 'sem_scroll', h1 , "�û�������"+5+"��"]);
            }
        }
    });
});
function addEvent(obj,type,fn){
    if(obj.attachEvent){ //ie
        obj.attachEvent('on'+type,function(){
            fn.call(obj);
        })
    }else{
        obj.addEventListener(type,fn,false);
    }
}
