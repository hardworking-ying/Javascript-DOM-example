/*
  利用touch事件自己封装点击事件解决click 300ms延迟
  原理： 1.当手指触摸屏幕，记录当前触摸时间
        2. 当手指离开屏幕，用离开时间减去触摸时间
        3. 如果时间小于 150ms,并且没有滑动过屏幕，那么定义为点击
*/
/*局限：有多个元素有click事件时，需要多次调用 */
function tap(elem, callback) {
  let move = false;
  let startTime = 0;  // 记录触摸时的时间
  elem.addEventListener("touchstart", function(){
    startTime = Date.now();
  });
  elem.addEventListener("touchmove", function(){
    move = true;  // 有滑动则不算是点击
  });
  elem.addEventListener("touchend", function(){
    if(!move && (Date.now() - startTime) < 150) {
      callback && callback();
    }
    move = false;
    startTime = 0;
  });
}