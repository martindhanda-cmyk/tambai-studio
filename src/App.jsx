import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Sparkles,
  Music,
  Video,
  Sliders,
  Download,
  Share2,
  ShieldCheck,
  Mic,
  Upload,
  CheckCircle2,
  RefreshCw,
  Volume2,
  CreditCard,
  Smartphone,
  UserCheck,
  Layers,
  Wand2,
  Crown,
  Terminal,
  Server,
  Users,
  DollarSign,
  Plus,
  Activity
} from "lucide-react";

const SUPER_ADMIN_OWNER = {
  id: "usr_root_martindhanda_001",
  username: "Martindhanda",
  fullName: "Martin Dhanda",
  role: "SUPER_ADMIN_OWNER",
  permissions: [
    "ROOT_ALL",
    "SYSTEM_CONFIG_WRITE",
    "AI_PIPELINE_OVERRIDE",
    "BILLING_GATEWAY_ADMIN",
    "UNLIMITED_8K_ATMOS_RENDERS",
    "SAFETY_GATEKEEPER_OVERRIDE",
    "USER_IMPERSONATION_AND_GRANT"
  ],
  plan: "FOUNDER_INFINITY_8K",
  credits: "UNLIMITED (∞)",
  verifiedOwner: true
};

const INITIAL_GENRES = [
  { id: "Amapiano", bpm: 113, key: "F# Minor", desc: "Deep log drums, syncopated shakers & soulful chords" },
  { id: "Sungura", bpm: 142, key: "A Major", desc: "Fast interlocking lead/rhythm guitars & driving bass" },
  { id: "Zimdancehall", bpm: 102, key: "C Minor", desc: "Heavy digital riddim, rapid patois/Shona cadence" },
  { id: "Mbira / Chimurenga", bpm: 118, key: "G Mixolydian", desc: "Sacred nhare mbira polyrhythms & hosho shakers" },
  { id: "Afrobeats", bpm: 106, key: "E Minor", desc: "West African percussion groove & melodic synth hooks" },
  { id: "Gqom", bpm: 126, key: "D Minor", desc: "Dark, hypnotic Durban broken-beat percussion" },
  { id: "Gospel", bpm: 96, key: "Bb Major", desc: "Rich 4-part African choir harmonies & warm keys" },
  { id: "Hip-Hop", bpm: 92, key: "C# Minor", desc: "808 sub-bass, crisp trap hats & punchy vocals" }
];

const LANGUAGES = [
  { code: "sn", label: "Shona (ChiShona)", sampleLine: "Tambai nesu kusvika mangwana, moto unopisa!" },
  { code: "nd", label: "Ndebele (IsiNdebele)", sampleLine: "Gida lathi kuze kuse, umculo omnandi!" },
  { code: "sw", label: "Swahili (Kiswahili)", sampleLine: "Cheza nasi mpaka asubuhi, furaha tele!" },
  { code: "zu", label: "Zulu (IsiZulu)", sampleLine: "Sukuma udanse, isigqi siyashisa!" },
  { code: "yo", label: "Yoruba", sampleLine: "Jó pẹ̀lú wa títí di àárọ̀, ayọ̀ ni tiwa!" },
  { code: "en", label: "English", sampleLine: "Feel the golden rhythm rising through the night!" },
  { code: "fr", label: "French", sampleLine: "Dansez sous les étoiles jusqu'au lever du jour!" },
  { code: "pt", label: "Portuguese", sampleLine: "Sinta a batida vibrar no coração da cidade!" },
  { code: "es", label: "Spanish", sampleLine: "¡Baila con nosotros hasta que salga el sol!" }
];

const VISUAL_STYLES = [
  "Cinematic Realism (ARRI Alexa 65)",
  "Anime Masterpiece",
  "3D Stylized Animation",
  "Claymation Stop-Motion",
  "Retro 90s VHS",
  "Live Stadium Performance",
  "Abstract Audio Visualizer"
];

const LOCATION_PRESETS = [
  { id: "harare_rocks", name: "Harare Balancing Rocks (Golden Hour)", sky: ["#2A0845", "#F5B700"] },
  { id: "lagos_neon", name: "Lagos Night Market (Cyber-Neon)", sky: ["#09070F", "#6D28D9"] },
  { id: "joburg_rooftop", name: "Johannesburg Amapiano Rooftop", sky: ["#1E1B4B", "#F59E0B"] },
  { id: "vic_falls", name: "Victoria Falls (Mosi-oa-Tunya Mist)", sky: ["#064E3B", "#38BDF8"] },
  { id: "rural_homestead", name: "Savanna Homestead & Firelight", sky: ["#451A03", "#EA580C"] }
];

const INITIAL_CHARACTERS = [
  {
    id: "char-owner",
    name: "Martindhanda (Owner Avatar)",
    role: "Executive Producer / Lead Artist",
    wardrobe: "Bespoke Black & Electric Gold Founder Jacket",
    avatarColor: "#F5B700",
    verified: true
  },
  {
    id: "char-1",
    name: "Tendai",
    role: "Lead Vocalist",
    wardrobe: "Electric Gold Streetwear & Shona Beads",
    avatarColor: "#10B981",
    verified: true
  },
  {
    id: "char-2",
    name: "Amara",
    role: "Choreographer / Dancer",
    wardrobe: "Royal Purple Ankara Couture",
    avatarColor: "#A855F7",
    verified: true
  }
];

const INITIAL_SCENES = [
  {
    id: "sc-1",
    section: "INTRO",
    startSec: 0,
    endSec: 8,
    camera: "Drone Orbit",
    location: "harare_rocks",
    dance: "Subtle Groove",
    lipSync: false,
    characterId: "char-owner",
    prompt: "Wide aerial orbit around granite balancing rocks at sunset, golden lens flare, Martindhanda kicking off the groove.",
    lyricLine: "[Instrumental Intro — Mbira & Log Drum Swell]"
  },
  {
    id: "sc-2",
    section: "VERSE 1",
    startSec: 8,
    endSec: 20,
    camera: "Dolly In (Close-Up)",
    location: "joburg_rooftop",
    dance: "Vocal Performance",
    lipSync: true,
    characterId: "char-1",
    prompt: "Medium close-up of lead vocalist under warm tungsten lights, expressive phoneme-accurate lip sync, shallow depth of field.",
    lyricLine: "Tambai nesu kusvika mangwana, nyeredzi dzinopenya!"
  },
  {
    id: "sc-3",
    section: "CHORUS",
    startSec: 20,
    endSec: 36,
    camera: "Dynamic Handheld",
    location: "lagos_neon",
    dance: "Amapiano Bacardi / Sungura Footwork",
    lipSync: true,
    characterId: "char-2",
    prompt: "High-energy dance crew locked to every downbeat, purple and gold neon reflections on wet pavement, anamorphic 2.39:1 look.",
    lyricLine: "Speak it, hear it, see it — moto unopisa manheru ano!"
  },
  {
    id: "sc-4",
    section: "OUTRO",
    startSec: 36,
    endSec: 45,
    camera: "Crane Pull-Back",
    location: "vic_falls",
    dance: "Freestyle Celebration",
    lipSync: true,
    characterId: "char-owner",
    prompt: "Epic crane shot rising into the mist with rainbow light refraction as the final chord fades out.",
    lyricLine: "Tambai! Created & Mastered in 8K Dolby Atmos."
  }
];

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1 },
  ZiG: { symbol: "ZiG ", rate: 13.8 },
  ZAR: { symbol: "R", rate: 18.2 },
  KES: { symbol: "KSh ", rate: 129.0 },
  NGN: { symbol: "₦", rate: 1580.0 }
};

export default function App() {
  const [currentUser] = useState(SUPER_ADMIN_OWNER);
  const [ownerGodMode, setOwnerGodMode] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const [genres, setGenres] = useState(INITIAL_GENRES);
  const [selectedGenre, setSelectedGenre] = useState(INITIAL_GENRES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [visualStyle, setVisualStyle] = useState(VISUAL_STYLES[0]);

  const [inputMode, setInputMode] = useState("prompt");
  const [promptText, setPromptText] = useState(
    "An uplifting Amapiano meets Sungura anthem celebrating resilience and joy in Harare, blending deep log drums with interlocking guitar melodies."
  );
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [uploadedTrackName, setUploadedTrackName] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 45;
  const [atmosEnabled, setAtmosEnabled] = useState(true);
  const [stems, setStems] = useState({
    vocals: { volume: 0.9, muted: false, solo: false, label: "Lead & Backing Vocals" },
    drums: { volume: 0.95, muted: false, solo: false, label: "Log Drums & Hosho Percussion" },
    bass: { volume: 0.9, muted: false, solo: false, label: "Sub Bass & 808" },
    instruments: { volume: 0.85, muted: false, solo: false, label: "Sungura Guitar & Mbira Keys" }
  });

  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [newCharName, setNewCharName] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [recordedConsentPhrase, setRecordedConsentPhrase] = useState(false);

  const [scenes, setScenes] = useState(INITIAL_SCENES);
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [resolution, setResolution] = useState("8K");
  const [hdrFormat, setHdrFormat] = useState("DOLBY_VISION");
  const [fps, setFps] = useState(60);
  const [karaokeCaptions, setKaraokeCaptions] = useState(true);
  const [colorGrade, setColorGrade] = useState("Golden Savanna Warmth");

  const [isGenerating, setIsGenerating] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStageText, setRenderStageText] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("STUDIO");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("ECOCASH");
  const [mobilePhone, setMobilePhone] = useState("+263 77 123 4567");
  const [paymentStatusMsg, setPaymentStatusMsg] = useState(null);

  const [planPricesUsd, setPlanPricesUsd] = useState({
    CREATOR: 12.99,
    PRO: 39.99,
    STUDIO: 99.0
  });

  const [aiModelsConfig, setAiModelsConfig] = useState({
    videoBackbone: "Wan2.1-DiT-14B + HunyuanVideo",
    lipSyncModel: "LatentSync v2 + MFA Shona/Zulu G2P",
    gpuClusterNodes: 32
  });

  const [newGenreName, setNewGenreName] = useState("");
  const [newGenreBpm, setNewGenreBpm] = useState(120);
  const [newGenreKey, setNewGenreKey] = useState("A Minor");
  const [newGenreDesc, setNewGenreDesc] = useState("");

  const [managedUsers, setManagedUsers] = useState([
    { id: "u-01", name: "Martindhanda", email: "martin@tambai.app", role: "SUPER_ADMIN_OWNER", plan: "FOUNDER_8K", credits: "∞" },
    { id: "u-02", name: "Tafadzwa M.", email: "tafadzwa@hararebeats.co.zw", role: "PRODUCER", plan: "PRO", credits: 420 },
    { id: "u-03", name: "Chipo N.", email: "chipo@bulawayocreative.com", role: "CREATOR", plan: "CREATOR", credits: 85 }
  ]);

  const [adminAuditLogs, setAdminAuditLogs] = useState([
    "[ROOT_INIT] Martindhanda authenticated with SUPER_ADMIN_OWNER privileges.",
    "[GPU_CLUSTER] 32x NVIDIA H100 nodes online. Render failure rate at 0.42% (Target < 2.0%).",
    "[FINTECH_GATEWAY] EcoCash (+263), M-Pesa (+254), and Stripe webhooks active."
  ]);

  const logAdminAction = (msg) => {
    const time = new Date().toLocaleTimeString();
    setAdminAuditLogs((prev) => [`[${time} • MARTINDHANDA] ${msg}`, ...prev]);
  };

  const audioCtxRef = useRef(null);
  const schedulerTimerRef = useRef(null);
  const canvasRef = useRef(null);
  const beatPulseRef = useRef(0);
  const vocalEnergyRef = useRef(0);
  const stepCounterRef = useRef(0);

  const triggerSynthesizedStep = (ctx, stepIndex, genreId, currentStems) => {
    const now = ctx.currentTime;
    const anySolo = Object.values(currentStems).some((s) => s.solo);
    const isStemActive = (key) => {
      const s = currentStems[key];
      if (anySolo) return s.solo && !s.muted;
      return !s.muted;
    };

    if (isStemActive("drums")) {
      const isDownbeat = stepIndex % 4 === 0;
      const isSyncopated = stepIndex % 16 === 3 || stepIndex % 16 === 10 || stepIndex % 16 === 14;
      if (isDownbeat || (genreId === "Gqom" && isSyncopated)) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(135, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.12);
        gain.gain.setValueAtTime(0.45 * currentStems.drums.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
        beatPulseRef.current = 1.0;
      }
    }

    if (isStemActive("bass")) {
      const logPattern = [0, 3, 6, 10, 12, 14];
      if (logPattern.includes(stepIndex % 16)) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        const notes = [55, 65.41, 73.42, 82.41];
        const freq = notes[(stepIndex >> 2) % notes.length];
        osc.frequency.setValueAtTime(freq * 1.6, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.09);
        gain.gain.setValueAtTime(0.4 * currentStems.bass.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    }

    if (isStemActive("instruments")) {
      const pluckScale = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
      if (genreId === "Sungura" || stepIndex % 2 === 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = genreId === "Mbira / Chimurenga" ? "sine" : "sawtooth";
        const note = pluckScale[(stepIndex * 3) % pluckScale.length];
        osc.frequency.setValueAtTime(note, now);
        gain.gain.setValueAtTime(0.12 * currentStems.instruments.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    }

    if (isStemActive("vocals")) {
      const vocalActiveSteps = [0, 2, 3, 5, 8, 10, 11, 13, 14];
      if (vocalActiveSteps.includes(stepIndex % 16) && currentTime > 4) {
        vocalEnergyRef.current = 0.85 + Math.random() * 0.15;
      } else {
        vocalEnergyRef.current *= 0.45;
      }
    } else {
      vocalEnergyRef.current = 0;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const sixteenthNoteMs = (60 / selectedGenre.bpm / 4) * 1000;
      schedulerTimerRef.current = setInterval(() => {
        stepCounterRef.current += 1;
        triggerSynthesizedStep(audioCtxRef.current, stepCounterRef.current, selectedGenre.id, stems);
        setCurrentTime((prev) => (prev + sixteenthNoteMs / 1000 >= totalDuration ? 0 : prev + sixteenthNoteMs / 1000));
      }, sixteenthNoteMs);
    } else {
      clearInterval(schedulerTimerRef.current);
      vocalEnergyRef.current = 0;
    }
    return () => clearInterval(schedulerTimerRef.current);
  }, [isPlaying, selectedGenre, stems]);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const renderLoop = (timestamp) => {
      const w = canvas.width;
      const h = canvas.height;
      beatPulseRef.current *= 0.9;
      const pulse = beatPulseRef.current;

      const activeScene = scenes.find((s) => currentTime >= s.startSec && currentTime < s.endSec) || scenes[0];
      const locPreset = LOCATION_PRESETS.find((l) => l.id === activeScene.location) || LOCATION_PRESETS[0];
      const activeChar = characters.find((c) => c.id === activeScene.characterId) || characters[0];

      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, locPreset.sky[0]);
      grad.addColorStop(1, locPreset.sky[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const sunRadius = 45 + pulse * 22;
      const sunGrad = ctx.createRadialGradient(w * 0.75, h * 0.28, 5, w * 0.75, h * 0.28, sunRadius * 2.2);
      sunGrad.addColorStop(0, "rgba(245, 183, 0, 0.95)");
      sunGrad.addColorStop(0.5, "rgba(109, 40, 217, 0.45)");
      sunGrad.addColorStop(1, "rgba(9, 7, 15, 0)");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.28, sunRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(9, 7, 15, 0.8)";
      ctx.fillRect(0, h * 0.74, w, h * 0.26);

      const danceBounce = isPlaying ? Math.sin(timestamp * 0.012) * (6 + pulse * 8) : 0;
      const charX = w * 0.5;
      const charY = h * 0.56 + danceBounce;

      ctx.strokeStyle = activeChar.avatarColor;
      ctx.lineWidth = 3 + pulse * 3;
      ctx.beginPath();
      ctx.arc(charX, charY - 26, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = activeChar.avatarColor;
      ctx.fillRect(charX - 38, charY + 8, 76, 65);

      ctx.fillStyle = "#3B2219";
      ctx.beginPath();
      ctx.arc(charX, charY - 26, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F5B700";
      ctx.fillRect(charX - 18, charY - 34, 14, 7);
      ctx.fillRect(charX + 4, charY - 34, 14, 7);

      const mouthOpen = isPlaying && activeScene.lipSync ? 2 + vocalEnergyRef.current * 14 : 2;
      ctx.fillStyle = "#F43F5E";
      ctx.beginPath();
      ctx.ellipse(charX, charY - 14, 8 + vocalEnergyRef.current * 4, mouthOpen, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (karaokeCaptions) {
        ctx.fillStyle = "rgba(9, 7, 15, 0.78)";
        ctx.fillRect(w * 0.05, h * 0.81, w * 0.9, 36);
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#F5B700";
        ctx.textAlign = "center";
        ctx.fillText(activeScene.lyricLine || selectedLanguage.sampleLine, w / 2, h * 0.81 + 22);
      }

      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(10, 10, 275, 24);
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "#F5B700";
      ctx.textAlign = "left";
      ctx.fillText(`OWNER: MARTINDHANDA • ${activeScene.section} • ${resolution}`, 16, 26);

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [currentTime, isPlaying, scenes, characters, karaokeCaptions, resolution, selectedLanguage]);

  const handleGeneratePipeline = () => {
    setIsGenerating(true);
    setRenderProgress(0);
    const stages = [
      "[OWNER PRIORITY QUEUE] Allocating dedicated H100 nodes for Martindhanda...",
      `Synthesizing 48kHz/24-bit ${selectedGenre.id} stems & log-drum groove...`,
      `Locking storyboard cuts to ${selectedGenre.bpm} BPM downbeat grid...`,
      "Rendering persistent character frames with PuLID Face-Lock...",
      "Signing C2PA provenance manifest (Owner: Martindhanda)..."
    ];
    let step = 0;
    setRenderStageText(stages[0]);
    const interval = setInterval(() => {
      step += 1;
      setRenderProgress(Math.min(100, step * 25));
      if (step < stages.length) {
        setRenderStageText(stages[step]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setActiveStep(3);
          setIsPlaying(true);
          logAdminAction(`Rendered 8K Dolby Atmos Master for "${selectedGenre.id}".`);
        }, 300);
      }
    }, 450);
  };

  const handleToggleStem = (stemKey, field) => {
    setStems((prev) => ({
      ...prev,
      [stemKey]: { ...prev[stemKey], [field]: !prev[stemKey][field] }
    }));
  };

  const handleCreateVerifiedCharacter = (e) => {
    e.preventDefault();
    if (!newCharName.trim()) return;
    if (!ownerGodMode && (!consentChecked || !recordedConsentPhrase)) return;
    const newChar = {
      id: `char-${Date.now()}`,
      name: newCharName.trim(),
      role: ownerGodMode ? "Owner-Approved Performer" : "Verified Self-Avatar",
      wardrobe: "Custom Afro-Futurist Gold Jacket",
      avatarColor: "#38BDF8",
      verified: true
    };
    setCharacters([...characters, newChar]);
    logAdminAction(`Created persistent character "${newChar.name}" with Face-Lock.`);
    setNewCharName("");
    setConsentChecked(false);
    setRecordedConsentPhrase(false);
    setShowConsentModal(false);
  };

  const handleAddCustomGenre = (e) => {
    e.preventDefault();
    if (!newGenreName.trim()) return;
    const added = {
      id: newGenreName.trim(),
      bpm: Number(newGenreBpm) || 120,
      key: newGenreKey || "C Minor",
      desc: newGenreDesc || "Custom Martindhanda Super-Admin Genre Preset"
    };
    setGenres([added, ...genres]);
    setSelectedGenre(added);
    logAdminAction(`Injected new cultural genre "${added.id}" (${added.bpm} BPM).`);
    setNewGenreName("");
    setNewGenreDesc("");
  };

  const formatPrice = (usdPrice) => {
    const curr = CURRENCY_RATES[currency];
    const converted = (usdPrice * curr.rate).toFixed(currency === "USD" ? 2 : 0);
    return `${curr.symbol}${converted}`;
  };

  const triggerMobileMoneyCheckout = () => {
    if (paymentMethod === "ECOCASH") {
      setPaymentStatusMsg(
        `USSD Push sent to ${mobilePhone} via Paynow EcoCash. Enter your EcoCash PIN on your handset to activate your ${selectedPlan} Plan.`
      );
    } else if (paymentMethod === "MPESA") {
      setPaymentStatusMsg(
        `M-Pesa STK Push sent to ${mobilePhone}. Enter your M-Pesa PIN to complete ${selectedPlan} activation.`
      );
    } else {
      setPaymentStatusMsg(
        `Stripe 3DS Checkout initialized for ${selectedPlan} Plan.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#09070F] text-gray-100 font-sans">
      {/* MARTINDHANDA SUPER ADMIN BAR */}
      <div className="bg-gradient-to-r from-[#2E1065] via-[#1E1B4B] to-[#422006] border-b border-[#F5B700]/40 px-4 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5B700] text-black font-black uppercase text-[11px]">
            <Crown className="w-3.5 h-3.5" />
            SUPER ADMIN & OWNER: {currentUser.username}
          </span>
          <span className="text-gray-300 hidden md:inline">
            Permissions: <strong className="text-emerald-400">ROOT_ALL (Full Edit & Override Rights)</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOwnerGodMode(!ownerGodMode)}
            className="px-2.5 py-1 rounded-md font-bold text-[11px] bg-emerald-950/90 text-emerald-300 border border-emerald-500/60"
          >
            {ownerGodMode ? "⚡ Owner Bypass: ACTIVE (Zero Limits)" : "Standard User Mode"}
          </button>
          <button
            onClick={() => setActiveStep(5)}
            className="px-3 py-1 rounded-md bg-[#F5B700] text-black font-extrabold text-[11px] flex items-center gap-1"
          >
            <Terminal className="w-3 h-3" />
            Owner Command Center
          </button>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b border-purple-900/40 bg-[#0D0A18]/90 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5B700] to-[#6D28D9] flex items-center justify-center font-black text-black text-xl">
            T
          </div>
          <div>
            <span className="font-black text-xl text-white">TAMBAI</span>
            <span className="ml-2 text-[11px] font-bold uppercase text-[#F5B700] bg-[#F5B700]/10 px-2.5 py-0.5 rounded-full border border-[#F5B700]/30">
              Speak it. Hear it. See it.
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-purple-900/50">
          {[
            { id: 1, label: "1. Create & Song", icon: Music },
            { id: 2, label: "2. Storyboard", icon: Layers },
            { id: 3, label: "3. Timeline", icon: Video },
            { id: 4, label: "4. 8K Export", icon: Download },
            { id: 5, label: "5. Owner Admin (Martindhanda)", icon: Crown }
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeStep === s.id
                    ? "bg-[#F5B700] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold ${
            isPlaying ? "bg-rose-600 text-white" : "bg-[#6D28D9] text-white border border-[#F5B700]/40"
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "Pause Groove" : "Play Live Synth"}</span>
        </button>
      </header>

      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#130E26] border border-[#F5B700] rounded-2xl p-6 space-y-4 text-center">
            <RefreshCw className="w-8 h-8 text-[#F5B700] animate-spin mx-auto" />
            <h3 className="text-lg font-extrabold text-white">Executing Owner Priority Render...</h3>
            <p className="text-xs text-[#F5B700] font-mono">{renderStageText}</p>
            <div className="w-full h-2.5 bg-black rounded-full overflow-hidden">
              <div class
