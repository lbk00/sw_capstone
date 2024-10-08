"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[570],{8282:(e,n,t)=>{t.d(n,{HD:()=>i,UU:()=>o,oK:()=>c,vS:()=>s,yf:()=>l});var a=t(6213);const r="".concat("http://localhost:8080","/api/manager"),i=async e=>(await a.A.get("".concat(r,"/").concat(e))).data,s=async e=>{const{page:n,size:t}=e;return(await a.A.get("".concat(r,"/list"),{params:{page:n,size:t}})).data},l=async e=>(await a.A.post("".concat(r,"/"),e)).data,c=async e=>(await a.A.delete("".concat(r,"/").concat(e))).data,o=async e=>(await a.A.put("".concat(r,"/").concat(e.userId),e)).data},5328:(e,n,t)=>{t.d(n,{A:()=>v});var a=t(5043),r=t(3216),i=t(8282),s=t(5670),l=t(1806),c=t(3460),o=t(2420),d=t(9650),h=t(4882),g=t(8076),x=t(3336),m=(t(3934),t(6446)),j=t(1906),A=t(579);const p=e=>{let{serverData:n,movePage:t}=e;return(0,A.jsxs)(m.A,{sx:{display:"flex",justifyContent:"center",m:1,p:1},children:[n.prev?(0,A.jsx)(j.A,{variant:"contained",color:"primary",onClick:()=>t({page:n.prevPage}),children:"Prev"}):null,n.pageNumList.map((e=>(0,A.jsx)(j.A,{variant:"contained",color:n.current===e?"secondary":"primary",onClick:()=>t({page:e}),children:e},e))),n.next?(0,A.jsx)(j.A,{variant:"contained",color:"primary",onClick:()=>t({page:n.nextPage}),children:"Next"}):null]})},u={dtoList:[],pageNumList:[],pageRequestDTO:null,prev:!1,next:!1,totoalCount:0,prevPage:0,nextPage:0,totalPage:0,current:0},v=e=>{let{onRowClick:n}=e;console.log(n);const[t,m]=(0,a.useState)(null),{moveToRead:j,page:v,size:f,refresh:b,moveToList:w}=(0,s.A)(),[y,I]=(0,a.useState)(u),[P,N]=(0,a.useState)([]);(0,r.g)(),(0,r.Zp)();return(0,a.useEffect)((()=>{(0,i.vS)({page:v,size:f}).then((e=>{console.log(e),I(e),N(e.dtoList),console.log(e.dtoList)})).catch((e=>{console.error("Error fetching data: ",e),N([])}))}),[v,f,b]),(0,A.jsxs)("div",{className:"border-2 border-blue-100 mt-10 mr-2 ml-2",children:[(0,A.jsx)("div",{className:"flex flex-wrap mx-auto justify-center p-6",children:(0,A.jsx)(d.A,{component:x.A,children:(0,A.jsxs)(l.A,{sx:{minWidth:650},"aria-label":"simple table",children:[(0,A.jsx)(h.A,{children:(0,A.jsxs)(g.A,{children:[(0,A.jsx)(o.A,{children:"userId"}),(0,A.jsx)(o.A,{align:"right",children:"\uc774\ub984"}),(0,A.jsx)(o.A,{align:"right",children:"\uc131\ubcc4"}),(0,A.jsx)(o.A,{align:"right",children:"ID"}),(0,A.jsx)(o.A,{align:"right",children:"PW"}),(0,A.jsx)(o.A,{align:"right",children:"\uc0dd\ub144\uc6d4\uc77c"}),(0,A.jsx)(o.A,{align:"right",children:"\uc804\ud654\ubc88\ud638"}),(0,A.jsx)(o.A,{align:"right",children:"\uc774\uba54\uc77c"}),(0,A.jsx)(o.A,{align:"right",children:"\uc8fc\uc18c"})]})}),(0,A.jsx)(c.A,{children:P.length>0?P.map((e=>(0,A.jsxs)(g.A,{onClick:()=>{console.log("Row clicked with userId: ".concat(e.userId)),n(e.userId)},children:[(0,A.jsx)(o.A,{component:"th",scope:"row",children:e.userId}),(0,A.jsx)(o.A,{align:"right",children:e.mname}),(0,A.jsx)(o.A,{align:"right",children:e.mgender}),(0,A.jsx)(o.A,{align:"right",children:e.mid}),(0,A.jsx)(o.A,{align:"right",children:e.mpw}),(0,A.jsx)(o.A,{align:"right",children:e.mbirthDate}),(0,A.jsx)(o.A,{align:"right",children:e.mtel}),(0,A.jsx)(o.A,{align:"right",children:e.memail}),(0,A.jsx)(o.A,{align:"right",children:e.uadr})]},e.userId))):(0,A.jsx)(g.A,{children:(0,A.jsx)(o.A,{colSpan:9,children:"No data"})})})]})})}),(0,A.jsx)(p,{serverData:y,movePage:w,setManagers:N})]})}},9570:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});t(5043);var a=t(5475),r=t(5328),i=t(579);const s=()=>{const[e]=(0,a.useSearchParams)(),n=e.get("page")||1;e.get("size");return(0,i.jsxs)("div",{className:"p-4 w-full bg-orange-200 ",children:[(0,i.jsx)("div",{className:"text-3xl font-extrabold",children:"Manager List Page Component"}),(0,i.jsx)(r.A,{}),(0,i.jsx)("div",{children:n})]})}},3934:(e,n,t)=>{t.d(n,{A:()=>j});var a=t(5043),r=t(8282),i=t(1806),s=t(3460),l=t(2420),c=t(9650),o=t(4882),d=t(8076),h=t(3336),g=t(5670),x=t(579);const m={userId:0,mID:"",mPW:"",mName:"",mGender:"",mbirthDate:"",mtel:"",mEmail:"",mProfileImage:"",uAdr:""};const j=function(e){let{userId:n}=e;const[t,j]=(0,a.useState)(m),{moveToList:A,moveToModify:p}=(0,g.A)();return(0,a.useEffect)((()=>{(0,r.HD)(n).then((e=>{console.log(e),j(e)})).catch((e=>{console.error("Error fetching data: ",e)}))}),[n]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.A,{component:h.A,children:(0,x.jsxs)(i.A,{sx:{minWidth:650},"aria-label":"simple table",children:[(0,x.jsx)(o.A,{children:(0,x.jsxs)(d.A,{children:[(0,x.jsx)(l.A,{children:"userId"}),(0,x.jsx)(l.A,{align:"right",children:"\uc774\ub984"}),(0,x.jsx)(l.A,{align:"right",children:"\uc131\ubcc4"}),(0,x.jsx)(l.A,{align:"right",children:"ID"}),(0,x.jsx)(l.A,{align:"right",children:"PW"}),(0,x.jsx)(l.A,{align:"right",children:"\uc0dd\ub144\uc6d4\uc77c"}),(0,x.jsx)(l.A,{align:"right",children:"\uc804\ud654\ubc88\ud638"}),(0,x.jsx)(l.A,{align:"right",children:"\uc774\uba54\uc77c"}),(0,x.jsx)(l.A,{align:"right",children:"\uc8fc\uc18c"})]})}),(0,x.jsx)(s.A,{children:(0,x.jsxs)(d.A,{children:[(0,x.jsx)(l.A,{component:"th",scope:"row",children:t.userId}),(0,x.jsx)(l.A,{align:"right",children:t.mname}),(0,x.jsx)(l.A,{align:"right",children:t.mgender}),(0,x.jsx)(l.A,{align:"right",children:t.mid}),(0,x.jsx)(l.A,{align:"right",children:t.mpw}),(0,x.jsx)(l.A,{align:"right",children:t.mbirthDate}),(0,x.jsx)(l.A,{align:"right",children:t.mtel}),(0,x.jsx)(l.A,{align:"right",children:t.memail}),(0,x.jsx)(l.A,{align:"right",children:t.uadr})]})})]})}),(0,x.jsx)("div",{className:"flex justify-end p-4",children:(0,x.jsx)("button",{type:"button",className:"rounded p-4 text-xl w-32 text-white bg-blue-500",onClick:()=>A(),children:"list"})}),(0,x.jsx)("div",{className:"flex justify-end p-4",children:(0,x.jsx)("button",{type:"button",className:"rounded p-4 text-xl w-32 text-white bg-red-500",onClick:()=>p(t.userId),children:"Modify"})})]})}},5670:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(5043),r=t(3216),i=t(5475);const s=(e,n)=>e?parseInt(e):n,l=()=>{const e=(0,r.Zp)(),[n,t]=(0,a.useState)(!1),[l]=(0,i.useSearchParams)(),c=s(l.get("page"),1),o=s(l.get("size"),10),d=(0,i.createSearchParams)({page:c,size:o}).toString();return{moveToList:a=>{console.log("moveToList called with: ",a);let r="";if(a){const e=s(a.page,1),n=s(a.size,10);r=(0,i.createSearchParams)({page:e,size:n}).toString()}else r=d;t(!n),console.log("Navigating to: ",{pathname:"/list",search:r}),e({pathname:"/list",search:r})},moveToModify:(0,a.useCallback)((n=>{console.log(d),e({pathname:"../modify/".concat(n),search:d})}),[c,o]),moveToRead:n=>{console.log("userId:",n),console.log(d),e({pathname:"../read/".concat(n),search:d})},page:c,size:o,refresh:n}}}}]);
//# sourceMappingURL=570.00c55cb1.chunk.js.map