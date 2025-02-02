<#macro subpage title="Subpage" subpageName="Subpage" menuNav={}>
<#import "/template.ftlh" as layout />
<@layout.template title=title>

    <div id="subpage-cont" class="w-100 pt-0 pt-md-5 px-0 px-md-5 full-width row">
        <div class="col-12 col-md-5 col-lg-4 col-xl-3">
            <#include "/subpage/sideMenu.ftlh">
        </div>
        <div class="col-12 col-md-7 col-lg-8 col-xl-9">
            <#nested />
        </div>
    </div>
<link rel="stylesheet" href="/css/subpage/subpage.css" />
</@layout.template>
</#macro>