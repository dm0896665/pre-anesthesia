<div style="width: 100%;">
    <canvas id="financial-chart"></canvas>
</div>
<h3 class="text-center">Ending totals</h3>
<div class="row justify-content-center pb-5">
<div id="aa-total" class="col-12 col-lg-6 col-xl-4 text-center">
</div>
<div id="crna-total" class="col-12 col-lg-6 col-xl-4 text-center">
</div>
<div id="anesthesiologist-total" class="col-12 col-lg-6 col-xl-4 text-center">
</div>
</div>
<div class="row justify-content-center">
<h4 class="text-center">Select year range</h4>
<div class="col-12 col-lg-6 text-center pb-3">
    <div class="form-floating">
        <select id="start-year-menu" class="form-select" aria-label="Start Year">

        </select>
        <label for="start-year-menu">Start Year</label>
    </div>
</div>
<div class="col-12 col-lg-6 text-center">
    <div class="form-floating">
        <select id="duration-menu" class="form-select" aria-label="Duration">

        </select>
        <label for="duration-menu">Duration</label>
    </div>
</div>
</div>

<link rel="stylesheet" href="/css/financial-timeline-graph.css" />
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.min.js"></script>
<script type="module" src="/js/financial_timeline_graph/financial-timeline-graph.js"></script>