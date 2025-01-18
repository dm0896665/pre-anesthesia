<#import "/template.ftlh" as layout />
<@layout.template title="Results">
<div class="container text-left pt-5">
<#if result??>
  <div class="pb-2">
    <p>Education: ${result.getEducation()}</p>
  </div>
  
  <hr/>
  <div class="pt-5 pb-2">
    <p>States:</p>
    <#list result.getStates() as state>
                  <p>${state.getName()}</p>
      </#list>
  </div>
  
  <hr/>
  <div class="pt-5 pb-2">
    <p>Is most knowledgable: ${result.isMostKnowledgeable()?c}</p>
  </div>
  
  <hr/>
  <div class="pt-5 pb-2">
    <p>Is like Supervision: ${result.isLikeSupervising()?c}</p>
  </div>
  
  <hr/>
  <div class="pt-5">
    <p>Is live in the City: ${result.isLiveInCity()?c}</p>
  </div>
<#else>
  <div class="text-center">
    <p>No results found for that ID.</p>
    <a href="/" class="btn btn-primary">Return Home</a>
  </div>
</#if>
</div>
</@layout.template>