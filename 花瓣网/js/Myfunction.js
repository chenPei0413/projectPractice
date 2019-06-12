    /**
 * Created by 王陈培 on 2019/1/8.
 */
//获取文档区域的上和左
function scroll(){
    if(window.pageYOffset!==null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.compatMode==="CSS1Compat"){
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else {
        return{
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}

//获取可视区域宽和高
function client(){
    if(window.innerWidth){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else if(document.compatMode==="CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }else{
        return{
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}

//阻止冒泡兼容写法
function show(){
    if(event && event.stopPropagation()){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}

//缓动动画函数
function buffer(obj, json, fn){
    clearInterval(obj.timer);
    var begin, speed, target = 0;
    obj.timer = setInterval(function(){
        var flag = true;
        for(k in json){
            if("opacity" === k){
                begin =  parseInt(parseFloat(getStyleAttr(obj, k)) * 100);
                target = parseInt(parseFloat(json[k]) * 100);
            }else if("scrollTop" === k){
                begin = obj.scrollTop;
                target = parseInt(json[k]);
            }else{
                begin = parseInt(getStyleAttr(obj, k)) || 0;
                target = parseInt(json[k]);
            }
            //求出步长
            speed = (target - begin) * 0.2;
            //取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
            if("opacity" === k){
                //w3c浏览器
                obj.style.opacity = (begin + speed )/ 100;
                //ie浏览器
                obj.style.filter = 'alpha(opacity:'+ (begin + speed ) +')';
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed;
            }else if("zIndex" === k){
                obj.style[k] = json[k];
            }else{
                obj.style[k] = begin + speed + "px";
            }
            if(begin !== target){
                flag = false;
            }
            if(flag){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }
    }, 20);
}

//匀速动画函数
function constant(obj, target, speed) {
    // 1. 清除定时器
    clearInterval(obj.timer);
    // 2. 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;
    // 3. 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + "px";
        if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
            clearInterval(obj.timer);
            obj.style.left = target + "px";
            console.log(obj.offsetLeft, target);
        }
    }, 20);

}

//获取样式兼容函数
function getStyleAttr(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

function $(id){
    return typeof id==="string"?document.getElementById(id):null;
}

//函数节流
function throttle(fn,delay){
    var timer=null;
    return function (){
        clearTimeout(timer);
        timer=setTimeout(fn,delay)
    }
}

