(()=>{'use strict';const stuff={scribblesData:{name:'Notes',icon:'▤'},calculator:{name:'Calculator',icon:'⊞'},files:{name:'Files',icon:'▱'},shellRoom:{name:'Terminal',icon:'>_'},calendar:{name:'Calendar',icon:'▦'},settings:{name:'Settings',icon:'⚙'},music:{name:'Blazin Music',icon:'♫'},game:{name:'Blazin Arena',icon:'◆'},about:{name:'About',icon:'?'}};const homeStuff=['scribblesData','calculator','files','music','game','settings'];const floatyStuff=['scribblesData','calculator','files','music','game','shellRoom','calendar','settings'];const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const clone=o=>JSON.parse(JSON.stringify(o));const starterJunk={type:'folder',name:'Blazin Drive',children:{Documents:{type:'folder',name:'Documents',children:{}},Downloads:{type:'folder',name:'Downloads',children:{}},Pictures:{type:'folder',name:'Pictures',children:{}},'Welcome.txt':{type:'file',name:'Welcome.txt',meat:'Welcome to Blazin OS!\n\nThis is your first file.\n\nUse the Files thingy to create folders and text files.'}}};let scribblesData=JSON.parse(localStorage.getItem('blazin_notes')||'null')||[{whatAmI:'Welcome',text:'Welcome to Blazin OS.\n\nYour scribblesData are saved automatically.'}];let fs=JSON.parse(localStorage.getItem('blazin_fs')||'null')||clone(starterJunk);let trail=[];let windowPile=new Map();let z=10;let currentScribble=0;const saveJunk=()=>localStorage.setItem('blazin_fs',JSON.stringify(fs));const saveScribbles=()=>localStorage.setItem('blazin_notes',JSON.stringify(scribblesData));const findJunk=path=>path.reduce((n,p)=>n?.children?.[p]||null,fs);const whereAmI=()=>findJunk(trail)||fs;const unique=(parent,name)=>{let base=name||'Untitled';let n=base;let i=2;while(parent.children[n]){let dot=base.lastIndexOf('.');n=dot>0?base.slice(0,dot)+' ('+i+')'+base.slice(dot):base+' ('+i+')';i++}
return n};const openJunk=name=>{const n=whereAmI().children[name];if(!n||n.type!=='file')return;const id='file-'+Date.now()+Math.random();const w=makePane(id,'📄 '+name,620,430);w.querySelector('.guts').innerHTML='<div class="thingy">'+'<textarea id="fileBrain" style="flex:1;resize:none;margin:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#fff;padding:12px;outline:0;line-height:1.6"></textarea>'+'<div class="toolbox" style="justify-content:flex-end">'+'<button class="goTime" id="saveBrain">Save</button>'+'</div>'+'</div>';w.querySelector('#fileBrain').value=n.meat||'';w.querySelector('#saveBrain').onclick=()=>{n.meat=w.querySelector('#fileBrain').value;saveJunk()}};function makePane(id,whatAmI,width=650,height=450){const w=document.createElement('section');w.className='pane';w.dataset.id=id;w.style.width=Math.min(width,Math.max(310,innerWidth-24))+'px';w.style.height=Math.min(height,Math.max(210,innerHeight-90))+'px';const desktopBox=$('#floor').getBoundingClientRect();w.style.left=Math.max(8,Math.min(desktopBox.width-parseInt(w.style.width)-8,70+windowPile.size*26))+'px';w.style.top=Math.max(8,Math.min(desktopBox.height-parseInt(w.style.height)-8,24+windowPile.size*20))+'px';w.style.zIndex=++z;const icon=whatAmI.split(' ')[0];w.innerHTML='<div class="grabby">'+'<div class="whatAmI">'+'<span class="tinyPic">'+esc(icon)+'</span>'+'<span>'+esc(whatAmI.replace(icon+' ',''))+'</span>'+'</div>'+'<div class="knobs">'+'<button class="nap"></button>'+'<button class="stretchy"></button>'+'<button class="bye"></button>'+'</div>'+'</div>'+'<div class="guts"></div>';$('#windowPile').appendChild(w);windowPile.set(id,w);wireWindow(w);focus(w);return w}
function focus(w){z++;w.style.zIndex=z;refreshFloaty()}
function wireWindow(w){w.addEventListener('pointerdown',()=>focus(w));const h=w.querySelector('.grabby');let drag=null;h.addEventListener('pointerdown',e=>{if(e.target.closest('.knobs')||w.classList.contains('max')){return}
drag={x:e.clientX,y:e.clientY,l:w.offsetLeft,t:w.offsetTop};h.setPointerCapture(e.pointerId)});h.addEventListener('pointermove',e=>{if(!drag)return;const bounds=$('#floor').getBoundingClientRect();const maxLeft=Math.max(0,bounds.width-w.offsetWidth);const maxTop=Math.max(0,bounds.height-w.offsetHeight);w.style.left=Math.min(maxLeft,Math.max(0,drag.l+e.clientX-drag.x))+'px';w.style.top=Math.min(maxTop,Math.max(0,drag.t+e.clientY-drag.y))+'px'});h.addEventListener('pointerup',()=>(drag=null));h.addEventListener('pointercancel',()=>(drag=null));w.querySelector('.bye').onclick=()=>{windowPile.delete(w.dataset.id);w.remove();refreshFloaty()};w.querySelector('.nap').onclick=()=>{w.classList.add('min');refreshFloaty()};w.querySelector('.stretchy').onclick=()=>makeBig(w);h.addEventListener('dblclick',e=>{if(!e.target.closest('.knobs')){makeBig(w)}})}
function makeBig(w){if(!w.classList.contains('max')){w.dataset.l=w.style.left;w.dataset.t=w.style.top;w.dataset.w=w.style.width;w.dataset.h=w.style.height;w.classList.add('max')}else{w.classList.remove('max');w.style.left=w.dataset.l||'70px';w.style.top=w.dataset.t||'58px';w.style.width=w.dataset.w||'650px';w.style.height=w.dataset.h||'450px'}}
function refreshFloaty(){$$('#floaty [data-app]').forEach(b=>{const w=windowPile.get(b.dataset.app);b.classList.toggle('active',!!w&&!w.classList.contains('min'))})}
function openThing(id){$('#drawer').classList.add('vanisher');let w=windowPile.get(id);if(w){w.classList.remove('min');focus(w);return}
paintThing(id)}
function paintDesktop(){$('#junkyard').innerHTML=homeStuff.map(id=>'<button type="button" class="icon" data-open="'+id+'">'+'<div class="iconbox">'+stuff[id].icon+'</div>'+'<label>'+stuff[id].name+'</label>'+'</button>').join('');$('#floaty').innerHTML=floatyStuff.map(id=>'<button type="button" whatAmI="'+stuff[id].name+'" data-app="'+id+'" data-open="'+id+'">'+stuff[id].icon+'</button>').join('')+'<a class="socialThing" href="https://instagram.com/blazinkiller_007" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">'+'<svg viewBox="0 0 24 24">'+'<path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2zm4.8 3.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 2A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3zm5.2-2.5a1.1 1.1 0 1 1-1.1 1.1 1.1 0 0 1 1.1-1.1z"/>'+'</svg>'+'</a>'+'<a class="socialThing" href="https://discord.com/users/blazinkiller_0981_90402" target="_blank" rel="noopener" title="Discord" aria-label="Discord">'+'<svg viewBox="0 0 24 24">'+'<path d="M19.5 5.2A16.4 16.4 0 0 0 15.4 4l-.5 1a14.4 14.4 0 0 0-5.8 0l-.5-1a16.4 16.4 0 0 0-4.1 1.2C1.9 8.3 1.2 11.3 1.5 14.2a16.5 16.5 0 0 0 5 2.5l1.2-1.6c-.7-.2-1.4-.6-2-1 1.6.7 3.3 1 5.1 1s3.5-.3 5.1-1c-.6.4-1.3.8-2 1l1.2 1.6a16.5 16.5 0 0 0 5-2.5c.3-2.9-.4-5.9-2.6-9zM8.5 13.1c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm7 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z"/>'+'</svg>'+'</a>'+'<button type="button" class="launchSep" id="yeetBtn" title="Apps">⌘</button>';$('#junkyard').querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openThing(btn.dataset.open)}));$('#floaty').querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();openThing(btn.dataset.open)}));$('#yeetBtn').onclick=()=>{$('#drawer').classList.toggle('vanisher');paintDrawer('')};paintDrawer('')}
function huntForBg(){const backdrop=$('#backdrop');const candidates=['bg.png','bg.jpg','bg.jpeg','bg.webp','bg.gif'];let i=0;const tryNext=()=>{if(i>=candidates.length){return}
const img=new Image();const src=candidates[i++];img.onload=()=>backdrop.style.setProperty('--bg-url','url("'+src+'")');img.onerror=tryNext;img.src=src+'?v='+Date.now()};tryNext()}
function paintDrawer(q){let html='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'+'<b>Applications</b>'+'<span class="quiet">Blazin OS</span>'+'</div>'+'<div class="drawerGrid">';Object.entries(stuff).filter(([id,a])=>(id+' '+a.name).toLowerCase().includes(q.toLowerCase())).forEach(([id,a])=>(html+='<button class="drawerThing" data-open="'+id+'">'+'<div>'+a.icon+'</div>'+'<small>'+a.name+'</small>'+'</button>'));html+='</div>';$('#drawer').innerHTML=html}
function paintThing(id){if(id==='scribblesData')
return paintScribbles();if(id==='calculator')
return paintCalc();if(id==='files')
return paintFiles();if(id==='shellRoom')
return paintShell();if(id==='calendar')
return paintCalendar();if(id==='settings')
return paintSettings();if(id==='music')
return paintMusic();if(id==='game')
return paintGame();return paintAbout()}
function paintScribbles(){const w=makePane('scribblesData','▤ Notes',760,500);w.querySelector('.guts').innerHTML='<div class="scribblesData">'+'<aside class="scribbleList">'+'<button class="goTime" id="newScribble" style="width:100%;margin-bottom:8px">+ New note</button>'+'<div id="scribbles"></div>'+'</aside>'+'<section class="scribbleEdit">'+'<input id="noteNameThing" placeholder="Note name">'+'<textarea id="brainDump" placeholder="Start typing..."></textarea>'+'</section>'+'</div>';const draw=()=>{w.querySelector('#scribbles').innerHTML=scribblesData.map((n,i)=>'<div class="noterow '+(i===currentScribble?'active':'')+'" data-note="'+i+'">'+'<b>'+esc(n.whatAmI||'Untitled')+'</b>'+'<div class="quiet">'+esc((n.text||'').slice(0,32))+'</div>'+'</div>').join('');w.querySelector('#noteNameThing').value=scribblesData[currentScribble]?.whatAmI||'Untitled';w.querySelector('#brainDump').value=scribblesData[currentScribble]?.text||''};const list=w.querySelector('#scribbles');w.querySelector('#newScribble').onclick=()=>{scribblesData.unshift({whatAmI:'Untitled',text:''});currentScribble=0;saveScribbles();draw()};list.onclick=e=>{const r=e.target.closest('[data-note]');if(!r)return;currentScribble=+r.dataset.note;draw()};w.querySelector('#noteNameThing').oninput=e=>{scribblesData[currentScribble].whatAmI=e.target.value;saveScribbles();draw()};w.querySelector('#brainDump').oninput=e=>{scribblesData[currentScribble].text=e.target.value;saveScribbles()};draw();return w}
function paintCalc(){const w=makePane('calculator','⊞ Calculator',390,520);w.querySelector('.guts').innerHTML='<div class="meat">'+'<div class="calcNest">'+'<div class="tile">'+'<div class="calcFace" id="numbersGoHere">0</div>'+'<div class="calcButtons">'+['C','⌫','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','±','0','.','='].map(k=>'<button data-k="'+k+'">'+k+'</button>').join('')+'</div>'+'</div>'+'</div>'+'</div>';let numbersGoHere='0';let a=null;let op=null;let just=!1;const d=w.querySelector('#numbersGoHere');const refresh=()=>(d.textContent=numbersGoHere);w.querySelectorAll('[data-k]').forEach(b=>(b.onclick=()=>{const k=b.dataset.k;if(/\d/.test(k)||k==='.'){if(just||numbersGoHere==='0'){numbersGoHere=k==='.'?'0.':k;just=!1}else if(k!=='.'||!numbersGoHere.includes('.')){numbersGoHere+=k}}else if(k==='C'){numbersGoHere='0';a=null;op=null;just=!1}else if(k==='⌫'){numbersGoHere=numbersGoHere.length>1?numbersGoHere.slice(0,-1):'0'}else if(k==='±'){numbersGoHere=String(-parseFloat(numbersGoHere)||0)}else if(k==='%'){numbersGoHere=String(parseFloat(numbersGoHere)/100)}else if(['+','−','×','÷'].includes(k)){a=parseFloat(numbersGoHere);op=k;just=!0}else if(k==='='&&a!==null){const b=parseFloat(numbersGoHere);let r;if(op==='+')
r=a+b;else if(op==='−')
r=a-b;else if(op==='×')
r=a*b;else r=a/b;numbersGoHere=String(Number.isFinite(r)?r:'Error');a=null;op=null;just=!0}
refresh()}));return w}
function paintFiles(){const w=makePane('files','▱ Files',760,520);w.querySelector('.guts').innerHTML='<div class="thingy">'+'<div class="toolbox">'+'<button id="goBack">←</button>'+'<div class="crumbCake" id="crumbCake" style="flex:1"></div>'+'<button id="makePile">New folder</button>'+'<button class="goTime" id="makeTextThing">New file</button>'+'</div>'+'<div class="meat">'+'<div class="quiet" id="fileWhisper" style="margin-bottom:12px"></div>'+'<div id="junkFiles" class="filegrid"></div>'+'</div>'+'</div>';const tiles=w.querySelector('#junkFiles');const crumbCake=w.querySelector('#crumbCake');const info=w.querySelector('#fileWhisper');const draw=()=>{const dir=whereAmI();const names=Object.values(dir.children||{}).sort((a,b)=>a.type!==b.type?a.type==='folder'?-1:1:a.name.localeCompare(b.name));crumbCake.innerHTML='<button class="crumbButton" data-depth="0">Blazin Drive</button>'+trail.map((p,i)=>'<span class="quiet">/</span>'+'<button class="crumbButton" data-depth="'+(i+1)+'">'+esc(p)+'</button>').join('');info.textContent=(trail.length?trail.join(' / '):'Blazin Drive')+' · '+names.length+' item'+(names.length===1?'':'s');tiles.innerHTML=names.length?names.map(n=>'<div class="fileThing" data-name="'+esc(n.name)+'">'+'<button class="fileNonsense" title="Actions">•••</button>'+'<div class="filePic">'+(n.type==='folder'?'📁':'📄')+'</div>'+'<div class="fileNameThing">'+esc(n.name)+'</div>'+'<div class="quiet">'+(n.type==='folder'?'Folder':'Text file')+'</div>'+'</div>').join(''):'<div class="empty quiet">This folder is empty.<br><br>Create a folder or text file.</div>'};w.querySelector('#goBack').onclick=()=>{if(trail.length){trail.pop();draw()}};w.querySelector('#makePile').onclick=()=>{const n=gibberishPrompt('Folder name','New Folder');if(n){const name=unique(whereAmI(),n.trim());whereAmI().children[name]={type:'folder',name,children:{}};saveJunk();draw()}};w.querySelector('#makeTextThing').onclick=()=>{const n=gibberishPrompt('File name','New File.txt');if(n){const name=unique(whereAmI(),n.trim());whereAmI().children[name]={type:'file',name,meat:''};saveJunk();draw()}};crumbCake.onclick=e=>{const c=e.target.closest('[data-depth]');if(c){trail=trail.slice(0,+c.dataset.depth);draw()}};tiles.onclick=e=>{const tile=e.target.closest('.fileThing');if(!tile)return;const name=tile.dataset.name;const node=whereAmI().children[name];if(e.target.closest('.fileNonsense')){const action=gibberishPrompt('Type rename or delete','rename');if(action==='rename'){const nn=gibberishPrompt('New name',name);if(nn&&(!whereAmI().children[nn]||nn===name)){const real=whereAmI().children[name];delete whereAmI().children[name];real.name=nn.trim();whereAmI().children[real.name]=real;saveJunk()}}else if(action==='delete'&&confirm('Delete '+name+'?')){delete whereAmI().children[name];saveJunk()}
draw();return}
if(node.type==='folder'){trail.push(name);draw()}else{openJunk(name)}};draw();return w}
function gibberishPrompt(title,defaultValue){return prompt(title,defaultValue)}
function paintShell(){const w=makePane('shellRoom','>_ Terminal',640,430);w.querySelector('.guts').innerHTML='<div class="shellRoom">'+'<div>Blazin Terminal 1.0</div>'+'<div class="quiet" style="margin:6px 0 12px">Type <b>help</b> for commands.</div>'+'<div id="terminalYelling"></div>'+'<div class="shellLine">'+'<span class="gibberishPrompt">blazin@os:~$</span>'+'<input id="term" class="keyboardThing" autocomplete="off">'+'</div>'+'</div>';const input=w.querySelector('#term');const terminalYelling=w.querySelector('#terminalYelling');input.focus();input.onkeydown=e=>{if(e.key!=='Enter')
return;const c=input.value.trim();if(!c)return;terminalYelling.insertAdjacentHTML('beforeend','<div class="shellRow">'+'<span class="gibberishPrompt">blazin@os:~$</span> '+esc(c)+'</div>');let r='';if(c==='help')
r='help | clear | date | whoami | apps | echo <text>';else if(c==='date')
r=new Date().toString();else if(c==='whoami')
r='user@blazin';else if(c==='apps')
r=Object.values(stuff).map(a=>a.name).join(', ');else if(c==='clear'){terminalYelling.innerHTML='';input.value='';return}else if(c.startsWith('echo '))
r=c.slice(5);else r='command not found: '+c;terminalYelling.insertAdjacentHTML('beforeend','<div class="shellRow">'+esc(r)+'</div>');input.value='';w.querySelector('.guts').scrollTop=w.querySelector('.guts').scrollHeight};return w}
function paintMusic(){const w=makePane('music','♫ Blazin Music',820,560);w.querySelector('.guts').innerHTML=`
      <div class="thingy">

        <div class="toolbox">
          <input
            id="musicQuestion"
            placeholder="Search tracks, artists, albums..."
            style="flex:1"
          >

          <button
            class="goTime"
            id="musicHunt"
          >
            Search
          </button>
        </div>

        <div
          class="meat"
          style="
            padding:0;
            display:grid;
            grid-template-columns:1fr 310px;
            min-height:0
          "
        >

          <div
            style="
              min-width:0;
              overflow:auto;
              padding:14px
            "
          >

            <div
              class="tile"
              style="margin-bottom:12px"
            >
              <b>Blazin Music</b>

              <p class="quiet">
                Music lives inside Blazin OS now.
                Pick a track and it plays in this pane.
              </p>
            </div>

            <div
              id="ytresults"
              class="tiles"
            ></div>

          </div>

          <aside
            style="
              border-left:1px solid rgba(255,255,255,.08);
              padding:14px;
              display:flex;
              flex-direction:column;
              gap:10px
            "
          >

            <div class="quiet">
              Now playing
            </div>

            <div
              class="tile"
              id="currentlyMakingNoise"
            >
              <div
                style="font-size:42px"
              >
                ♫
              </div>

              <b>
                No track selected
              </b>

              <p class="quiet">
                Choose a track from the library.
              </p>
            </div>

            <audio
              id="noiseBox"
              controls
              style="width:100%"
            ></audio>

            <div class="quiet">
              Tip: Add your own MP3/OGG files by
              choosing a local track below.
            </div>

            <input
              id="bringYourNoise"
              type="file"
              accept="audio/*"
              multiple
            >

            <div id="yourNoise"></div>

          </aside>

        </div>

      </div>
    `;const q=w.querySelector('#musicQuestion');const results=w.querySelector('#ytresults');const now=w.querySelector('#currentlyMakingNoise');const audio=w.querySelector('#noiseBox');const localInput=w.querySelector('#bringYourNoise');const yourNoise=w.querySelector('#yourNoise');const library=[{whatAmI:'Midnight Drive',artist:'Blazin Radio',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},{whatAmI:'Neon Skies',artist:'Blazin Radio',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},{whatAmI:'Afterburn',artist:'Blazin Radio',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'},{whatAmI:'Night Runner',artist:'Blazin Radio',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'}];const play=t=>{now.innerHTML='<div style="font-size:42px;margin-bottom:8px">♫</div>'+'<b>'+esc(t.whatAmI)+'</b>'+'<p class="quiet">'+esc(t.artist)+'</p>';audio.src=t.url;audio.play().catch(()=>{})};const draw=(filter='')=>{const list=library.filter(t=>(t.whatAmI+' '+t.artist).toLowerCase().includes(filter.toLowerCase()));results.innerHTML=list.map(t=>'<button class="tile" style="text-align:left;border:1px solid rgba(255,255,255,.08);color:#fff;cursor:pointer">'+'<div style="font-size:28px;margin-bottom:7px">♫</div>'+'<b>'+esc(t.whatAmI)+'</b>'+'<div class="quiet">'+esc(t.artist)+'</div>'+'</button>').join('')||'<div class="quiet">No tracks found.</div>';results.querySelectorAll('button').forEach((b,idx)=>(b.onclick=()=>play(list[idx])))};q.oninput=()=>draw(q.value);q.onkeydown=e=>{if(e.key==='Enter')
draw(q.value);};w.querySelector('#musicHunt').onclick=()=>draw(q.value);draw();localInput.onchange=()=>{yourNoise.innerHTML='';[...localInput.files].forEach(f=>{const u=URL.createObjectURL(f);const b=document.createElement('button');b.className='tile';b.style.textAlign='left';b.innerHTML='<b>'+esc(f.name)+'</b>'+'<div class="quiet">Local audio</div>';b.onclick=()=>play({whatAmI:f.name,artist:'Local file',url:u});yourNoise.appendChild(b)})};return w}
function paintGame(){const w=makePane('game','◆ Blazin Arena',820,560);w.querySelector('.guts').innerHTML=`
      <div class="thingy">

        <div class="toolbox">

          <span
            class="quiet"
            id="gameMuttering"
          >
            WASD move · Mouse aim · Click shoot · Shift dash · Z field wipe
          </span>

          <button
            class="goTime"
            id="startMeUp"
          >
            Start Arena
          </button>

        </div>

        <div
          class="meat"
          style="
            display:grid;
            place-items:center;
            background:rgba(0,0,0,.18);
            position:relative
          "
        >

          <canvas
            id="pit"
            tabindex="0"
            width="760"
            height="430"
            style="
              width:min(100%,760px);
              height:auto;
              background:radial-gradient(circle at 50% 45%,#141b2b,#06090f);
              border:1px solid rgba(255,255,255,.1);
              border-radius:14px;
              box-shadow:0 15px 45px rgba(0,0,0,.35);
              outline:none;
            "
          ></canvas>

        </div>

      </div>
    `;const c=w.querySelector('#pit');const ctx=c.getContext('2d');const start=w.querySelector('#startMeUp');const status=w.querySelector('#gameMuttering');let running=!1;let raf=0;const keys={w:!1,a:!1,s:!1,d:!1,shift:!1};const mouse={x:c.width/2,y:c.height/2,down:!1};let player;let enemies=[];let bullets=[];let particles=[];let boss=null;let score=0;let level=1;let xp=0;let nextXp=100;let spawnTimer=0;let last=0;let shootCd=0;let dashCd=0;let inv=0;let zUses=0;let zUnlocked=!1;let zFlash=0;let bossSpawned=!1;let bossDefeated=!1;const isThisGameActive=()=>{const current=windowPile.get('game');return(current===w&&!w.classList.contains('min'))};const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);const burst=(x,y,n,life=380)=>{for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2;const s=Math.random()*3+1;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life,max:life,r:Math.random()*2+1})}};const reset=()=>{player={x:c.width/2,y:c.height/2,r:16,hp:100,maxHp:100,speed:3.3,angle:0};enemies=[];bullets=[];particles=[];boss=null;score=0;level=1;xp=0;nextXp=100;spawnTimer=0;shootCd=0;dashCd=0;inv=0;zUses=0;zUnlocked=!1;zFlash=0;bossSpawned=!1;bossDefeated=!1;Object.keys(keys).forEach(k=>(keys[k]=!1));mouse.down=!1;status.textContent='WASD move · Mouse aim · Click shoot · Shift dash · Z locked'};const shoot=()=>{if(!running||shootCd>0)
return;const a=player.angle;bullets.push({x:player.x+Math.cos(a)*20,y:player.y+Math.sin(a)*20,vx:Math.cos(a)*8,vy:Math.sin(a)*8,r:4,life:900,damage:22+level*2});shootCd=120};const killEnemy=e=>{if(e.dead)
return;e.dead=!0;score+=e.r>15?40:15;xp+=e.r>15?28:12;burst(e.x,e.y,e.r>15?18:10,450)};const defeatBoss=()=>{if(!boss)
return;burst(boss.x,boss.y,150,1400);score+=500;bossDefeated=!0;boss=null;zUnlocked=!0;zUses=10;status.textContent='RED ORB BOSS DEFEATED · Z SKILL UNLOCKED · 10 USES'};const dash=()=>{if(!running||dashCd>0)
return;let dx=(keys.d?1:0)-(keys.a?1:0);let dy=(keys.s?1:0)-(keys.w?1:0);if(!dx&&!dy){dx=Math.cos(player.angle);dy=Math.sin(player.angle)}
const len=Math.hypot(dx,dy)||1;player.x=clamp(player.x+(dx/len)*95,player.r,c.width-player.r);player.y=clamp(player.y+(dy/len)*95,player.r,c.height-player.r);dashCd=1000;inv=280;enemies.forEach(e=>{if(!e.dead&&dist(player,e)<70){e.hp-=45+level*4;burst(e.x,e.y,10,300);if(e.hp<=0){killEnemy(e)}}});if(boss&&dist(player,boss)<100){boss.hp-=35+level*3;burst(boss.x,boss.y,15,350);if(boss.hp<=0){defeatBoss()}}
burst(player.x,player.y,22,500)};const useZ=()=>{if(!running||!zUnlocked||zUses<=0||zFlash>0)
return;zUses--;zFlash=700;enemies.forEach(e=>burst(e.x,e.y,15,500));enemies=[];if(boss){boss.hp=0;defeatBoss()}
for(let i=0;i<100;i++){const a=Math.random()*Math.PI*2;const radius=Math.random()*380;particles.push({x:player.x+Math.cos(a)*radius,y:player.y+Math.sin(a)*radius,vx:0,vy:0,life:700,max:700,r:Math.random()*4+1})}
score+=100;if(zUses>0){status.textContent='Z FIELD WIPE · '+zUses+' USES REMAINING'}else{status.textContent='Z SKILL EMPTY · DEFEAT THE BOSS AGAIN TO RESTOCK'}};const spawnEnemy=()=>{const side=Math.floor(Math.random()*4);let x=0;let y=0;if(side===0){x=Math.random()*c.width;y=-25}else if(side===1){x=c.width+25;y=Math.random()*c.height}else if(side===2){x=Math.random()*c.width;y=c.height+25}else{x=-25;y=Math.random()*c.height}
const elite=Math.random()<Math.min(0.12,0.03+level*0.006);const hp=elite?70+level*8:28+level*4;enemies.push({x,y,r:elite?18:13,hp,max:hp,speed:(elite?1.05:1.45)+level*0.03,color:elite?'#ffb347':'#ff5f78',dead:!1})};const spawnBoss=()=>{if(bossSpawned||bossDefeated)
return;bossSpawned=!0;boss={x:c.width/2,y:70,r:34,hp:600+level*80,maxHp:600+level*80,speed:0.65,pulse:0};status.textContent='RED ORB BOSS INCOMING · DEFEAT IT TO UNLOCK Z ×10';burst(boss.x,boss.y,80,1000)};const levelUp=()=>{level++;xp-=nextXp;nextXp=Math.floor(nextXp*1.28);player.maxHp+=12;player.hp=player.maxHp;player.speed+=0.12;burst(player.x,player.y,35,700);if(level>=5&&!bossSpawned){spawnBoss()}};const draw=()=>{ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='rgba(255,255,255,.025)';for(let x=0;x<c.width;x+=38){ctx.fillRect(x,0,1,c.height)}
for(let y=0;y<c.height;y+=38){ctx.fillRect(0,y,c.width,1)}
if(zFlash>0){ctx.fillStyle=`rgba(110,168,255,${Math.min(
              0.5,
              zFlash / 1000
            )})`;ctx.fillRect(0,0,c.width,c.height)}
particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle='#70e8ff';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;bullets.forEach(b=>{ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill()});enemies.forEach(e=>{ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.arc(e.x+4,e.y+5,e.r,0,Math.PI*2);ctx.fill();ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#201018';ctx.beginPath();ctx.arc(e.x-4,e.y-2,2.2,0,Math.PI*2);ctx.arc(e.x+4,e.y-2,2.2,0,Math.PI*2);ctx.fill();ctx.fillStyle='#222';ctx.fillRect(e.x-e.r,e.y-e.r-7,e.r*2,3);ctx.fillStyle='#68ef8a';ctx.fillRect(e.x-e.r,e.y-e.r-7,e.r*2*Math.max(0,e.hp/e.max),3)});if(boss){boss.pulse+=0.08;const pulse=Math.sin(boss.pulse)*4;ctx.shadowBlur=30;ctx.shadowColor='#ff1744';ctx.fillStyle='#ff1744';ctx.beginPath();ctx.arc(boss.x,boss.y,boss.r+pulse,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;const gradient=ctx.createRadialGradient(boss.x-8,boss.y-8,3,boss.x,boss.y,boss.r);gradient.addColorStop(0,'#ff8a9d');gradient.addColorStop(0.35,'#ff1744');gradient.addColorStop(1,'#700018');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(boss.x,boss.y,boss.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#240008';ctx.fillRect(boss.x-65,boss.y-boss.r-18,130,8);ctx.fillStyle='#ff1744';ctx.fillRect(boss.x-65,boss.y-boss.r-18,130*Math.max(0,boss.hp/boss.maxHp),8);ctx.fillStyle='#fff';ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillText('RED ORB BOSS',boss.x,boss.y+boss.r+20);ctx.textAlign='left'}
ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.angle);ctx.globalAlpha=inv>0?0.55:1;ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.arc(3,4,player.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#70e8ff';ctx.beginPath();ctx.arc(0,0,player.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#172130';ctx.fillRect(5,-4,18,8);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(3,-6,2.5,0,Math.PI*2);ctx.arc(3,6,2.5,0,Math.PI*2);ctx.fill();ctx.restore();ctx.globalAlpha=1;ctx.fillStyle='rgba(8,11,17,.78)';ctx.fillRect(12,12,230,70);ctx.fillStyle='#fff';ctx.font='bold 14px system-ui';ctx.fillText('Score '+score,24,33);ctx.fillStyle='#70e8ff';ctx.fillText('Level '+level,130,33);ctx.fillStyle='#333';ctx.fillRect(24,44,190,8);ctx.fillStyle='#68ef8a';ctx.fillRect(24,44,190*Math.max(0,player.hp/player.maxHp),8);ctx.fillStyle='#fff';ctx.font='11px system-ui';ctx.fillText(Math.max(0,Math.floor(player.hp))+'/'+player.maxHp,24,69);ctx.fillStyle='rgba(8,11,17,.78)';ctx.fillRect(c.width-200,12,188,68);ctx.fillStyle='#fff';ctx.fillText('XP '+xp+'/'+nextXp,c.width-188,31);ctx.fillStyle='#3d4554';ctx.fillRect(c.width-188,38,160,7);ctx.fillStyle='#c17cff';ctx.fillRect(c.width-188,38,160*Math.max(0,xp/nextXp),7);ctx.fillStyle=zUnlocked?'#c17cff':'#666';ctx.font='bold 12px system-ui';ctx.fillText(zUnlocked?'Z: FIELD WIPE × '+zUses:'Z: LOCKED · KILL RED ORB',c.width-188,67);if(!running){ctx.fillStyle='rgba(0,0,0,.42)';ctx.fillRect(0,0,c.width,c.height);ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='700 28px system-ui';ctx.fillText(score?'GAME OVER':'BLAZIN ARENA',c.width/2,c.height/2-10);ctx.font='13px system-ui';ctx.fillText(score?'Press Restart to run it again':'WASD + mouse to survive',c.width/2,c.height/2+18);ctx.textAlign='left'}};const loop=t=>{if(!running)
return;const dt=Math.min(32,t-last);last=t;shootCd=Math.max(0,shootCd-dt);dashCd=Math.max(0,dashCd-dt);inv=Math.max(0,inv-dt);zFlash=Math.max(0,zFlash-dt);let dx=(keys.d?1:0)-(keys.a?1:0);let dy=(keys.s?1:0)-(keys.w?1:0);const len=Math.hypot(dx,dy)||1;if(dx||dy){player.x=clamp(player.x+(dx/len)*player.speed*(dt/16),player.r,c.width-player.r);player.y=clamp(player.y+(dy/len)*player.speed*(dt/16),player.r,c.height-player.r)}
player.angle=Math.atan2(mouse.y-player.y,mouse.x-player.x);if(mouse.down)
shoot();spawnTimer+=dt;if(spawnTimer>Math.max(320,900-level*45)){if(!boss){spawnEnemy();if(level>4&&Math.random()<0.18){spawnEnemy()}}
spawnTimer=0}
bullets.forEach(b=>{b.x+=b.vx*(dt/16);b.y+=b.vy*(dt/16);b.life-=dt});bullets=bullets.filter(b=>b.life>0&&b.x>-30&&b.x<c.width+30&&b.y>-30&&b.y<c.height+30);enemies.forEach(e=>{const a=Math.atan2(player.y-e.y,player.x-e.x);e.x+=Math.cos(a)*e.speed*(dt/16);e.y+=Math.sin(a)*e.speed*(dt/16)});bullets.forEach(b=>{for(const e of enemies){if(!e.dead&&dist(b,e)<b.r+e.r){e.hp-=b.damage;b.life=0;burst(b.x,b.y,5,280);if(e.hp<=0){killEnemy(e)}}}
if(boss&&b.life>0&&dist(b,boss)<b.r+boss.r){boss.hp-=b.damage;b.life=0;burst(b.x,b.y,7,300);if(boss.hp<=0){defeatBoss()}}});enemies=enemies.filter(e=>!e.dead);enemies.forEach(e=>{if(dist(player,e)<player.r+e.r&&inv<=0){player.hp-=e.r>15?24:12;inv=500;burst(player.x,player.y,10,300)}});if(boss){const a=Math.atan2(player.y-boss.y,player.x-boss.x);boss.x+=Math.cos(a)*boss.speed*(dt/16);boss.y+=Math.sin(a)*boss.speed*(dt/16);boss.x=clamp(boss.x,boss.r,c.width-boss.r);boss.y=clamp(boss.y,boss.r,c.height-boss.r);if(dist(player,boss)<player.r+boss.r&&inv<=0){player.hp-=30;inv=600;burst(player.x,player.y,18,400)}}
particles.forEach(p=>{p.x+=p.vx*(dt/16);p.y+=p.vy*(dt/16);p.life-=dt;p.vx*=0.98;p.vy*=0.98});particles=particles.filter(p=>p.life>0);while(xp>=nextXp){levelUp()}
if(player.hp<=0){running=!1;status.textContent='You reached level '+level+' with '+score+' points';start.textContent='Restart';Object.keys(keys).forEach(k=>(keys[k]=!1));mouse.down=!1}
draw();raf=requestAnimationFrame(loop)};const pos=e=>{const r=c.getBoundingClientRect();mouse.x=(e.clientX-r.left)*(c.width/r.width);mouse.y=(e.clientY-r.top)*(c.height/r.height)};c.addEventListener('mousemove',pos);c.addEventListener('mousedown',e=>{pos(e);mouse.down=!0;c.focus()});window.addEventListener('mouseup',()=>{mouse.down=!1});c.addEventListener('click',()=>{c.focus()});const keyDown=e=>{if(!isThisGameActive()||!running)
return;if(e.code==='KeyW'||e.code==='ArrowUp'){keys.w=!0;e.preventDefault()}
if(e.code==='KeyA'||e.code==='ArrowLeft'){keys.a=!0;e.preventDefault()}
if(e.code==='KeyS'||e.code==='ArrowDown'){keys.s=!0;e.preventDefault()}
if(e.code==='KeyD'||e.code==='ArrowRight'){keys.d=!0;e.preventDefault()}
if(e.code==='ShiftLeft'||e.code==='ShiftRight'){if(!keys.shift){keys.shift=!0;dash()}
e.preventDefault()}
if(e.code==='KeyZ'&&!e.repeat){useZ();e.preventDefault()}};const keyUp=e=>{if(e.code==='KeyW'||e.code==='ArrowUp'){keys.w=!1}
if(e.code==='KeyA'||e.code==='ArrowLeft'){keys.a=!1}
if(e.code==='KeyS'||e.code==='ArrowDown'){keys.s=!1}
if(e.code==='KeyD'||e.code==='ArrowRight'){keys.d=!1}
if(e.code==='ShiftLeft'||e.code==='ShiftRight'){keys.shift=!1}};window.addEventListener('keydown',keyDown);window.addEventListener('keyup',keyUp);window.addEventListener('blur',()=>{Object.keys(keys).forEach(k=>(keys[k]=!1));mouse.down=!1});start.onclick=()=>{cancelAnimationFrame(raf);reset();running=!0;status.textContent='WASD move · Mouse aim · Click shoot · Shift dash · Z locked';start.textContent='Restart';c.focus();last=performance.now();draw();raf=requestAnimationFrame(loop)};c.focus();reset();draw();return w}
function paintCalendar(){const w=makePane('calendar','▦ Calendar',650,430);const d=new Date();w.querySelector('.guts').innerHTML='<div class="meat">'+'<div class="tiles">'+'<div class="tile">'+'<div class="quiet">Today</div>'+'<h2>'+d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})+'</h2>'+'<p class="quiet">No events yet.</p>'+'</div>'+'<div class="tile">'+'<div class="quiet">Blazin OS</div>'+'<h3>Build something cool.</h3>'+'<p class="quiet">This calendar is ready to grow.</p>'+'</div>'+'</div>'+'</div>';return w}
function paintSettings(){const w=makePane('settings','⚙ Settings',560,400);w.querySelector('.guts').innerHTML='<div class="meat">'+'<div class="tile">'+'<b>Accent color</b>'+'<p class="quiet">Change the OS highlight color.</p>'+'<input type="color" id="color" value="'+getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()+'">'+'</div>'+'<div class="tile" style="margin-top:10px">'+'<b>Reset filing system</b>'+'<p class="quiet">Deletes your saved virtual files.</p>'+'<button id="nukeTheDrive">Reset files</button>'+'</div>'+'</div>';w.querySelector('#color').oninput=e=>document.documentElement.style.setProperty('--accent',e.target.value);w.querySelector('#nukeTheDrive').onclick=()=>{if(confirm('Reset Blazin Drive?')){fs=clone(starterJunk);trail=[];saveJunk();alert('Blazin Drive reset.')}};return w}
function paintAbout(){const w=makePane('about','? About Blazin OS',500,320);w.querySelector('.guts').innerHTML='<div class="meat">'+'<h2>Blazin OS</h2>'+'<p class="quiet">A browser-based floor operating system concept.</p>'+'<div class="tile">'+'<b>Built-in apps</b>'+'<p class="quiet">Notes, Calculator, Files, Terminal, Calendar, Music, Blazin Arena and Settings.</p>'+'</div>'+'</div>';return w}
document.addEventListener('click',e=>{const o=e.target.closest('[data-open]');if(o){openThing(o.dataset.open)}});paintDesktop();huntForBg();document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.code==='Space'){e.preventDefault();$('#drawer').classList.toggle('vanisher');paintDrawer('')}})})()