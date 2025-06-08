<#import "/template.ftlh" as layout />
<@layout.template title="Quiz">
<div class="container text-left pt-5">
    <h1>Career Quiz</h1>
    <p class="info-text">This questionaire is used to determine which career pathway/work setting would be best for you.</p>
    <div id="quiz-container" class="border rounded mt-5 p-3 position-relative">
        <div id="question-container" class="p-3 pb-5">
            <h3 id="question"></h3>
            <div id="image-container" class="w-100 text-center"></div>
            <div class="pl-1 pl-lg-5" id="options">
            </div>
        </div>
        <input id="previous-btn" class="btn btn-primary d-none" type="button" value="< Previous" />
        <input id="next-submit-btn" class="btn btn-primary" type="button" value="Next >" />
    </div>
</div>
<script type="module" src="/js/questions.js"></script>
<link rel="stylesheet" href="/css/questions.css" />
</@layout.template>