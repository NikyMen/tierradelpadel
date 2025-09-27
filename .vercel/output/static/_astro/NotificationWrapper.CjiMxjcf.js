import{c as x,j as e}from"./createLucideIcon.V6CX3xPE.js";import{r as l}from"./index.Ba-IbuDT.js";import{X as f}from"./x.ByTsRx3w.js";/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=x("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=x("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=x("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=x("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),N=({notification:t,onClose:c})=>{const[r,i]=l.useState(!1);l.useEffect(()=>{i(!0);const s=setTimeout(()=>{a()},t.duration||4e3);return()=>clearTimeout(s)},[]);const a=()=>{i(!1),setTimeout(()=>c(t.id),300)},u=()=>{switch(t.type){case"success":return e.jsx(w,{className:"h-6 w-6 text-green-500"});case"error":return e.jsx(g,{className:"h-6 w-6 text-red-500"});case"warning":return e.jsx(y,{className:"h-6 w-6 text-yellow-500"});case"info":default:return e.jsx(p,{className:"h-6 w-6 text-blue-500"})}},d=()=>{switch(t.type){case"success":return"bg-green-50 border-green-200";case"error":return"bg-red-50 border-red-200";case"warning":return"bg-yellow-50 border-yellow-200";case"info":default:return"bg-blue-50 border-blue-200"}},n=()=>{switch(t.type){case"success":return"text-green-800";case"error":return"text-red-800";case"warning":return"text-yellow-800";case"info":default:return"text-blue-800"}};return e.jsx("div",{className:`
        transform transition-all duration-300 ease-in-out
        ${r?"translate-x-0 opacity-100":"translate-x-full opacity-0"}
        ${d()} border rounded-lg shadow-lg p-4 max-w-sm w-full
      `,children:e.jsxs("div",{className:"flex items-start",children:[e.jsx("div",{className:"flex-shrink-0",children:u()}),e.jsxs("div",{className:"ml-3 flex-1",children:[e.jsx("h3",{className:`text-sm font-medium ${n()}`,children:t.title}),t.message&&e.jsx("p",{className:`mt-1 text-sm ${n()} opacity-80`,children:t.message})]}),e.jsx("div",{className:"ml-4 flex-shrink-0 flex",children:e.jsx("button",{onClick:a,className:`inline-flex ${n()} hover:opacity-75 focus:outline-none`,children:e.jsx(f,{className:"h-4 w-4"})})})]})})},j=()=>{const[t,c]=l.useState([]),r=s=>{const o=Date.now().toString(),m={...s,id:o};c(h=>[...h,m])};return{notifications:t,addNotification:r,removeNotification:s=>{c(o=>o.filter(m=>m.id!==s))},showSuccess:(s,o)=>{r({type:"success",title:s,message:o})},showError:(s,o)=>{r({type:"error",title:s,message:o})},showInfo:(s,o)=>{r({type:"info",title:s,message:o})},showWarning:(s,o)=>{r({type:"warning",title:s,message:o})}}},b=({notifications:t,onRemoveNotification:c})=>t.length===0?null:e.jsx("div",{className:"fixed top-4 right-4 z-50 space-y-2",children:t.map(r=>e.jsx(N,{notification:r,onClose:c},r.id))}),k=l.createContext(void 0),v=({children:t})=>{const{notifications:c,removeNotification:r,showSuccess:i,showError:a,showInfo:u,showWarning:d}=j();return l.useEffect(()=>{const n=document.getElementById("notification-container");if(n){const{createRoot:s}=require("react-dom/client");s(n).render(e.jsx(b,{notifications:c,onRemoveNotification:r}))}},[c]),e.jsx(k.Provider,{value:{showSuccess:i,showError:a,showInfo:u,showWarning:d},children:t})},S=({children:t})=>e.jsx(v,{children:t});export{S as NotificationWrapper};
