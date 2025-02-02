<div id="side-nav-container">
    <div id="side-nav" class="">
        <div id="side-nav-nav" class="mt-3 mt-md-2 me-3 me-md-1 mb-2 ms-3 p-2">
            <h4>
                <a href="/" class="navlink side-nav-link">Home</a>
            </h4>
            <ul class="navbar-nav me-auto pt-0">
                <li>
                    <a href="/quiz" class="navlink">Free Career Quiz!</a>
                </li>
            </ul>
            <hr class="menu-nav-splitter">
            <#list subnav as mainSideNav, sideNavLinks>
                <#assign mainSideNavLink="/${mainSideNav?replace(' ', '')}">
                <h4>
                    <a href="${mainSideNavLink}/default" class="navlink side-nav-link">${mainSideNav}</a>
                </h4>
                <ul class="navbar-nav me-auto pt-0">
                    <#list sideNavLinks as navlink>
                        <li>
                            <a href="${mainSideNavLink}/${navlink}" class="navlink">${navlink}</a>
                        </li>
                    </#list>
                </ul>
                <#sep>
                    <hr class="menu-nav-splitter">
                </#sep>
            </#list>
        </div>
    </div>
</div>