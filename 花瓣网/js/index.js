/**
 * Created by 王陈培 on 2019/1/22.
 */
    (function(window){
        //1.调用选项卡
        tab();

        //2.动态创建元素
        autoCreateImg();

        //3瀑布流布局
        setInterval(function(){
            waterFull("dom_pull","box");
        },200);

        window.onscroll=function(){
            if(checkWillLoadImage()){
                autoCreateImg();
                waterFull("dom_pull","box");
            }
            var scrollT=scroll().top;
            if(scrollT>150){
                $("top_nav").style.display="block";
                $("elevator").style.display="block";
            }else{
                $("top_nav").style.display="none";
                $("elevator").style.display="none";
            }
            $("elevator").onclick=function(){
                buffer(document.documentElement,{scrollTop:0},null);
            }
        };

        maskClose();

        bannerAutoPlay();
    })(window);
/**
 *选项卡
 */
function tab(){
    var allLis=$("tab_header").getElementsByTagName("li");
    var doms=$("tab_content").getElementsByClassName("dom");
    var lastOne=0;
    for(var i=0;i<allLis.length;i++){
        (function(i){
            allLis[i].onclick=function(){
                allLis[lastOne].className="";
                doms[lastOne].style.display="none";
                this.className="current";
                doms[i].style.display="block";
                lastOne=i;
            }
        })(i)
    }
}

/**
 * 自动创建图片
 */
function autoCreateImg(){
    var json = [
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'images/0.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'images/1.jpg'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'images/2.jpg'},
        {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'images/3.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/4.jpg'},
        {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: 'images/5.jpg'},
        {txt: '我总是在日暮时分,书影与书影之间,宁静的悲哀里,最想念你。——亦舒', pic: 'images/6.jpg'},
        {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'images/7.jpg'},
        {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'images/8.jpg'},
        {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'images/9.jpg'},
        {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'images/10.jpg'},
        {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'images/11.jpg'},
        {txt: '人都会孤独，但唯独他，可以越过这尘世的热闹，一眼明白这世间所有的繁华不过是他身边的过眼云烟。', pic: 'images/12.jpg'},
        {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'images/13.jpg'},
        {txt: '每一个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'images/14.jpg'},
        {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'images/15.jpg'},
        {txt: '其实我不是一定要等你，只是等上了，就等不了别人了。——《朝露若颜》', pic: 'images/16.jpg'},
        {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切的怀念。——普希金', pic: 'images/17.jpg'},
        {txt: '多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'images/18.jpg'},
        {txt: '不在任何东西面前失去自我，哪怕是教条，哪怕是别人的目光，哪怕是爱情。——《成为简·奥斯汀》', pic: 'images/19.jpg'},
        {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'images/20.jpg'},
        {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'images/21.jpg'},
        {txt: '若只是喜欢 何必夸张成爱。——林夕', pic: 'images/22.jpg'},
        {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'images/23.jpg'},
        {txt: '与众不同的你是幸运的，何必让自己变得与别人一样。', pic: 'images/24.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'images/25.jpg'},
        {txt: '一个人知道自己为什么而活，就能忍受任何生活。——尼采', pic: 'images/26.jpg'},
        {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'images/27.jpg'},
        {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'images/28.jpg'},
        {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'images/29.jpg'}
    ],str,txt,pic,htmlStr;
    for(var i=0;i<30;i++){
        str=$("dom_pull").innerHTML;
        txt=json[i].txt;
        pic=json[i].pic;

        htmlStr="<dov class='box'>"+
                "<div class='pic'>"+
                "<img src="+pic+" alt='' title="+txt+">"+
                "<div class='cover'></div>"+
                "</div>"+
                "<p>"+txt+"</p>"+
                "<div class='btn-box'>"+
                "<a href='#' class='collect'>采集</a>"+
                "<a href='#' class='like'>"+
                "<span class='heart'></span>"+
                "</a></div></div>";
        str+=htmlStr;
        $("dom_pull").innerHTML=str;
    }


    var wrapBox=$("dom_pull").getElementsByClassName("box");
    var wrapPic=$("dom_pull").getElementsByClassName("pic");
    for(var j=0;j<wrapBox.length;j++){
        wrapBox[j].onmouseover=function(){
            this.children[2].style.display="block";
        };
        wrapBox[j].onmouseout=function(){
            this.children[2].style.display="none";
        };
        wrapPic[j].onmouseover=function(){
            this.children[1].style.display="block";
        };
        wrapPic[j].onmouseout=function(){
            this.children[1].style.display="none";
        }
    }
}

/**
 * 瀑布流
 * @param parent
 * @param child
 */
function waterFull(parent,child) {
    var allBox = $(parent).getElementsByClassName(child);
    var boxWidth = allBox[0].offsetWidth;
    var screenW = $(parent).offsetWidth;
    var cols = parseInt(screenW / boxWidth);

    var heightArr = [], boxHeight, minBoxHeight, minBoxIndex, xyMargin=16;
    for (var i = 0; i < allBox.length; i++) {
        boxHeight = allBox[i].offsetHeight+xyMargin;
        if(i<cols){
            heightArr.push(boxHeight);
            allBox[i].style.position="absolute";
            allBox[i].style.left=i*(boxWidth+xyMargin)+'px';
            allBox[i].style.top=xyMargin+'px';
        }else{
            minBoxHeight= Math.min.apply(this,heightArr);
            minBoxIndex=getBoxIndex(heightArr,minBoxHeight);
            allBox[i].style.position="absolute";
            allBox[i].style.left=minBoxIndex*(boxWidth+xyMargin)+'px';
            allBox[i].style.top=minBoxHeight+xyMargin+'px';
            heightArr[minBoxIndex]+=boxHeight;
        }
    }

    //更新父盒子的高度
    var parentH=allBox[allBox.length-1].offsetTop+allBox[allBox.length-1].offsetHeight;
    $(parent).style.height=parentH+'px';
}
function getBoxIndex(arr,val){
    for(var i=0;i<arr.length;i++){
        if(arr[i]===val){
            return i;
        }
    }
}

function checkWillLoadImage(){
    var dom_pull=document.getElementById('dom_pull');
    var allBox=dom_pull.children;
    var lastBox=allBox[allBox.length-1];
    var lastBoxDis=lastBox.offsetHeight*0.5+lastBox.offsetTop;
    var screenH=document.body.clientHeight||document.documentElement.clientHeight;
    var scrollTop=scroll().top;
    return lastBoxDis<=screenH+scrollTop;
}

/**
 * 登陆面板
 */
function maskClose(){
    var login=document.getElementById('login');
    var mask=document.getElementById('mask');
    var close_btn=document.getElementById('close_btn');
    login.onclick=function(){
        mask.style.display='block';
    };
    close_btn.onclick=function(){
        mask.style.display='none';
    };
}

/**
 * 图片轮播
 */
function bannerAutoPlay(){
    var lis=$('slider_banner').getElementsByTagName('li');
    var index=0;
    setInterval(function(){
        for(var i=0;i<lis.length;i++){
            buffer(lis[i],{opacity:0},null);
        }
        buffer(lis[index],{opacity:1},null);
        index++;
        if(index === lis.length){
            index = 0;
        }
    },2000);
}

function $(id){
    return typeof  id==="string"?document.getElementById(id):null;
}
