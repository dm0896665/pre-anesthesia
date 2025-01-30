<#macro template title="Welcome!">
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="/images/icon.ico" />

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/bootstrap-override.css" />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/c667abc43d.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="/css/navbar-events.css" />
    <link rel="stylesheet" href="/css/range.css" />
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    <header class="sticky-top">
      <div id="top-header" class="bg-primary d-none d-md-flex align-items-center position-relative rounded-bottom">
        <a class="navbar-brand ps-1" href="/">
          <img src="/images/icon.ico" alt="Icon" width="100">
        </a>
        <h1 class="site-title mb-0">Pre-Anesthesia.com</h1>

        <div class="pe-3 pb-2 position-absolute bottom-0 end-0">
          <a id="quiz-link" class="text-decoration-underline fs-5" href="/quiz">Free Career Quiz!</a>
        </div>
      </div>
      <nav id="sub-nav" class="navbar d-none d-md-block mt-2 w-100">
        <div id="top-sub-nav" class="row pt-3 ps-0 pe-0 ps-lg-5 pe-lg-5">
          <div class="col-4">
            <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Career Pathways</a>
          </div>
          <div class="col-4">
            <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Learn Anesthesia</a>
          </div>
          <div class="col-4">
            <a class="nav-link border border-secondary border-top-0 border-bottom-0" href="#">Prep courses</a>
          </div>
        </div>
        <div id="bottom-sub-nav" class="position-absolute w-100">
          <div class="row ps-0 pe-0 ps-lg-5 pe-lg-5">
            <div class="col-4">
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Anesthesiologist</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">AA</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">CRNA</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Compare Pathways</a>
            </div>
            <div class="col-4">
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Simulators</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Videos</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">Propaganda, Legislation, and Jargon</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0 border-right-0" href="#">ACLS</a>
            </div>
            <div class="col-4">
              <a class="nav-link border border-secondary border-top-0 border-bottom-0" href="#">MCAT</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0" href="#">GRE</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0" href="#">CCRN</a>
              <a class="nav-link border border-secondary border-top-0 border-bottom-0" href="#">HESI</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="main-content">
      <#nested />
    </div>
    <footer>
      <nav class="navbar navbar-expand-md navbar-dark main-nav d-md-none fixed-bottom bottom-nav">

        <div class="bottom-navbar collapse navbar-collapse" id="mobile-main-nav-menu">
          <ul class="navbar-nav">
            <li class="nav-item page-nav">
              <a class="static-nav-link nav-link" href="/">Home</a>
            </li>
            <li class="nav-item page-nav">
              <a class="static-nav-link nav-link" href="/about">About</a>
            </li>
            <li class="nav-item page-nav">
              <a class="static-nav-link nav-link" href="/results">Results</a>
            </li>
          </ul>
        </div>
          <h1 class="site-title">Pre-Anesthesia</h1>
        <button class="navbar-toggler collapsed" data-toggle="collapse" data-target="#mobile-main-nav-menu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </footer>
    <script type="module" src="/js/nav.js"></script>
  </body>
</html>
</#macro>