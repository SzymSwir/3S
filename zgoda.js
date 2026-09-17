/* 3S — zgoda na cookies + Google Analytics 4 (G-Z7FY60NRMK)
   Zasada: żaden skrypt Google nie ładuje się, dopóki użytkownik nie kliknie „Akceptuję".
   Wybór zapisuję w localStorage (klucz 3s-zgoda) na 12 miesięcy.
   Link z klasą .zgoda-otworz (w stopce) otwiera baner ponownie. */
(function(){
  var ID='G-Z7FY60NRMK', KLUCZ='3s-zgoda', ROK=365*24*60*60*1000;

  function odczyt(){
    try{var v=JSON.parse(localStorage.getItem(KLUCZ)||'null');
        if(v&&v.t&&Date.now()-v.t<ROK) return v.z; }catch(e){}
    return null;
  }
  function zapis(z){ try{localStorage.setItem(KLUCZ,JSON.stringify({z:z,t:Date.now()}))}catch(e){} }

  var wlaczone=false;
  function wlaczGA(){
    if(wlaczone) return; wlaczone=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
    gtag('js',new Date());
    gtag('config',ID,{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
    var s=document.createElement('script'); s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
    document.head.appendChild(s);
  }

  var css='.zgoda{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;max-width:520px;background:#0A1727;color:#F9F6F0;border:1px solid rgba(249,246,240,.14);border-radius:14px;padding:20px 22px;box-shadow:0 18px 48px rgba(10,23,39,.35);font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:.92rem;line-height:1.55;transform:translateY(12px);opacity:0;transition:opacity .35s,transform .35s}'
   +'.zgoda.tu{opacity:1;transform:none}'
   +'.zgoda p{margin:0 0 14px;color:rgba(249,246,240,.82)}'
   +'.zgoda p b{color:#F9F6F0;font-weight:600}'
   +'.zgoda a{color:#E3AC6B;text-decoration:underline;text-underline-offset:3px}'
   +'.zgoda-btn{display:flex;gap:10px;flex-wrap:wrap;align-items:center}'
   +'.zgoda button{font:inherit;font-weight:600;font-size:.88rem;letter-spacing:.01em;border-radius:9px;padding:10px 18px;cursor:pointer;border:1px solid transparent}'
   +'.zgoda .tak{background:#C8873F;color:#0A1727}.zgoda .tak:hover{background:#E3AC6B}'
   +'.zgoda .nie{background:transparent;color:#F9F6F0;border-color:rgba(249,246,240,.3)}.zgoda .nie:hover{border-color:#F9F6F0}'
   +'@media(max-width:600px){.zgoda{left:12px;right:12px;bottom:12px;padding:16px 18px}.zgoda button{flex:1 1 auto}}';

  var baner=null;
  function pokaz(){
    if(baner) return;
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    baner=document.createElement('div'); baner.className='zgoda'; baner.setAttribute('role','dialog'); baner.setAttribute('aria-label','Zgoda na cookies');
    baner.innerHTML='<p><b>Cookies i statystyki.</b> Używam Google Analytics, żeby wiedzieć, które treści na tej stronie są czytane. '
      +'Bez Twojej zgody nic nie jest zapisywane. Szczegóły w <a href="/polityka-prywatnosci">polityce prywatności</a>.</p>'
      +'<div class="zgoda-btn"><button type="button" class="tak">Akceptuję</button><button type="button" class="nie">Odrzucam</button></div>';
    document.body.appendChild(baner);
    requestAnimationFrame(function(){requestAnimationFrame(function(){baner.classList.add('tu')})});
    baner.querySelector('.tak').addEventListener('click',function(){zapis('tak');schowaj();wlaczGA()});
    baner.querySelector('.nie').addEventListener('click',function(){zapis('nie');schowaj()});
  }
  function schowaj(){ if(!baner) return; var b=baner; baner=null; b.classList.remove('tu'); setTimeout(function(){b.remove()},380); }

  function start(){
    var z=odczyt();
    if(z==='tak') wlaczGA(); else if(z===null) pokaz();
    document.querySelectorAll('.zgoda-otworz').forEach(function(a){
      a.addEventListener('click',function(e){e.preventDefault();pokaz()});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
