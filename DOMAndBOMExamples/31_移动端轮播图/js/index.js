window.onload = function(){
  // 1.获取元素
  const wrap = document.querySelector(".swiper_wrapper");
  const swiper = document.querySelector(".swiper_main");
  const circle = document.querySelector(".swiper_circle");
  let step = wrap.offsetWidth;  // 每次轮播的步长

  // 记录当前轮播位置
  let currentIndex = 0;
  
  // 2.使用定时器自动轮播图片
  let timer = setInterval(function(){
    currentIndex++;
    swiper.style.transition = "all .3s";
    swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
  }, 1500);
  // 监听过渡完成事件transitionend，判断是否滚动到最后一张，实现无缝切换
  swiper.addEventListener("transitionend", function(){
    // 无缝滚动
    if(currentIndex >= 3) {
      currentIndex = 0;
      // 快速跳到目标位置
      swiper.style.transition = "none";
      swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
    }else if(currentIndex < 0) {
      currentIndex = 2;
      swiper.style.transition = "none";
      swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
    }
    // 3.小圆圈跟随轮播变化
    circle.querySelector(".current").classList.remove("current");
    circle.children[currentIndex].classList.add("current");
  })

  let startX = 0;  // 记录手指初始位置
  let moveX = 0;   // 纪录手指移动距离
  let flag = false; // 记录是否移动
  // 4.手指移动切换轮播图
  swiper.addEventListener("touchstart",function(e){
    // 记录初始位置
    startX = e.targetTouches[0].pageX;
    // 手指触摸时停止计时器
    clearInterval(timer);
    // timer = null;
  });
  swiper.addEventListener("touchmove",function(e){
    // 记录移动距离
    moveX = e.targetTouches[0].pageX - startX;
    // 移动目标元素： 原来的位置+移动距离
    let translateX = -currentIndex * step + moveX;
    swiper.style.transition = "none";
    swiper.style.transform = "translateX("+ translateX +"px)";
    flag = true;    //手指移动了才去判断是否轮播
    // 阻止默认屏幕滚动行为
    e.preventDefault();
  })
  swiper.addEventListener("touchend", function(e){
    if(flag) {
      // 移动距离大于50像素再切换轮播图
      if(Math.abs(moveX) > 50) {
        if(moveX > 0) {
          currentIndex--;  // 左滑，播放上一张轮播图
        }else {
          currentIndex++;  // 右滑，播放下一张轮播图
        }
        swiper.style.transition = "all .3s";
        swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
      }else {
        // 移动距离小于50，则回到原来的位置
        swiper.style.transition = "all .1s";
        swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
      }
    }

    //手指离开后重新开启定时器
    clearInterval(timer);
    timer = setInterval(function(){
      currentIndex++;
      swiper.style.transition = "all .3s";
      swiper.style.transform = "translateX("+ (-currentIndex*step) +"px)";
    }, 1500);
  })
}