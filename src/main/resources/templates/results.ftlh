<#import "/template.ftlh" as layout />
<@layout.template title="Results">
<div class="container text-left pt-5">
    <h1 id="page-title">Results</h1>
    <h1 class="text-center pb-5">Congrats!</h1>
    <p class="text-center">Thank you for taking our quiz. Based on your answers we've determined your best career path and work place to be:</p>
    <h3 class="text-center pb-5">${results.getWinningString()}</h3>
    <p class="text-center">You may also be interested in the following: </p>
    <ul class="pb-5 w-50 mx-auto">
        <#if results.hasPathwayPointRunnerUp()>
            <li>Being ${results.getPathwayPointRunnerUp()}</li>
        </#if>

        <#if results.hasWorkPointRunnerUp()>
            <li>Working in ${results.getWorkPointRunnerUp()}</li>
        </#if>

        <#if results.hasModelPointRunnerUp()>
            <li>Working in ${results.getModelPointRunnerUp()}</li>
        </#if>
    </ul>

    <#if results.isNeedsWork()>
        <p class="text-center">Also note: working in anesthesia can be very stressful. Learning to manage stress and work under pressure is difficult, but if you can conquer them, you'll do just fine.</p>
    </#if>
    <p class="text-center">You can find positions for your specific pathway(s) and job site(s) at <a href="https://www.gaswork.com" target="_blank">gaswork.com</a></p>
</div>
<link rel="stylesheet" href="/css/results.css" />
</@layout.template>