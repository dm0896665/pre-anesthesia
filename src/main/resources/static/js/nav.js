$("#sub-nav").mouseenter(function () {
    $('#bottom-sub-nav')[0].classList.add("slow-open-div");
});
$("#sub-nav").mouseleave(function(){
    $('#bottom-sub-nav')[0].classList.remove("slow-open-div");
})