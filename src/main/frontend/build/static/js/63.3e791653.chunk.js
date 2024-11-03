/*! For license information please see 63.3e791653.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[63],{7362:(e,r,t)=>{t.r(r),t.d(r,{default:()=>z});var o=t(5043),s=t(6213),l=t(50),a=t(4975),i=(t(4014),t(3874),t(5084),t(9604),t(5760),t(3216)),n=t(4409);t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p;var c=t(2314),d=t(5263),h=t(5865),x=t(1906),p=t(7392),u=t(9611),m=t(6360),j=t(6446),A=t(5721),f=t(681),g=t(8968),b=t(2050),y=t(8734),C=t(9336),S=t(4208),v=t(1045),w=t(4109),k=t(3193),I=t(9859),B=t(1787),O=t(2110),L=t(6494),M=t(6591),_=t(2083),P=t(8983),$=t(8903),E=t(9135),W=t(579);function z(){const[e,r]=(0,o.useState)(null),[t,z]=(0,o.useState)(null),[F,G]=(0,o.useState)(null),[N,V]=(0,o.useState)(null),[q,K]=(0,o.useState)(null),[R,Z]=(Boolean(e),Boolean(t),Boolean(F),Boolean(N),Boolean(q),(0,o.useState)([])),[D,H]=(0,o.useState)(1),[J,Q]=(0,o.useState)("default"),[T,U]=(0,o.useState)(""),[X,Y]=(0,o.useState)([]),ee=(0,i.Zp)(),[re,te]=(0,o.useState)(null),[oe,se]=(0,o.useState)(!1);(0,o.useEffect)((()=>{(async()=>{try{const e=await s.A.get("http://localhost:8080/products/list");Z(e.data.products),Y(e.data.products)}catch(e){console.error("Error fetching product data:",e)}})()}),[]);(0,o.useEffect)((()=>{(async()=>{try{const e=await s.A.get("http://localhost:8080/api/user/current-user",{withCredentials:!0});console.log(e.data),te(e.data),se(!0)}catch(e){console.error("\uc0ac\uc6a9\uc790 \uc815\ubcf4 \uac00\uc838\uc624\uae30 \uc624\ub958:",e)}})()}),[]);const le=e=>{let r;r="asc"===e?[...X].sort(((e,r)=>e.price-r.price)):"desc"===e?[...X].sort(((e,r)=>r.price-e.price)):R,Y(r),Q(e),H(1)},ae=6*D,ie=ae-6,ne=X.slice(ie,ae),ce=[...R].sort(((e,r)=>r.amount-e.amount)),de=Math.ceil(X.length/6),he=e=>{ee("/itempurchase/".concat(e),{state:{isLoggedIn:oe}})},[xe,pe]=o.useState(!1),ue=e=>()=>{pe(e)},me=(0,W.jsxs)(j.A,{sx:{width:250},role:"presentation",onClick:ue(!1),children:[(0,W.jsx)(A.A,{children:["\uc804\uccb4\ubcf4\uae30"].map(((e,r)=>(0,W.jsx)(f.Ay,{disablePadding:!0,children:(0,W.jsxs)(g.A,{children:[(0,W.jsx)(b.A,{children:(0,W.jsx)(u.A,{})}),(0,W.jsx)(y.A,{primary:e})]})},e)))}),(0,W.jsx)(C.A,{}),(0,W.jsx)(A.A,{children:["\uc0c1\uc758","\uc544\uc6b0\ud130","\ubc14\uc9c0"].map(((e,r)=>(0,W.jsx)(f.Ay,{disablePadding:!0,children:(0,W.jsxs)(g.A,{children:[(0,W.jsx)(b.A,{children:(0,W.jsx)(u.A,{})}),(0,W.jsx)(y.A,{primary:e})]})},e)))})]}),[je,Ae]=(0,o.useState)("popularity");return(0,W.jsxs)("div",{className:"App",children:[(0,W.jsx)(c.A,{position:"static",sx:{bgcolor:"white",color:"black"},children:(0,W.jsxs)(d.A,{children:[(0,W.jsx)(p.A,{edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:(0,W.jsx)(S.A,{sx:{mr:1}})}),(0,W.jsx)(h.A,{align:"left",variant:"h6",sx:{flexGrow:1},children:"\uba54\uc778\ud398\uc774\uc9c0"}),re&&2===re.role&&(0,W.jsx)(x.A,{color:"inherit",sx:{mr:2},onClick:()=>{window.open("http://localhost:3000/dashboard","_blank","noopener,noreferrer")},children:"\uad00\ub9ac\uc790 \ud398\uc774\uc9c0"}),oe?(0,W.jsx)(v.A,{onClick:()=>{ee("/mypage",{state:{user:re}})},style:{cursor:"pointer"},children:re.cname.charAt(0)}):(0,W.jsx)("h1",{}),oe?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(x.A,{color:"inherit",onClick:()=>{ee("/cart")},children:"\uc7a5\ubc14\uad6c\ub2c8"}),(0,W.jsx)(x.A,{color:"inherit",onClick:async()=>{try{await s.A.post("http://localhost:8080/api/user/logout",{},{withCredentials:!0}),window.location.href="/homeuser",se(!1),sessionStorage.clear()}catch(e){console.error("\ub85c\uadf8\uc544\uc6c3 \uc2e4\ud328:",e)}},children:"\ub85c\uadf8\uc544\uc6c3"})]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(x.A,{color:"inherit",onClick:()=>{ee("/signin")},children:"\ub85c\uadf8\uc778"}),(0,W.jsx)(x.A,{color:"inherit",onClick:()=>{ee("/signup")},children:"\ud68c\uc6d0\uac00\uc785"})]})]})}),(0,W.jsx)(C.A,{}),(0,W.jsx)(c.A,{position:"static",sx:{bgcolor:"white",color:"black"},children:(0,W.jsxs)(d.A,{children:[(0,W.jsxs)("div",{children:[(0,W.jsx)(x.A,{sx:{color:"black"},onClick:ue(!0),children:(0,W.jsx)(u.A,{})}),(0,W.jsx)(w.Ay,{open:xe,onClose:ue(!1),children:me})]}),(0,W.jsx)(x.A,{sx:{width:90,color:"black"},children:"\uc0c1\uc758"}),(0,W.jsx)(C.A,{orientation:"vertical",variant:"middle",flexItem:!0}),(0,W.jsx)(x.A,{sx:{width:90,color:"black"},children:"\uc544\uc6b0\ud130"}),(0,W.jsx)(C.A,{orientation:"vertical",variant:"middle",flexItem:!0}),(0,W.jsx)(x.A,{sx:{width:90,color:"black"},children:"\ubc14\uc9c0"}),(0,W.jsx)(C.A,{orientation:"vertical",variant:"middle",flexItem:!0}),(0,W.jsx)(j.A,{sx:{flexGrow:1}}),(0,W.jsx)("form",{noValidate:!0,autoComplete:"off",children:(0,W.jsx)(k.A,{sx:{width:"25ch",bgcolor:"white"},size:"small",children:(0,W.jsx)(I.A,{placeholder:"\uac80\uc0c9\uc5b4\ub97c \uc785\ub825\ud558\uc138\uc694",value:T,onChange:e=>U(e.target.value),sx:{"& .MuiOutlinedInput-notchedOutline":{borderColor:"red",borderWidth:"2px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:"red",borderWidth:"2px"},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"red",borderWidth:"2px"}},endAdornment:(0,W.jsx)(B.A,{position:"end",children:(0,W.jsxs)(p.A,{edge:"end",onClick:()=>{const e=R.filter((e=>e.name.toLowerCase().includes(T.toLowerCase())));Y(e),H(1)},children:[" ",(0,W.jsx)(m.A,{})]})})})})})]})}),(0,W.jsx)(j.A,{sx:{bgcolor:"lightgray",p:2},children:(0,W.jsx)(a.RC,{autoplay:!0,pagination:!0,navigation:!0,modules:[l.Vx,l.dK,l.Ij],className:"mySwiper",children:0===ce.length?(0,W.jsx)(h.A,{variant:"h6",color:"text.secondary",sx:{marginLeft:4},children:"\uc77c\uce58\ud558\ub294 \uc0c1\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):ce.map((e=>(0,W.jsx)(a.qr,{children:(0,W.jsx)(O.A,{onClick:()=>he(e.id),sx:{cursor:"pointer"},children:(0,W.jsx)(L.A,{children:(0,W.jsx)(M.A,{sx:{height:200},image:e.itemImage?"data:image/jpeg;base64,".concat(e.itemImage):n,title:e.name})})})})))})}),(0,W.jsx)(j.A,{sx:{display:"flex",justifyContent:"right",my:2},children:(0,W.jsxs)(_.A,{value:je,exclusive:!0,onChange:(e,r)=>{null!==r&&Ae(r)},"aria-label":"sort type",children:[(0,W.jsx)(P.A,{value:"recent","aria-label":"recent",onClick:()=>le(null),children:"\ucd5c\uc2e0\uc21c"}),(0,W.jsx)(P.A,{value:"lowPrice","aria-label":"low price",onClick:()=>le("asc"),children:"\uac00\uaca9\uc774 \ub0ae\uc740 \uc21c"}),(0,W.jsx)(P.A,{value:"highPrice","aria-label":"high price",onClick:()=>le("desc"),children:"\uac00\uaca9\uc774 \ub192\uc740 \uc21c"})]})}),(0,W.jsx)($.Ay,{container:!0,spacing:2,children:0===ne.length?(0,W.jsx)(h.A,{variant:"h6",color:"text.secondary",sx:{marginLeft:4},children:"\uc77c\uce58\ud558\ub294 \uc0c1\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):ne.map((e=>(0,W.jsx)($.Ay,{item:!0,xs:12,sm:6,md:4,children:(0,W.jsx)(O.A,{onClick:()=>he(e.id),sx:{cursor:"pointer"},children:(0,W.jsxs)(L.A,{children:[(0,W.jsx)(M.A,{sx:{height:400},image:e.itemImage?"data:image/jpeg;base64,".concat(e.itemImage):n,title:e.name}),(0,W.jsx)(h.A,{gutterBottom:!0,variant:"h5",component:"div",children:e.name}),(0,W.jsxs)(h.A,{variant:"body2",color:"text.secondary",children:["\uac00\uaca9: ",e.price,"\uc6d0"]})]})})},e.id)))}),(0,W.jsx)(j.A,{sx:{display:"flex",justifyContent:"center",mt:2,pt:4,pb:6},children:(0,W.jsx)(E.A,{count:de,page:D,onChange:(e,r)=>{H(r)},variant:"outlined",shape:"rounded"})}),(0,W.jsx)(c.A,{position:"static",sx:{bgcolor:"gray",color:"black",height:50},children:(0,W.jsx)(d.A,{})})]})}},5881:(e,r)=>{var t,o=Symbol.for("react.element"),s=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),n=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.server_context"),h=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),u=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),j=Symbol.for("react.offscreen");function A(e){if("object"===typeof e&&null!==e){var r=e.$$typeof;switch(r){case o:switch(e=e.type){case l:case i:case a:case x:case p:return e;default:switch(e=e&&e.$$typeof){case d:case c:case h:case m:case u:case n:return e;default:return r}}case s:return r}}}t=Symbol.for("react.module.reference")},805:(e,r,t)=>{t(5881)},5760:()=>{},4409:(e,r,t)=>{e.exports=t.p+"static/media/sample1.fa2b61bbf5c7dc22754b.png"}}]);
//# sourceMappingURL=63.3e791653.chunk.js.map