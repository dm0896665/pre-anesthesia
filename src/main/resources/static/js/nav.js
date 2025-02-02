$("#sub-nav").mouseenter(function () {
    $('#bottom-sub-nav')[0].classList.add("slow-open-div");
});
$("#sub-nav").mouseleave(function(){
    $('#bottom-sub-nav')[0].classList.remove("slow-open-div");
});
$("#mobile-nav-toggler").on("click", () => {
    $('#page-hider').toggleClass('hide');
    $('#side-nav-container').toggleClass('slow-open-div');
});
$("#page-hider").on("click", () => {
    $('#mobile-nav-toggler').trigger("click");
});