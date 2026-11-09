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
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));catalogGroups.forEach(group=>{group.hidden=category!=='all'&&group.dataset.category!==category;});catalogCount.textContent=category==='drink'?'Mostrando Hype Drink.':category==='gelato'?'Mostrando gelatos.':category==='protein'?'Mostrando Shake Proteinado.':category==='reset'?'Mostrando Reset+.':'Mostrando todo o cardápio.';}));
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
// Só o primeiro copo vem no HTML. Os outros têm data-src e entram depois do load, ou na hora se a pessoa tocar na bolinha.
function loadCup(i){const c=cups[i];if(c.dataset.src){c.src=c.dataset.src;c.removeAttribute('data-src');}return c.decode().catch(e=>{const s=c.getAttribute('src');if(s){c.dataset.src=s;c.removeAttribute('src');}throw e;});}
const cupReady=i=>cups[i].complete&&cups[i].naturalWidth>0;
let wanted=0,visible=0;
// O copo só troca quando a foto nova está pronta, para nunca sobrar a tela vazia.
function pick(i){wanted=i;swatches.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));hero.style.setProperty('--glow',swatches[i].dataset.glow);const nm=document.querySelector('.cup-name');if(nm)nm.innerHTML=`<strong>${swatches[i].getAttribute('aria-label')}</strong>`;loadCup(i).then(()=>{if(wanted!==i)return;visible=i;cups.forEach((c,k)=>c.classList.toggle('on',k===i));},()=>{if(wanted===i&&i!==visible)pick(visible);});}
swatches.forEach((b,i)=>b.addEventListener('click',()=>{pick(i);clearInterval(autoSwap);}));
// Cycle the colors on its own until the visitor picks one.
let shown=0;const autoSwap=reduced.matches?0:setInterval(()=>{if(document.hidden)return;const next=cups.slice(1).map((_,d)=>(shown+d+1)%cups.length).find(k=>cupReady(k));if(next===undefined)return;shown=next;pick(next);},3200);
const loadRest=()=>cups.slice(1).reduce((p,_,k)=>p.then(()=>loadCup(k+1)).catch(()=>{}),Promise.resolve());
const whenIdle=window.requestIdleCallback||(f=>setTimeout(f,200));
if(document.readyState==='complete')whenIdle(loadRest,{timeout:2000});else addEventListener('load',()=>whenIdle(loadRest,{timeout:2000}),{once:true});

// Close the menu when tapping outside it.
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();});

// ---------- Pedido online ----------
// Endereço do sistema de pedidos (ex.: https://pedir.hypefit.com.br). Vazio = os botões "Peça agora" ficam escondidos.
const pedidos={url:''};
(()=>{let base=pedidos.url;
// prévia no Mac: ?pedidos=http://localhost:8787 (só aceita endereço local, para ninguém montar link para outro site)
const teste=new URLSearchParams(location.search).get('pedidos');if(teste&&/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(teste))base=teste;
const U=window.HF_UNIDADE;if(U)base=location.origin;
// site geral: quem escolhe a unidade é a seção Onde estamos, então "Peça agora" só rola até ela
const geral=!U&&!base;
if(!geral&&!/^https?:\/\/[^\s"']+$/.test(base||''))return;base=(base||'').replace(/\/$/,'');
const q=U?`?loja=${encodeURIComponent(U.id)}`:'';
document.querySelectorAll('[data-pedir]').forEach(a=>{const id=a.dataset.pedir;a.href=geral?'#onde-estamos':id?`${base}/app/${q}#add/${encodeURIComponent(id)}`:`${base}/app/${q}`;});
document.querySelectorAll(geral?'a.so-pedido[data-pedir=""]':'.so-pedido').forEach(e=>e.hidden=false);document.body.classList.add('pedido-on');
// com o pedido online ligado, "Ver o cardápio" vira botão secundário e o "Seja sócio" sai da abertura (continua no topo)
document.querySelectorAll('[data-vira-vidro]').forEach(a=>{a.classList.remove('solid-button');a.classList.add('glass-button');});
document.querySelector('.hero-ctas a[href="#seja-socio"]')?.setAttribute('hidden','');
})();

// botões 'Ver os sabores' das seções de produto abrem o cardápio já no filtro


// cardápio por produto: tocar no sabor troca a foto e a frase do card
document.querySelectorAll('.sabor-chip').forEach(c=>c.addEventListener('click',()=>{const card=c.closest('.item');card.querySelectorAll('.sabor-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===c)));const img=card.querySelector('.item-img img');img.src=c.dataset.img;img.alt=c.dataset.alt;card.querySelector('.item-img').style.setProperty('--tint',c.dataset.tint);card.querySelector('.sabor-frase').textContent=c.dataset.frase;}));


// ---------- Onde estamos: unidades de verdade ----------
// Página de uma unidade (/<link>/site/): o servidor injeta window.HF_UNIDADE.
// Site da rede: busca a lista de unidades no sistema de pedidos (só as com endereço e liberadas pelo master).
(()=>{const API=/^(hypefitbrasil\.com\.br|hypefit-pedidos\.fly\.dev)$/.test(location.hostname)?location.origin:'https://hypefit-pedidos.fly.dev'; // nos hosts do sistema, a própria origem; no GitHub Pages, o fly.dev

const sec=document.getElementById('onde-estamos');if(!sec)return;
const modelo=sec.querySelector('.where-card');if(!modelo)return;
const DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const h=t=>{const[a,b]=String(t).split(':');return `${+a}h${b==='00'?'':b}`;};
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const seta='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const icones=[...modelo.querySelectorAll('.where-row > svg')].map(x=>x.outerHTML);
function horas(u){
  if(u.modo==='manual')return '<p>Abre e fecha pelo balcão. Veja se está aberta agora no app.</p>';
  if(u.modo==='aberta')return '<p>Sempre aberta.</p>';
  const g=[];(u.horarios||[]).forEach((x,d)=>{const t=x?`${h(x[0])} às ${h(x[1])}`:'Fechado';const ult=g[g.length-1];if(ult&&ult.t===t&&ult.fim===d-1)ult.fim=d;else g.push({ini:d,fim:d,t});});
  // domingo vai para o fim da lista
  g.sort((a,b)=>(a.ini||7)-(b.ini||7));
  return '<dl class="hours">'+g.map(x=>`<dt>${x.ini===x.fim?DIAS[x.ini]:`${DIAS[x.ini]} a ${DIAS[x.fim].toLowerCase()}`}</dt><dd>${x.t}</dd>`).join('')+'</dl>';
}
function card(u,naRede){
  const nome=/hypefit/i.test(u.nome)?u.nome:`Hypefit ${u.nome}`;
  const mapa=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.endereco)}`;
  const tel=u.whatsapp?u.whatsapp.replace(/^55(\d\d)(\d{4,5})(\d{4})$/,'($1) $2-$3'):'';
  const linhas=[`<div class="where-row">${icones[0]||''}<div><h3>${esc(nome)}</h3><p>${esc(u.endereco)}</p><a class="text-link" href="${mapa}" target="_blank" rel="noopener noreferrer">Abrir no mapa ${seta}</a>${naRede?` <a class="text-link" href="${API}/${encodeURIComponent(u.slug)}/site/">Ver a unidade ${seta}</a>`:''}</div></div>`,
    `<div class="where-row">${icones[1]||''}<div><h3>Horário</h3>${horas(u)}</div></div>`];
  if(u.instagram)linhas.push(`<div class="where-row">${icones[2]||''}<div><h3>Instagram</h3><p>@${esc(u.instagram)}</p><a class="text-link" href="https://www.instagram.com/${encodeURIComponent(u.instagram)}/" target="_blank" rel="noopener noreferrer">Abrir no Instagram ${seta}</a></div></div>`);
  if(u.whatsapp)linhas.push(`<div class="where-row">${icones[3]||''}<div><h3>WhatsApp</h3><p>${esc(tel)}</p><a class="text-link" href="https://wa.me/${u.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site da '+nome+'.')}" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp ${seta}</a></div></div>`);
  linhas.push(`<div class="where-row"><span></span><div><a class="solid-button" href="${API}/${encodeURIComponent(u.slug)}">Pedir pelo app</a></div></div>`);
  const c=document.createElement('div');c.className='where-card glass-card';c.innerHTML=linhas.join('');return c;
}
function mostrar(lista,naRede){
  const caixa=document.createElement('div');caixa.className='where-lista';
  if(!lista.length){const p=document.createElement('p');p.className='lead';p.textContent='Novas unidades abrindo em breve.';caixa.append(p);}
  lista.forEach(u=>caixa.append(card(u,naRede)));
  modelo.replaceWith(caixa);
}
modelo.hidden=true; // nunca mostra os dados de exemplo
const U=window.HF_UNIDADE;
if(U){mostrar([U],false);const t=sec.querySelector('#where-title');if(t)t.innerHTML='Passa aqui e<br>pega o seu Hype.';return;}
fetch(API+'/api/unidades').then(r=>r.ok?r.json():Promise.reject()).then(d=>mostrar(d.unidades||[],true)).catch(()=>mostrar([],true));
})();

// ---------- Site de uma unidade: só o que ela vende ----------
(()=>{const U=window.HF_UNIDADE;if(!U)return;
// "Seja sócio" sai do topo no site da unidade (continua no menu e no fim da página)
document.querySelectorAll('.partner-link, .nav a[href="#seja-socio"], .hero-ctas a[href="#seja-socio"]').forEach(a=>a.hidden=true);
const norm=t=>String(t||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
fetch('/api/config?loja='+encodeURIComponent(U.id)).then(r=>r.json()).then(c=>{
  const it=c.cardapio||[];
  const nomes={drink:it.filter(i=>i.categoria==='drink'),gelato:it.filter(i=>i.categoria==='gelato'),protein:it.filter(i=>i.grupo==='Shake Proteinado'),reset:it.filter(i=>i.grupo==='Reset+')};
  document.querySelectorAll('#cardapio article[data-category]').forEach(art=>{
    const lista=nomes[art.dataset.category];if(!lista)return;
    if(!lista.length){art.hidden=true;return;}
    const ok=new Set(lista.map(i=>norm(i.nome)));
    const chips=[...art.querySelectorAll('.sabor-chip')];
    if(art.dataset.category==='reset')return; // kit único
    chips.forEach(ch=>{ch.hidden=!ok.has(norm(ch.textContent));});
    const ativo=chips.find(ch=>ch.getAttribute('aria-pressed')==='true');
    if(ativo&&ativo.hidden){const v=chips.find(ch=>!ch.hidden);if(v)v.click();}
  });
}).catch(()=>{});
})();
// Vitrine dos sabores: copos em fila diagonal; a seta (ou arrastar) passa o sabor e o fundo muda de cor
(()=>{const sec=document.querySelector('.flv');if(!sec)return;const cups=[...sec.querySelectorAll('.flv-cup')],n=cups.length;let i=0;
const nome=sec.querySelector('.flv-name'),fruta=sec.querySelector('.flv-fruit'),cont=sec.querySelector('.flv-count');
const pos=[[0,0,1,0,1],[52,6,.74,9,1],[92,13,.56,16,1],[-60,0,.9,-8,0]];
function show(k){i=(k+n)%n;const c=cups[i];
 cups.forEach((el,j)=>{const o=(j-i+n)%n,[x,y,s,r,op]=pos[o];el.style.transform=`translate(${x}%,${-y}%) scale(${s}) rotate(${r}deg)`;el.style.opacity=op;el.style.zIndex=10-o;el.classList.toggle('on',o===0);el.style.filter=o?'drop-shadow(0 30px 40px #0008) brightness(.8)':'';});
 sec.style.setProperty('--c1',c.dataset.c1);sec.style.setProperty('--c2',c.dataset.c2);
 nome.innerHTML=c.dataset.n;fruta.textContent=c.dataset.f;cont.textContent=`0${i+1} / 0${n}`;}
sec.querySelectorAll('[data-flv]').forEach(b=>b.addEventListener('click',()=>show(i+Number(b.dataset.flv))));
cups.forEach((c,j)=>c.addEventListener('click',()=>{if(j!==i)show(j);}));
let x0=null;const tr=sec.querySelector('.flv-track');
tr.addEventListener('pointerdown',e=>{x0=e.clientX;});
tr.addEventListener('pointerup',e=>{if(x0===null)return;const d=e.clientX-x0;x0=null;if(Math.abs(d)>40)show(i+(d<0?1:-1));});
sec.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
show(0);})();
