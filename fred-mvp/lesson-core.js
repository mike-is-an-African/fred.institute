/* lesson-core.js — FredInstitute shared lesson engine */

/* ═══════════════════════════════════════
   CONFETTI ENGINE (orange brand)
═══════════════════════════════════════ */
window.launchConfetti = function(duration = 2200) {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#F97316','#EA580C','#FED7AA','#FDBA74','#FB923C','#ffffff','#FFF7ED'];
  const particles = Array.from({length:120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 10 + 5,
    h: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random()*COLORS.length)],
    rot: Math.random() * 360,
    rotV: (Math.random()-0.5)*8,
    vx: (Math.random()-0.5)*4,
    vy: Math.random()*3+2,
    opacity: 1
  }));

  let start = null;
  function frame(ts) {
    if(!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
      if(elapsed > duration*0.6) p.opacity = Math.max(0, p.opacity - 0.015);
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x+p.w/2, p.y+p.h/2);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    });
    if(elapsed < duration) requestAnimationFrame(frame);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); canvas.remove(); }
  }
  requestAnimationFrame(frame);
};

/* Mini confetti burst from element */
window.confettiBurst = function(el, count=40) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width/2, cy = r.top + r.height/2;
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#F97316','#EA580C','#FED7AA','#FDBA74','#ffffff'];
  const particles = Array.from({length:count}, () => {
    const angle = Math.random()*Math.PI*2;
    const speed = Math.random()*6+2;
    return { x:cx, y:cy, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed-3,
      w:Math.random()*8+4, h:Math.random()*5+2,
      color:COLORS[Math.floor(Math.random()*COLORS.length)],
      rot:Math.random()*360, rotV:(Math.random()-0.5)*10, opacity:1 };
  });
  let frame = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.18; p.rot+=p.rotV; p.opacity-=0.025;
      if(p.opacity>0){ alive=true; ctx.save(); ctx.globalAlpha=p.opacity;
        ctx.translate(p.x+p.w/2,p.y+p.h/2); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); }
    });
    if(alive) requestAnimationFrame(frame); else canvas.remove();
  };
  requestAnimationFrame(frame);
};

/* ═══════════════════════════════════════
   XP & PROGRESS STORE
═══════════════════════════════════════ */
window.LessonXP = {
  add(amount, lessonId) {
    const cur = parseInt(localStorage.getItem('fi_xp')||'0');
    localStorage.setItem('fi_xp', cur + amount);
    const p = JSON.parse(localStorage.getItem('fi_progress')||'{}');
    if(!p[lessonId]) p[lessonId] = {ts:Date.now(), xp:amount};
    localStorage.setItem('fi_progress', JSON.stringify(p));
    // Streak
    const today = new Date().toDateString();
    const lastDay = localStorage.getItem('fi_last_day');
    if(lastDay !== today) {
      const streak = parseInt(localStorage.getItem('fi_streak')||'0');
      localStorage.setItem('fi_streak', lastDay ? streak+1 : 1);
      localStorage.setItem('fi_last_day', today);
    }
  },
  get() { return parseInt(localStorage.getItem('fi_xp')||'0'); }
};

/* ═══════════════════════════════════════
   REWARD BOX
═══════════════════════════════════════ */
window.initRewardBox = function(boxId, contentId, xp, lessonId, badge='') {
  const box = document.getElementById(boxId);
  const content = document.getElementById(contentId);
  if(!box) return;
  let opened = false;
  box.addEventListener('click', () => {
    if(opened) return;
    opened = true;
    box.classList.add('shake');
    setTimeout(() => {
      box.classList.remove('shake');
      box.style.display = 'none';
      content.classList.add('show');
      LessonXP.add(xp, lessonId);
      launchConfetti(2000);
      const xpEl = content.querySelector('.reward-xp');
      if(xpEl) xpEl.textContent = '+' + xp + ' XP!';
      const badgeEl = content.querySelector('.reward-badge');
      if(badgeEl && badge) badgeEl.textContent = badge;
    }, 600);
  });
};

/* ═══════════════════════════════════════
   STEP-BY-STEP CONTROLLER
═══════════════════════════════════════ */
window.initSteps = function(wrapperId, nextBtnId, doneMsgId) {
  const steps = document.querySelectorAll('#'+wrapperId+' .step');
  const btn = document.getElementById(nextBtnId);
  const done = document.getElementById(doneMsgId);
  let cur = 0;
  if(steps[0]) steps[0].classList.add('show');
  if(btn) btn.addEventListener('click', () => {
    cur++;
    if(cur < steps.length) {
      steps[cur].classList.add('show');
      if(cur === steps.length-1) { btn.style.display='none'; if(done) done.style.display='block'; }
    }
  });
};

/* ═══════════════════════════════════════
   MULTIPLE CHOICE QUIZ
═══════════════════════════════════════ */
window.initMCQ = function(qId, correctIdx, feedbackId, onCorrect) {
  const block = document.getElementById(qId);
  if(!block) return;
  const opts = block.querySelectorAll('.q-opt');
  const fb = document.getElementById(feedbackId);
  opts.forEach((opt, i) => {
    opt.addEventListener('click', () => {
      opts.forEach(o => o.disabled = true);
      if(i === correctIdx) {
        opt.classList.add('correct');
        if(fb){ fb.className='q-feedback ok'; fb.textContent='✅ Correct! '+( opt.dataset.msg||'Well done!'); }
        if(onCorrect) onCorrect();
        confettiBurst(opt);
      } else {
        opt.classList.add('wrong');
        opts[correctIdx].classList.add('reveal');
        if(fb){ fb.className='q-feedback no'; fb.textContent='❌ Not quite. The correct answer is highlighted in green.'; }
      }
    });
  });
};

/* ═══════════════════════════════════════
   TEXT INPUT CHECK
═══════════════════════════════════════ */
window.checkInput = function(inputId, feedbackId, correct, onCorrect) {
  const inp = document.getElementById(inputId);
  const fb  = document.getElementById(feedbackId);
  if(!inp||!fb) return;
  const val = inp.value.trim();
  const isOk = Array.isArray(correct) ? correct.map(String).includes(val) : String(correct)===val;
  if(isOk) {
    inp.classList.add('correct'); inp.classList.remove('wrong');
    fb.className='q-feedback ok'; fb.textContent='✅ Correct! Great work!';
    if(onCorrect) onCorrect();
    confettiBurst(inp);
  } else {
    inp.classList.add('wrong'); inp.classList.remove('correct');
    fb.className='q-feedback no'; fb.textContent='❌ Not quite. Try again!';
  }
};

/* ═══════════════════════════════════════
   PROGRESS BAR INIT
═══════════════════════════════════════ */
window.initProgress = function(pct, lessonLabel) {
  setTimeout(() => {
    const fill = document.querySelector('.prog-fill');
    if(fill) fill.style.width = pct + '%';
    const pctEl = document.querySelector('.prog-pct');
    if(pctEl) pctEl.textContent = pct + '%';
  }, 400);
};

/* ═══════════════════════════════════════
   AUTH GUARD
═══════════════════════════════════════ */
(function(){
  const s = sessionStorage.getItem('fi_session');
  if(!s) { window.location.href = '../../index.html'; }
})();
