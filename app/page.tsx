'use client';

import ChatSession from '@/components/ChatSession';
import { motion } from 'motion/react';
import { Quote, BookOpen, History, Flag } from 'lucide-react';

export default function Home() {
  const events = [
    { title: "Samsun'a Çıkış", date: "19 Mayıs 1919" },
    { title: "Amasya Genelgesi", date: "22 Haziran 1919" },
    { title: "Erzurum Kongresi", date: "23 Temmuz 1919" },
    { title: "Sivas Kongresi", date: "4 Eylül 1919" },
    { title: "TBMM'nin Açılışı", date: "23 Nisan 1920" },
    { title: "Büyük Taarruz", date: "26 Ağustos 1922" },
  ];

  return (
    <main className="min-h-screen p-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-3rem)]">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 scrollbar-hide overflow-y-auto">
          <div className="glass rounded-2xl p-8 flex flex-col gap-2">
            <h1 className="font-serif text-3xl font-bold text-gold leading-tight">İstiklal Yolu</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Gazi Mustafa Kemal ile Hasbihal</p>
          </div>

          <div className="glass rounded-2xl flex-1 p-6 flex flex-col gap-6 overflow-hidden">
            <div className="flex items-center gap-2 px-2">
              <History className="w-4 h-4 text-slate-400" />
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Milli Mücadele Dönemi</h2>
            </div>
            
            <nav className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {events.map((event, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer group ${
                    idx === 0 ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${idx === 0 ? 'bg-gold shadow-[0_0_8px_rgba(180,145,106,0.6)]' : 'bg-slate-700 group-hover:bg-slate-500'}`}></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors">{event.date}</span>
                    <span className={`text-sm font-medium ${idx === 0 ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>{event.title}</span>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="glass rounded-2xl p-5 border-l-4 border-l-red-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-950/30 flex items-center justify-center border border-red-900/50">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Vatan ve Hürriyet</span>
                <span className="text-xs font-bold text-slate-300 italic">"Egemenlik Kayıtsız Şartsız Milletindir."</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col gap-6">
          <ChatSession />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Misak-ı Milli</span>
              <span className="text-sm font-medium text-slate-400">Vatan bir bütündür, parçalanamaz.</span>
            </div>
            <div className="glass rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Tam Bağımsızlık</span>
              <span className="text-sm font-medium text-slate-400">Siyasi ve ekonomik hürriyet.</span>
            </div>
            <div className="glass rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Milli Menfaatler</span>
              <span className="text-sm font-medium text-slate-400">Başka devletlere taviz yok.</span>
            </div>
            <div className="glass rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Gazi Meclis</span>
              <span className="text-sm font-medium text-slate-400">Karar mercii Türk Milleti.</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
