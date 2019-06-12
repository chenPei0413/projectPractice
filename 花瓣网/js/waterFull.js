/**
 * Created by 王陈培 on 2019/1/7.
 */
function waterFull(parent,child){
    var allBox=$(parent).getElementsByClassName(child);
    //求出子盒子宽度
    var boxWidth=allBox[0].offsetWidth;
    //求出总宽度
    var screenW=document.documentElement.clientWidth;
    //求出列数
    var cols=parseInt(screenW/boxWidth);

    $(parent).style.width=cols*boxWidth+'px';
    //居中
    $(parent).style.margin="0 auto";

    var heightArr=[],boxHeight,minBoxHeight= 0,minBoxIndex=0;
    for(var i=0;i<allBox.length;i++){
        //求出每个盒子的高度
        boxHeight=allBox[i].offsetHeight;
        //取出第一行盒子的高
        if(i<cols){
            heightArr.push(boxHeight);
            allBox[i].style='';
        }else {
            minBoxHeight= _.min(heightArr);
            minBoxIndex=getBoxIndex(heightArr,minBoxHeight);
            allBox[i].style.position="absolute";
            allBox[i].style.left=minBoxIndex*boxWidth+'px';
            allBox[i].style.top=minBoxHeight+'px';
            //更新数组中的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
    console.log(heightArr);
}
function getBoxIndex(arr,val){
    for(var i=0;i<arr.length;i++){
        if(arr[i]===val){
            return i;
        }
    }
}
function $(id){
    return typeof id==="string"?document.getElementById(id):null;
}
function checkWillLoadImage(){
    var main=document.getElementById('main');
    var allBox=main.children;
    var lastBox=allBox[allBox.length-1];
    var lastBoxDis=lastBox.offsetHeight*0.5+lastBox.offsetTop;
    var screenH=document.body.clientHeight||document.documentElement.clientHeight;
    var scrollTop=scroll().top;
    return lastBoxDis<=screenH+scrollTop;
}