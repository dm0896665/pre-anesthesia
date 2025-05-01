<#import "/template.ftlh" as layout />
<@layout.template title="Pre-Anesthesia">
<div class="container text-left pt-5">
  <form action="/results/add" method="post">
    <div class="form-group pt-4">
      <label for="education">What's your highest education level?</label>
      <div class="custom-range custom-range-step">
          <input name="education" id="education" value="1" type="range" max="${educations?size}" min="1" step="1" list="educations">
          <datalist id="educations">
              <#list educations as education>
                  <option class="display-10" value="${education}">${education}</option>
              </#list>
          </datalist>
          <output id="education-value"></output>
      </div>
    </div>

    <div class="form-group pt-4">
      <label for="state">What states do you plan on living in the future?</label>
      <div class="row justify-content-center">
          <div class="col-lg-5">
              <select id="state" name="states" multiple="multiple" class="3col active form-control">
                  <#list states as state>
                      <option value="${state}">${state.getName()}</option>
                  </#list>
              </select>
          </div>
      </div>
    </div>
    
    <div class="form-group pt-4">
      <label>What's more important to you, being the most knowledgeable person in the room or work/life balance?</label>
    
      <div class="pl-3">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="isMostKnowledgeable" id="knowledgable" value="true">
            <label class="form-check-label" for="knowledgable">Being the most knowledgeable person in the room</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="isMostKnowledgeable" id="worklife" value="false">
            <label class="form-check-label" for="worklife">Having a good work/life balance</label>
          </div>
      </div>
    </div>

    <div class="form-group pt-4">
      <label>Do you like supervising others?</label>

      <div class="pl-3">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="isLikeSupervising" id="likeSupervising" value="true">
            <label class="form-check-label" for="likeSupervising">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="isLikeSupervising" id="dislikeSupervising" value="false">
            <label class="form-check-label" for="dislikeSupervising">No</label>
          </div>
      </div>
    </div>

    <div class="form-group pt-4">
      <label>Would you rather live in the city or country?</label>
        
      <div class="pl-3">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="isLiveInCity" id="liveInCity" value="true">
          <label class="form-check-label" for="liveInCity">Live in the City</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="isLiveInCity" id="liveInCountry" value="false">
          <label class="form-check-label" for="liveInCountry">Live in the Country</label>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mb-2">Submit</button>
  </form>
</div>
<link rel="stylesheet" href="/node_modules/@nobleclem/jquery-multiselect/jquery.multiselect.css" />
<script type="module" src="/js/questions.js"></script>
<link rel="stylesheet" href="/css/questions.css" />
<link rel="stylesheet" href="/css/range.css" />
</@layout.template>