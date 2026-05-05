// FredInstitute Concept Navigation v6
window.CONCEPT_NAV = [
  { id:'c1', label:'Concept 1', title:'Numbers & Arithmetic', lessons:[
    {id:'l01', title:'Number Types', file:'modules/math101/01-whole-numbers.html'},
    {id:'l02', title:'Place Value', file:'modules/math101/02-place-value.html'},
    {id:'lnb', title:'Number Bases', file:'modules/math101/nb-number-bases.html'},
    {id:'l03', title:'Addition', file:'modules/math101/03-addition.html'},
    {id:'l04', title:'Subtraction', file:'modules/math101/04-subtraction.html'},
    {id:'l05', title:'Multiplication', file:'modules/math101/05-multiplication.html'},
    {id:'l06', title:'Division', file:'modules/math101/06-division.html'},
    {id:'l07', title:'BODMAS', file:'modules/math101/07-bodmas.html'},
  ]},
  { id:'c2', label:'Concept 2', title:'Fractions, Decimals & %', lessons:[
    {id:'l08', title:'Fractions Intro', file:'modules/math101/08-fractions-intro.html'},
    {id:'l09', title:'Equivalent Fractions', file:'modules/math101/09-equivalent-fractions.html'},
    {id:'l10', title:'Fraction Operations', file:'modules/math101/10-fraction-operations.html'},
    {id:'l11', title:'Decimals', file:'modules/math101/11-decimals.html'},
    {id:'l12', title:'Percentages', file:'modules/math101/12-percentages.html'},
    {id:'l13', title:'FDP Conversions', file:'modules/math101/13-conversions.html'},
  ]},
  { id:'c3', label:'Concept 3', title:'Algebra', lessons:[
    {id:'l14', title:'Variables', file:'modules/math101/14-variables.html'},
    {id:'l15', title:'Expressions', file:'modules/math101/15-expressions.html'},
    {id:'l16', title:'Equations', file:'modules/math101/16-equations.html'},
    {id:'l17', title:'Solving Equations', file:'modules/math101/17-solving-equations.html'},
    {id:'l18', title:'Word Problems', file:'modules/math101/18-word-problems.html'},
  ]},
  { id:'c4', label:'Concept 4', title:'Ratio & Proportion', lessons:[
    {id:'l19', title:'Ratio & Rate', file:'modules/math101/19-ratio-intro.html'},
    {id:'l20', title:'Ratio Applications', file:'modules/math101/20-ratio-simplify.html'},
    {id:'l21', title:'Proportion', file:'modules/math101/21-proportion.html'},
  ]},
  { id:'c5', label:'Concept 5', title:'Geometry', lessons:[
    {id:'l22', title:'2D Shapes', file:'modules/math101/22-shapes.html'},
    {id:'l23', title:'Perimeter', file:'modules/math101/23-perimeter.html'},
    {id:'l24', title:'Area', file:'modules/math101/24-area.html'},
    {id:'l25', title:'Angles', file:'modules/math101/25-angles.html'},
    {id:'l26', title:'3D Shapes', file:'modules/math101/26-3d-shapes.html'},
  ]},
  { id:'c6', label:'Concept 6', title:'Data & Statistics', lessons:[
    {id:'l27', title:'Tables & Data', file:'modules/math101/27-tables.html'},
    {id:'l28', title:'Bar Charts', file:'modules/math101/28-bar-charts.html'},
    {id:'l29', title:'Line Graphs', file:'modules/math101/29-line-graphs.html'},
    {id:'l30', title:'Mean, Median, Mode', file:'modules/math101/30-mean-median-mode.html'},
  ]},
];

function initNavPanel(nav, currentFile) {
  var el = document.getElementById('navScroll');
  if (!el) return;
  var prog = JSON.parse(localStorage.getItem('fi_progress') || '{}');

  // Find current concept for auto-expand
  var currentConceptId = null;
  nav.forEach(function(c) {
    c.lessons.forEach(function(l) {
      var lf = l.file.split('/').pop();
      var cf = (currentFile||'').split('/').pop();
      if (lf === cf) currentConceptId = c.id;
    });
  });

  var html = '';
  nav.forEach(function(concept) {
    var isActive = concept.id === currentConceptId;
    var doneCount = concept.lessons.filter(function(l){ return prog[l.id]; }).length;
    html += '<div class="nav-concept-group">';
    html += '<div class="nav-concept-header' + (isActive?' open':'') + '" onclick="toggleConcept(this)">';
    html += '<div class="nav-concept-label">' + concept.label + ' · ' + concept.title + '</div>';
    html += '<span class="nav-concept-count">' + doneCount + '/' + concept.lessons.length + '</span>';
    html += '<svg class="nav-concept-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
    html += '</div>';
    html += '<div class="nav-concept-lessons"' + (!isActive?' style="display:none"':'') + '>';
    concept.lessons.forEach(function(lesson) {
      var lf = lesson.file.split('/').pop();
      var cf = (currentFile||'').split('/').pop();
      var active = lf === cf;
      var done = prog[lesson.id];
      var cls = 'nav-lesson' + (active?' active':'') + (done?' done':'');
      html += '<a class="' + cls + '" href="' + lesson.file + '">';
      if (done) html += '<svg class="nav-check" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
      html += lesson.title + '</a>';
    });
    html += '</div></div>';
  });
  el.innerHTML = html;

  // Update pts display
  var pts = parseInt(localStorage.getItem('fi_pts') || '0');
  var ptsEl = document.getElementById('pts-display');
  if (ptsEl) ptsEl.textContent = pts + ' Points';
}

function toggleConcept(header) {
  var lessons = header.nextElementSibling;
  var isOpen = header.classList.contains('open');
  header.classList.toggle('open');
  if (isOpen) {
    lessons.style.display = 'none';
  } else {
    lessons.style.display = 'block';
  }
}

// Nav collapse / expand (retractable sidebar)
function toggleNavCollapse() {
  var nav = document.querySelector('.ls-nav');
  var slides = document.querySelector('.ls-slides-area');
  if (!nav) return;
  var collapsed = nav.classList.contains('nav-collapsed');
  if (collapsed) {
    nav.classList.remove('nav-collapsed');
    nav.style.width = '';
    if (slides) slides.style.marginLeft = '';
  } else {
    nav.classList.add('nav-collapsed');
    nav.style.width = '0';
    nav.style.overflow = 'hidden';
    if (slides) slides.style.marginLeft = '0';
  }
}
