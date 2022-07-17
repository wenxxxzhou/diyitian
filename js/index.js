window.addEventListener('load', function () {
    // 导航栏显示隐藏按钮
    var search = this.document.querySelector('.search');
    var s = search.querySelector('.s');
    var searchBtn = this.document.querySelector('.search-btn')
    var flag = 0;
    searchBtn.addEventListener('click', function () {
        if (flag == 0) {
            s.style.display = 'block';
            flag++;
        } else {
            s.style.display = 'none';
            flag = 0;
        }
    });
    // 回到顶部按钮
    var nav = search.querySelector('.nav');
    var goBottomBtn = nav.querySelector('.go-bottom-btn');
    var goTopBtn = nav.querySelector('.go-top-btn');
    goTopBtn.addEventListener('click', function () {
        animate(window, 0);
    });
    goBottomBtn.addEventListener('click', function () {
        animate(window, document.documentElement.scrollHeight);
    });

    // 先封装在一个函数里
    function animate(obj, target, callback) {
        // 首先清除一次定时器，否则一直触发该事件会一直运行定时器，即一直执行动画使速度越来越快距离越来越远
        clearInterval(obj.timer);
        // 使用 给对象的属性赋值 代替 var声明定时器 ，好处是可以给每个元素独立的定时器
        obj.timer = setInterval(function () {
            // 步长值写在定时器里，因为每次都需重新计算
            // 这时JS使用小数用算会有误差，所以避免使用小数用算，正值将步长值向右取整
            // 这时仍有问题，正值向右取整，而负值（即往回走）应向左取整，所以完整的：保留步长公式，然后加判断
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            // step = step > 0 ? Math.ceil(step) : Math.floor(step); 三元表达式版
            // 缓动动画步长值=（目标位置-对象实时位置）/10 。
            // 注：匀速动画对应的步长值就是10；缓动动画和匀速动画都应根据实时位置在可以动起来
            var step = (target - window.pageYOffset) / 10;
            if (target - window.pageYOffset > 0) {
                step = Math.ceil((target - window.pageYOffset) / 10);
            } else {
                step = Math.floor((target - window.pageYOffset) / 10);
            }
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                // // 回调函数写在定时器结束里,并判断是否有，
                // if (callback) {
                //     callback();
                // }
                // 可以写为,原理是短路用算，如果有callback参传进来，那么调用，没有callback传进来自然也不会再执行
                callback && callback();
            }
            // 注意盒子移动还是根据当前位置再加步长值，始终注意使用element.style.left赋值时需要加单位+'px'
            // obj.style.left = obj.offsetLeft + step + 'px';
            window.scroll(0, window.pageYOffset + step);
        }, 15) // 毫秒数常用为15
    };
})