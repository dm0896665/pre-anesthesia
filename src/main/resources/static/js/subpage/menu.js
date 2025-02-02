$("#side-menu-toggle-container").on("click", toggleMenuOpen);

function toggleMenuOpen() {
    $('#side-menu-nav').toggleClass('side-menu-opened');
    $('#side-menu-toggle-chevron').toggleClass('down');
}