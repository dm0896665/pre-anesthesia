<div id="side-menu-container">
    <h2 id="subpage-title" class="d-none d-lg-block">${title}</h2>
    <div id="side-menu" class="border-primary pb-2 ms-2 mt-5 mb-5 mt-lg-0">
        <div id="side-menu-toggle-container" class="d-block d-lg-none position-relative">
            <h2 id="side-menu-title-toggle" class="ps-3 pt-2 overflow-hidden display-5">${title}</h2>
            <i id="side-menu-toggle-chevron" class="fas fa-chevron-up flip" style="font-size:24px"></i>
        </div>
        <div id="side-menu-nav" class="mt-3 mt-lg-2 me-3 me-lg-1 mb-2 ms-3 p-2">
            <#list menuNav as mainMenuNav, menuNavLinks>
                <#assign mainMenuNavLink="/${subpageName?replace(' ', '')?replace('/', '-')}/${mainMenuNav?keep_before(' ')?replace('/', '-')}">
                <h4>
                    <a href="${mainMenuNavLink}" class="navlink main-menu-nav">${mainMenuNav}</a>
                </h4>
                <ul class="navbar-nav me-auto pt-0">
                    <#list menuNavLinks as navlink>
                        <li>
                            <a href="${mainMenuNavLink}#${navlink?replace(' ', '')?replace('/', '-')}" class="navlink">${navlink}</a>
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
<link rel="stylesheet" href="/css/subpage/menu.css" />
<script type="module" src="/js/subpage/menu.js"></script>