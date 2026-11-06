(() => {
 const select=document.getElementById('demo-period');if(!select)return;
 const sample={q1:[['Operación',120,126],['Proyectos',80,72],['Soporte',50,49]],q2:[['Operación',135,139],['Proyectos',95,101],['Soporte',55,53]]};
 function render(){let plan=0,actual=0;const body=document.getElementById('demo-rows');body.replaceChildren();sample[select.value].forEach(row=>{plan+=row[1];actual+=row[2];const tr=document.createElement('tr');[row[0],row[1],row[2],(row[2]-row[1]>0?'+':'')+(row[2]-row[1])].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});body.append(tr);});document.getElementById('demo-budget').textContent=plan;document.getElementById('demo-actual').textContent=actual;const delta=(actual-plan)/plan*100;document.getElementById('demo-variance').textContent=(delta>0?'+':'')+delta.toFixed(1)+' %';}
 select.addEventListener('change',render);render();
})();
