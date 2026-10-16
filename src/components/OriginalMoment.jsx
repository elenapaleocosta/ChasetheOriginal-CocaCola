import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Sparkles, 
  Heart, 
  Flame, 
  MessageCircle, 
  Share2, 
  Plus, 
  CheckCircle2, 
  Music, 
  MapPin, 
  Upload, 
  X,
  AlertCircle
} from 'lucide-react';
import { playTap, playSuccess } from '../utils/audio';

const INITIAL_MOMENTS = [
  {
    id: 'moment-1',
    user: 'nikos_stage26',
    userTag: 'VIP Hunter',
    avatar: 'N',
    event: 'Κ. Αργυρός Live – OAKA Arena',
    time: 'Πριν 24 λεπτά',
    caption: 'Η απόλυτη ενέργεια στη σκηνή με παγωμένη Coca-Cola Original Taste στο χέρι! 🎶🔥',
    image: '/Pics/event1.jpeg',
    likes: 284,
    isLiked: false,
    verified: true,
    points: 150,
  },
  {
    id: 'moment-2',
    user: 'elena_coke',
    userTag: 'Level 3 Fan',
    avatar: 'E',
    event: 'Release Athens Festival',
    time: 'Πριν 1 ώρα',
    caption: 'Soundcheck vibes πριν το μεγάλο live! Πάντα με αυθεντική Coca-Cola Original Taste.',
    image: '/Pics/event2.jpeg',
    likes: 195,
    isLiked: true,
    verified: true,
    points: 150,
  },
  {
    id: 'moment-3',
    user: 'dimitris_rock',
    userTag: 'Hunter',
    avatar: 'D',
    event: 'Mad Video Music Awards 2026',
    time: 'Πριν 3 ώρες',
    caption: 'Chase the Original moment backstage! Ασύλληπτη εμπειρία και παγωμένη Coca-Cola!',
    image: '/Pics/event3.jpeg',
    likes: 312,
    isLiked: false,
    verified: true,
    points: 150,
  },
];

const MUSIC_EVENTS = [
  'Κ. Αργυρός Tour 2026 - OAKA Arena',
  'Release Athens Stage',
  'Mad Video Music Awards 2026',
  'WaterBoom Festival',
  'Panik Live Concert',
  'Street Sound Stage (Athens)',
];

export default function OriginalMoment({ onAwardPoints, userLevel = 1 }) {
  const [moments, setMoments] = useState(INITIAL_MOMENTS);
  const [filter, setFilter] = useState('all'); // 'all' | 'mine'
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(MUSIC_EVENTS[0]);
  const [caption, setCaption] = useState('');
  const [hasCanTag, setHasCanTag] = useState(true);
  const [formError, setFormError] = useState('');
  const [successCelebration, setSuccessCelebration] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection and read as Data URL
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Παρακαλώ επιλέξτε αρχείο εικόνας (JPG, PNG, WebP).');
        return;
      }
      setSelectedFile(file);
      setFormError('');
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleLike = (id) => {
    playTap();
    setMoments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.isLiked;
          return {
            ...item,
            isLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleOpenUpload = () => {
    playTap();
    setIsUploadOpen(true);
    setFormError('');
  };

  const handleCloseUpload = () => {
    setIsUploadOpen(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setCaption('');
    setFormError('');
  };

  const handleSubmitMoment = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      setFormError('Παρακαλώ επιλέξτε ή τραβήξτε μια φωτογραφία από το music event.');
      return;
    }
    if (!caption.trim()) {
      setFormError('Γράψε μια σύντομη περιγραφή για τη στιγμή σου.');
      return;
    }

    const awardedPoints = 150;
    const newMoment = {
      id: `user-moment-${Date.now()}`,
      user: 'you_original',
      userTag: `Level ${userLevel} Hunter`,
      avatar: '★',
      event: selectedEvent,
      time: 'Μόλις τώρα',
      caption: caption.trim(),
      image: previewUrl,
      likes: 1,
      isLiked: true,
      verified: true,
      points: awardedPoints,
      isMine: true,
    };

    setMoments((prev) => [newMoment, ...prev]);

    if (onAwardPoints) {
      onAwardPoints({
        type: 'moment',
        points: awardedPoints,
        title: `Original Moment: ${selectedEvent}`,
      });
    }

    playSuccess();
    setSuccessCelebration({
      points: awardedPoints,
      event: selectedEvent,
      image: previewUrl,
    });

    handleCloseUpload();
  };

  const filteredMoments = filter === 'mine' 
    ? moments.filter((m) => m.isMine) 
    : moments;

  return (
    <div className="w-full space-y-4">
      {/* Top Banner Challenge Box */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#1E1E24] via-[#141414] to-[#0E0E0E] border border-zinc-800 p-5 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#F40009]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F40009]/15 border border-[#F40009]/30 text-[10px] font-mono font-extrabold text-[#F40009] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Post the Original Moment
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-emerald-400">
              +150 PTS / POST
            </span>
          </div>

          <div>
            <h2 className="text-lg font-black text-white tracking-tight uppercase font-display">
              Μοιράσου τη συναυλιακή σου στιγμή
            </h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Βρίσκεσαι σε live concert ή music stage; Ανέβασε τη φωτογραφία σου με <strong>Coca-Cola Original Taste</strong> και κέρδισε άμεσα <strong>+150 πόντους</strong>!
            </p>
          </div>

          <button
            onClick={handleOpenUpload}
            className="w-full py-3 rounded-xl bg-[#F40009] hover:bg-[#d60008] text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(244,0,9,0.35)] flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <Camera className="w-4 h-4" />
            Ανεβασε Original Moment (+150 PTS)
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          <button
            onClick={() => { playTap(); setFilter('all'); }}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#F40009] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Live Feed ({moments.length})
          </button>
          <button
            onClick={() => { playTap(); setFilter('mine'); }}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              filter === 'mine'
                ? 'bg-[#F40009] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Δικά μου ({moments.filter((m) => m.isMine).length})
          </button>
        </div>

        <button
          onClick={handleOpenUpload}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#F40009] transition-colors"
          title="Νέα φωτογραφία"
        >
          <Plus className="w-4 h-4 text-[#F40009]" />
        </button>
      </div>

      {/* Moments Feed List */}
      <div className="space-y-4">
        {filteredMoments.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-2">
            <Camera className="w-8 h-8 text-zinc-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">Δεν έχεις ανεβάσει ακόμα κάποιο Moment</h4>
            <p className="text-xs text-zinc-400">
              Πάτα το κουμπί παραπάνω, ανέβασε τη φωτογραφία σου από συναυλία και κέρδισε +150 PTS!
            </p>
          </div>
        ) : (
          filteredMoments.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#141414] border border-zinc-800/90 overflow-hidden shadow-lg space-y-3"
            >
              {/* Post Header */}
              <div className="p-3.5 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F40009] to-zinc-900 border border-[#F40009]/40 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="text-xs font-bold text-white font-mono">@{item.user}</span>
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F40009]" />
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">
                      {item.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                  <Music className="w-3 h-3 text-[#F40009]" />
                  <span className="truncate max-w-[150px]">{item.event}</span>
                </div>
              </div>

              {/* Photo Display */}
              <div className="relative w-full h-64 sm:h-72 bg-black flex items-center justify-center overflow-hidden border-y border-zinc-900">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover filter contrast-105"
                />

                {/* Verification Overlay Badge */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-800 text-[9px] font-mono font-bold text-white flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#F40009] animate-pulse" />
                  <span>ORIGINAL TASTE MOMENT</span>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#F40009] text-white text-[9px] font-mono font-extrabold tracking-wider uppercase shadow-md">
                  +{item.points} PTS
                </div>
              </div>

              {/* Post Footer & Engagement */}
              <div className="p-3.5 pt-0 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleLike(item.id)}
                      className={`flex items-center gap-1.5 font-mono font-bold transition-transform active:scale-125 ${
                        item.isLiked ? 'text-[#F40009]' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${item.isLiked ? 'fill-[#F40009]' : ''}`} />
                      <span>{item.likes}</span>
                    </button>

                    <div className="flex items-center gap-1 text-zinc-400 font-mono">
                      <MessageCircle className="w-4 h-4" />
                      <span>18</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500">
                    #ChaseTheOriginal
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal Drawer */}
      {isUploadOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleCloseUpload}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-3xl p-5 text-white shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#F40009]" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Post Original Moment
                </h3>
              </div>
              <button 
                onClick={handleCloseUpload}
                className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            {/* Image Upload / Preview Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-48 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-[#F40009] bg-black/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors group"
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono font-bold text-white">
                    Πάτα για αλλαγή
                  </div>
                </>
              ) : (
                <div className="text-center p-4 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-[#F40009]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white block">
                    Επίλεξε ή τράβηξε φωτογραφία
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    (Συναυλία / Live event με Coca-Cola Original)
                  </span>
                </div>
              )}
            </div>

            {/* Select Music Event */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase block">
                Music Event / Συναυλια:
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F40009]"
              >
                {MUSIC_EVENTS.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            {/* Caption Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase block">
                Περιγραφη Στιγμης:
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="π.χ. Απίστευτη συναυλία με παγωμένη Coca-Cola Original Taste! 🔴🎶"
                rows={3}
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F40009] resize-none"
              />
            </div>

            {/* Verification Checkbox */}
            <div 
              onClick={() => setHasCanTag(!hasCanTag)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 cursor-pointer"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                hasCanTag ? 'bg-[#F40009] border-[#F40009]' : 'border-zinc-700'
              }`}>
                {hasCanTag && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className="text-[11px] text-zinc-300">
                Επιβεβαιώνω ότι εμφανίζεται κουτάκι <strong>Coca-Cola Original Taste</strong> (+150 PTS)
              </span>
            </div>

            {/* Form Error */}
            {formError && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-[#F40009] shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              onClick={handleSubmitMoment}
              className="w-full py-3.5 rounded-xl bg-[#F40009] hover:bg-[#d60008] text-white font-mono font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(244,0,9,0.35)]"
            >
              Κοινοποιηση & Ληψη +150 PTS
            </button>
          </div>
        </div>
      )}

      {/* Success Celebration Toast / Modal */}
      {successCelebration && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSuccessCelebration(null)}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-3xl p-6 text-white text-center shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#F40009]/15 border border-[#F40009]/40 flex items-center justify-center mx-auto text-[#F40009] shadow-[0_0_20px_rgba(244,0,9,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                ORIGINAL MOMENT VERIFIED
              </span>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-white">
                +{successCelebration.points} PTS!
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                {successCelebration.event}
              </p>
            </div>

            {successCelebration.image && (
              <div className="w-full h-36 rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <img
                  src={successCelebration.image}
                  alt="Claimed"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <button
              onClick={() => setSuccessCelebration(null)}
              className="w-full py-3 rounded-xl bg-[#F40009] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d60008] transition-colors"
            >
              Συνεχεια
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
