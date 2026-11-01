const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#main-menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';menu.hidden=open;toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const canvas=document.querySelector('.particles');const ctx=canvas.getContext('2d');
if(ctx){let width=0,height=0,dots=[],particleFrame=0,visible=true;function size(){const dpr=Math.min(window.devicePixelRatio||1,2);width=canvas.clientWidth;height=canvas.clientHeight;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);let seed=17;function random(){seed=(seed*16807)%2147483647;return seed/2147483647;}dots=Array.from({length:width<600?38:85},()=>({x:random()*width,y:random()*height,r:.4+random()*.9,a:.1+random()*.3,s:.08+random()*.18}));}
function draw(){ctx.clearRect(0,0,width,height);for(const dot of dots){ctx.beginPath();ctx.fillStyle=`rgba(225,221,230,${dot.a})`;ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);ctx.fill();if(!reduced.matches){dot.y-=dot.s;if(dot.y<0)dot.y=height;}}if(visible&&!document.hidden&&!reduced.matches)particleFrame=requestAnimationFrame(draw);else particleFrame=0;}
function restart(){if(particleFrame)cancelAnimationFrame(particleFrame);particleFrame=0;draw();}
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart();});observer.observe(canvas);// Re-measure whenever the hero changes size (images and fonts load after first paint).
new ResizeObserver(()=>{size();restart();}).observe(canvas);document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);size();draw();}

// Somente preencher com o contato oficial fornecido pela Hypefit.
const commercial={whatsapp:''};
const filters=[...document.querySelectorAll('[data-filter]')];
const catalogGroups=[...document.querySelectorAll('[data-category]')];
const catalogCount=document.querySelector('[data-count]');
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));catalogGroups.forEach(group=>{group.hidden=category!=='all'&&group.dataset.category!==category;});catalogCount.textContent=category==='drink'?'Mostrando Hype Drink.':category==='gelato'?'Mostrando gelatos.':category==='mais'?'Mostrando Protein Complete e Reset+.':'Mostrando todo o cardápio.';}));
const partnerForm=document.querySelector('#partner-form');
const partnerResult=document.querySelector('#partner-result');
const partnerMessage=document.querySelector('#partner-message');
const messageStatus=document.querySelector('#message-status');
const sendMessage=document.querySelector('#send-message');
partnerForm.addEventListener('submit',event=>{event.preventDefault();if(!partnerForm.reportValidity())return;const name=document.querySelector('#partner-name').value.trim();const city=document.querySelector('#partner-city').value.trim();if(!name||!city){messageStatus.textContent='Preencha seu nome e cidade para preparar a mensagem.';partnerResult.hidden=false;return;}const stage=document.querySelector('#partner-stage').value;const phone=document.querySelector('#partner-phone').value.trim();partnerMessage.value=`Olá, equipe Hypefit! Meu nome é ${name} e tenho interesse em entender como montar um ponto em ${city}.\n\nMeu WhatsApp: ${phone}\nMeu momento: ${stage}.\n\nGostaria de conhecer o modelo de parceria, o investimento estimado, os equipamentos, os produtos e o suporte oferecido. Podemos conversar?`;partnerResult.hidden=false;if(/^55\d{10,11}$/.test(commercial.whatsapp)){sendMessage.href=`https://wa.me/${commercial.whatsapp}?text=${encodeURIComponent(partnerMessage.value)}`;sendMessage.hidden=false;messageStatus.textContent='Sua mensagem está pronta. Revise e escolha se quer enviar pelo WhatsApp.';}else{sendMessage.hidden=true;messageStatus.textContent='Mensagem preparada. Copie e apresente à equipe Hypefit no balcão. Nenhuma informação foi enviada.';}partnerMessage.focus();});
document.querySelector('#copy-message').addEventListener('click',async()=>{try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('clipboard-unavailable');await navigator.clipboard.writeText(partnerMessage.value);messageStatus.textContent='Mensagem copiada. Ela ainda não foi enviada.';}catch{partnerMessage.focus();partnerMessage.select();messageStatus.textContent='Selecione e copie a mensagem com Ctrl+C ou ⌘C. Nenhuma informação foi enviada.';}});

// Scroll reveals, Apple-style.
const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealIO.unobserve(e.target);}}),{rootMargin:'0px 0px -12% 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));
// Giant CR7 word brightens and settles while its sticky stage is on screen.
const cr7=document.querySelector('.cr7');const cr7Word=document.querySelector('.cr7-word');
let pageFrame=0;
function pageScroll(){pageFrame=0;const vh=innerHeight;
if(cr7&&cr7Word&&!reduced.matches){const r=cr7.getBoundingClientRect();const p=Math.max(0,Math.min(1,(vh-r.top)/(vh*.8)));cr7Word.style.setProperty('--o',(.04+p*.86).toFixed(3));cr7Word.style.setProperty('--s',(1.14-p*.14).toFixed(3));}}
addEventListener('scroll',()=>{if(!pageFrame)pageFrame=requestAnimationFrame(pageScroll);},{passive:true});addEventListener('resize',pageScroll);pageScroll();

// Hero color picker: swaps the cup photo and the glow behind it.
const hero=document.querySelector('.hero');const cups=[...document.querySelectorAll('.hero-cup')];const swatches=[...document.querySelectorAll('[data-swatch]')];
function pick(i){swatches.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));cups.forEach((c,k)=>c.classList.toggle('on',k===i));hero.style.setProperty('--glow',swatches[i].dataset.glow);const nm=document.querySelector('.cup-name');if(nm)nm.innerHTML=`<strong>${swatches[i].getAttribute('aria-label')}</strong>`;}
swatches.forEach((b,i)=>b.addEventListener('click',()=>{pick(i);clearInterval(autoSwap);}));
// Cycle the colors on its own until the visitor picks one.
let shown=0;const autoSwap=reduced.matches?0:setInterval(()=>{if(document.hidden)return;shown=(shown+1)%cups.length;pick(shown);},3200);

// Close the menu when tapping outside it.
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();});

// ---------- Pedido online ----------
// Endereço do sistema de pedidos (ex.: https://pedir.hypefit.com.br). Vazio = os botões "Peça agora" ficam escondidos.
const pedidos={url:''};
(()=>{let base=pedidos.url;
// prévia no Mac: ?pedidos=http://localhost:8787 (só aceita endereço local, para ninguém montar link para outro site)
const teste=new URLSearchParams(location.search).get('pedidos');if(teste&&/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(teste))base=teste;
if(!/^https?:\/\/[^\s"']+$/.test(base||''))return;base=base.replace(/\/$/,'');
document.querySelectorAll('[data-pedir]').forEach(a=>{const id=a.dataset.pedir;a.href=id?`${base}/app/#add/${encodeURIComponent(id)}`:`${base}/app/`;});
document.querySelectorAll('.so-pedido').forEach(e=>e.hidden=false);document.body.classList.add('pedido-on');
// com o pedido online ligado, "Ver o cardápio" vira botão secundário e o "Seja sócio" sai da abertura (continua no topo)
document.querySelectorAll('[data-vira-vidro]').forEach(a=>{a.classList.remove('solid-button');a.classList.add('glass-button');});
document.querySelector('.hero-ctas a[href="#seja-socio"]')?.setAttribute('hidden','');
})();
