const D=[
['Maa Shailputri','Orange','#f28b24','assets/mata/maa-shailputri.jpg','The first form of Navadurga represents purity, strength and the grounded energy of nature. Begin with faith and a fresh resolve.'],
['Maa Brahmacharini','White','#f5f1e9','assets/mata/maa-brahmacharni.jpg','Maa Brahmacharini embodies devotion, wisdom and determination. Her calm form reminds us to stay patient and focused.'],
['Maa Chandraghanta','Red','#c9252d','assets/mata/maa-chandraghanta.jpg','Maa Chandraghanta represents courage and protection. Her radiant energy inspires confidence and a fearless heart.'],
['Maa Kushmanda','Royal Blue','#3154a5','assets/mata/maa-kushmanda.jpg','Maa Kushmanda is associated with creative energy, vitality and abundance. Her presence reminds us that light can emerge from within.'],
['Maa Skandamata','Yellow','#f3c42d','assets/mata/maa-skandmata.jpg','Maa Skandamata symbolises motherhood, compassion and protection — the strength of care and love.'],
['Maa Katyayani','Green','#3d9147','assets/mata/maa-katyayni.jpg','Maa Katyayani is the warrior form of Durga, representing courage, justice and determination.'],
['Maa Kalaratri','Grey','#77777b','assets/mata/maa-kalratri.jpg','Maa Kalaratri represents the destruction of fear and darkness. Courage grows when we confront what frightens us.'],
['Maa Mahagauri','Purple','#8b4fa2','assets/mata/maa-mahagauri.jpg','Maa Mahagauri symbolises purity, serenity and inner peace. Move forward with a clear heart.'],
['Maa Siddhidatri','Peacock Green','#178c82','assets/mata/maa-siddhidatri.jpg','Maa Siddhidatri is associated with wisdom, fulfilment and spiritual grace, completing the nine-day journey.']];
const list=document.querySelector('#days');D.forEach((d,i)=>{const x=document.createElement('div');x.className='day'+(i?'':' active');x.style.setProperty('--c',d[2]);x.innerHTML='<span class="n">0'+(i+1)+'</span><div><b>'+d[0]+'</b><small>'+((11+i))+' OCT • '+d[1]+'</small></div><span class="dot"></span>';x.onclick=()=>select(i);list.appendChild(x)});
function select(i){const d=D[i];document.querySelectorAll('.day').forEach((x,n)=>x.classList.toggle('active',n===i));document.querySelector('#dayno').textContent='DAY '+(i+1);document.querySelector('#bar').style.width=((i+1)*11.11)+'%';document.querySelector('#num').textContent=String(i+1).padStart(2,'0');document.querySelector('#date').textContent='DAY '+(i+1)+' • '+(11+i)+' OCT';document.querySelector('#name').textContent=d[0];document.querySelector('#about').textContent=d[4];document.querySelector('#badge').textContent=d[1].toUpperCase();document.querySelector('#colour').textContent=d[1];document.querySelector('#swatch').style.background=d[2];const img=document.querySelector('#mata');img.src=d[3]+'?v=20261008';img.alt=d[0];img.onerror=()=>{img.style.display='none'};img.onload=()=>{img.style.display='block'};document.querySelector('.photo').style.setProperty('--day-color',d[2]);}
select(0);
const wheel=document.querySelector('#wheel');D.forEach((d,i)=>{const s=document.createElement('i');s.style.cssText='position:absolute;width:34px;height:34px;border-radius:50%;background:'+d[2]+';left:calc(50% + '+(Math.cos(i/9*Math.PI*2-Math.PI/2)*42)+'% - 17px);top:calc(50% + '+(Math.sin(i/9*Math.PI*2-Math.PI/2)*42)+'% - 17px);border:3px solid #19090d';wheel.appendChild(s)});
const form=document.querySelector('#employeeForm'),fileInput=document.querySelector('#photoUpload'),preview=document.querySelector('#uploadPreview'),previewImage=document.querySelector('#previewImage'),previewName=document.querySelector('#previewName'),formMessage=document.querySelector('#formMessage'),employeeName=document.querySelector('#employeeName'),employeeCode=document.querySelector('#employeeCode'),locationInput=document.querySelector('#location'),department=document.querySelector('#department');
const UPLOAD_URL='https://script.google.com/macros/s/AKfycbycUblVMrpWn2Lelv3NBqz1T4N0GhvBn3_v3nXXBWNDph6qyYvWXzswWJ6yKyYqKL9aUA/exec';
let selectedFiles=[];
function fileToData(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)})}
fileInput.addEventListener('change',()=>{
  selectedFiles=Array.from(fileInput.files||[]);
  if(selectedFiles.length>3){fileInput.value='';selectedFiles=[];preview.hidden=true;formMessage.textContent='Please select a maximum of 3 photos.';return}
  const tooLarge=selectedFiles.find(f=>f.size>5*1024*1024);
  if(tooLarge){fileInput.value='';selectedFiles=[];preview.hidden=true;formMessage.textContent='Each photo must be smaller than 5 MB.';return}
  if(!selectedFiles.length){preview.hidden=true;return}
  previewImage.src=URL.createObjectURL(selectedFiles[0]);
  previewName.textContent=selectedFiles.length===1?selectedFiles[0].name:selectedFiles.length+' photos selected';
  preview.hidden=false;
  formMessage.textContent=selectedFiles.length+' photo'+(selectedFiles.length===1?'':'s')+' selected. Ready to upload.';
});
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const files=selectedFiles.length?selectedFiles:Array.from(fileInput.files||[]);
  if(!employeeName.value.trim()||!employeeCode.value.trim()||!locationInput.value.trim()||!department.value.trim()){formMessage.textContent='Please complete all employee details.';return}
  if(!files.length){formMessage.textContent='Please upload at least one festive photo.';return}
  if(files.length>3){formMessage.textContent='You can upload a maximum of 3 photos.';return}
  if(files.some(f=>f.size>5*1024*1024)){formMessage.textContent='Each photo must be smaller than 5 MB.';return}
  const submit=document.querySelector('.form-submit');submit.disabled=true;submit.textContent='UPLOADING PHOTOS…';formMessage.textContent='Uploading your photos to the SMC Drive folder…';
  try{
    const payload={name:employeeName.value.trim(),employeeCode:employeeCode.value.trim(),location:locationInput.value.trim(),department:department.value.trim(),files:await Promise.all(files.map(async f=>({name:f.name,type:f.type,data:await fileToData(f)})))};
    const response=await fetch(UPLOAD_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const result=await response.json();
    if(!result.success)throw new Error(result.message||'Upload failed');
    localStorage.setItem('smcNavratriEmployee',JSON.stringify({...payload,photoNames:files.map(f=>f.name),savedAt:new Date().toISOString()}));
    formMessage.textContent='✓ Details saved and '+files.length+' photo'+(files.length===1?'':'s')+' uploaded successfully.';
    submit.textContent='UPLOADED ✓';
    setTimeout(()=>document.querySelector('#navratri').scrollIntoView({behavior:'smooth'}),700);
  }catch(err){
    console.error(err);formMessage.textContent='Upload failed. Please try again. '+err.message;submit.disabled=false;submit.textContent='SAVE DETAILS & CONTINUE →';
  }
});
const saved=localStorage.getItem('smcNavratriEmployee');if(saved){try{const d=JSON.parse(saved);employeeName.value=d.name||'';employeeCode.value=d.employeeCode||'';locationInput.value=d.location||'';department.value=d.department||''}catch(e){}}
const r=document.querySelector('#ravan'),field=document.querySelector('#field'),fire=document.querySelector('#fire'),again=document.querySelector('#again'),win=document.querySelector('#win'),boom=document.querySelector('#boom'),msg=document.querySelector('#message'),ch=document.querySelector('#chances'),hit=document.querySelector('#hits'),archer=document.querySelector('#archer');let x=82,dir=-1,run=true,chances=5,hits=0,last=performance.now(),animating=false;function loop(t){const dt=(t-last)/1000;last=t;if(run&&!animating){x+=dir*23*dt;if(x<4){x=4;dir=1}if(x>88){x=88;dir=-1}r.style.left=x+'%'}requestAnimationFrame(loop)}requestAnimationFrame(loop);function shoot(){if(!run||!chances||animating)return;animating=true;chances--;ch.textContent=chances;fire.disabled=true;archer.classList.remove('draw','release');void archer.offsetWidth;archer.classList.add('draw');msg.textContent='Drawing the bow…';setTimeout(()=>{archer.classList.remove('draw');archer.classList.add('release');msg.textContent='Arrow released! 🏹';const a=field.getBoundingClientRect(),q=r.getBoundingClientRect(),center=q.left+q.width/2-a.left;const direct=Math.abs(center-a.width/2)<95;setTimeout(()=>{archer.classList.remove('release');if(direct){hits++;hit.textContent=hits;msg.textContent='Bullseye! Ravan defeated 🔥';run=false;r.style.opacity=0;boom.classList.add('show');setTimeout(()=>win.classList.add('show'),450)}else{msg.textContent=chances?('Missed! '+chances+' chance'+(chances===1?'':'s')+' left.'):'No chances left — try again!';animating=false;fire.disabled=false}},650)},650)}fire.onclick=shoot;again.onclick=()=>{x=82;dir=-1;run=true;animating=false;chances=5;hits=0;r.style.opacity=1;r.style.left='82%';ch.textContent='5';hit.textContent='0';msg.textContent='Ravan is approaching…';win.classList.remove('show');boom.classList.remove('show');archer.classList.remove('draw','release');fire.disabled=false};
