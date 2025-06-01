<#macro careerPathwaysSubpage subpageName="Career Pathways" title=subpageName>
<#import "/subpage/subpage.ftlh" as layout />
    <#assign links=['Role', 'Job Duties', 'Requirements/ Timeline', 'Costs/ Salary', 'Job Outlook']>
    <#assign menuNav={'Anesthesiologist':links, 'AA':links, 'CRNA':links}>
    <@layout.subpage title=title subpageName=subpageName menuNav=menuNav>
        <#nested />
    </@layout.subpage>
</#macro>