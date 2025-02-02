<nav id="sub-nav" class="navbar d-none d-lg-block mt-2 w-100">
    <div id="top-sub-nav" class="row pt-3 ps-0 pe-0 ps-lg-5 pe-lg-5">
        <#list subnav as mainSubNav, subnavlinks>
            <#assign mainSubNavLink="/${mainSubNav?replace(' ', '')}/default">
            <div class="col-4">
                <a class="nav-link border-secondary border-start<#if !(mainSubNav?has_next)> border-end</#if>" href="${mainSubNavLink}">${mainSubNav}</a>
            </div>
        </#list>
    </div>
    <div id="bottom-sub-nav" class="position-absolute w-100">
        <div class="row ps-0 pe-0 ps-lg-5 pe-lg-5">
            <#list subnav as mainSubNav, subnavlinks>
                <div class="col-4">
                    <#list subnavlinks as navlink>
                    <#assign subnavLink="/${mainSubNav?replace(' ', '')}/${navlink?keep_before(' ')}">
                        <a class="nav-link border-secondary border-start<#if !(mainSubNav?has_next)> border-end</#if>" href="${subnavLink}">${navlink}</a>
                    </#list>
                </div>
            </#list>
        </div>
    </div>
</nav>