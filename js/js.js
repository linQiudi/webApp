
$(function () {
   var $oMain=$("#main");
    var winW = document.documentElement.clientWidth ;//设备的宽
    var winH = document.documentElement.clientHeight;//设备的高
    var desW = 640;
    var desH = 960;
    if(winW/winH<desW/desH){
        $oMain.css("webkitTransform","scale("+winH/desH+")");
        $oMain.css("transform","scale("+winH/desH+")");
    }else{
        $oMain.css("webkitTransform","scale("+winW/desW+")");
        $oMain.css("transform","scale("+winW/desW+")");
    }

    pageStep();
    //设置场景切换函数
    function pageStep(){
        var nIndex=0,nNextIndex=0,step=1/4,bBt=true;
        var $li=$("#list>li");
      
        $li.on("touchstart",function (ev) {
            if(!bBt)return;
            bBt=false;
            var touch=ev.originalEvent.touches[0];
            var curTouch=touch.pageY;
            nIndex=$(this).index();


            $li.on("touchmove.move",function (ev) {

                var touch=ev.originalEvent.touches[0];
                $(this).siblings().hide();//隐藏兄弟们
                //判定是上还是下滑动
                if(curTouch>touch.pageY){//向上滑动
                    nNextIndex=nIndex===$li.length-1?0:nIndex+1;

                    $li.eq(nNextIndex).css("transform","translate(0,"+(winH+ touch.pageY-curTouch)+"px)");
                }else if(curTouch<touch.pageY){//向下滑动
                    nNextIndex=nIndex===0?$li.length-1:nIndex-1;
                    var change=touch.pageY-curTouch;
                    $li.eq(nNextIndex).css("transform","translate(0,"+(-winH+touch.pageY-curTouch)+"px)");
                }
                $li.eq(nNextIndex).show().addClass("zIndex");
                 $(this).css("transform","translate(0,"+(touch.pageY-curTouch)*step+"px) scale("+(1-Math.abs(touch.pageY-curTouch)/winH*(1/3))+")");
                ev.preventDefault();

            })
            $li.on("touchend.move",function (ev) {
                 var touch=ev.originalEvent.changedTouches[0];
                //console.log(ev);
                if(curTouch>touch.pageY){//向上滑动
                    $(this).css('transform','translate(0,'+(-winH*step)+'px) scale('+(1-step)+')');
                }else if(curTouch<touch.pageY){//向下滑动
                    $(this).css('transform','translate(0,'+(-winH*step)+'px) scale('+(1-step)+')');
                }else{
                    bBt=true;
                }
                $(this).css("transition","0.3s");
                $li.eq(nNextIndex).css("transform","translate(0,0)");
                $li.eq(nNextIndex).css('transition','.3s');
                $li.off('.move');

            })
              $li.on("transitionEnd webkitTransitionEnd",function (ev) {

                  if(!$li.is(ev.target)) return;
                  resetFn();


              })
                function resetFn() {
                    $li.eq(nNextIndex).removeClass("zIndex").siblings().hide();
                    $li.css("transition","").css("transform","");
                    bBt=true;
                }



        })


    }





});


/*饼状图*/
var myChart = echarts.init(document.getElementById('li3'));
option = {
    backgroundColor: '#fcf08e',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#fcf08e'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value}),
            roseType: 'angle',
            label: {
                normal: {
                    textStyle: {
                        color: '#fcf08e'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#fcf08e'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChart.setOption(option);
var loading = document.querySelector(".loading");
var num = 0,arr=10;
var p_h1=document.querySelector("#p_h1");
var timer=window.setInterval(load,1000);
function load() {
     num++;
    p_h1.innerHTML+=".";
    loading.style.width = num / arr * 100+"%";
    if(num==14){
        clearInterval(timer);
    }
}
