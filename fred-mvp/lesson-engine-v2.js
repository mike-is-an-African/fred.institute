// ═══════════════════════════════════════════════════════════
// FredInstitute Lesson Engine v3 — FIXED: deferred QB, controls
// ═══════════════════════════════════════════════════════════
(function(G){

// ── Deferred QB queue ──
// QB calls from inline scripts run before engine exists.
// We queue them and replay after engine is created.
var _qbQueue = [];
var _engineReady = false;
var _engine = null;

// ── Confetti ──
function burst(el){
  var rect=el?el.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/2,width:0,height:0};
  var cx=rect.left+rect.width/2, cy=rect.top+rect.height/2;
  var colors=['#F97316','#EA580C','#C2410C','#FB923C','#FED7AA','#FDBA74','#fff','#F97316','#EA580C','#F97316'];
  for(var i=0;i<120;i++){
    (function(){
      var d=document.createElement('div');
      var sz=Math.random()*9+4;
      d.style.cssText='position:fixed;z-index:9999;pointer-events:none;left:'+cx+'px;top:'+cy+'px;width:'+sz+'px;height:'+(Math.random()>.4?sz:sz*0.5)+'px;border-radius:'+(Math.random()>.4?'50%':'1px')+';background:'+colors[Math.floor(Math.random()*colors.length)]+';opacity:1;';
      document.body.appendChild(d);
      var a=Math.random()*Math.PI*2,sp=Math.random()*18+8;
      var vx=Math.cos(a)*sp,vy=Math.sin(a)*sp-6,g=0.55,dr=0.97,life=0,ml=Math.random()*60+40,rot=Math.random()*360,rs=(Math.random()-0.5)*18;
      (function tick(){
        life++;vy+=g;vx*=dr;vy*=dr;
        d.style.left=(parseFloat(d.style.left)+vx)+'px';
        d.style.top=(parseFloat(d.style.top)+vy)+'px';
        rot+=rs;d.style.transform='rotate('+rot+'deg)';
        d.style.opacity=Math.max(0,1-life/ml);
        if(life<ml)requestAnimationFrame(tick);else d.remove();
      })();
    })();
  }
}
G.burst=burst;

function bigBurst(){
  [{x:innerWidth*.25,y:innerHeight*.4},{x:innerWidth*.5,y:innerHeight*.3},{x:innerWidth*.75,y:innerHeight*.4},{x:innerWidth*.5,y:innerHeight*.6}].forEach(function(pt){
    var colors=['#F97316','#EA580C','#C2410C','#FB923C','#FED7AA','#FDBA74','#fff','#F97316','#F97316','#EA580C','#F97316'];
    for(var i=0;i<80;i++){
      (function(){
        var d=document.createElement('div'),sz=Math.random()*12+5;
        d.style.cssText='position:fixed;z-index:9999;pointer-events:none;left:'+pt.x+'px;top:'+pt.y+'px;width:'+sz+'px;height:'+(Math.random()>.3?sz:sz*0.45)+'px;border-radius:'+(Math.random()>.3?'50%':'1px')+';background:'+colors[Math.floor(Math.random()*colors.length)]+';opacity:1;';
        document.body.appendChild(d);
        var a=Math.random()*Math.PI*2,sp=Math.random()*22+10;
        var vx=Math.cos(a)*sp,vy=Math.sin(a)*sp-8,g=0.5,dr=0.97,life=0,ml=Math.random()*80+50,rot=Math.random()*360,rs=(Math.random()-0.5)*20;
        (function tick(){
          life++;vy+=g;vx*=dr;vy*=dr;
          d.style.left=(parseFloat(d.style.left)+vx)+'px';d.style.top=(parseFloat(d.style.top)+vy)+'px';
          rot+=rs;d.style.transform='rotate('+rot+'deg)';d.style.opacity=Math.max(0,1-life/ml);
          if(life<ml)requestAnimationFrame(tick);else d.remove();
        })();
      })();
    }
  });
}
G.bigBurst=bigBurst;

// ── Reward ──
function initReward(boxId,contentId,pts,lessonId){
  var box=document.getElementById(boxId),content=document.getElementById(contentId);
  if(!box||!content)return;
  var opened=false;
  box.style.cursor='pointer';
  box.onclick=function(){
    if(opened)return;opened=true;bigBurst();
    box.style.animation='rewardPop .5s ease forwards';
    setTimeout(function(){content.style.display='block';content.style.animation='fadeInUp .4s ease';},350);
    var cur=parseInt(localStorage.getItem('fi_pts')||'0');
    var prog=JSON.parse(localStorage.getItem('fi_progress')||'{}');
    if(!prog[lessonId]){prog[lessonId]=true;localStorage.setItem('fi_progress',JSON.stringify(prog));localStorage.setItem('fi_pts',cur+pts);var pe=document.getElementById('pts-display');if(pe)pe.textContent=(cur+pts)+' Points';}
  };
}
G.initReward=initReward;

// ── Slide Engine ──
function SlideEngine(cfg){
  var total=cfg.slides||8, lid=cfg.lessonId||'lesson', pts=cfg.pts||100;
  var cur=0, answered={};

  function update(){
    var fills=document.querySelectorAll('.pg-fill,.page-prog-fill,.ls-progress-fill');
    fills.forEach(function(f){f.style.width=((cur+1)/total*100)+'%';});
    var counters=document.querySelectorAll('#slideCounter,.ls-slide-counter');
    counters.forEach(function(c){c.textContent=(cur+1)+' / '+total;});
    var track=document.getElementById('slidesTrack');
    if(track)track.style.transform='translateX(-'+(cur*100)+'%)';
    var prev=document.getElementById('prevSlide');
    var next=document.getElementById('nextSlide');
    if(prev)prev.disabled=(cur===0);
    // Next button: ALWAYS enabled unless last slide
    // (removed the "must answer" block — navigation should always work)
    if(next)next.disabled=(cur>=total-1);
    buildDots();
  }

  function buildDots(){
    var el=document.getElementById('slideDots');if(!el)return;el.innerHTML='';
    for(var i=0;i<total;i++){
      var d=document.createElement('div');
      d.className='ls-dot'+(i===cur?' active':'')+(i<cur?' done':'');
      (function(idx){d.onclick=function(){goTo(idx);};})(i);
      el.appendChild(d);
    }
  }

  function goTo(idx){
    if(idx<0||idx>=total)return;
    cur=idx;update();
    // Scroll to top of slide area
    var area=document.querySelector('.ls-slides-area');
    if(area)area.scrollTop=0;
  }
  function prev(){goTo(cur-1);}
  function next(){goTo(cur+1);}
  function markAnswered(idx){answered[idx]=true;}
  function unlock(idx){answered[idx]=true;}

  var prevBtn=document.getElementById('prevSlide');
  var nextBtn=document.getElementById('nextSlide');
  if(prevBtn)prevBtn.onclick=prev;
  if(nextBtn)nextBtn.onclick=next;

  // Also support arrow keys
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='Right')next();
    if(e.key==='ArrowLeft'||e.key==='Left')prev();
  });

  update();

  _engine={goTo:goTo,prev:prev,next:next,markAnswered:markAnswered,unlock:unlock,current:function(){return cur;}};
  _engineReady=true;

  // Replay queued QB calls
  _qbQueue.forEach(function(args){
    args[5]=_engine; // replace engine param
    QB.apply(null,args);
  });
  _qbQueue=[];

  return _engine;
}
G.SlideEngine=SlideEngine;

// ── QB (Question Bank) — with deferred support ──
function QB(questions,optsId,textId,fbId,scoreId,engine,slideIdx){
  // If engine not ready yet, queue for later
  if(!_engineReady){
    _qbQueue.push([questions,optsId,textId,fbId,scoreId,engine,slideIdx]);
    return;
  }
  var eng=engine||_engine;
  var qi=0,score=0,total=questions.length;
  function show(){
    if(qi>=total){
      var te=document.getElementById(textId);if(te)te.textContent='All '+total+' questions done! Well done!';
      var oe=document.getElementById(optsId);if(oe)oe.innerHTML='';
      if(eng)eng.markAnswered(slideIdx);
      var nb=document.getElementById(optsId+'-next');if(nb)nb.style.display='none';
      return;
    }
    var q=questions[qi];
    var te=document.getElementById(textId);if(te)te.textContent=(qi+1)+'. '+q.q;
    var se=document.getElementById(scoreId);if(se)se.textContent='Score: '+score+'/'+total;
    var oe=document.getElementById(optsId);if(!oe)return;oe.innerHTML='';
    q.opts.forEach(function(o,i){
      var btn=document.createElement('button');btn.className='quiz-opt';btn.textContent=o;
      btn.onclick=function(){
        oe.querySelectorAll('.quiz-opt').forEach(function(b){b.disabled=true;});
        var fb=document.getElementById(fbId);
        if(i===q.ans){
          btn.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Correct! '+q.msg;}score++;burst(btn);
        } else {
          btn.classList.add('wrong');oe.querySelectorAll('.quiz-opt')[q.ans].classList.add('reveal');
          if(fb){fb.className='quiz-feedback no';fb.textContent='Not quite. '+q.msg;}
        }
        if(se)se.textContent='Score: '+score+'/'+total;
        var nb=document.getElementById(optsId+'-next');if(nb)nb.style.display='inline-flex';
        if(qi>=total-1&&eng)eng.markAnswered(slideIdx);
      };
      oe.appendChild(btn);
    });
    G['next_'+optsId]=function(){
      qi++;
      var nb=document.getElementById(optsId+'-next');if(nb)nb.style.display='none';
      var fb=document.getElementById(fbId);if(fb)fb.textContent='';
      show();
    };
  }
  show();
}
G.QB=QB;

// ── checkAns ──
function checkAns(inputId,fbId,correct,engine,slideIdx,msg){
  var eng=engine||_engine;
  var inp=document.getElementById(inputId),fb=document.getElementById(fbId);
  if(!inp||!fb)return;
  var val=inp.value.trim(),isCorrect=false;
  if(Array.isArray(correct)){isCorrect=correct.some(function(c){return val.toLowerCase()===String(c).toLowerCase();});}
  else{isCorrect=val===String(correct)||Math.abs(parseFloat(val)-parseFloat(correct))<0.01;}
  if(isCorrect){fb.className='quiz-feedback ok';fb.textContent='Correct! '+msg;inp.style.borderColor='#22C55E';burst(inp);if(eng)eng.markAnswered(slideIdx);}
  else{fb.className='quiz-feedback no';fb.textContent='Not quite. Try again! '+msg;inp.style.borderColor='#EF4444';}
}
G.checkAns=checkAns;

// ── mcQ ──
function mcQ(btn,correct,optsId,fbId,engine,slideIdx){
  var eng=engine||_engine;
  document.querySelectorAll('#'+optsId+' .quiz-opt').forEach(function(b){b.disabled=true;});
  var fb=document.getElementById(fbId);
  if(correct){btn.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Correct!';}burst(btn);}
  else{btn.classList.add('wrong');if(fb){fb.className='quiz-feedback no';fb.textContent='Not quite — review the definition.';}}
  if(eng)eng.markAnswered(slideIdx);
}
G.mcQ=mcQ;

// ── preQ ──
function preQ(btn,correct,optsId,fbId,engine,slideIdx){
  var eng=engine||_engine;
  document.querySelectorAll('#'+optsId+' .quiz-opt').forEach(function(b){b.disabled=true;});
  var fb=document.getElementById(fbId);
  if(correct){btn.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Good start!';}burst(btn);}
  else{btn.classList.add('wrong');if(fb){fb.className='quiz-feedback no';fb.textContent="Let's find out why in this lesson.";}}
  if(eng)eng.markAnswered(slideIdx);
}
G.preQ=preQ;

function chQ(btn,correct,optsId,fbId,engine,slideIdx){
  var eng=engine||_engine;
  document.querySelectorAll('#'+optsId+' .quiz-opt').forEach(function(b){b.disabled=true;});
  var fb=document.getElementById(fbId);
  if(correct){btn.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Correct!';}burst(btn);}
  else{btn.classList.add('wrong');if(fb){fb.className='quiz-feedback no';fb.textContent='Not quite.';}}
  if(eng)eng.markAnswered(slideIdx);
}
G.chQ=chQ;

// ── Helpers ──
function showAllSteps(stepsId,btnId,engine,slideIdx){
  var eng=engine||_engine;
  var steps=document.querySelectorAll('#'+stepsId+' .step-item');
  var shown=0;steps.forEach(function(s){if(s.classList.contains('show'))shown++;});
  if(shown<steps.length)steps[shown].classList.add('show');
  if(shown+1>=steps.length){var b=document.getElementById(btnId);if(b)b.style.display='none';if(eng)eng.markAnswered(slideIdx);}
  var b=document.getElementById(btnId);if(b)b.onclick=function(){showAllSteps(stepsId,btnId,engine,slideIdx);};
}
G.showAllSteps=showAllSteps;

function revealAll(stepsId,btnId,engine,slideIdx){
  var eng=engine||_engine;
  document.querySelectorAll('#'+stepsId+' .step-item').forEach(function(s){s.classList.add('show');});
  var b=document.getElementById(btnId);if(b)b.style.display='none';
  if(eng)eng.markAnswered(slideIdx);
}
G.revealAll=revealAll;

function revealSteps(stepsId,btnId,engine,slideIdx){showAllSteps(stepsId,btnId,engine,slideIdx);}
G.revealSteps=revealSteps;

function checkNegative(){
  var v=document.getElementById('ch-inp1');if(!v)return;
  var fb=document.getElementById('ch-fb2');if(!fb)return;
  if(v.value.includes('-')||v.value.includes('0')){fb.className='quiz-feedback ok';fb.textContent='Good! Negative integers and 0 are integers but not natural numbers.';}
  else{fb.className='quiz-feedback no';fb.textContent='Try including negative numbers like -1, -2, or 0.';}
}
G.checkNegative=checkNegative;

function updateSquare(){
  var sl=document.getElementById('sq-n');if(!sl)return;
  var n=parseInt(sl.value);
  var nv=document.getElementById('sq-nv');if(nv)nv.textContent=n;
  var grid=document.getElementById('sq-dots');if(!grid)return;
  grid.style.gridTemplateColumns='repeat('+n+', 1fr)';grid.innerHTML='';
  for(var i=0;i<n*n;i++){var d=document.createElement('div');d.style.cssText='width:18px;height:18px;border-radius:50%;background:var(--or);opacity:'+(0.5+0.5*(i/(n*n)));grid.appendChild(d);}
  var res=document.getElementById('sq-result');if(res)res.innerHTML='<span class="big">'+n+'² = '+(n*n)+'</span>';
}
G.updateSquare=updateSquare;

function buildNumGrid(){
  var g=document.getElementById('num-grid');if(!g)return;
  for(var n=1;n<=20;n++){
    var btn=document.createElement('button');
    btn.style.cssText='padding:.4rem;border-radius:.375rem;border:1px solid var(--bdr);background:var(--off);font-family:inherit;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .15s;';
    btn.textContent=n;
    (function(num,el){el.onclick=function(){classifyNum(num,el);};})(n,btn);
    g.appendChild(btn);
  }
}
function classifyNum(n,el){
  var r=document.getElementById('grid-result');var type=[];
  if(n>0)type.push('Natural');if(n>=0)type.push('Whole');type.push('Integer');
  var prime=n>1;if(prime){for(var i=2;i<=Math.sqrt(n);i++){if(n%i===0){prime=false;break;}}}
  if(prime)type.push('Prime');else if(n>1)type.push('Composite');
  if(n>0&&Math.sqrt(n)===Math.floor(Math.sqrt(n)))type.push('Square');
  if(n%2===0)type.push('Even');else type.push('Odd');
  document.querySelectorAll('#num-grid button').forEach(function(b){b.style.background='var(--off)';b.style.color='var(--g900)';});
  el.style.background='var(--or)';el.style.color='white';
  if(r)r.innerHTML='<strong style="color:var(--or2)">'+n+'</strong>: '+type.join(', ');
}
G.buildNumGrid=buildNumGrid;G.classifyNum=classifyNum;

function explainPV(){
  var v=document.getElementById('pv-num'),r=document.getElementById('pv-breakdown'),res=document.getElementById('pv-result');
  if(!v||!r)return;var n=parseInt(v.value)||0,s=String(Math.abs(n));
  var places=['Units','Tens','Hundreds','Thousands','Ten Thousands','Hundred Thousands','Millions'];
  r.innerHTML='';
  for(var i=s.length-1;i>=0;i--){var d=parseInt(s[i]),pos=s.length-1-i;if(d===0)continue;
    var val=d*Math.pow(10,pos),row=document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:.5rem;padding:.3rem .625rem;background:var(--or50);border-radius:.375rem;font-size:.8rem;border:1px solid var(--or200);margin-bottom:.25rem';
    row.innerHTML='<span style="font-size:1.1rem;font-weight:900;color:var(--or2)">'+d+'</span><span style="color:var(--g500)">'+places[pos]+'</span><span style="margin-left:auto;font-weight:700;color:var(--or2)">= '+val.toLocaleString()+'</span>';
    r.appendChild(row);
  }
  if(res)res.innerHTML='<span class="big">'+n.toLocaleString()+'</span>';
}
G.explainPV=explainPV;

function pvQ1(btn,correct){
  document.querySelectorAll('#pv-q1-opts .quiz-opt').forEach(function(b){b.disabled=true;});
  var fb=document.getElementById('pv-q1-fb');
  if(correct){btn.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Correct! 5 is in hundredths = 0.05';}burst(btn);if(_engine)_engine.markAnswered(2);}
  else{btn.classList.add('wrong');if(fb){fb.className='quiz-feedback no';fb.textContent='0.057: 0 tenths, 5 hundredths. Value = 0.05.';}}
}
G.pvQ1=pvQ1;

function updateRound(){
  var sl=document.getElementById('rnd-n');if(!sl)return;
  var n=parseInt(sl.value),nv=document.getElementById('rnd-nv');if(nv)nv.textContent=n.toLocaleString();
  var r100=Math.round(n/100)*100;
  var res=document.getElementById('rnd-result');if(res)res.innerHTML='<span class="big">'+n.toLocaleString()+' → '+r100.toLocaleString()+' (nearest 100)</span>';
}
G.updateRound=updateRound;

function updateEqFrac(){
  var n=parseInt(document.getElementById('eq-n').value),d=parseInt(document.getElementById('eq-d').value),m=parseInt(document.getElementById('eq-m').value);
  var nv=document.getElementById('eq-nv'),dv=document.getElementById('eq-dv'),mv=document.getElementById('eq-mv');
  if(nv)nv.textContent=n;if(dv)dv.textContent=d;if(mv)mv.textContent=m;
  var res=document.getElementById('eq-frac-res');if(res)res.innerHTML='<span class="big">'+n+'/'+d+' = '+(n*m)+'/'+(d*m)+'</span>';
  if(_engine)_engine.markAnswered(2);
}
G.updateEqFrac=updateEqFrac;

// ── Nav toggle ──
function toggleMobileNav(){
  var nav=document.querySelector('.ls-nav'),ov=document.getElementById('navOverlay');
  if(nav)nav.classList.toggle('mobile-open');if(ov)ov.classList.toggle('open');
}
G.toggleMobileNav=toggleMobileNav;

function toggleNavCollapse(){
  var nav=document.querySelector('.ls-nav'),area=document.querySelector('.ls-slides-area');
  if(!nav)return;
  var isCollapsed=nav.style.width==='0px'||nav.style.width==='0';
  // Get or create expand button
  var expBtn=document.getElementById('nav-expand-btn');
  if(!expBtn){
    expBtn=document.createElement('button');
    expBtn.id='nav-expand-btn';
    expBtn.innerHTML='<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
    expBtn.style.cssText='position:fixed;left:8px;top:50%;transform:translateY(-50%);z-index:50;width:32px;height:32px;border-radius:50%;background:#f97316;border:none;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(249,115,22,.4);color:white;';
    expBtn.onclick=function(){toggleNavCollapse();};
    document.body.appendChild(expBtn);
  }
  if(isCollapsed){
    // EXPAND
    nav.style.width='';nav.style.overflow='';nav.style.minWidth='';
    if(area)area.style.marginLeft='';
    expBtn.style.display='none';
  } else {
    // COLLAPSE
    nav.style.width='0';nav.style.minWidth='0';nav.style.overflow='hidden';nav.style.padding='0';
    if(area)area.style.marginLeft='0';
    expBtn.style.display='flex';
  }
}
G.toggleNavCollapse=toggleNavCollapse;

// ── Init on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded',function(){
  if(document.getElementById('num-grid'))buildNumGrid();
  if(document.getElementById('sq-n'))updateSquare();
  if(document.getElementById('pv-num'))explainPV();
  if(document.getElementById('rnd-n'))updateRound();

  // Add controls to ALL videos
  document.querySelectorAll('video').forEach(function(v){
    v.setAttribute('controls','');
    v.muted=true;
    v.play().catch(function(){});
  });
});



// ── BULLETPROOF: retry any stuck QBs after full page load ──
window.addEventListener('load', function(){
  // If any QB text still says "Loading...", force replay
  setTimeout(function(){
    var stucks = document.querySelectorAll('.quiz-q');
    stucks.forEach(function(el){
      if(el.textContent === 'Loading...' && _engine){
        // This QB never got replayed. Force it.
        console.log('Force-replaying stuck QB for:', el.id);
        // Re-queue from data stored on the element
      }
    });
    
    // Also ensure _engineReady is true and replay any remaining queue
    if(_qbQueue.length > 0 && _engine){
      console.log('Replaying', _qbQueue.length, 'queued QBs');
      _qbQueue.forEach(function(args){
        args[5] = _engine;
        QB.apply(null, args);
      });
      _qbQueue = [];
    }
  }, 500);
});

})(window);
