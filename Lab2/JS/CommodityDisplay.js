var min = document.querySelector(".min");
var max = document.querySelector(".max");
var img = document.querySelector(".max img");
var fd = document.querySelector(".fd");

min.onmouseover = function(){
//                1.鼠标覆盖显示max和fd
    max.style.display = "block";
    fd.style.display = "block";
}
//            离开时隐藏
min.onmouseout = function(){
    max.style.display = "none";
    fd.style.display = "none";
}
//            2. fd的移动范围
min.onmousemove = function(){
//                鼠标触摸的点
    var x = event.clientX-min.offsetLeft-fd.offsetWidth/2;
    var y = event.clientY-min.offsetTop-fd.offsetHeight/2;
//                最大移动距离
    var maxX = min.clientWidth-fd.offsetWidth;
    var maxY = min.clientHeight-fd.offsetHeight;
//                边界判断
    if (x <= 0) {
        x = 0;
    }else if (x >= maxX) {
        x = maxX;
    }
    if (y <= 0) {
        y = 0;
    }else if (y >= maxY) {
        y = maxY;
    }
//                fd的位置
    fd.style.left = x+'px';
    fd.style.top = y+'px';
    //fd/min = max/img
    //移动比例
    var moveX = x/maxX;
    var moveY = y/maxY;
//                移动
//                3. max的对应显示
//                对于大图而言,放大镜在小图上移动的比例相当于img在可显示区域上移动的比例
//                放大镜右移等于图片左移
//                也就是本质上为img-max 然而而需要负值,则*-1简化后为max-img
    img.style.left = moveX*(max.clientWidth - img.offsetWidth) + 'px';
    img.style.top = moveY*(max.clientHeight - img.offsetHeight) + 'px';

}