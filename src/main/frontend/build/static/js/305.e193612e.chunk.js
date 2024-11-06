"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[305],{6875:(e,t,o)=>{o.d(t,{vS:()=>r});var a=o(6213);const n="".concat("http://localhost:8080","/api/orders"),r=async e=>{const{page:t,size:o}=e;return(await a.A.get("".concat(n,"/list"),{params:{page:t,size:o}})).data}},4305:(e,t,o)=>{o.r(t),o.d(t,{default:()=>p});var a=o(5043),n=(o(6875),o(4949)),r=o(5670),s=o(6446),i=o(5795),l=o(1906),c=o(6213),d=o(579);const u=()=>{const[e,t]=(0,a.useState)({orderedProducts:"",totalAmount:""}),o=e=>{const{name:o,value:a}=e.target;t((e=>({...e,[o]:a})))},[u,m]=(0,a.useState)(null),{moveToList:p}=(0,r.A)();return(0,d.jsxs)(s.A,{sx:{"& > :not(style)":{m:1}},children:[u?(0,d.jsx)(n.A,{title:"Add Result",content:"New ".concat(u," Added"),callbackFn:()=>{m(null),p()}}):(0,d.jsx)(d.Fragment,{}),(0,d.jsx)(i.A,{label:"Product",variant:"outlined",name:"orderedProducts",value:e.orderedProducts,onChange:o,placeholder:"Enter product IDs (e.g., 33, 34)",fullWidth:!0,margin:"normal"}),(0,d.jsx)(i.A,{label:"Amount",variant:"outlined",name:"totalAmount",value:e.totalAmount,onChange:o,placeholder:"Enter amounts (e.g., 15, 20)",fullWidth:!0,margin:"normal"}),(0,d.jsx)(l.A,{variant:"contained",onClick:async()=>{const t=e.orderedProducts.split(",").map(((t,o)=>({id:Number(t.trim()),amount:Number(e.totalAmount.split(",")[o].trim())})));try{const e=await c.A.post("http://localhost:8080/api/orders/create",t);alert("\uc8fc\ubb38\uc11c \uc0dd\uc131\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),window.location.href="http://localhost:3000/dashboard",console.log("Order successfully created:",e.data)}catch(o){console.error("There was an error creating the order!",o)}},children:"\ub4f1\ub85d"})]})};var m=o(9252);const p=()=>(0,d.jsx)(m.A,{maxWidth:"sm",children:(0,d.jsx)(u,{})})},4949:(e,t,o)=>{o.d(t,{A:()=>d});o(5043);var a=o(35),n=o(6600),r=o(5316),s=o(5865),i=o(9347),l=o(1906),c=o(579);const d=e=>{let{title:t,content:o,callbackFn:d}=e;return(0,c.jsxs)(a.A,{open:!0,onClose:d,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,c.jsx)(n.A,{id:"alert-dialog-title",children:t}),(0,c.jsx)(r.A,{children:(0,c.jsx)(s.A,{variant:"h4",component:"div",children:o})}),(0,c.jsx)(i.A,{children:(0,c.jsx)(l.A,{onClick:d,color:"primary",autoFocus:!0,children:"Close Modal"})})]})}},5670:(e,t,o)=>{o.d(t,{A:()=>i});var a=o(5043),n=o(3216),r=o(5475);const s=(e,t)=>e?parseInt(e):t,i=()=>{const e=(0,n.Zp)(),[t,o]=(0,a.useState)(!1),[i]=(0,r.useSearchParams)(),l=s(i.get("page"),1),c=s(i.get("size"),10),d=(0,r.createSearchParams)({page:l,size:c}).toString();return{moveToList:e=>{console.log("moveToList called with: ",e);let a="";if(e){const t=s(e.page,1),o=s(e.size,10);a=(0,r.createSearchParams)({page:t,size:o}).toString()}else a=d;o(!t),console.log("Navigating to: ",{pathname:"/list",search:a})},moveToModify:(0,a.useCallback)((t=>{console.log(d),e({pathname:"../modify/".concat(t),search:d})}),[l,c]),moveToDashboard:()=>{e("/dashboard")},moveToRead:t=>{console.log("userId:",t),console.log(d),e({pathname:"../read/".concat(t),search:d})},page:l,size:c,refresh:t}}},9252:(e,t,o)=>{o.d(t,{A:()=>S});var a=o(8587),n=o(8168),r=o(5043),s=o(8387),i=o(2400),l=o(8606),c=o(410),d=o(2919),u=o(6060),m=o(8280),p=o(579);const h=["className","component","disableGutters","fixed","maxWidth","classes"],A=(0,m.A)(),f=(0,u.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t["maxWidth".concat((0,c.A)(String(o.maxWidth)))],o.fixed&&t.fixed,o.disableGutters&&t.disableGutters]}}),g=e=>(0,d.A)({props:e,name:"MuiContainer",defaultTheme:A});var v=o(6803),x=o(4535),b=o(2876);const y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=f,useThemeProps:o=g,componentName:d="MuiContainer"}=e,u=t((e=>{let{theme:t,ownerState:o}=e;return(0,n.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!o.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:o}=e;return o.fixed&&Object.keys(t.breakpoints.values).reduce(((e,o)=>{const a=o,n=t.breakpoints.values[a];return 0!==n&&(e[t.breakpoints.up(a)]={maxWidth:"".concat(n).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:o}=e;return(0,n.A)({},"xs"===o.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},o.maxWidth&&"xs"!==o.maxWidth&&{[t.breakpoints.up(o.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[o.maxWidth]).concat(t.breakpoints.unit)}})})),m=r.forwardRef((function(e,t){const r=o(e),{className:m,component:A="div",disableGutters:f=!1,fixed:g=!1,maxWidth:v="lg"}=r,x=(0,a.A)(r,h),b=(0,n.A)({},r,{component:A,disableGutters:f,fixed:g,maxWidth:v}),y=((e,t)=>{const{classes:o,fixed:a,disableGutters:n,maxWidth:r}=e,s={root:["root",r&&"maxWidth".concat((0,c.A)(String(r))),a&&"fixed",n&&"disableGutters"]};return(0,l.A)(s,(e=>(0,i.Ay)(t,e)),o)})(b,d);return(0,p.jsx)(u,(0,n.A)({as:A,ownerState:b,className:(0,s.A)(y.root,m),ref:t},x))}));return m}({createStyledComponent:(0,x.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t["maxWidth".concat((0,v.A)(String(o.maxWidth)))],o.fixed&&t.fixed,o.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,b.A)({props:e,name:"MuiContainer"})}),S=y},9347:(e,t,o)=>{o.d(t,{A:()=>f});var a=o(8587),n=o(8168),r=o(5043),s=o(8387),i=o(8606),l=o(4535),c=o(2876),d=o(7056),u=o(2400);function m(e){return(0,u.Ay)("MuiDialogActions",e)}(0,d.A)("MuiDialogActions",["root","spacing"]);var p=o(579);const h=["className","disableSpacing"],A=(0,l.Ay)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.disableSpacing&&t.spacing]}})((e=>{let{ownerState:t}=e;return(0,n.A)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!t.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})})),f=r.forwardRef((function(e,t){const o=(0,c.A)({props:e,name:"MuiDialogActions"}),{className:r,disableSpacing:l=!1}=o,d=(0,a.A)(o,h),u=(0,n.A)({},o,{disableSpacing:l}),f=(e=>{const{classes:t,disableSpacing:o}=e,a={root:["root",!o&&"spacing"]};return(0,i.A)(a,m,t)})(u);return(0,p.jsx)(A,(0,n.A)({className:(0,s.A)(f.root,r),ownerState:u,ref:t},d))}))},6060:(e,t,o)=>{o.d(t,{A:()=>v});var a=o(8168),n=o(8587),r=o(3174),s=o(835),i=o(8280),l=o(8812);const c=["ownerState"],d=["variants"],u=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function m(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const p=(0,i.A)(),h=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function A(e){let{defaultTheme:t,theme:o,themeId:a}=e;return n=o,0===Object.keys(n).length?t:o[a]||o;var n}function f(e){return e?(t,o)=>o[e]:null}function g(e,t){let{ownerState:o}=t,r=(0,n.A)(t,c);const s="function"===typeof e?e((0,a.A)({ownerState:o},r)):e;if(Array.isArray(s))return s.flatMap((e=>g(e,(0,a.A)({ownerState:o},r))));if(s&&"object"===typeof s&&Array.isArray(s.variants)){const{variants:e=[]}=s;let t=(0,n.A)(s,d);return e.forEach((e=>{let n=!0;"function"===typeof e.props?n=e.props((0,a.A)({ownerState:o},r,o)):Object.keys(e.props).forEach((t=>{(null==o?void 0:o[t])!==e.props[t]&&r[t]!==e.props[t]&&(n=!1)})),n&&(Array.isArray(t)||(t=[t]),t.push("function"===typeof e.style?e.style((0,a.A)({ownerState:o},r,o)):e.style))})),t}return s}const v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:o=p,rootShouldForwardProp:i=m,slotShouldForwardProp:c=m}=e,d=e=>(0,l.A)((0,a.A)({},e,{theme:A((0,a.A)({},e,{defaultTheme:o,themeId:t}))}));return d.__mui_systemSx=!0,function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,r.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:p,slot:v,skipVariantsResolver:x,skipSx:b,overridesResolver:y=f(h(v))}=l,S=(0,n.A)(l,u),w=void 0!==x?x:v&&"Root"!==v&&"root"!==v||!1,k=b||!1;let j=m;"Root"===v||"root"===v?j=i:v?j=c:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(j=void 0);const C=(0,r.default)(e,(0,a.A)({shouldForwardProp:j,label:undefined},S)),W=e=>"function"===typeof e&&e.__emotion_real!==e||(0,s.Q)(e)?n=>g(e,(0,a.A)({},n,{theme:A({theme:n.theme,defaultTheme:o,themeId:t})})):e,R=function(n){let r=W(n);for(var s=arguments.length,i=new Array(s>1?s-1:0),l=1;l<s;l++)i[l-1]=arguments[l];const c=i?i.map(W):[];p&&y&&c.push((e=>{const n=A((0,a.A)({},e,{defaultTheme:o,themeId:t}));if(!n.components||!n.components[p]||!n.components[p].styleOverrides)return null;const r=n.components[p].styleOverrides,s={};return Object.entries(r).forEach((t=>{let[o,r]=t;s[o]=g(r,(0,a.A)({},e,{theme:n}))})),y(e,s)})),p&&!w&&c.push((e=>{var n;const r=A((0,a.A)({},e,{defaultTheme:o,themeId:t}));return g({variants:null==r||null==(n=r.components)||null==(n=n[p])?void 0:n.variants},(0,a.A)({},e,{theme:r}))})),k||c.push(d);const u=c.length-i.length;if(Array.isArray(n)&&u>0){const e=new Array(u).fill("");r=[...n,...e],r.raw=[...n.raw,...e]}const m=C(r,...c);return e.muiName&&(m.muiName=e.muiName),m};return C.withConfig&&(R.withConfig=C.withConfig),R}}()}}]);
//# sourceMappingURL=305.e193612e.chunk.js.map