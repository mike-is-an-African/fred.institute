/* lesson-data.js — Question banks + interactive builders for lessons 20–30 */
window.LESSON_DATA = {

  'ratio-simplify': {
    concepts: 'To simplify a ratio, divide all parts by their <strong>Highest Common Factor (HCF)</strong>. The result is an equivalent ratio in its simplest (lowest) form. A ratio is fully simplified when the HCF of all parts equals 1.',
    facts: ['Divide all parts by the HCF to simplify', 'HCF(6,9)=3 → 6:9 = 2:3', 'Check: HCF of simplified parts should equal 1'],
    warn: 'Common mistake: dividing by a common factor that is NOT the highest. Always find the HCF first!',
    summary: ['Simplify ratios by dividing all parts by the HCF','Equivalent ratios have the same simplified form','Always verify: HCF of final answer = 1','Works with 3-part ratios too: 4:8:12 ÷ 4 = 1:2:3'],
    badge: '🏅 Simplify Star',
    questions: [
      {q:'Simplify 6:9', opts:['2:3','3:4','1:3','6:9'], ans:0, msg:'HCF(6,9)=3 → 6÷3=2, 9÷3=3 = 2:3'},
      {q:'Simplify 15:25', opts:['5:8','2:3','3:5','1:2'], ans:2, msg:'HCF(15,25)=5 → 3:5'},
      {q:'Simplify 18:24', opts:['9:12','3:4','6:8','2:3'], ans:1, msg:'HCF(18,24)=6 → 3:4'},
      {q:'Is 4:6 equivalent to 10:15?', opts:['Yes ✓','No','Only sometimes','Never'], ans:0, msg:'4:6 = 2:3, 10:15 = 2:3. Same simplified form!'},
      {q:'Simplify 20:30:50', opts:['2:3:5','4:6:10','10:15:25','1:2:3'], ans:0, msg:'HCF(20,30,50)=10 → 2:3:5'},
    ],
    challenge: {q:'🧠 A bag has red, blue and green balls in ratio 12:8:20. What is the simplest form?', opts:['3:2:5','6:4:10','4:3:7','2:1:3'], ans:0, msg:'HCF(12,8,20)=4 → 3:2:5 ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div style="font-size:.82rem;font-weight:700;color:var(--g600);margin-bottom:.5rem">Use the sliders to build a ratio and see it simplified:</div>' +
        '<div class="slider-row"><span>Part A:</span><input type="range" class="fred-slider" id="rs-a" min="2" max="30" value="12" oninput="rsUpdate()"><strong id="rs-av" style="color:var(--or)">12</strong></div>' +
        '<div class="slider-row"><span>Part B:</span><input type="range" class="fred-slider" id="rs-b" min="2" max="30" value="18" oninput="rsUpdate()"><strong id="rs-bv" style="color:var(--or)">18</strong></div>' +
        '<div class="hl-box center" id="rs-out" style="margin-top:.5rem">12:18 ÷ 6 = <strong>2:3</strong></div>';
      function gcd(a,b){return b===0?a:gcd(b,a%b);}
      window.rsUpdate = function(){
        const a=parseInt(document.getElementById('rs-a').value), b=parseInt(document.getElementById('rs-b').value);
        document.getElementById('rs-av').textContent=a; document.getElementById('rs-bv').textContent=b;
        const g=gcd(a,b);
        document.getElementById('rs-out').innerHTML = a+':'+b+' ÷ HCF('+g+') = <strong>'+(a/g)+':'+(b/g)+'</strong>';
      };
    }
  },

  'proportion': {
    concepts: 'Two quantities are in <strong>direct proportion</strong> if they increase at the same rate. Write y = kx where k is the constant of proportionality. Find k first, then use it to find any missing value.',
    facts: ['Direct proportion: y = kx (k is constant)', 'Find k: k = y ÷ x using a known pair', 'Cross-multiply to solve: a/b = c/d → ad = bc'],
    warn: 'Inverse proportion is different: as x increases, y decreases. Formula: y = k/x',
    summary: ['Direct proportion: y = kx — both quantities increase together','Find the constant k = y₁ ÷ x₁','Use k to find any missing value: y₂ = k × x₂','Cross-multiply for proportion equations: a/b = c/d → ad = bc','Unitary method: find the value of 1 unit first'],
    badge: '🏅 Proportion Pro',
    questions: [
      {q:'If 4 pens cost £2.00, what do 10 pens cost?', opts:['£4.00','£5.00','£4.50','£3.00'], ans:1, msg:'1 pen = £0.50. 10 × 0.50 = £5.00'},
      {q:'y is directly proportional to x. y=15 when x=3. Find y when x=7.', opts:['21','25','35','28'], ans:2, msg:'k = 15÷3 = 5. y = 5×7 = 35'},
      {q:'A car goes 150 km on 10 L of fuel. How far on 6 L?', opts:['60 km','80 km','90 km','100 km'], ans:2, msg:'15 km per litre × 6 = 90 km'},
      {q:'Solve: 3/x = 9/15', opts:['x=3','x=5','x=4','x=6'], ans:1, msg:'Cross-multiply: 3×15 = 9×x → 45 = 9x → x = 5'},
      {q:'Which shows inverse proportion?', opts:['y = 4x','y = x + 4','y = 4/x','y = 4x²'], ans:2, msg:'y = 4/x — as x increases, y decreases'},
    ],
    challenge: {q:'🧠 5 workers build a wall in 12 days. How many days for 3 workers (same speed)?', opts:['20 days','18 days','15 days','24 days'], ans:0, msg:'5×12=60 worker-days total. 60÷3=20 days ✓ (inverse proportion)'},
    buildInteractive(area) {
      area.innerHTML = '<div style="font-size:.82rem;font-weight:700;color:var(--g600);margin-bottom:.5rem">Direct proportion calculator: y = kx</div>' +
        '<div class="slider-row"><span>Known x₁:</span><input type="range" class="fred-slider" id="pp-x1" min="1" max="10" value="3" oninput="ppUpdate()"><strong id="pp-x1v" style="color:var(--or)">3</strong></div>' +
        '<div class="slider-row"><span>Known y₁:</span><input type="range" class="fred-slider" id="pp-y1" min="1" max="30" value="12" oninput="ppUpdate()"><strong id="pp-y1v" style="color:var(--or)">12</strong></div>' +
        '<div class="slider-row"><span>Find y when x₂:</span><input type="range" class="fred-slider" id="pp-x2" min="1" max="10" value="7" oninput="ppUpdate()"><strong id="pp-x2v" style="color:var(--or)">7</strong></div>' +
        '<div class="hl-box center" id="pp-out"></div>';
      window.ppUpdate = function(){
        const x1=parseInt(document.getElementById('pp-x1').value), y1=parseInt(document.getElementById('pp-y1').value), x2=parseInt(document.getElementById('pp-x2').value);
        document.getElementById('pp-x1v').textContent=x1; document.getElementById('pp-y1v').textContent=y1; document.getElementById('pp-x2v').textContent=x2;
        const k=(y1/x1).toFixed(2), y2=(k*x2).toFixed(2);
        document.getElementById('pp-out').innerHTML = 'k = '+y1+'/'+x1+' = '+k+'<br>When x = '+x2+': y = '+k+' × '+x2+' = <strong>'+y2+'</strong>';
      };
      window.ppUpdate();
    }
  },

  'shapes': {
    concepts: 'A <strong>polygon</strong> is a closed flat shape with straight sides. The name tells you how many sides: tri(3), quad(4), penta(5), hexa(6), hepta(7), octa(8). A <strong>regular</strong> polygon has all sides and angles equal.',
    facts: ['Triangle: 3 sides, angles sum to 180°', 'Quadrilateral: 4 sides, angles sum to 360°', 'Circle: no straight sides, one curved edge'],
    warn: 'A square IS a rectangle and a rhombus — but not vice versa!',
    summary: ['Name = number of sides: tri, quad, penta, hexa...','Interior angle sum: (n−2)×180° for any polygon','Equilateral: all equal. Isosceles: 2 equal. Scalene: all different','Regular polygon: all sides and angles equal','Quadrilaterals: square, rectangle, rhombus, parallelogram, trapezium, kite'],
    badge: '🏅 Shape Spotter',
    questions: [
      {q:'How many sides does an octagon have?', opts:['6','7','8','9'], ans:2, msg:'Oct = 8 (think: October was the 8th month in the Roman calendar)'},
      {q:'Interior angles of a triangle sum to:', opts:['90°','180°','270°','360°'], ans:1, msg:'ALL triangles: angles sum to 180°'},
      {q:'A quadrilateral with all sides equal but no right angles is a:', opts:['Square','Rectangle','Rhombus','Trapezium'], ans:2, msg:'A rhombus has 4 equal sides but angles are not 90°'},
      {q:'How many lines of symmetry in a regular hexagon?', opts:['3','4','5','6'], ans:3, msg:'Regular hexagon has 6 sides → 6 lines of symmetry'},
      {q:'A triangle with NO equal sides is called:', opts:['Equilateral','Isosceles','Scalene','Right-angled'], ans:2, msg:'Scalene = all sides (and angles) different'},
    ],
    challenge: {q:'🧠 What is the sum of interior angles of a regular pentagon?', opts:['360°','450°','540°','720°'], ans:2, msg:'(n−2)×180° = (5−2)×180° = 3×180° = 540° ✓'},
    buildInteractive(area) {
      const shapes = [{n:'Triangle',emoji:'🔺',sides:3,angles:'180°',formula:'A=½bh'},{n:'Square',emoji:'⬛',sides:4,angles:'360°',formula:'A=s²'},{n:'Rectangle',emoji:'▬',sides:4,angles:'360°',formula:'A=lw'},{n:'Pentagon',emoji:'⬠',sides:5,angles:'540°',formula:'A=(5s²)/(4tan36°)'},{n:'Hexagon',emoji:'⬡',sides:6,angles:'720°',formula:'A=3√3s²/2'},{n:'Circle',emoji:'⭕',sides:0,angles:'360°',formula:'A=πr²'}];
      area.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;margin-bottom:.5rem">'+shapes.map(s=>`<button class="q-opt" style="font-size:.82rem;text-align:center" onclick="showShape('${s.n}','${s.sides}','${s.angles}','${s.formula}')">${s.emoji} ${s.n}</button>`).join('')+'</div><div class="hl-box center" id="shape-info" style="min-height:50px">Tap a shape to see its properties!</div>';
      window.showShape = function(n,s,a,f){ document.getElementById('shape-info').innerHTML = `<strong>${n}</strong> — ${s===0?'Curved':'Sides: '+s} | Angles: ${a}<br>Formula: ${f}`; };
    }
  },

  'perimeter': {
    concepts: 'The <strong>perimeter</strong> is the total distance around the outside of any shape. For polygons, add all side lengths. For circles, use C = 2πr (circumference).',
    facts: ['Rectangle: P = 2(l+w) = 2l + 2w', 'Square: P = 4s', 'Triangle: P = a + b + c'],
    warn: 'Perimeter is measured in units (cm, m) NOT square units! Area uses cm², perimeter uses cm.',
    summary: ['Perimeter = total length around the outside of a shape','Rectangle: P = 2(l+w). Square: P = 4s','For any polygon: add ALL side lengths','Circle circumference: C = 2πr = πd','Perimeter is in linear units (cm, m)'],
    badge: '🏅 Perimeter Pro',
    questions: [
      {q:'A rectangle is 9 cm long and 4 cm wide. Its perimeter is:', opts:['26 cm','36 cm','13 cm','18 cm'], ans:0, msg:'P = 2(9+4) = 2×13 = 26 cm'},
      {q:'A square has perimeter 48 cm. One side measures:', opts:['6 cm','12 cm','16 cm','24 cm'], ans:1, msg:'P = 4s → s = 48÷4 = 12 cm'},
      {q:'A triangle has sides 5, 12, and 13 cm. Its perimeter is:', opts:['25 cm','30 cm','65 cm','60 cm'], ans:1, msg:'P = 5+12+13 = 30 cm'},
      {q:'Circumference of a circle with radius 7 cm (use π≈3.14):', opts:['21.98 cm','43.96 cm','153.86 cm','14 cm'], ans:1, msg:'C = 2πr = 2×3.14×7 = 43.96 cm'},
      {q:'A regular pentagon has side length 8 cm. Perimeter = ?', opts:['32 cm','40 cm','48 cm','24 cm'], ans:1, msg:'Pentagon has 5 sides: P = 5×8 = 40 cm'},
    ],
    challenge: {q:'🧠 A rectangular garden has perimeter 54 m. The length is twice the width. Find the width.', opts:['9 m','12 m','18 m','27 m'], ans:0, msg:'2l+2w=54, l=2w → 2(2w)+2w=54 → 6w=54 → w=9 m ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div class="slider-row"><span>Length (cm):</span><input type="range" class="fred-slider" id="per-l" min="1" max="20" value="8" oninput="perUpdate()"><strong id="per-lv" style="color:var(--or)">8</strong></div>' +
        '<div class="slider-row"><span>Width (cm):</span><input type="range" class="fred-slider" id="per-w" min="1" max="20" value="5" oninput="perUpdate()"><strong id="per-wv" style="color:var(--or)">5</strong></div>' +
        '<canvas id="per-canvas" width="300" height="180" style="display:block;margin:.5rem auto;border-radius:var(--r);background:white;border:1px solid var(--g200)"></canvas>' +
        '<div class="hl-box center" id="per-result"></div>';
      window.perUpdate = function(){
        const l=parseInt(document.getElementById('per-l').value), w=parseInt(document.getElementById('per-w').value);
        document.getElementById('per-lv').textContent=l; document.getElementById('per-wv').textContent=w;
        document.getElementById('per-result').innerHTML = 'P = 2('+l+'+'+w+') = 2×'+(l+w)+' = <strong>'+(2*(l+w))+' cm</strong>';
        const c=document.getElementById('per-canvas'), ctx=c.getContext('2d');
        ctx.clearRect(0,0,c.width,c.height);
        const sc=Math.min(220/l, 140/w, 14), rw=l*sc, rh=w*sc, ox=(c.width-rw)/2, oy=(c.height-rh)/2;
        ctx.fillStyle='#FFF7ED'; ctx.fillRect(ox,oy,rw,rh);
        ctx.strokeStyle='#F97316'; ctx.lineWidth=3; ctx.strokeRect(ox,oy,rw,rh);
        ctx.fillStyle='#F97316'; ctx.font='bold 12px Inter'; ctx.textAlign='center';
        ctx.fillText(l+' cm', ox+rw/2, oy-8);
        ctx.fillText(w+' cm', ox+rw+22, oy+rh/2);
      };
      window.perUpdate();
    }
  },

  'area': {
    concepts: 'The <strong>area</strong> of a shape is the amount of flat space it covers, measured in <strong>square units</strong> (cm², m²). Different shapes have different area formulas.',
    facts: ['Rectangle: A = length × width', 'Triangle: A = ½ × base × height', 'Parallelogram: A = base × height'],
    warn: 'The height must be PERPENDICULAR (at 90°) to the base — not the slanted side!',
    summary: ['Rectangle: A = l × w. Square: A = s²','Triangle: A = ½ × b × h (height must be perpendicular!)','Parallelogram: A = b × h','Trapezium: A = ½(a+b) × h','Circle: A = πr²','Area is in square units: cm², m², km²'],
    badge: '🏅 Area Expert',
    questions: [
      {q:'A rectangle is 7 cm × 4 cm. Area = ?', opts:['22 cm²','28 cm²','11 cm²','14 cm²'], ans:1, msg:'A = 7×4 = 28 cm²'},
      {q:'A triangle has base 10 cm and height 6 cm. Area = ?', opts:['60 cm²','30 cm²','16 cm²','15 cm²'], ans:1, msg:'A = ½×10×6 = 30 cm²'},
      {q:'A square has area 49 cm². Its side length is:', opts:['7 cm','12.25 cm','24.5 cm','14 cm'], ans:0, msg:'s² = 49 → s = √49 = 7 cm'},
      {q:'A parallelogram has base 9 cm and height 5 cm. Area = ?', opts:['28 cm²','45 cm²','35 cm²','14 cm²'], ans:1, msg:'A = b×h = 9×5 = 45 cm²'},
      {q:'Area of a circle with radius 3 cm (π≈3.14):', opts:['18.84 cm²','28.26 cm²','9.42 cm²','6.28 cm²'], ans:1, msg:'A = πr² = 3.14×3² = 3.14×9 = 28.26 cm²'},
    ],
    challenge: {q:'🧠 A trapezium has parallel sides of 8 cm and 12 cm, and a height of 5 cm. Area = ?', opts:['40 cm²','50 cm²','60 cm²','80 cm²'], ans:1, msg:'A = ½(a+b)×h = ½(8+12)×5 = ½×20×5 = 50 cm² ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div style="display:flex;gap:.4rem;margin-bottom:.5rem"><button class="q-check" id="at-rect" onclick="setAreaType(\'rect\')" style="flex:1">Rectangle</button><button class="q-check" id="at-tri" onclick="setAreaType(\'tri\')" style="flex:1;background:var(--g300);color:var(--g700)">Triangle</button><button class="q-check" id="at-circ" onclick="setAreaType(\'circ\')" style="flex:1;background:var(--g300);color:var(--g700)">Circle</button></div>' +
        '<div class="slider-row"><span id="at-l1">Base (cm):</span><input type="range" class="fred-slider" id="at-b" min="1" max="15" value="6" oninput="atUpdate()"><strong id="at-bv" style="color:var(--or)">6</strong></div>' +
        '<div class="slider-row" id="at-h-row"><span>Height (cm):</span><input type="range" class="fred-slider" id="at-h" min="1" max="15" value="4" oninput="atUpdate()"><strong id="at-hv" style="color:var(--or)">4</strong></div>' +
        '<div class="hl-box center" id="at-result"></div>';
      let atType = 'rect';
      window.setAreaType = function(t){ atType=t; ['rect','tri','circ'].forEach(x=>{const b=document.getElementById('at-'+x);if(b)b.style.background=x===t?'var(--grad)':'var(--g300)';if(b)b.style.color=x===t?'white':'var(--g700)';}); document.getElementById('at-h-row').style.display=t==='circ'?'none':'flex'; document.getElementById('at-l1').textContent=t==='circ'?'Radius (cm):':'Base (cm):'; atUpdate(); };
      window.atUpdate = function(){
        const b=parseInt(document.getElementById('at-b').value), h=parseInt(document.getElementById('at-h').value);
        document.getElementById('at-bv').textContent=b; document.getElementById('at-hv').textContent=h;
        let res='';
        if(atType==='rect') res='A = '+b+' × '+h+' = <strong>'+(b*h)+' cm²</strong>';
        else if(atType==='tri') res='A = ½ × '+b+' × '+h+' = <strong>'+(0.5*b*h)+' cm²</strong>';
        else res='A = π × '+b+'² ≈ <strong>'+(3.14*b*b).toFixed(2)+' cm²</strong>';
        document.getElementById('at-result').innerHTML=res;
      };
      window.atUpdate();
    }
  },

  'angles': {
    concepts: 'An <strong>angle</strong> is a measure of turn between two lines that meet at a point. Measured in degrees (°). Key facts: right angle = 90°, straight line = 180°, full turn = 360°.',
    facts: ['Angles on a straight line sum to 180°', 'Angles around a point sum to 360°', 'Vertically opposite angles are equal'],
    warn: 'An obtuse angle is between 90° and 180° — NOT just "bigger than 90°". Reflex angles are above 180°!',
    summary: ['Acute: 0°–90°. Right: 90°. Obtuse: 90°–180°. Reflex: 180°–360°','Angles on a line: 180°. Around a point: 360°','Vertically opposite angles are equal','Interior angles of triangle: 180°. Quadrilateral: 360°','Alternate angles are equal (Z angles). Corresponding angles are equal (F angles)'],
    badge: '🏅 Angle Ace',
    questions: [
      {q:'An angle of 145° is classified as:', opts:['Acute','Right','Obtuse','Reflex'], ans:2, msg:'Between 90° and 180° = obtuse'},
      {q:'Two angles on a straight line are 65° and x°. Find x.', opts:['65°','115°','125°','295°'], ans:1, msg:'Angles on a line = 180°. x = 180−65 = 115°'},
      {q:'In a triangle, two angles are 48° and 73°. The third is:', opts:['59°','121°','180°','131°'], ans:0, msg:'180−48−73 = 59°'},
      {q:'Vertically opposite angles are always:', opts:['Supplementary','Complementary','Equal','Reflex'], ans:2, msg:'Vertically opposite angles are always equal!'},
      {q:'Angles in a quadrilateral sum to:', opts:['180°','270°','360°','540°'], ans:2, msg:'(4−2)×180° = 360°'},
    ],
    challenge: {q:'🧠 A triangle has angles x, 2x and 3x. Find x.', opts:['20°','30°','40°','60°'], ans:1, msg:'x+2x+3x=180° → 6x=180° → x=30° ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div class="slider-row"><span>Angle:</span><input type="range" class="fred-slider" id="ang-sl" min="0" max="360" value="65" oninput="angUpdate()"><strong id="ang-v" style="color:var(--or)">65°</strong></div>' +
        '<canvas id="ang-c" width="220" height="180" style="display:block;margin:.5rem auto"></canvas>' +
        '<div class="hl-box center" id="ang-type"></div>';
      window.angUpdate = function(){
        const deg=parseInt(document.getElementById('ang-sl').value);
        document.getElementById('ang-v').textContent=deg+'°';
        const type=deg===0?'Zero':deg<90?'Acute':deg===90?'Right angle ✓':deg<180?'Obtuse':deg===180?'Straight line':deg<360?'Reflex':'Full rotation';
        document.getElementById('ang-type').innerHTML='<strong>'+deg+'°</strong> — <span style="color:var(--or2)">'+type+'</span>';
        const c=document.getElementById('ang-c'), ctx=c.getContext('2d'), cx=110, cy=120, r=75;
        ctx.clearRect(0,0,c.width,c.height);
        ctx.fillStyle='#FFF7ED'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,(-Math.PI/2)+(deg*Math.PI/180)); ctx.closePath(); ctx.fill();
        ctx.strokeStyle='#F97316'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,(-Math.PI/2)+(deg*Math.PI/180)); ctx.stroke();
        ctx.lineWidth=3; ctx.strokeStyle='#1F2937';
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy-r); ctx.stroke();
        const ex=cx+r*Math.cos(-Math.PI/2+(deg*Math.PI/180)), ey=cy+r*Math.sin(-Math.PI/2+(deg*Math.PI/180));
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.stroke();
        ctx.fillStyle='#F97316'; ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2); ctx.fill();
      };
      window.angUpdate();
    }
  },

  '3d-shapes': {
    concepts: 'A <strong>3D shape</strong> (solid) has three dimensions: length, width and height. They have <strong>faces</strong> (flat surfaces), <strong>edges</strong> (lines where faces meet) and <strong>vertices</strong> (corner points).',
    facts: ["Euler's formula: F + V - E = 2 for all polyhedra", 'Cube: 6F, 12E, 8V', 'Sphere: 1 curved face, 0 edges, 0 vertices'],
    warn: "Don't confuse FACES with SURFACES — a cylinder has 3 surfaces but Euler's formula applies to polyhedra (flat faces only)!",
    summary: ["Faces + Vertices − Edges = 2 (Euler's Formula)",'Cube: 6F, 12E, 8V. Cuboid: same','Triangular prism: 5F, 9E, 6V','Square pyramid: 5F, 8E, 5V','A net is a flat shape that folds into a 3D solid'],
    badge: '🏅 3D Vision',
    questions: [
      {q:'How many faces does a cube have?', opts:['4','5','6','8'], ans:2, msg:'6 square faces — top, bottom, front, back, left, right'},
      {q:'A triangular prism has how many edges?', opts:['6','9','12','15'], ans:1, msg:'3 on each triangle + 3 along the length = 9 edges'},
      {q:"Euler's formula: F + V − E = ?", opts:['0','1','2','3'], ans:2, msg:'F + V − E = 2 for all convex polyhedra'},
      {q:'A square-based pyramid has how many triangular faces?', opts:['3','4','5','6'], ans:1, msg:'4 triangular faces + 1 square base = 5 faces total'},
      {q:'Which 3D shape has exactly 2 circular faces?', opts:['Cone','Sphere','Cylinder','Hemisphere'], ans:2, msg:'A cylinder has 2 circular faces (top and bottom)'},
    ],
    challenge: {q:'🧠 A shape has 6 vertices and 9 edges. How many faces?', opts:['3','5','7','9'], ans:1, msg:'F + 6 − 9 = 2 → F = 2 + 9 − 6 = 5 faces ✓'},
    buildInteractive(area) {
      const s3d=[{n:'Cube',f:6,e:12,v:8,desc:'6 square faces'},{n:'Cuboid',f:6,e:12,v:8,desc:'6 rectangular faces'},{n:'Sphere',f:1,e:0,v:0,desc:'1 curved surface'},{n:'Cylinder',f:3,e:2,v:0,desc:'2 circles + 1 curved surface'},{n:'Cone',f:2,e:1,v:1,desc:'1 circle + 1 curved surface'},{n:'Sq.Pyramid',f:5,e:8,v:5,desc:'Square base + 4 triangles'},{n:'Tri.Prism',f:5,e:9,v:6,desc:'2 triangles + 3 rectangles'}];
      area.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35rem;margin-bottom:.5rem">'+s3d.map(s=>`<button class="q-opt" style="font-size:.75rem" onclick="show3DShape('${s.n}',${s.f},${s.e},${s.v},'${s.desc}')">${s.n}</button>`).join('')+'</div><div class="hl-box" id="3d-info" style="min-height:60px">Tap a shape to see its properties!</div>';
      window.show3DShape = function(n,f,e,v,d){ const euler=f+v-e; document.getElementById('3d-info').innerHTML = `<strong>${n}</strong> — ${d}<br>Faces: ${f} | Edges: ${e} | Vertices: ${v}<br>Euler: ${f}+${v}−${e} = <strong style="color:${euler===2?'var(--green)':'var(--red)'}">${euler}</strong> ${euler===2?'✓':'(curved surfaces excluded)'}`; };
    }
  },

  'tables': {
    concepts: 'A <strong>data table</strong> or <strong>frequency table</strong> organises information clearly. It shows categories and how often each value appears (<em>frequency</em>). Two-way tables show two categories at once.',
    facts: ['Frequency = how often a value occurs', 'Total frequency = total number of data values', 'A tally mark group of 5 is shown as IIII̶'],
    warn: 'Read the table carefully — are the numbers frequencies (how many) or values? Confusing these leads to wrong answers!',
    summary: ['Frequency tables show how often each value appears','Total frequency = total number of observations','Tally charts use groups of 5 for easy counting','Two-way tables show two variables simultaneously','Always check totals: row totals + column totals should match the grand total'],
    badge: '🏅 Data Detective',
    questions: [
      {q:'In a frequency table, "frequency" means:', opts:['The middle value','How often something occurs','The highest value','The total'], ans:1, msg:'Frequency = the count of how many times each value occurs'},
      {q:'A tally chart shows IIII IIII I. What is the frequency?', opts:['9','10','11','8'], ans:2, msg:'5 + 5 + 1 = 11'},
      {q:'Scores: 3,5,3,7,5,3,9. Frequency of 3 is:', opts:['1','2','3','4'], ans:2, msg:'3 appears three times: position 1, 3 and 6'},
      {q:'Five scores are: 4, 6, 6, 8, 6. What is the frequency of 6?', opts:['1','2','3','5'], ans:2, msg:'6 appears 3 times in the dataset'},
      {q:'Total frequency in a table must equal:', opts:['The mean','Number of data values','The range','The mode'], ans:1, msg:'Sum of all frequencies = total number of data values collected'},
    ],
    challenge: {q:'🧠 A two-way table: 12 boys like sport, 8 girls like sport, 5 boys dislike sport, 15 girls dislike sport. How many students are there in total?', opts:['35','40','30','45'], ans:1, msg:'12+8+5+15 = 40 students total ✓'},
    buildInteractive(area) {
      const data = [['Maths',14],['English',9],['Science',12],['Art',7],['PE',18]];
      let html = '<div style="font-size:.78rem;font-weight:700;color:var(--g600);margin-bottom:.4rem">Favourite subject frequency table:</div>';
      html += '<table style="width:100%;border-collapse:collapse;font-size:.82rem"><thead><tr><th style="background:var(--grad);color:white;padding:.4rem">Subject</th><th style="background:var(--grad);color:white;padding:.4rem">Tally</th><th style="background:var(--grad);color:white;padding:.4rem">Frequency</th></tr></thead><tbody>';
      let total = 0;
      data.forEach(([s,f],i) => {
        const tally = '𝟙𝟙𝟙𝟙 '.repeat(Math.floor(f/5)) + '𝟙'.repeat(f%5);
        html += `<tr style="${i%2?'background:var(--or50)':''}"><td style="padding:.4rem;font-weight:600;text-align:center">${s}</td><td style="padding:.4rem;text-align:center;letter-spacing:2px;font-family:monospace">${'||||&nbsp;'.repeat(Math.floor(f/5))}${'|'.repeat(f%5)}</td><td style="padding:.4rem;text-align:center;font-weight:900;color:var(--or2)">${f}</td></tr>`;
        total += f;
      });
      html += `<tr style="background:var(--or100)"><td style="padding:.4rem;font-weight:900;text-align:center">TOTAL</td><td></td><td style="padding:.4rem;text-align:center;font-weight:900;color:var(--or2)">${total}</td></tr>`;
      html += '</tbody></table>';
      area.innerHTML = html;
    }
  },

  'bar-charts': {
    concepts: 'A <strong>bar chart</strong> uses rectangular bars to compare different categories. The height (or length) of each bar represents the value or frequency for that category.',
    facts: ['Bars must be equal width with equal gaps between them', 'The axis must start at 0 unless clearly marked', 'Always include a title, axis labels, and a scale'],
    warn: 'A bar chart is for discrete (separate) categories. Use a line graph for continuous data over time!',
    summary: ['Bar charts compare discrete categories using equal-width bars','Height = frequency or value for each category','Axes need labels and a consistent scale','Double bar charts compare two groups side by side','Always read the scale carefully — bars between gridlines require estimation'],
    badge: '🏅 Chart Champion',
    questions: [
      {q:'The height of a bar in a bar chart represents:', opts:['The category name','The frequency or value','The title','The colour'], ans:1, msg:'Bar height = the frequency (or value) for that category'},
      {q:'Which type of data is BEST shown with a bar chart?', opts:['Temperature over time','Favourite colours in a class','Height of one person over years','Speed vs time'], ans:1, msg:'Favourite colours: separate categories = bar chart. Time data = line graph'},
      {q:'A chart shows 24 like football, 16 like cricket, 8 like tennis. How many students total?', opts:['32','40','48','56'], ans:2, msg:'24+16+8 = 48 students'},
      {q:'What does a bar chart NEED to have?', opts:['Curved tops','Title, axis labels, scale','3D effect','More than 5 bars'], ans:1, msg:'Every chart must have: title, labelled axes, and a consistent scale'},
      {q:'Reading a bar chart: a bar reaches halfway between 10 and 20. Its value is:', opts:['10','12','15','20'], ans:2, msg:'Halfway between 10 and 20 is 15'},
    ],
    challenge: {q:'🧠 A bar chart shows: Mon=8, Tue=12, Wed=6, Thu=15, Fri=9. What is the mean daily value?', opts:['9','10','11','12'], ans:1, msg:'Sum = 8+12+6+15+9 = 50. Mean = 50÷5 = 10 ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div id="bc-sliders" style="display:flex;flex-direction:column;gap:.3rem;margin-bottom:.4rem"></div><canvas id="bci-c" width="300" height="180" style="display:block;width:100%;border-radius:var(--r);background:white;border:1px solid var(--g200)"></canvas>';
      const lbls=['Mon','Tue','Wed','Thu','Fri'], vals=[8,12,6,15,10];
      const sw = document.getElementById('bc-sliders');
      lbls.forEach((l,i) => {
        const d = document.createElement('div'); d.className='slider-row';
        d.innerHTML = `<span style="min-width:32px;font-size:.75rem;font-weight:700">${l}:</span><input type="range" class="fred-slider" id="bci-${i}" min="0" max="20" value="${vals[i]}" oninput="bciDraw()"><strong id="bci-v${i}" style="color:var(--or);min-width:22px;font-size:.8rem">${vals[i]}</strong>`;
        sw.appendChild(d);
      });
      window.bciDraw = function(){
        const c=document.getElementById('bci-c'), ctx=c.getContext('2d'), W=c.width, H=c.height, pad=28, bW=(W-pad-10)/lbls.length-6;
        ctx.clearRect(0,0,W,H); ctx.fillStyle='white'; ctx.fillRect(0,0,W,H);
        lbls.forEach((_,i) => {
          const v=parseInt(document.getElementById('bci-'+i).value);
          document.getElementById('bci-v'+i).textContent=v;
          const x=pad+i*(bW+6), bH=(v/20)*(H-pad-15), y=H-pad-bH;
          const g=ctx.createLinearGradient(x,y,x,H-pad); g.addColorStop(0,'#F97316'); g.addColorStop(1,'#EA580C');
          ctx.fillStyle=g; ctx.fillRect(x,y,bW,bH);
          ctx.fillStyle='#374151'; ctx.font='bold 9px Inter'; ctx.textAlign='center';
          ctx.fillText(lbls[i],x+bW/2,H-12); ctx.fillText(v,x+bW/2,y-4);
        });
        ctx.strokeStyle='#E5E7EB'; ctx.lineWidth=1;
        [5,10,15,20].forEach(t=>{ const y=H-pad-(t/20)*(H-pad-15); ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(W-5,y); ctx.stroke(); ctx.fillStyle='#9CA3AF'; ctx.font='9px Inter'; ctx.textAlign='right'; ctx.fillText(t,pad-3,y+3); });
        ctx.strokeStyle='#374151'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(pad,15); ctx.lineTo(pad,H-pad); ctx.lineTo(W-5,H-pad); ctx.stroke();
      };
      window.bciDraw();
    }
  },

  'line-graphs': {
    concepts: 'A <strong>line graph</strong> shows how a value <em>changes over time</em> or another continuous variable. Points are plotted and joined with straight lines. The slope shows the rate of change.',
    facts: ['Upward slope = increasing trend', 'Downward slope = decreasing trend', 'Flat/horizontal line = no change'],
    warn: "Only join the points if the data is continuous (e.g. time). Don't join if the categories are discrete!",
    summary: ['Line graphs show continuous data change over time','Plot points carefully, then join in order','Steeper gradient = faster change','Interpolation: read between plotted points','Extrapolation: predict beyond plotted data (use carefully!)','The overall direction is called the trend'],
    badge: '🏅 Trend Spotter',
    questions: [
      {q:'Line graphs are most suitable for:', opts:['Comparing favourite colours','Showing temperature change over a week','Displaying shoe sizes','Listing student names'], ans:1, msg:'Continuous change over time = line graph'},
      {q:'A line going sharply upward shows:', opts:['Slow increase','Rapid increase','Decrease','No change'], ans:1, msg:'Steep upward gradient = rapid increase'},
      {q:'What does a horizontal (flat) section on a line graph indicate?', opts:['The value is zero','An error','No change in value','The maximum'], ans:2, msg:'Horizontal = constant (no change)'},
      {q:'Interpolation means:', opts:['Reading beyond the data','Reading between plotted points','Drawing a bar chart','Finding the mean'], ans:1, msg:'Interpolation = reading values between known plotted points'},
      {q:'A graph shows 10°C at 9am and 22°C at 3pm. Average change per hour is:', opts:['2°C/h','3°C/h','4°C/h','6°C/h'], ans:0, msg:'(22−10) ÷ 6 hours = 12÷6 = 2°C per hour'},
    ],
    challenge: {q:'🧠 A line graph shows sales: Jan=£200, Feb=£350, Mar=£300, Apr=£500. What is the overall trend?', opts:['Decreasing','No trend','Generally increasing','Completely flat'], ans:2, msg:'Despite one dip in March, the overall direction from Jan to Apr is upward = generally increasing ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--g600);margin-bottom:.3rem">Adjust monthly temperatures (°C):</div><div id="lg-sliders" style="display:grid;grid-template-columns:repeat(3,1fr);gap:.3rem;margin-bottom:.4rem"></div><canvas id="lgi-c" width="300" height="180" style="display:block;width:100%;border-radius:var(--r);background:white;border:1px solid var(--g200)"></canvas>';
      const months=['Jan','Feb','Mar','Apr','May','Jun'], temps=[5,8,13,17,22,26];
      const sg = document.getElementById('lg-sliders');
      months.forEach((m,i) => {
        const d=document.createElement('div'); d.style.cssText='display:flex;flex-direction:column;align-items:center;gap:2px';
        d.innerHTML=`<span style="font-size:.65rem;font-weight:700;color:var(--g500)">${m}</span><input type="range" class="fred-slider" id="lgi-${i}" min="-5" max="35" value="${temps[i]}" oninput="lgiDraw()" style="width:100%"><strong id="lgi-v${i}" style="font-size:.7rem;color:var(--or)">${temps[i]}°</strong>`;
        sg.appendChild(d);
      });
      window.lgiDraw = function(){
        const c=document.getElementById('lgi-c'), ctx=c.getContext('2d'), W=c.width, H=c.height, pad=28;
        ctx.clearRect(0,0,W,H); ctx.fillStyle='white'; ctx.fillRect(0,0,W,H);
        const vs=months.map((_,i)=>parseInt(document.getElementById('lgi-'+i).value));
        months.forEach((_,i)=>document.getElementById('lgi-v'+i).textContent=vs[i]+'°');
        const mn=Math.min(...vs)-2, mx=Math.max(...vs)+2, rng=mx-mn;
        const pts=vs.map((v,i)=>({x:pad+(i/(months.length-1))*(W-pad-10), y:H-pad-((v-mn)/rng)*(H-pad*2)}));
        ctx.strokeStyle='#E5E7EB'; ctx.lineWidth=0.8;
        for(let i=0;i<=4;i++){const y=H-pad-(i/4)*(H-pad*2);ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(W-8,y);ctx.stroke();}
        ctx.strokeStyle='#F97316'; ctx.lineWidth=2.5; ctx.lineJoin='round';
        ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
        ctx.fillStyle='#EA580C';
        pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();});
        ctx.fillStyle='#374151'; ctx.font='bold 9px Inter'; ctx.textAlign='center';
        months.forEach((_,i)=>ctx.fillText(months[i],pts[i].x,H-8));
        ctx.strokeStyle='#374151'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(pad,20);ctx.lineTo(pad,H-pad);ctx.lineTo(W-8,H-pad);ctx.stroke();
      };
      window.lgiDraw();
    }
  },

  'mean-median-mode': {
    concepts: 'Statistics helps us summarise a dataset with a single representative value. The three <strong>averages</strong> are mean, median and mode. The <strong>range</strong> measures spread.',
    facts: ['Mean = sum of all values ÷ number of values', 'Median = middle value when data is ordered', 'Mode = most frequently occurring value'],
    warn: 'The MEAN is affected by extreme values (outliers). If a dataset has outliers, the MEDIAN is a better average!',
    summary: ['Mean: add all values, divide by count. Best for normal distributions','Median: order the data, find the middle. Better with outliers','Mode: most frequent. Can have no mode or multiple modes','Range: largest − smallest. Measures spread, not average','For even number of values, median = mean of two middle values'],
    badge: '🏅 Stats Star',
    questions: [
      {q:'Find the mean of: 4, 7, 9, 2, 8', opts:['5','6','7','8'], ans:1, msg:'Sum = 30. Mean = 30÷5 = 6'},
      {q:'Find the median of: 3, 8, 1, 6, 4', opts:['3','4','6','8'], ans:1, msg:'Ordered: 1,3,4,6,8. Middle = 4'},
      {q:'Find the mode of: 2, 5, 5, 3, 7, 5, 2', opts:['2','3','5','7'], ans:2, msg:'5 appears 3 times — most frequent'},
      {q:'Range of: 12, 4, 19, 7, 15', opts:['7','12','15','19'], ans:2, msg:'Range = 19 − 4 = 15'},
      {q:'Dataset: 3, 5, 7, 9. Median is:', opts:['5','6','7','4'], ans:1, msg:'Even number of values. Median = (5+7)÷2 = 6'},
    ],
    challenge: {q:'🧠 Five test scores: 62, 78, 85, 91, x. The mean is 80. Find x.', opts:['84','86','88','90'], ans:0, msg:'Sum = 80×5 = 400. 62+78+85+91 = 316. x = 400−316 = 84 ✓'},
    buildInteractive(area) {
      area.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--g600);margin-bottom:.3rem">Enter numbers separated by commas:</div>' +
        '<div style="display:flex;gap:.5rem"><input id="mmmi-in" class="q-input" type="text" value="4,7,3,9,3,7,3" style="flex:1;font-size:.9rem"><button class="q-check" onclick="mmmCalc()">Calculate</button></div>' +
        '<div id="mmmi-out" style="margin-top:.5rem"></div>';
      window.mmmCalc = function(){
        const raw = document.getElementById('mmmi-in').value;
        const nums = raw.split(',').map(n=>parseFloat(n.trim())).filter(n=>!isNaN(n));
        if(nums.length<2){document.getElementById('mmmi-out').innerHTML='<div class="warn-box">Enter at least 2 numbers, separated by commas.</div>';return;}
        const sorted=[...nums].sort((a,b)=>a-b);
        const mean=(nums.reduce((s,n)=>s+n,0)/nums.length).toFixed(2);
        const mid=Math.floor(sorted.length/2);
        const median=sorted.length%2===0?((sorted[mid-1]+sorted[mid])/2).toFixed(2):sorted[mid];
        const freq={};nums.forEach(n=>freq[n]=(freq[n]||0)+1);
        const maxF=Math.max(...Object.values(freq));
        const modes=Object.keys(freq).filter(k=>freq[k]===maxF).join(', ');
        const range=(sorted[sorted.length-1]-sorted[0]).toFixed(2);
        document.getElementById('mmmi-out').innerHTML =
          `<div style="display:flex;flex-direction:column;gap:.35rem">
            <div style="background:var(--or50);border-radius:var(--r);padding:.55rem;font-size:.84rem;font-weight:700;color:var(--g800)">📊 Mean = <strong style="color:var(--or2)">${mean}</strong> <span style="font-size:.7rem;color:var(--g400)">(${nums.join('+')}=${nums.reduce((a,b)=>a+b,0)}) ÷ ${nums.length}</span></div>
            <div style="background:#EFF6FF;border-radius:var(--r);padding:.55rem;font-size:.84rem;font-weight:700;color:#1E40AF">📍 Median = <strong>${median}</strong> <span style="font-size:.7rem;color:var(--g400)">ordered: [${sorted.join(', ')}]</span></div>
            <div style="background:#F0FDF4;border-radius:var(--r);padding:.55rem;font-size:.84rem;font-weight:700;color:#166534">🔁 Mode = <strong>${modes}</strong> <span style="font-size:.7rem;color:var(--g400)">(appears ${maxF} times)</span></div>
            <div style="background:#FEF3C7;border-radius:var(--r);padding:.55rem;font-size:.84rem;font-weight:700;color:#92400E">↔️ Range = <strong>${range}</strong> <span style="font-size:.7rem;color:var(--g400)">(${sorted[sorted.length-1]}−${sorted[0]})</span></div>
          </div>`;
        burst(document.getElementById('mmmi-out'));
      };
      window.mmmCalc();
    }
  }

};
