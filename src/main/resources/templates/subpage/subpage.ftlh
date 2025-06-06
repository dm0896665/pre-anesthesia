<#macro subpage title="Subpage" subpageName="Subpage" menuNav={}>
<#import "/template.ftlh" as layout />
<@layout.template title=title>
<link rel="stylesheet" href="/css/subpage/subpage.css" />

    <div id="subpage-container" class="w-100 pt-0 pt-lg-5 px-0 px-lg-5 full-width row">
        <div class="col-12 col-lg-4 col-xl-3">
            <#include "/subpage/sideMenu.ftlh">
        </div>
        <div id="subpage-content" class="col-12 col-lg-8 col-xl-9">
            <#nested />
        </div>
    </div>
</@layout.template>
</#macro>