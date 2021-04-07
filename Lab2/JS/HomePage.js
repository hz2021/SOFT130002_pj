
/*Global Variable Area */
let currentPageIndex = 1; //当前图片的页码（注意，这里从1开始而非从0开始）
let isPlaying = false;  //是否有动画正在播放
let autoPlay = true; //是否自动播放动画（鼠标不在图片展示区上的时候为true）
const timePerAnimation = 500;  //每次翻一页的过渡动画时长（单位：ms）
const timePerFrame = 20;   //每一帧持续时长（单位：ms）
const framesPerAnimation = timePerAnimation / timePerFrame; //每次翻一页的过渡动画帧数
const widthPerImg = 600;
const movementPerFrame = widthPerImg / framesPerAnimation; //每一帧滚轮应该向前或向后滚的距离
const imgWheel = document.getElementById("bd").getElementsByClassName("wrap")[0];
const formerImgBt = document.getElementById("bd").getElementsByClassName("arrow_left")[0];
const latterImgBt = document.getElementById("bd").getElementsByClassName("arrow_right")[0];
const pageBts = document.getElementById("bd").getElementsByClassName("buttons")[0].getElementsByTagName("span");
const numberOfPages = pageBts.length;
const wheelWidth=widthPerImg*numberOfPages;
const container = document.getElementsByClassName("container")[0];
const gotoFormerPage = (function ()
{
    let framesHasPlayed = 0;
    let currentLeft;
    return function (shiftPageTimes)//向前翻页次数
    {

        if (!isPlaying)
        {
            let framesInThisAnimation = framesPerAnimation * shiftPageTimes;
            isPlaying = true;
            pageBts[currentPageIndex - 1].removeAttribute("class");
            currentLeft = currentPageIndex * widthPerImg;
            currentPageIndex -= shiftPageTimes;
            if (currentPageIndex <= 0)
                currentPageIndex += numberOfPages;
            let timer = setInterval(function ()
            {
                framesHasPlayed++;
                currentLeft -= movementPerFrame;
                if (currentLeft <= 0)
                    currentLeft += wheelWidth;
                imgWheel.style.left = ("-" + currentLeft + "px");
                if (framesHasPlayed >= framesInThisAnimation)
                {
                    pageBts[currentPageIndex - 1].setAttribute("class", "on");
                    framesHasPlayed = 0;
                    isPlaying = false;
                    clearInterval(timer);
                }
            }, timePerFrame)
        }
    }
})();
const gotoLatterPage = (function ()
{
    let framesHasPlayed = 0;
    let currentLeft;
    return function (shiftPageTimes)
    {
        if (!isPlaying)
        {
            let framesInThisAnimation = framesPerAnimation * shiftPageTimes;
            isPlaying = true;
            pageBts[currentPageIndex - 1].removeAttribute("class");
            currentLeft = currentPageIndex * widthPerImg;
            currentPageIndex += shiftPageTimes;
            if (currentPageIndex > numberOfPages)
                currentPageIndex -= numberOfPages;
            let timer = setInterval(function ()
            {
                framesHasPlayed++;
                currentLeft += movementPerFrame;
                if (currentLeft >= wheelWidth)
                    currentLeft -= wheelWidth;
                imgWheel.style.left = ("-" + currentLeft + "px");
                if (framesHasPlayed >= framesInThisAnimation)
                {
                    pageBts[currentPageIndex - 1].setAttribute("class", "on");
                    framesHasPlayed = 0;
                    isPlaying = false;
                    clearInterval(timer);
                }
            }, timePerFrame)
        }
    }
})();

formerImgBt.onclick = function ()
{
    gotoFormerPage(1)
};
latterImgBt.onclick = function ()
{
    gotoLatterPage(1);
};

container.onmouseover = function ()
{
    autoPlay = false;
};
container.onmouseleave = function ()
{
    autoPlay = true;
};
setInterval(function ()
{
    if (autoPlay)
        gotoLatterPage(1);
}, 2000);


const turnToPage = (function ()
{
    let former,latter;
    return function (targetIndex)
    {
        if (targetIndex!==currentPageIndex)
        {
            former=currentPageIndex-targetIndex;
            if (former<0)
                former+=numberOfPages;
            latter=targetIndex-currentPageIndex;
            if (latter<0)
                latter+=numberOfPages;
            if (former<latter)
                gotoFormerPage(former);
            else
                gotoLatterPage(latter);
        }
    }
})();
for (let i = 0; i < numberOfPages; i++)
{
    pageBts[i].onclick=function ()
    {
        turnToPage(i+1);
    }
}


for (let i = 0; i < editableTdElements.length; i++)
{
    editableTdElements[i].setAttribute("contenteditable", "true");
    editableTdElements[i].onclick = function ()
    {
        if (editingTdElementIndex!==i)
        {
            this.style.backgroundColor = "#fffec5";
            this.focus();
            let range = window.getSelection();
            range.selectAllChildren(this);
            range.collapseToStart();
            editingTdElementIndex=i;
        }
    };
    editableTdElements[i].onblur = function ()
    {
        this.style.backgroundColor = "#ffffff";
        editingTdElementIndex=undefined;
    };
}
