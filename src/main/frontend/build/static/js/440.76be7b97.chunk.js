"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[440],{8282:(e,a,t)=>{t.d(a,{HD:()=>s,UU:()=>c,oK:()=>i,vS:()=>r,yf:()=>l});var n=t(6213);const o="".concat("http://localhost:8080","/api/manager"),s=async e=>(await n.A.get("".concat(o,"/").concat(e))).data,r=async e=>{const{page:a,size:t}=e;return(await n.A.get("".concat(o,"/list"),{params:{page:a,size:t}})).data},l=async e=>(await n.A.post("".concat(o,"/"),e)).data,i=async e=>(await n.A.delete("".concat(o,"/").concat(e))).data,c=async e=>(await n.A.put("".concat(o,"/").concat(e.userId),e)).data},9440:(e,a,t)=>{t.r(a),t.d(a,{default:()=>h});var n=t(5043),o=t(35),s=t(5865),r=t(8282),l=t(4949),i=t(5670),c=t(6446),d=t(5795),m=t(1906),p=t(579);const u={mname:"",mtel:"",memail:"",uadr:""},g=()=>{const[e,a]=(0,n.useState)({...u}),[t,o]=(0,n.useState)(null),{moveToList:s,moveToDashboard:g}=(0,i.A)(),h=t=>{e[t.target.name]=t.target.value,a({...e})};return(0,p.jsxs)(c.A,{sx:{"& > :not(style)":{m:1}},children:[t?(0,p.jsx)(l.A,{title:"Add Result",content:"\ub4f1\ub85d\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4",callbackFn:()=>{o(null),g()}}):(0,p.jsx)(p.Fragment,{}),(0,p.jsx)(d.A,{label:"Name",variant:"outlined",name:"mname",value:e.mname,onChange:h}),(0,p.jsx)(d.A,{label:"Phone Number",variant:"outlined",name:"mtel",value:e.mtel,onChange:h,inputProps:{pattern:"\\d{3}-\\d{3,4}-\\d{4}"},helperText:"Format: 123-4567-8901"}),(0,p.jsx)(d.A,{label:"Email",variant:"outlined",name:"memail",value:e.memail,onChange:h,inputProps:{pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"},helperText:"Format: example@example.com"}),(0,p.jsx)(d.A,{label:"Address",variant:"outlined",name:"uadr",value:e.uadr,onChange:h,inputProps:{pattern:"[a-zA-Z0-9\\s,]+"},helperText:"Format: Street, City, State, Country"}),(0,p.jsx)(m.A,{variant:"contained",onClick:()=>{(0,r.yf)(e).then((e=>{o(e.userId),a({...u})})).catch((e=>{console.error(e)}))},children:"\ub4f1\ub85d"})]})},h=e=>{let{open:a,onClose:t}=e;return(0,p.jsxs)(o.A,{open:a,onClose:t,children:[(0,p.jsx)(s.A,{variant:"h3",component:"h1",gutterBottom:!0,children:"\uacf5\uae09\uc5c5\uccb4 \ub4f1\ub85d \ud398\uc774\uc9c0"}),(0,p.jsx)(g,{})]})}},4949:(e,a,t)=>{t.d(a,{A:()=>d});t(5043);var n=t(35),o=t(6600),s=t(5316),r=t(5865),l=t(9347),i=t(1906),c=t(579);const d=e=>{let{title:a,content:t,callbackFn:d}=e;return(0,c.jsxs)(n.A,{open:!0,onClose:d,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,c.jsx)(o.A,{id:"alert-dialog-title",children:a}),(0,c.jsx)(s.A,{children:(0,c.jsx)(r.A,{variant:"h4",component:"div",children:t})}),(0,c.jsx)(l.A,{children:(0,c.jsx)(i.A,{onClick:d,color:"primary",autoFocus:!0,children:"Close Modal"})})]})}},5670:(e,a,t)=>{t.d(a,{A:()=>l});var n=t(5043),o=t(3216),s=t(5475);const r=(e,a)=>e?parseInt(e):a,l=()=>{const e=(0,o.Zp)(),[a,t]=(0,n.useState)(!1),[l]=(0,s.useSearchParams)(),i=r(l.get("page"),1),c=r(l.get("size"),10),d=(0,s.createSearchParams)({page:i,size:c}).toString();return{moveToList:n=>{console.log("moveToList called with: ",n);let o="";if(n){const e=r(n.page,1),a=r(n.size,10);o=(0,s.createSearchParams)({page:e,size:a}).toString()}else o=d;t(!a),console.log("Navigating to: ",{pathname:"/list",search:o}),e({pathname:"/list",search:o})},moveToModify:(0,n.useCallback)((a=>{console.log(d),e({pathname:"../modify/".concat(a),search:d})}),[i,c]),moveToDashboard:()=>{e("/dashboard")},moveToRead:a=>{console.log("userId:",a),console.log(d),e({pathname:"../read/".concat(a),search:d})},page:i,size:c,refresh:a}}},9347:(e,a,t)=>{t.d(a,{A:()=>A});var n=t(8587),o=t(8168),s=t(5043),r=t(8387),l=t(8606),i=t(4535),c=t(2876),d=t(7056),m=t(2400);function p(e){return(0,m.Ay)("MuiDialogActions",e)}(0,d.A)("MuiDialogActions",["root","spacing"]);var u=t(579);const g=["className","disableSpacing"],h=(0,i.Ay)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,!t.disableSpacing&&a.spacing]}})((e=>{let{ownerState:a}=e;return(0,o.A)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!a.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})})),A=s.forwardRef((function(e,a){const t=(0,c.A)({props:e,name:"MuiDialogActions"}),{className:s,disableSpacing:i=!1}=t,d=(0,n.A)(t,g),m=(0,o.A)({},t,{disableSpacing:i}),A=(e=>{const{classes:a,disableSpacing:t}=e,n={root:["root",!t&&"spacing"]};return(0,l.A)(n,p,a)})(m);return(0,u.jsx)(h,(0,o.A)({className:(0,r.A)(A.root,s),ownerState:m,ref:a},d))}))}}]);
//# sourceMappingURL=440.76be7b97.chunk.js.map