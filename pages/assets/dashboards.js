(() => {
 const dialog=document.getElementById('pbi-dialog');
 const holder=document.getElementById('pbi-holder');
 const close=document.getElementById('pbi-close');
 const title=document.getElementById('pbi-title');
 const external=document.getElementById('pbi-external');
 const help=document.getElementById('pbi-help');
 let opener=null;
 const isReport=url=>{try{const parsed=new URL(url);return parsed.origin==='https://app.powerbi.com'&&parsed.pathname==='/view'&&Boolean(parsed.searchParams.get('r'));}catch{return false;}};
 document.querySelectorAll('[data-dashboard]').forEach(link=>link.addEventListener('click',event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||typeof dialog.showModal!=='function')return;
   const url=link.href;if(!isReport(url))return;
   event.preventDefault();opener=link;holder.replaceChildren();
   title.textContent=link.dataset.title;
   external.href=url;
   help.textContent='Cargando el visor de Power BI. Si tarda o no se muestra, utiliza «Abrir en Power BI».';
   const frame=document.createElement('iframe');
   frame.title='Dashboard de Power BI: '+link.dataset.title;
   frame.allowFullscreen=true;frame.allow='fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';
   frame.addEventListener('load',()=>{help.textContent='Usa los filtros del tablero para explorar. Si no aparece el contenido, utiliza «Abrir en Power BI».';});
   frame.src=url;holder.append(frame);
   if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden';close.focus({preventScroll:true});
 }));
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{holder.replaceChildren();document.body.style.overflow='';if(opener)opener.focus({preventScroll:true});});
})();
