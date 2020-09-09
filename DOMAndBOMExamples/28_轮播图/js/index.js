window.onload = function () {
  const swiper = document.querySelector(".swiper_wrapper");
  const swiper_main = document.querySelector(".swiper_main");
  const swiper_circle = document.querySelector(".swiper_circle");
  const btn_prev = document.querySelector(".btn_prev");
  const btn_next = document.querySelector(".btn_next");

  const circleLength = swiper_main.children.length;
  const swiperWidth = swiper.offsetWidth;

  // 记录当前位置
  let currentIndex = 0;
  // 定时器
  let timer = null;
  /* flag节流阀，当上一个动画执行完毕才允许执行下一次动画（借助animate的回调函数）
  / 目的：避免快速点击图片轮播过快
    原理：回调函数 + 变量控制
  */
  let flag = true;

  // 1. 动态创建小圆圈
  for (let i = 0; i < circleLength; i++) {
    let li = document.createElement("li");
    // 为每个小圆圈编号，作为自定义属性index
    li.setAttribute("index", i);
    // 默认第一个小圆圈高亮
    if (i === currentIndex) li.className = "current";
    swiper_circle.appendChild(li);
    // 6. 点击小圆圈，轮播到指定位置，对应的圆圈高亮
    li.addEventListener("click", function () {
      for (let i = 0; i < circleLength; i++) {
        swiper_circle.children[i].className = "";
      }
      this.className = "current";
      currentIndex = this.getAttribute("index");
      animate(swiper_main, -currentIndex * swiperWidth)
    })
  }

  // 2. 克隆第一个轮播对象，插在轮播主体的最后，实现无缝轮播
  // true 表示克隆该节点包括其后代的所有内容
  let node = swiper_main.children[0].cloneNode(true);
  swiper_main.appendChild(node);

  // 3. 鼠标移入显示前进和后退按钮，移出隐藏
  swiper.addEventListener("mouseenter", function () {
    btn_prev.style.display = "block";
    btn_next.style.display = "block";
    // 停止轮播
    clearInterval(timer);
    timer = null;
  })
  swiper.addEventListener("mouseleave", function () {
    btn_prev.style.display = "none";
    btn_next.style.display = "none";
    // 开始自动轮播
    timer = setInterval(function () {
      btn_next.click();
    }, 2000)
  })

  // 4. 点击左侧按钮，向前轮播，圆圈状态随之改变
  btn_prev.addEventListener("click", function () {
    if (flag) {
      flag = false; //关闭节流阀
      // 轮播到第一个
      if (currentIndex == 0) {
        currentIndex = circleLength;
        swiper_main.style.left = -currentIndex * swiperWidth + 'px';
      }
      currentIndex--;
      // 改变圆圈状态
      for (let i = 0; i < circleLength; i++) {
        swiper_circle.children[i].className = "";
      }
      swiper_circle.children[currentIndex].className = "current";

      animate(swiper_main, -currentIndex * swiperWidth, 10, function () {
        flag = true; // 打开节流阀
      })
    }
  });

  // 5. 点击右侧按钮，向后轮播，圆圈状态随之改变
  btn_next.addEventListener("click", function () {
    if (flag) {
      flag = false;  // 关闭节流阀
      // 轮播到最后一个
      if (currentIndex == circleLength) {
        currentIndex = 0;
        // 轮播到第一个的克隆时，立马恢复到第一个的位置
        swiper_main.style.left = 0 + 'px';
      }
      currentIndex++;
      // 改变圆圈状态
      for (let i = 0; i < circleLength; i++) {
        swiper_circle.children[i].className = "";
      }
      if (currentIndex == circleLength) {
        swiper_circle.children[0].className = "current";
      } else {
        swiper_circle.children[currentIndex].className = "current";
      }
      animate(swiper_main, -currentIndex * swiperWidth, 10, function () {
        flag = true;  // 打开节流阀
      });
    }
  })

  // 7. 自动播放轮播图，相当于每隔一段时间点击右侧按钮
  timer = setInterval(function () {
    btn_next.click();
  }, 2000)
}