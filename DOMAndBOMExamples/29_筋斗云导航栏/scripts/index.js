window.onload = function(){
  const cloud = document.querySelector(".cloud");
  const nav = document.querySelector(".nav_content");
  const lis = nav.querySelectorAll("li");

  // 记录筋斗云应该停留的位置
  let current = 0;

  for(let i=0, len=lis.length; i<len; i++) {
    lis[i].addEventListener("mouseenter", function(){
      animate(cloud, this.offsetLeft, 8);
    });
    lis[i].addEventListener("mouseleave", function(){
      animate(cloud, current, 8);
    });
    lis[i].addEventListener("click", function(){
      current = this.offsetLeft;
    })
  }

}