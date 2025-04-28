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

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="/css/navbar-events.css" />
    <link rel="stylesheet" href="/css/range.css" />
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    <button type="button" class="btn btn-primary btn-floating btn-lg btn-circle" id="back-to-top">
      <i class="fas fa-chevron-up"></i>
    </button>
    <header>
      <div id="top-header" class="bg-primary d-flex align-items-center position-relative">
        <button id="mobile-nav-toggler" type="button" class="navbar-toggler d-inline-block d-lg-none mx-3">
          <i class="fas fa-bars"></i>
        </button>
        <a class="navbar-brand ps-1 d-none d-lg-block" href="/">
          <img src="/images/icon.ico" alt="Icon" width="100" />
        </a>
        <h1 class="py-4 py-lg-0 site-title mb-0 display-6">Pre-Anesthesia.com</h1>

        <div class="pe-3 pb-2 position-absolute bottom-0 end-0 d-none d-lg-block">
          <a id="quiz-link" class="text-decoration-underline fs-5" href="/quiz">Free Career Quiz!</a>
        </div>
      </div>
    </header>
    <div id="page-hider" class="w-100 h-100 hide position-fixed top-0 left-0"></div>

    <#assign careerLinks=['Anesthesiologist', 'AA', 'CRNA', 'Compare Pathways']>
    <#assign learnLinks=['Simulators', 'Videos', 'Propaganda, Legislation, and Jargon', 'ACLS']>
    <#assign prepLinks=['MCAT', 'GRE', 'CCRN', 'HESI']>
    <#assign subnav={'Career Pathways':careerLinks, 'Learn Anesthesia':learnLinks, 'Prep Courses':prepLinks}>
    <#include "/sideNav.ftlh">
    <#include "/subnav.ftlh">
    <div class="main-content">
      <#nested />
    </div>
    <script type="module" src="/js/nav.js"></script>
    <script type="module" src="/js/scroll-to-top.js"></script>
  </body>
</html>
</#macro>