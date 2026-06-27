import { useState, useEffect } from "react";

const B = {
  bg:"#0A0D0A", bgCard:"#0F1410", bgCard2:"#161D16",
  border:"#1E2A1E", green:"#7BC820", greenDark:"#4E8A0A",
  greenGlow:"#7BC82022", white:"#F2F5F0", muted:"#5A6B5A",
  red:"#E05050", gold:"#F0C040", blue:"#4488EE",
};

const API_KEY = "6ee41c0587e10a6e7ef4a28c8d0ee899";
const AFFILIATE = "https://partners.1xbet.com/YOUR_REF_ID";
const PROMO_CODE = "GOLAZZO100";
const WC_LEAGUE = 1; // FIFA World Cup

const LANGS = {
  en:{ dir:"ltr", flag:"🇬🇧", tagline:"Football Predictions", tab_today:"Today", tab_week:"This Week", tab_results:"Results", tab_ai:"AI Chat", hotBadge:"HOT", tip:"AI Tip", confidence:"Confidence", odds:"Odds", betNow:"Bet Now on 1xBet", promoBtn:"🎁 Register with Exclusive Code", promoDesc:"Get 100% Welcome Bonus", loading:"Loading matches...", aiLoading:"Analyzing...", send:"Send", askPlaceholder:"Ask about any match...", accuracy:"Accuracy", noMatches:"No matches found", ft:"FT", ht:"HT", live:"LIVE", vs:"VS", adLabel:"Advertisement", disclaimer:"⚠️ Statistical predictions only — not guaranteed results. Gamble responsibly. 18+", agreeBtn:"I Agree & Continue", tcTitle:"Terms & Conditions", home:"Home", away:"Away", draw:"Draw", minute:"'", status_NS:"Upcoming", status_FT:"Finished", status_1H:"1st Half", status_2H:"2nd Half", status_HT:"Half Time", fetchError:"Could not load matches. Please try again." },
  ar:{ dir:"rtl", flag:"🇸🇦", tagline:"توقعات كرة القدم", tab_today:"اليوم", tab_week:"الأسبوع", tab_results:"النتائج", tab_ai:"AI", hotBadge:"ساخن", tip:"توصية AI", confidence:"الثقة", odds:"الكوطاسيون", betNow:"راهن دابا على 1xBet", promoBtn:"🎁 سجل بكود الخصم الحصري", promoDesc:"احصل على بونص 100%", loading:"جاري تحميل المباريات...", aiLoading:"جاري التحليل...", send:"إرسال", askPlaceholder:"اسأل عن أي مباراة...", accuracy:"الدقة", noMatches:"لا توجد مباريات", ft:"انتهى", ht:"نصف", live:"مباشر", vs:"ضد", adLabel:"إعلان", disclaimer:"⚠️ توقعات إحصائية فقط وليست نتائج مضمونة. العب بمسؤولية. +18", agreeBtn:"أوافق وأكمل", tcTitle:"الشروط والأحكام", home:"المضيف", away:"الضيف", draw:"تعادل", minute:"د", status_NS:"قادمة", status_FT:"انتهت", status_1H:"الشوط الأول", status_2H:"الشوط الثاني", status_HT:"نصف الوقت", fetchError:"تعذر تحميل المباريات. حاول مرة أخرى." },
  fr:{ dir:"ltr", flag:"🇫🇷", tagline:"Pronostics Football", tab_today:"Aujourd'hui", tab_week:"Cette Semaine", tab_results:"Résultats", tab_ai:"IA Chat", hotBadge:"CHAUD", tip:"Conseil IA", confidence:"Confiance", odds:"Cotes", betNow:"Parier sur 1xBet", promoBtn:"🎁 S'inscrire avec Code Exclusif", promoDesc:"Bonus 100% de bienvenue", loading:"Chargement...", aiLoading:"Analyse...", send:"Envoyer", askPlaceholder:"Posez une question...", accuracy:"Précision", noMatches:"Aucun match trouvé", ft:"FT", ht:"MT", live:"LIVE", vs:"VS", adLabel:"Publicité", disclaimer:"⚠️ Prédictions statistiques uniquement. Jouez responsablement. 18+", agreeBtn:"J'accepte et continue", tcTitle:"Conditions Générales", home:"Domicile", away:"Extérieur", draw:"Nul", minute:"'", status_NS:"À venir", status_FT:"Terminé", status_1H:"1ère Mi-temps", status_2H:"2ème Mi-temps", status_HT:"Mi-temps", fetchError:"Impossible de charger. Réessayez." },
  es:{ dir:"ltr", flag:"🇪🇸", tagline:"Predicciones de Fútbol", tab_today:"Hoy", tab_week:"Esta Semana", tab_results:"Resultados", tab_ai:"IA Chat", hotBadge:"CALIENTE", tip:"Consejo IA", confidence:"Confianza", odds:"Cuotas", betNow:"Apostar en 1xBet", promoBtn:"🎁 Regístrate con Código Exclusivo", promoDesc:"Bono 100% de bienvenida", loading:"Cargando partidos...", aiLoading:"Analizando...", send:"Enviar", askPlaceholder:"Pregunta sobre cualquier partido...", accuracy:"Precisión", noMatches:"No hay partidos", ft:"FT", ht:"MT", live:"EN VIVO", vs:"VS", adLabel:"Publicidad", disclaimer:"⚠️ Predicciones estadísticas únicamente. Juega responsablemente. +18", agreeBtn:"Acepto y continúo", tcTitle:"Términos y Condiciones", home:"Local", away:"Visitante", draw:"Empate", minute:"'", status_NS:"Próximo", status_FT:"Finalizado", status_1H:"1er Tiempo", status_2H:"2do Tiempo", status_HT:"Medio Tiempo", fetchError:"No se pudieron cargar. Intente de nuevo." },
  pt:{ dir:"ltr", flag:"🇧🇷", tagline:"Previsões de Futebol", tab_today:"Hoje", tab_week:"Esta Semana", tab_results:"Resultados", tab_ai:"IA Chat", hotBadge:"QUENTE", tip:"Dica IA", confidence:"Confiança", odds:"Odds", betNow:"Apostar no 1xBet", promoBtn:"🎁 Registre-se com Código Exclusivo", promoDesc:"Bônus 100% de boas-vindas", loading:"Carregando jogos...", aiLoading:"Analisando...", send:"Enviar", askPlaceholder:"Pergunte sobre qualquer jogo...", accuracy:"Precisão", noMatches:"Nenhum jogo encontrado", ft:"FT", ht:"MT", live:"AO VIVO", vs:"VS", adLabel:"Publicidade", disclaimer:"⚠️ Previsões estatísticas apenas. Jogue com responsabilidade. +18", agreeBtn:"Aceito e continuo", tcTitle:"Termos e Condições", home:"Casa", away:"Fora", draw:"Empate", minute:"'", status_NS:"Próximo", status_FT:"Encerrado", status_1H:"1º Tempo", status_2H:"2º Tempo", status_HT:"Intervalo", fetchError:"Não foi possível carregar. Tente novamente." },
};

const TC_TEXT = `TERMS & CONDITIONS — GOLAZZO: FOOTBALL PREDICTIONS

1. DISCLAIMER OF LIABILITY
Golazzo provides statistical football predictions for informational and entertainment purposes ONLY. All predictions are based on data analysis and AI — they are NOT guaranteed results. The app owner bears NO responsibility for any financial losses.

2. NO GAMBLING ADVICE
Nothing on this platform constitutes gambling advice. We are a statistical analysis tool, not a betting service.

3. RISK WARNING
Gambling involves serious financial risk. You can lose all money wagered. Never bet money you cannot afford to lose. If you have a gambling problem, seek professional help immediately.

4. AGE RESTRICTION
You must be 18 years of age or older to use this application.

5. AFFILIATE DISCLOSURE
This app contains affiliate links to third-party betting platforms. We may receive a commission when users register or place bets through our links.

6. ACCURACY
Our AI predictions have a historical accuracy of approximately 65-75%. Past performance does not guarantee future results.

7. RESPONSIBLE GAMBLING
Resources: www.begambleaware.org | www.gamcare.org.uk

By clicking "I Agree", you confirm that you have read and accept these Terms & Conditions.`;

// ── helpers ──────────────────────────────────────────────────────────────────
function getDateStr(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

function getWeekDates() {
  const dates = [];
  for (let i = 0; i < 7; i++) dates.push(getDateStr(i));
  return dates;
}

async function fetchFixtures(date) {
  const url = `/api/fixtures?date=${date}`;
  const res = await fetch(url);

  const data = await res.json();
  return data.response || [];
}

async function fetchResults() {
  const url = `/api/fixtures?status=FT&last=10`;
  const res = await fetch(url);

  const data = await res.json();
  return data.response || [];
}

function getStatusLabel(fix, t) {
  const s = fix.fixture.status.short;
  if (s === "NS") return { text: fix.fixture.date ? new Date(fix.fixture.date).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) : t.status_NS, color: B.muted, live: false };
  if (s === "FT" || s === "AET" || s === "PEN") return { text: t.ft, color: B.muted, live: false };
  if (s === "HT") return { text: t.ht, color: B.gold, live: true };
  if (s === "1H" || s === "2H") return { text: `${fix.fixture.status.elapsed}${t.minute}`, color: B.green, live: true };
  return { text: s, color: B.muted, live: false };
}

// ── components ───────────────────────────────────────────────────────────────
function GolazzoLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#0A0D0A"/>
      <circle cx="50" cy="46" r="22" fill="none" stroke="#ffffff" strokeWidth="5" strokeDasharray="100 30" strokeLinecap="round"/>
      <circle cx="50" cy="46" r="14" fill="#111"/>
      <text x="50" y="52" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">⚽</text>
      <path d="M62 60 L80 78" stroke="#7BC820" strokeWidth="6" strokeLinecap="round"/>
      <path d="M75 65 L82 78 L68 78 Z" fill="#7BC820"/>
      <path d="M30 62 Q38 55 50 58 Q62 61 70 54" stroke="#7BC820" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="38" cy="59" r="3" fill="#7BC820"/>
      <circle cx="50" cy="58" r="3" fill="#7BC820"/>
      <circle cx="62" cy="61" r="3" fill="#7BC820"/>
    </svg>
  );
}

function AdSlot({ label, h = 72 }) {
  return (
    <div style={{ background:B.bgCard2, border:`1px dashed ${B.muted}44`, borderRadius:10, height:h, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, margin:"10px 0" }}>
      <div style={{ color:B.muted, fontSize:9, letterSpacing:1, textTransform:"uppercase" }}>{label}</div>
      <div style={{ color:B.muted+"55", fontSize:9 }}>Google AdSense</div>
    </div>
  );
}

function PromoBtn({ t }) {
  return (
    <div onClick={() => window.open(AFFILIATE,"_blank")} style={{ background:`linear-gradient(135deg,${B.greenDark},${B.green})`, borderRadius:12, padding:"12px 14px", margin:"10px 0", cursor:"pointer" }}>
      <div style={{ color:"#fff", fontWeight:900, fontSize:13, marginBottom:3 }}>{t.promoBtn}</div>
      <div style={{ color:"#ffffffcc", fontSize:11 }}>{t.promoDesc}</div>
      <div style={{ display:"inline-block", marginTop:6, background:"#ffffff22", borderRadius:8, padding:"3px 10px", color:"#fff", fontWeight:800, fontSize:13, letterSpacing:1 }}>{PROMO_CODE}</div>
    </div>
  );
}

function FixtureCard({ fix, t, lang }) {
  const [open, setOpen] = useState(false);
  const [aiTip, setAiTip] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const status = getStatusLabel(fix, t);
  const rtl = lang === "ar";
  const hGoals = fix.goals.home ?? "-";
  const aGoals = fix.goals.away ?? "-";
  const isFinished = ["FT","AET","PEN"].includes(fix.fixture.status.short);
  const isUpcoming = fix.fixture.status.short === "NS";

  const getAI = async (e) => {
    e.stopPropagation();
    if (aiTip) { setOpen(true); return; }
    setAiLoading(true); setOpen(true);
    try {
      const langName = {en:"English",ar:"Arabic",fr:"French",es:"Spanish",pt:"Portuguese"}[lang];
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-6", max_tokens:1000,
          messages:[{ role:"user", content:`You are Golazzo AI, expert football analyst. Give a sharp betting tip (2-3 sentences) for this World Cup 2026 match:
${fix.teams.home.name} vs ${fix.teams.away.name}
Date: ${fix.fixture.date}
League: ${fix.league.name}
${isFinished ? `Final Score: ${fix.teams.home.name} ${hGoals} - ${aGoals} ${fix.teams.away.name}` : "Match not yet played"}
Respond in ${langName}. Be specific and confident.` }],
        }),
      });
      const data = await res.json();
      setAiTip(data.content?.map(b=>b.text||"").join("")||"Analysis unavailable.");
    } catch { setAiTip("AI temporarily unavailable."); }
    setAiLoading(false);
  };

  return (
    <div onClick={()=>setOpen(!open)} style={{ background:B.bgCard, border:`1px solid ${status.live?B.green+"55":B.border}`, borderRadius:14, padding:16, cursor:"pointer", direction:rtl?"rtl":"ltr" }}>
      {/* Status + league */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ color:B.muted, fontSize:10 }}>🏆 {fix.league.name}</span>
        <span style={{ color:status.color, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", gap:4 }}>
          {status.live && <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:B.green, animation:"pulse 1s infinite" }}/>}
          {status.text}
        </span>
      </div>

      {/* Teams + Score */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div style={{ textAlign:"center", flex:1 }}>
          <img src={fix.teams.home.logo} alt="" style={{ width:40, height:40, objectFit:"contain" }} onError={e=>e.target.style.display="none"}/>
          <div style={{ color:B.white, fontWeight:700, fontSize:12, marginTop:4 }}>{fix.teams.home.name}</div>
        </div>
        <div style={{ textAlign:"center", padding:"0 10px" }}>
          {isFinished || status.live ? (
            <div style={{ color:B.white, fontWeight:900, fontSize:24, fontFamily:"monospace", background:B.bgCard2, borderRadius:10, padding:"6px 12px" }}>
              {hGoals} – {aGoals}
            </div>
          ) : (
            <div style={{ color:B.green, fontWeight:900, fontSize:16, fontFamily:"monospace" }}>{t.vs}</div>
          )}
        </div>
        <div style={{ textAlign:"center", flex:1 }}>
          <img src={fix.teams.away.logo} alt="" style={{ width:40, height:40, objectFit:"contain" }} onError={e=>e.target.style.display="none"}/>
          <div style={{ color:B.white, fontWeight:700, fontSize:12, marginTop:4 }}>{fix.teams.away.name}</div>
        </div>
      </div>

      {/* AI Analysis expanded */}
      {open && (
        <div style={{ marginBottom:10 }}>
          <div style={{ background:B.bgCard2, border:`1px solid ${B.blue}33`, borderRadius:10, padding:12, marginBottom:10 }}>
            <div style={{ color:B.blue, fontSize:11, fontWeight:700, marginBottom:6 }}>🤖 Golazzo AI</div>
            {aiLoading
              ? <div style={{ color:B.muted, fontSize:12 }}>{t.aiLoading}</div>
              : aiTip
                ? <div style={{ color:B.white, fontSize:12, lineHeight:1.6 }}>{aiTip}</div>
                : <button onClick={getAI} style={{ width:"100%", background:`linear-gradient(135deg,${B.blue},#2255CC)`, color:"#fff", border:"none", borderRadius:8, padding:"9px", fontSize:12, fontWeight:700, cursor:"pointer" }}>🤖 Get AI Analysis</button>
            }
          </div>
        </div>
      )}

      {/* Promo + Bet button for upcoming */}
      {isUpcoming && (
        <>
          <PromoBtn t={t}/>
          <button onClick={e=>{e.stopPropagation();window.open(AFFILIATE,"_blank");}} style={{ width:"100%", background:`linear-gradient(135deg,${B.green},${B.greenDark})`, color:"#0A0D0A", border:"none", borderRadius:10, padding:"12px", fontWeight:900, fontSize:14, cursor:"pointer", marginTop:6 }}>
            🎯 {t.betNow}
          </button>
        </>
      )}
    </div>
  );
}

function MatchList({ fixtures, t, lang, loading, error }) {
  if (loading) return (
    <div style={{ textAlign:"center", padding:"40px 0", color:B.muted }}>
      <div style={{ fontSize:32, marginBottom:12 }}>⚽</div>
      <div>{t.loading}</div>
    </div>
  );
  if (error) return <div style={{ textAlign:"center", padding:"30px 0", color:B.red, fontSize:13 }}>{t.fetchError}</div>;
  if (!fixtures.length) return (
    <div style={{ textAlign:"center", padding:"40px 0", color:B.muted }}>
      <div style={{ fontSize:32, marginBottom:12 }}>📅</div>
      <div>{t.noMatches}</div>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {fixtures.map((fix, i) => (
        <div key={fix.fixture.id}>
          <FixtureCard fix={fix} t={t} lang={lang}/>
          {i === 1 && <AdSlot label={t.adLabel}/>}
        </div>
      ))}
    </div>
  );
}

function AiChat({ lang, t }) {
  const [msgs, setMsgs] = useState([{ role:"assistant", text: lang==="ar" ? "مرحباً! أنا Golazzo AI 🏆 اسألني عن أي مباراة في كأس العالم 2026" : "Hello! I'm Golazzo AI 🏆 Ask me about any World Cup 2026 match!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const rtl = lang === "ar";

  const send = async () => {
    if (!input.trim()||loading) return;
    const msg = input.trim(); setInput("");
    setMsgs(p=>[...p,{role:"user",text:msg}]);
    setLoading(true);
    try {
      const langName = {en:"English",ar:"Arabic",fr:"French",es:"Spanish",pt:"Portuguese"}[lang];
      const history = msgs.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text}));
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:`You are Golazzo AI, expert World Cup 2026 analyst. Give sharp betting tips. Keep responses under 4 sentences. Respond in ${langName}.`, messages:[...history,{role:"user",content:msg}] }),
      });
      const data = await res.json();
      setMsgs(p=>[...p,{role:"assistant",text:data.content?.map(b=>b.text||"").join("")||"Sorry, try again."}]);
    } catch { setMsgs(p=>[...p,{role:"assistant",text:"Connection error."}]); }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:460, direction:rtl?"rtl":"ltr" }}>
      <div style={{ flex:1, overflowY:"auto", paddingBottom:12 }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?(rtl?"flex-start":"flex-end"):(rtl?"flex-end":"flex-start"), marginBottom:10 }}>
            <div style={{ maxWidth:"85%", background:m.role==="user"?B.green:B.bgCard2, color:m.role==="user"?"#0A0D0A":B.white, borderRadius:12, padding:"10px 14px", fontSize:13, lineHeight:1.6 }}>
              {m.role==="assistant"&&<span style={{marginRight:6}}>🤖</span>}{m.text}
            </div>
          </div>
        ))}
        {loading&&<div style={{color:B.muted,fontSize:12,padding:"4px 8px"}}>🤖 {t.aiLoading}</div>}
      </div>
      <div style={{ display:"flex", gap:8, paddingTop:12, borderTop:`1px solid ${B.border}` }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.askPlaceholder} style={{ flex:1, background:B.bgCard2, border:`1px solid ${B.border}`, borderRadius:10, padding:"11px 14px", color:B.white, fontSize:13, outline:"none", direction:rtl?"rtl":"ltr" }}/>
        <button onClick={send} style={{ background:B.green, color:"#0A0D0A", border:"none", borderRadius:10, padding:"11px 18px", fontWeight:900, fontSize:13, cursor:"pointer" }}>{t.send}</button>
      </div>
    </div>
  );
}

function TCModal({ lang, t, onAccept }) {
  const rtl = lang === "ar";
  return (
    <div style={{ position:"fixed", inset:0, background:"#000000ee", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:16 }}>
      <div style={{ background:B.bgCard, border:`1px solid ${B.green}44`, borderRadius:16, maxWidth:480, width:"100%", maxHeight:"85vh", display:"flex", flexDirection:"column", direction:rtl?"rtl":"ltr" }}>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", gap:12 }}>
          <GolazzoLogo size={36}/>
          <div>
            <div style={{ color:B.white, fontWeight:900, fontSize:16 }}>Golazzo</div>
            <div style={{ color:B.green, fontSize:12 }}>{t.tcTitle}</div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", color:B.muted, fontSize:12, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{TC_TEXT}</div>
        <div style={{ padding:"16px 20px", borderTop:`1px solid ${B.border}` }}>
          <div style={{ color:B.red, fontSize:11, marginBottom:12, background:B.red+"11", borderRadius:8, padding:"8px 12px" }}>⚠️ {t.disclaimer}</div>
          <button onClick={onAccept} style={{ width:"100%", background:`linear-gradient(135deg,${B.green},${B.greenDark})`, color:"#0A0D0A", border:"none", borderRadius:12, padding:"14px", fontWeight:900, fontSize:15, cursor:"pointer" }}>✓ {t.agreeBtn}</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState("today");
  const [langMenu, setLangMenu] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [todayFix, setTodayFix] = useState([]);
  const [weekFix, setWeekFix] = useState([]);
  const [resultsFix, setResultsFix] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);
  const [loadingWeek, setLoadingWeek] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [errorToday, setErrorToday] = useState(false);
  const [errorWeek, setErrorWeek] = useState(false);
  const [errorResults, setErrorResults] = useState(false);

  const t = LANGS[lang];
  const rtl = lang === "ar";

  const langOptions = [{code:"en",label:"🇬🇧 EN"},{code:"ar",label:"🇸🇦 AR"},{code:"fr",label:"🇫🇷 FR"},{code:"es",label:"🇪🇸 ES"},{code:"pt",label:"🇧🇷 PT"}];

  // fetch today
  useEffect(() => {
    if (!accepted) return;
    setLoadingToday(true); setErrorToday(false);
    fetchFixtures(getDateStr(0))
      .then(data => setTodayFix(data))
      .catch(() => setErrorToday(true))
      .finally(() => setLoadingToday(false));
  }, [accepted]);

  // fetch week on tab switch
  useEffect(() => {
    if (tab !== "week" || weekFix.length) return;
    setLoadingWeek(true); setErrorWeek(false);
    const dates = getWeekDates();
    Promise.all(dates.map(d => fetchFixtures(d)))
      .then(results => setWeekFix(results.flat()))
      .catch(() => setErrorWeek(true))
      .finally(() => setLoadingWeek(false));
  }, [tab]);

  // fetch results on tab switch
  useEffect(() => {
    if (tab !== "results" || resultsFix.length) return;
    setLoadingResults(true); setErrorResults(false);
    fetchResults()
      .then(data => setResultsFix(data))
      .catch(() => setErrorResults(true))
      .finally(() => setLoadingResults(false));
  }, [tab]);

  if (!accepted) return <TCModal lang={lang} t={t} onAccept={()=>setAccepted(true)}/>;

  return (
    <div style={{ minHeight:"100vh", background:B.bg, color:B.white, fontFamily:rtl?"'Segoe UI',Tahoma,sans-serif":"'Inter','Segoe UI',sans-serif", direction:rtl?"rtl":"ltr", maxWidth:500, margin:"0 auto" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}input::placeholder{color:#5A6B5A;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#7BC82044;border-radius:2px;}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

      {/* HEADER */}
      <div style={{ background:B.bgCard, borderBottom:`1px solid ${B.green}22`, padding:"14px 16px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <GolazzoLogo size={40}/>
            <div>
              <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
                <span style={{ color:B.white, fontWeight:900, fontSize:17 }}>Go</span>
                <span style={{ color:B.green, fontWeight:900, fontSize:17 }}>lazzo</span>
              </div>
              <div style={{ color:B.muted, fontSize:10 }}>{t.tagline}</div>
            </div>
          </div>
          <div style={{ position:"relative" }}>
            <button onClick={()=>setLangMenu(!langMenu)} style={{ background:B.bgCard2, border:`1px solid ${B.border}`, color:B.white, borderRadius:8, padding:"6px 10px", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
              {langOptions.find(l=>l.code===lang)?.label} ▾
            </button>
            {langMenu && (
              <div style={{ position:"absolute", top:"110%", [rtl?"left":"right"]:0, background:B.bgCard2, border:`1px solid ${B.border}`, borderRadius:10, overflow:"hidden", zIndex:200, minWidth:100, boxShadow:"0 8px 24px #00000088" }}>
                {langOptions.map(l=>(
                  <div key={l.code} onClick={()=>{setLang(l.code);setLangMenu(false);}} style={{ padding:"9px 14px", cursor:"pointer", fontSize:13, color:lang===l.code?B.green:B.white, background:lang===l.code?B.greenGlow:"transparent", fontWeight:lang===l.code?700:400 }}>{l.label}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP AD */}
      <div style={{ padding:"10px 16px 0" }}>
        <AdSlot label={t.adLabel} h={68}/>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", gap:6, padding:"10px 16px", borderBottom:`1px solid ${B.border}` }}>
        {[
          {key:"today", label:`⚽ ${t.tab_today}`},
          {key:"week", label:`📅 ${t.tab_week}`},
          {key:"results", label:`📋 ${t.tab_results}`},
          {key:"ai", label:`🤖 ${t.tab_ai}`},
        ].map(({key,label})=>(
          <button key={key} onClick={()=>setTab(key)} style={{ flex:1, padding:"8px 4px", background:tab===key?B.green:B.bgCard2, color:tab===key?"#0A0D0A":B.muted, border:`1px solid ${tab===key?B.green:B.border}`, borderRadius:10, fontWeight:700, fontSize:11, cursor:"pointer" }}>{label}</button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding:"16px" }}>
        {tab==="today" && <MatchList fixtures={todayFix} t={t} lang={lang} loading={loadingToday} error={errorToday}/>}
        {tab==="week" && <MatchList fixtures={weekFix} t={t} lang={lang} loading={loadingWeek} error={errorWeek}/>}
        {tab==="results" && <MatchList fixtures={resultsFix} t={t} lang={lang} loading={loadingResults} error={errorResults}/>}
        {tab==="ai" && <AiChat lang={lang} t={t}/>}
      </div>

      {/* BOTTOM AD */}
      <div style={{ padding:"0 16px 8px" }}>
        <AdSlot label={t.adLabel} h={65}/>
      </div>

      {/* DISCLAIMER */}
      <div style={{ margin:"0 16px 24px", background:B.red+"0f", border:`1px solid ${B.red}22`, borderRadius:10, padding:"10px 14px", color:B.muted, fontSize:10, textAlign:"center", lineHeight:1.6 }}>
        {t.disclaimer}
      </div>
    </div>
  );
}

