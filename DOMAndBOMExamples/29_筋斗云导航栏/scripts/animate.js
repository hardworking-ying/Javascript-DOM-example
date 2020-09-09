function animate(obj, target, interval=15, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    if(obj.offsetLeft === target) {
      clearInterval(obj.timer);
      if(callback) {
        callback();
      }
    }else {
      let step = (target - obj.offsetLeft)/10;
      // 正数向上取整，负数向下取整
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      obj.style.left = obj.offsetLeft + step + 'px';
    }
  }, interval)
}