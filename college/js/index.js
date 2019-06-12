/**
 * Created by 王陈培 on 2019/5/5.
 */
$(function(){
    $(window).on("resize",function(){
        var clientW = $(window).width();
        var isShowBigImage = clientW >= 640;
        var $allItems = $("#lk_carousel .item");
        $allItems.each(function(index,item){
            var src = isShowBigImage ? $(item).data("lg-img") : $(item).data("sm-img");
            var imgUrl = 'url("' + src +'")';
            $(item).css({
                backgroundImage: imgUrl
            });
            if(!isShowBigImage){
                var $img = "<img src='"+ src +"'>";
                $(item).empty().append($img);
            }else{
                $(item).empty();
            }
        });
        var $ul = $("#lk_product .nav");
        var $allLis = $("[role='presentation']", $ul);
        // 3.1 遍历
        var totalW = 0;
        $allLis.each(function (index, item) {
            totalW += $(item).width();
        });

        // console.log(totalW);

        var parentW = $ul.parent().width();

        // 3.2 设置宽度
        if(totalW > parentW){
            $ul.css({
                width: totalW + "px"
            })
        }else {
            $ul.removeAttr("style");
        }
    });

    $('[data-toggle="tooltip"]').tooltip();


    $(window).trigger("resize");
    var $navLis = $("#lk_nav li")[2];
    $($navLis).on("click",function(){
        var lkHotW = $("#lk_hot").offset().top;
        $("html,body").animate({scrollTop:lkHotW},1000);
    });
});