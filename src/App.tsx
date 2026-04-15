import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Sparkles, Zap, Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { questions, results } from './data';

const GITHUB_URL = "https://github.com/Barrsum/SHAP-Assessment";
const LINKEDIN_URL = "https://www.linkedin.com/in/ram-bapat-barrsum-diamos";

type GameState = 'intro' | 'quiz' | 'analyzing' | 'result';

const FAKE_LOGS = [
  "Initializing quantum nonsense...",
  "Calibrating potato sensors...",
  "Bypassing logic circuits...",
  "Consulting the magic conch...",
  "Dividing by zero...",
  "Translating screams into data...",
  "Measuring existential dread...",
  "Synthesizing absurdities...",
  "Finalizing arbitrary judgments..."
];

// Neo-Brutalist colors for options
const OPTION_COLORS = [
  'hover:bg-[#FFD800]', // Yellow
  'hover:bg-[#FF90E8]', // Pink
  'hover:bg-[#00E5FF]', // Cyan
  'hover:bg-[#00FF66]', // Lime
];

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [finalResult, setFinalResult] = useState("");
  
  // Analyzing state
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(FAKE_LOGS[0]);

  // Initialize questions
  const initializeQuiz = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
    setCurrentQIndex(0);
    setGameState('quiz');
  };

  const handleAnswer = () => {
    if (currentQIndex < 4) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setGameState('analyzing');
    setProgress(0);
    
    // Pick a random result
    const randomResult = results[Math.floor(Math.random() * results.length)];
    setFinalResult(randomResult);

    // Fake loading sequence
    let currentProgress = 0;
    let logIndex = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setGameState('result'), 500);
      }
      setProgress(currentProgress);
      
      if (Math.random() > 0.5 && logIndex < FAKE_LOGS.length - 1) {
        logIndex++;
        setCurrentLog(FAKE_LOGS[logIndex]);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#FF90E8] selection:text-black">
      {/* Neo-Brutalist Dotted Background */}
      <div className="bg-dots"></div>

      {/* Header */}
      <header className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 border-b-[3px] border-black bg-[#FFD800]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white rounded-lg neo-shadow-sm">
            <Brain size={24} />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-black uppercase">S.H.A.P. | Made By Ram Bapat</h1>
            <span className="text-[10px] font-bold tracking-widest text-black/70 uppercase">100% Accurate*</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 bg-white neo-border rounded-full hover:bg-[#FF90E8] hover:-translate-y-1 transition-all neo-shadow-sm"><Github size={20} /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="p-2 bg-white neo-border rounded-full hover:bg-[#00E5FF] hover:-translate-y-1 transition-all neo-shadow-sm"><Linkedin size={20} /></a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10 w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* INTRO SCREEN */}
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full neo-panel p-8 sm:p-12 text-center flex flex-col items-center bg-white relative overflow-hidden"
            >
              {/* Decorative elements */}
              <Sparkles className="absolute top-6 right-6 text-[#FF90E8]" size={32} />
              <Zap className="absolute bottom-6 left-6 text-[#00E5FF]" size={32} />

              <div className="w-24 h-24 bg-[#FFD800] neo-border rounded-full flex items-center justify-center mb-8 neo-shadow-sm rotate-[-10deg]">
                <Brain size={48} className="text-black" />
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4 uppercase leading-tight">
                Discover Your <br/><span className="text-[#FF2A85]">True Self</span>
              </h2>
              <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4 uppercase leading-tight">
                - By Ram<span className="text-[#FF2A85]"> Bapat -</span>
              </h2>
              <p className="text-gray-700 font-medium mb-8 max-w-md mx-auto text-lg">
                The most scientifically inaccurate personality test on the internet. Results may cause mild confusion.
              </p>
              
              <button
                onClick={initializeQuiz}
                className="neo-btn bg-[#00FF66] text-black px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-3 group"
              >
                Start Assessment
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {gameState === 'quiz' && selectedQuestions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6 font-display font-bold text-lg bg-white neo-border px-4 py-2 rounded-xl neo-shadow-sm inline-flex">
                <span>Question {currentQIndex + 1}/5</span>
              </div>
              
              <div className="neo-panel p-6 sm:p-10 mb-6 bg-[#fdfbf7]">
                <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-8">
                  {selectedQuestions[currentQIndex].text}
                </h3>
                
                <div className="flex flex-col gap-4">
                  {selectedQuestions[currentQIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={handleAnswer}
                      className={`w-full text-left p-5 neo-border rounded-xl bg-white font-bold text-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none neo-shadow-sm ${OPTION_COLORS[idx % OPTION_COLORS.length]} group flex items-center justify-between`}
                    >
                      <span className="group-hover:scale-[1.02] transition-transform">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-6 bg-white neo-border rounded-full overflow-hidden p-1">
                <motion.div 
                  className="h-full bg-[#FF2A85] rounded-full border-r-2 border-black"
                  initial={{ width: `${(currentQIndex / 5) * 100}%` }}
                  animate={{ width: `${((currentQIndex + 1) / 5) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </div>
            </motion.div>
          )}

          {/* ANALYZING SCREEN */}
          {gameState === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full neo-panel p-12 flex flex-col items-center justify-center min-h-[400px] bg-[#00E5FF]"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-24 h-24 bg-white neo-border rounded-full flex items-center justify-center mb-8 neo-shadow-sm"
              >
                <Zap size={40} className="text-black" />
              </motion.div>
              
              <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-wide bg-white px-4 py-2 neo-border rounded-lg rotate-2">
                Analyzing...
              </h2>
              
              <div className="w-full max-w-md bg-white neo-border p-4 rounded-xl neo-shadow-sm">
                <div className="flex justify-between font-bold text-sm mb-3">
                  <span className="truncate mr-4">{currentLog}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 neo-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFD800] border-r-2 border-black transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full neo-panel p-8 sm:p-12 text-center relative overflow-hidden bg-[#FFD800]"
            >
              <div className="inline-block bg-white neo-border px-4 py-2 rounded-xl font-bold uppercase tracking-widest mb-8 rotate-[-3deg] neo-shadow-sm">
                Official Diagnosis
              </div>
              
              <div className="bg-white neo-border p-8 rounded-2xl mb-10 neo-shadow-sm">
                <motion.h3 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="text-3xl sm:text-5xl font-display font-bold leading-tight"
                >
                  {finalResult}
                </motion.h3>
              </div>

              <button
                onClick={() => setGameState('intro')}
                className="neo-btn bg-[#FF90E8] text-black px-8 py-4 text-lg flex items-center justify-center gap-3 mx-auto hover:bg-[#FF70E0]"
              >
                <RotateCcw size={20} />
                Take It Again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 sm:p-8 z-10 mt-auto border-t-[3px] border-black bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-display font-bold text-black mb-2 tracking-widest uppercase">System Info</h3>
            <p className="text-gray-600 font-medium text-xs max-w-sm leading-relaxed">
              S.H.A.P. Protocol v2.0. Built with React, Framer Motion, and Tailwind CSS. Part of the April Vibe Coding Challenge.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href={GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#f4f0ea] neo-border rounded-lg font-bold text-xs hover:bg-[#00E5FF] transition-colors uppercase tracking-wider neo-shadow-sm"
            >
              GitHub
            </a>
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#f4f0ea] neo-border rounded-lg font-bold text-xs hover:bg-[#00FF66] transition-colors uppercase tracking-wider neo-shadow-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          © 2026 S.H.A.P. • Made by Ram Bapat
        </div>
      </footer>
    </div>
  );
}
