(() => {
 const root=document.getElementById('ia-site-prototype');
 const data=JSON.parse(document.getElementById('case-data').textContent);
 const grid=document.getElementById('case-grid');
 const dialog=document.getElementById('case-dialog');
 const close=document.getElementById('case-close');let opener=null;
 root.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;root.querySelectorAll('[data-filter]').forEach(peer=>peer.setAttribute('aria-pressed',String(peer===button)));let count=0;grid.querySelectorAll('.case').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});document.getElementById('case-count').textContent=`${count} ${count===1?'caso':'casos'} · Imágenes y datos simulados`;}));
 function show(id,trigger){const item=data.find(c=>c.id===Number(id));if(!item||typeof dialog.showModal!=='function')return;opener=trigger||null;document.getElementById('case-sector').textContent=item.category;document.getElementById('case-title').textContent=item.title;document.getElementById('case-description').textContent=item.description;document.getElementById('case-scope').textContent=item.scope;document.getElementById('similar-case-link').href=`contacto.html?caso=${item.id}`;const image=document.getElementById('case-image');image.src=`assets/media/caso-${String(item.id).padStart(2,'0')}.jpg`;image.alt='Escena sintética: '+item.title;if(!dialog.open)dialog.showModal();dialog.querySelector('.case-dialog-body').scrollTop=0;close.focus({preventScroll:true});document.body.style.overflow='hidden';}
 root.querySelectorAll('[data-case-id]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.replaceState(null,'',`#caso-${link.dataset.caseId}`);show(link.dataset.caseId,link);}));
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.style.overflow='';history.replaceState(null,'',location.pathname+location.search);if(opener)opener.focus({preventScroll:true});});
 const initial=location.hash.match(/^#caso-(\d+)$/);if(initial)show(initial[1],root.querySelector(`[data-case-id="${initial[1]}"]`));
})();
