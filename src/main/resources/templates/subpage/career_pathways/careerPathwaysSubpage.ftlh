<#macro careerPathwaysSubpage title="Career Pathways">
<#import "/subpage/subpage.ftlh" as layout />
    <#assign links=['Role', 'Timeline', 'Costs', 'Salary', 'Requirements']>
    <#assign menuNav={'Anesthesiologist':links, 'AA':links, 'CRNA':links}>
    <@layout.subpage title=title subpageName=title menuNav=menuNav>
        <#nested />
    </@layout.subpage>
</#macro>