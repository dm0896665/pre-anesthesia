<#import "/subpage/career_pathways/careerPathwaysSubpage.ftlh" as layout />
<@layout.careerPathwaysSubpage title="Compare Pathways">
<h2 class="text-center">Requirements</h2>
<div class="row justify-content-center">
    <div class="col-12 col-lg-6 col-xl-4 border mb-3">
        <h4 class="border-bottom text-center">Anesthesiologist</h4>
        <p>4-year undergraduate degree</p>
        <p>4-year medical school degree (DO/MD)</p>
        <p>Optional 1 year Fellowship</p>
    </div>
    <div class="col-12 col-lg-6 col-xl-4 border mb-3">
        <h4 class="border-bottom text-center">AA</h4>
        <p>4 year undergraduate degree</p>
        <p>2-2.5 year master's degree</p>
    </div>
    <div class="col-12 col-lg-6 col-xl-4 border">
        <h4 class="border-bottom text-center">CRNA</h4>
        <p>4 year BSN</p>
        <p>1-2 years of acute care nursing experience</p>
        <p>3 year doctoral degree (DNAP)</p>
    </div>
</div>
<hr class="mb-5" />
<h2 class="text-center">Financial Timeline</h2>
<#include "/financialTimelineGraph.ftlh">

<link rel="stylesheet" href="/css/subpage/career_pathways/compare.css" />
</@layout.careerPathwaysSubpage>