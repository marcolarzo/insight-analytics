(() => {
  const root = document.getElementById('method-route');
  if (!root) return;
  const stages = [
    {short:'Entender',title:'Entender el reto',intro:'Comenzamos por la decisión que necesitas tomar. Escuchamos al equipo, revisamos el proceso actual y definimos qué debe cambiar.',actions:['Identificar usuarios y decisiones recurrentes.','Precisar las preguntas que el dato debe responder.','Acordar prioridades, alcance y restricciones.'],output:'Objetivo y alcance inicial',outputText:'Un acuerdo claro sobre el problema, los usuarios y lo que incluiremos en la primera entrega.',gate:'¿Estamos resolviendo la pregunta correcta?',gateText:'Avanzamos cuando el responsable de negocio valida el objetivo y las prioridades.'},
    {short:'Revisar',title:'Revisar los datos',intro:'Antes de diseñar el tablero, contrastamos qué información existe, cómo se obtiene y con qué criterios puede utilizarse.',actions:['Revisar fuentes, accesos y disponibilidad histórica.','Detectar brechas de calidad y consistencia.','Definir indicadores y reglas de cálculo compartidas.'],output:'Mapa de fuentes e indicadores',outputText:'Fuentes identificadas, reglas de cálculo y brechas que deben atenderse o documentarse.',gate:'¿Los datos permiten sostener la lectura?',gateText:'Revisamos viabilidad, calidad y accesos; si hay una brecha, ajustamos el alcance antes de construir.'},
    {short:'Diseñar',title:'Diseñar y validar',intro:'Convertimos las preguntas en un prototipo que se puede revisar. La conversación se centra en utilidad y lectura, además de apariencia.',actions:['Ordenar indicadores según usuarios y decisiones.','Probar filtros, navegación y jerarquía visual.','Recoger observaciones y acordar criterios de aceptación.'],output:'Prototipo revisado',outputText:'Una propuesta de diseño que refleja la forma de trabajar del equipo y las preguntas acordadas.',gate:'¿Se entiende y ayuda a decidir?',gateText:'El equipo responsable revisa el prototipo y prioriza los ajustes antes del desarrollo completo.'},
    {short:'Construir',title:'Construir y comprobar',intro:'Integramos los datos y desarrollamos la solución. La comprobación acompaña cada avance, no se deja para el último día.',actions:['Preparar transformaciones, modelo y visualizaciones.','Contrastar indicadores con las fuentes disponibles.','Revisar filtros, actualizaciones y escenarios de error.'],output:'Solución contrastada',outputText:'Una implementación revisada frente a los datos de origen y los criterios acordados.',gate:'¿La solución cumple lo acordado?',gateText:'Validamos cifras y comportamiento con el equipo; las limitaciones conocidas quedan documentadas.'},
    {short:'Acompañar',title:'Entregar y acompañar',intro:'Una solución aporta valor cuando el equipo sabe utilizarla y conoce cómo mantenerla. Cerramos con transferencia y acuerdos claros.',actions:['Explicar el uso y las definiciones de indicadores.','Entregar documentación y responsables de actualización.','Acordar soporte y posibles siguientes mejoras.'],output:'Transferencia y continuidad',outputText:'Guía de uso, documentación y acuerdos de acompañamiento según el alcance contratado.',gate:'¿El equipo puede seguir con autonomía?',gateText:'Revisamos la comprensión de la solución y dejamos definidos los responsables y siguientes pasos.'}
  ];
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panel = root.querySelector('#method-stage');
  const previous = root.querySelector('#method-previous');
  const next = root.querySelector('#method-next');
  let selected = 0;
  const setText = (id,value) => {root.querySelector('#'+id).textContent=value;};
  function select(index, focus=false) {
    selected=Math.max(0,Math.min(stages.length-1,index));
    const stage=stages[selected];
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===selected));tab.tabIndex=i===selected?0:-1;tab.classList.toggle('is-before',i<selected);});
    panel.setAttribute('aria-labelledby',tabs[selected].id);
    setText('method-position','ETAPA '+String(selected+1).padStart(2,'0')+' / 05');
    setText('method-title',stage.title);setText('method-intro-text',stage.intro);
    setText('method-output',stage.output);setText('method-output-text',stage.outputText);
    setText('method-gate',stage.gate);setText('method-gate-text',stage.gateText);
    const list=root.querySelector('#method-actions');list.replaceChildren();
    stage.actions.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});
    setText('method-counter',`${selected+1} de ${stages.length} etapas`);
    root.querySelector('#method-progress-fill').style.transform=`scaleX(${(selected+1)/stages.length})`;
    previous.disabled=selected===0;next.disabled=selected===stages.length-1;
    panel.classList.remove('is-changing');void panel.offsetWidth;panel.classList.add('is-changing');
    if(focus)tabs[selected].focus({preventScroll:true});
  }
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i));tab.addEventListener('keydown',event=>{let target=null;if(event.key==='ArrowRight')target=(selected+1)%stages.length;if(event.key==='ArrowLeft')target=(selected+stages.length-1)%stages.length;if(event.key==='Home')target=0;if(event.key==='End')target=stages.length-1;if(target!==null){event.preventDefault();select(target,true);}});});
  previous.addEventListener('click',()=>select(selected-1));next.addEventListener('click',()=>select(selected+1));select(0);
})();
