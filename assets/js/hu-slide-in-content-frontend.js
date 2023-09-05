let huSlideInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            let slideInObject = entry.target;
            slideInObject.classList.add('hsic-show');
            huSlideInObserver.unobserve(lazyObject);
        }
    });
},{ rootMargin: "0px 0px 120px 0px" });

document.addEventListener('DOMContentLoaded', function(){
    hsic_slide_in_containers = [].slice.call(document.querySelectorAll('.hsic-is-slide-in-content'));
    hsic_slide_in_containers.forEach(function(hsic_slide_in_container){
        huSlideInObserver.observe(hsic_slide_in_container);
    });
});