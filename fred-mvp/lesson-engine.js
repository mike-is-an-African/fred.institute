/* FredInstitute lesson-engine.js v3 */
window.launchConfetti=function(dur=1800){const c=document.createElement('canvas');c.className='confetti-c';document.body.appendChild(c);const ctx=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const C=['#F97316','#EA580C','#FED7AA','#FDBA74','#FB923C','#fff','#FFF7ED'];const ps=Array.from({length:90},()=>({x:Math.random()*c.width,y:Math.random()*c.height-c.height,w:Math.random()*8+4,h:Math.random()*4+2,col:C[Math.floor(Math.random()*C.length)],rot:Math.random()*360,rv:(Math.random()-.5)*6,vx:(Math.random()-.5)*3,vy:Math.random()*2+1.5,o:1}));let st=null;(function frame(ts){if(!st)st=ts;const el=ts-st;ctx.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.rv;if(el>dur*.55)p.o=Math.max(0,p.o-.016);ctx.save();ctx.globalAlpha=p.o;ctx.translate(p.x+p.w/2,p.y+p.h/2);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.col;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});if(el<dur)requestAnimationFrame(frame);else{ctx.clearRect(0,0,c.width,c.height);c.remove();}})();};

window.burst=function(el,n=30){const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const c=document.createElement('canvas');c.className='confetti-c';document.body.appendChild(c);c.width=innerWidth;c.height=innerHeight;const ctx=c.getContext('2d');const C=['#F97316','#EA580C','#FED7AA','#FDBA74','#fff'];const ps=Array.from({length:n},()=>{const a=Math.random()*Math.PI*2,s=Math.random()*4+2;return{x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,w:Math.random()*6+3,h:Math.random()*3+2,col:C[Math.floor(Math.random()*C.length)],rot:Math.random()*360,rv:(Math.random()-.5)*8,o:1};});(function frame(){ctx.clearRect(0,0,c.width,c.height);let alive=false;ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.14;p.rot+=p.rv;p.o-=.02;if(p.o>0){alive=true;ctx.save();ctx.globalAlpha=p.o;ctx.translate(p.x+p.w/2,p.y+p.h/2);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.col;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();}});if(alive)requestAnimationFrame(frame);else c.remove();})();};

window.SlideEngine=function(cfg){
  const{slides,lessonId,pts=100,onComplete}=cfg;
  const total=slides;let cur=0;
  const answered=new Array(total).fill(false);
  const wrapper=document.getElementById('slidesTrack');
  const prevBtn=document.getElementById('prevSlide');
  const nextBtn=document.getElementById('nextSlide');
  const dotsEl=document.getElementById('slideDots');
  const progEl=document.querySelector('.ls-progress-fill');
  const counterEl=document.getElementById('slideCounter');
  function mobileActive(){document.querySelectorAll('.ls-slide').forEach((s,i)=>s.classList.toggle('mobile-active',i===cur));}
  function buildDots(){if(!dotsEl)return;dotsEl.innerHTML='';for(let i=0;i<total;i++){const d=document.createElement('div');d.className='ls-dot';d.id='dot-'+i;dotsEl.appendChild(d);}}
  function go(n,skip){
    if(n<0||n>=total)return;cur=n;
    if(wrapper){if(skip){wrapper.style.transition='none';wrapper.style.transform='translateX(-'+cur*100+'%)';}else{wrapper.style.transition='';wrapper.style.transform='translateX(-'+cur*100+'%)';}}
    mobileActive();
    if(prevBtn)prevBtn.disabled=cur===0;
    if(nextBtn)nextBtn.disabled=cur===total-1;
    if(counterEl)counterEl.textContent=(cur+1)+' / '+total;
    const pct=Math.round((cur+1)/total*100);
    if(progEl)progEl.style.width=pct+'%';
    if(dotsEl)document.querySelectorAll('.ls-dot').forEach((d,i)=>{d.className='ls-dot'+(i===cur?' active':i<cur?' done':'');});
    const al=document.querySelector('.nav-lesson.current');if(al)al.scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function markAnswered(si){answered[si]=true;if(si===cur&&cur<total-1)setTimeout(()=>go(cur+1),1000);if(si===cur&&cur===total-1&&onComplete)setTimeout(onComplete,800);}
  function unlock(si){answered[si]=true;}
  if(prevBtn)prevBtn.addEventListener('click',()=>go(cur-1));
  if(nextBtn)nextBtn.addEventListener('click',()=>go(cur+1));
  buildDots();go(0,true);
  return{go,markAnswered,unlock,current:()=>cur};
};

window.mcq=function(sel,correct,fbId,engine,si,ok,fail){const opts=document.querySelectorAll(sel);const fb=document.getElementById(fbId);opts.forEach((o,i)=>{o.addEventListener('click',()=>{if(o.disabled)return;opts.forEach(x=>x.disabled=true);if(i===correct){o.classList.add('correct');if(fb){fb.className='quiz-feedback ok';fb.textContent='Correct! '+(ok||o.dataset.msg||'Well done!');}burst(o);if(engine)engine.markAnswered(si);}else{o.classList.add('wrong');opts[correct].classList.add('reveal');if(fb){fb.className='quiz-feedback no';fb.textContent='Not quite — '+(fail||'the correct answer is highlighted.');}if(engine)engine.markAnswered(si);}});});};

window.checkAns=function(inpId,fbId,correct,engine,si,ok){const inp=document.getElementById(inpId);const fb=document.getElementById(fbId);if(!inp||!fb)return;const val=inp.value.trim().replace(/\s/g,'');const ans=Array.isArray(correct)?correct.map(String):[String(correct)];if(ans.includes(val)){inp.classList.add('correct');inp.classList.remove('wrong');fb.className='quiz-feedback ok';fb.textContent='Correct! '+(ok||'Excellent!');burst(inp);if(engine)engine.markAnswered(si);}else{inp.classList.add('wrong');inp.classList.remove('correct');fb.className='quiz-feedback no';fb.textContent='Not quite — check your working and try again.';if(engine)engine.markAnswered(si);}};

window.initReward=function(boxId,contentId,pts,lessonId,badge){const box=document.getElementById(boxId);const content=document.getElementById(contentId);if(!box)return;let done=false;box.addEventListener('click',()=>{if(done)return;done=true;box.classList.add('shake');setTimeout(()=>{box.style.display='none';content.classList.add('open');const cur=parseInt(localStorage.getItem('fi_pts')||'0');localStorage.setItem('fi_pts',cur+pts);const p=JSON.parse(localStorage.getItem('fi_progress')||'{}');if(!p[lessonId])p[lessonId]={ts:Date.now(),pts};localStorage.setItem('fi_progress',JSON.stringify(p));const today=new Date().toDateString();if(localStorage.getItem('fi_last_day')!==today){localStorage.setItem('fi_streak',parseInt(localStorage.getItem('fi_streak')||'0')+1);localStorage.setItem('fi_last_day',today);}launchConfetti(2000);const pe=content.querySelector('.reward-pts');if(pe)pe.textContent='+'+pts+' Points';const be=content.querySelector('.reward-badge');if(be&&badge)be.textContent=badge;},500);});};

window.stepReveal=function(cId,btnId,doneId,engine,si){const steps=document.querySelectorAll('#'+cId+' .step-item');const btn=document.getElementById(btnId);const done=document.getElementById(doneId);let i=0;if(steps[0])steps[0].classList.add('show');if(btn)btn.addEventListener('click',()=>{i++;if(i<steps.length)steps[i].classList.add('show');if(i>=steps.length-1){btn.style.display='none';if(done){done.style.display='block';done.style.cssText='display:block;font-size:.75rem;color:var(--green);font-weight:700;margin-top:.4rem';}if(engine)engine.markAnswered(si);}});};

window.QB=function(questions,optsId,textId,fbId,scoreId,engine,si){let idx=0,score=0,total=0;function load(){const q=questions[idx%questions.length];document.getElementById(textId).textContent=q.q;const opts=document.getElementById(optsId);opts.innerHTML='';q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='quiz-opt';btn.textContent=o;btn.addEventListener('click',function(){opts.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);const fb=document.getElementById(fbId);total++;if(i===q.ans){this.classList.add('correct');score++;fb.className='quiz-feedback ok';fb.textContent='Correct! '+q.msg;burst(this);}else{this.classList.add('wrong');opts.querySelectorAll('.quiz-opt')[q.ans].classList.add('reveal');fb.className='quiz-feedback no';fb.textContent='Not quite — '+q.msg;}if(scoreId)document.getElementById(scoreId).textContent='Score: '+score+'/'+total;const nb=document.getElementById(optsId+'-next');if(nb)nb.style.display='inline-flex';if(engine)engine.markAnswered(si);});opts.appendChild(btn);});document.getElementById(fbId).className='quiz-feedback';const nb=document.getElementById(optsId+'-next');if(nb)nb.style.display='none';}window['next_'+optsId]=function(){idx++;load();};load();};

window.initNavPanel=function(concepts,currentFile){const nav=document.querySelector('.ls-nav-scroll');if(!nav)return;const p=JSON.parse(localStorage.getItem('fi_progress')||'{}');nav.innerHTML=concepts.map((c,ci)=>{const allDone=c.lessons.every(l=>p[l.id]);const anyDone=c.lessons.some(l=>p[l.id]);const isCurrent=c.lessons.some(l=>l.file===currentFile);const isOpen=isCurrent||anyDone;return'<div class="nav-concept'+(allDone?' done':'')+(isCurrent?' active':'')+(isOpen?' open':'')+'"><div class="nav-concept-hd" onclick="toggleConcept(this)"><div class="nav-c-num">'+(ci+1)+'</div><div class="nav-concept-name">'+c.title+'</div><svg class="nav-c-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></div><div class="nav-lessons">'+c.lessons.map(l=>{const isDone=!!p[l.id];const isCur=l.file===currentFile;return'<a href="'+l.file+'" class="nav-lesson'+(isCur?' current':'')+(isDone&&!isCur?' done':'')+'"><div class="nav-lesson-dot"></div>'+l.title+'</a>';}).join('')+'</div></div>';}).join('');};

window.toggleConcept=function(hd){hd.closest('.nav-concept').classList.toggle('open');};
window.toggleMobileNav=function(){const nav=document.querySelector('.ls-nav');const ov=document.getElementById('navOverlay');nav.classList.toggle('open');if(ov)ov.classList.toggle('open');};

(function(){const s=sessionStorage.getItem('fi_session');if(!s){const d=(window.location.pathname.match(/\//g)||[]).length;window.location.href=(d>=3?'../../':'../') + 'index.html';}})();
