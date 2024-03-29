
/**
 * Created by 王陈培 on 2019/2/9.
 */
window.onload=function(){
    if(!document.getElementsByClassName){
        document.getElementsByClassName=function(cls){
            var ret=[];
            var els=document.getElementsByTagName('*');
            for(var i=0;i<els.length;i++){
                if(els[i].className===cls || els[i].className.indexOf(cls+' ')>=0 || els[i].className.indexOf(''+cls+'')>=0 || els[i].className.indexOf(''+cls)>=0){
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var cartTable=document.getElementById('cartTable');
    var tr=cartTable.children[1].rows;
    var checkInputs=document.getElementsByClassName('check');
    var checkAllInputs=document.getElementsByClassName('check-all');
    var selectedTotal=document.getElementById('selectedTotal');
    var priceTotal=document.getElementById('priceTotal');
    var selected=document.getElementById('selected');
    var foot=document.getElementById('foot');
    var selectedViewList=document.getElementById('selectedViewList');
    var deleteAll=document.getElementById('deleteAll');

    //计算
    function getTotal(){
        var seleted=0;
        var price=0;
        var htmlStr='';
        for(var i=0;i<tr.length;i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                tr[i].className='on';
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                htmlStr += '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'" alt=""><span class="del" index="'+i+'">取消选择</span></div>';
            }else{
                tr[i].className='';
            }
        }
        selectedTotal.innerHTML=seleted;
        priceTotal.innerHTML=price.toFixed(2);
        selectedViewList.innerHTML=htmlStr;
        if(seleted==0){
            foot.className='foot';
        }
    }

    //小计
    function getSubTotal(tr){
        var tds=tr.cells;
        var price=parseFloat(tds[2].innerHTML);
        var count=parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal=parseFloat(price*count);
        tds[4].innerHTML=SubTotal;
    }

    for(var i=0;i<checkInputs.length;i++){
        checkInputs[i].onclick=function(){
            if(this.className==='check-all check'){
                for(var j=0; j<checkInputs.length ;j++){
                    checkInputs[j].checked=this.checked;
                }
            }
            if(this.checked==false){
                for(var k=0;k<checkAllInputs.length;k++){
                    checkAllInputs[k].checked=false;
                }
            }
            getTotal();
        }
    }

    selected.onclick=function(){
        if(foot.className=="foot"){
            if(selectedTotal.innerHTML!=0){
                foot.className="foot show";
            }else{
                foot.className='foot';
            }
        }else{
            foot.className="foot";
        }
    };

    selectedViewList.onclick=function(e){
        e=event||window.event;
        var el= e.srcElement;
        if(el.className == 'del'){
            var index=el.getAttribute('index');
            var input=tr[index].getElementsByTagName('input')[0];
            input.checked=false;
            input.onclick();
        }
    };

    for(var i=0;i<tr.length;i++){
        tr[i].onclick=function(e){
            e=event||window.event;
            var el= e.srcElement;
            var cls=el.className;
            var input=this.getElementsByTagName('input')[1];
            var val=parseInt(input.value);
            var reduce=this.getElementsByTagName('span')[1];

            switch (cls){
                case 'add':
                    input.value=val+1;
                    reduce.innerHTML="-";
                    break;
                case 'reduce':
                    if(val>1){
                        input.value=val-1;
                    }
                    if(input.value<=1){
                        reduce.innerHTML="";
                        input.value=1;
                    }
                    break;
                case 'delete':
                    var conf=confirm('确定要删除吗');
                    if(conf){
                        this.parentNode.removeChild(this);
                    }
                    break;
                default:
                    break;
            }
            getSubTotal(this);
            getTotal();
        };
        tr[i].getElementsByTagName('input')[1].onkeyup=function(){
            var tr=this.parentNode.parentNode;
            var reduce=tr.getElementsByTagName('span')[1];
            var val=parseInt(this.value);
            if(isNaN(val) || val<1){
                val=1;
            }
            this.value=val;
            if(val<=1){
                reduce.innerHTML="";
            }else{
                reduce.innerHTML="-";
            }
            getSubTotal(this.parentNode.parentNode);
            getTotal();
        }
    }

    deleteAll.onclick=function(){
        if(selectedTotal.innerHTML!=0){
            var conf=confirm('确定要删除选中商品吗');
            if(conf){
                for(var i=0;i<tr.length;i++){
                    var input=tr[i].getElementsByTagName('input')[0];
                    if(input.checked){
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                        selectedTotal.innerHTML=0;
                        priceTotal.innerHTML=0;
                    }
                }
            }
        }
    };
    checkAllInputs[0].checked=true;
    checkAllInputs[0].onclick();
};