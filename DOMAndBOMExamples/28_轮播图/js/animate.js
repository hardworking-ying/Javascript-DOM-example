function animate(obj, target, interval=15, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    if(obj.offsetLeft === target) {
      clearInterval(obj.timer);
      // if(callback) {
      //   callback();
      // }
      callback && callback(); // 与上述注释代码效果一样
    }else {
      let step = (target - obj.offsetLeft)/10;
      // 正数向上取整，负数向下取整
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      obj.style.left = obj.offsetLeft + step + 'px';
    }
  }, interval)
}