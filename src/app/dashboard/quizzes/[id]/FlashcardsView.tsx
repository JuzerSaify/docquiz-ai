"use client";

import { useState, useEffect, useCallback } from "react";

interface Flashcard {
  front: string;
  back: string;
  hint: string;
  category?: string;
}

interface FlashcardsContent {
  flashcards: Flashcard[];
}

interface Quiz {
  id: string;
  content: FlashcardsContent;
}

interface FlashcardsViewProps {
  quiz: Quiz;
}

export default function FlashcardsView({ quiz }: FlashcardsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const cards = quiz.content.flashcards;
  const card = cards[currentIndex];

  const nextCard = useCallback(() => {
    if (currentIndex < cards.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setFlipped(false);
      setShowHint(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 200);
    }
  }, [currentIndex, cards.length, isAnimating]);

  const prevCard = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setFlipped(false);
      setShowHint(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsAnimating(false);
      }, 200);
    }
  }, [currentIndex, isAnimating]);

  const toggleFlip = useCallback(() => {
    if (!isAnimating) setFlipped((f) => !f);
  }, [isAnimating]);

  function toggleMastered() {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "d") nextCard();
      else if (e.key === "ArrowLeft" || e.key === "a") prevCard();
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleFlip(); }
      else if (e.key === "h") setShowHint(true);
      else if (e.key === "m") toggleMastered();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, toggleFlip]);

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#737373] mb-2">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span className="flex items-center gap-3">
            <span className="text-[#0A0A0A] font-medium">{mastered.size} mastered</span>
            <span>{Math.round(((currentIndex + 1) / cards.length) * 100)}%</span>
          </span>
        </div>
        <div className="w-full bg-[#F5F5F5] rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#0A0A0A] h-1.5 rounded-full progress-bar"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Category badge */}
      {card.category && (
        <div className="mb-3 flex justify-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-[#E5E5E5] text-[#737373]">
            {card.category}
          </span>
        </div>
      )}

      {/* 3D Flip Card */}
      <div
        onClick={toggleFlip}
        className="perspective-1000 cursor-pointer select-none"
        style={{ minHeight: 320 }}
      >
        <div
          className={`relative w-full preserve-3d transition-transform duration-500 ease-in-out ${
            flipped ? "rotate-y-180" : ""
          } ${isAnimating ? "opacity-60 scale-95" : "opacity-100 scale-100"}`}
          style={{ minHeight: 320, transition: "transform 0.5s ease, opacity 0.2s ease, scale 0.2s ease" }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-[#E5E5E5] p-8 flex flex-col items-center justify-center">
            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-4 font-medium">Question</p>
            <p className="text-xl text-center text-[#0A0A0A] font-medium leading-relaxed max-w-lg">
              {card.front}
            </p>
            <p className="text-xs text-[#A3A3A3] mt-6">Click or press Space to flip</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] p-8 flex flex-col items-center justify-center">
            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-4 font-medium">Answer</p>
            <p className="text-xl text-center text-[#0A0A0A] font-medium leading-relaxed max-w-lg">
              {card.back}
            </p>

            {/* Mark mastered button */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleMastered(); }}
              className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                mastered.has(currentIndex)
                  ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                  : "border-[#E5E5E5] text-[#737373] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
              }`}
            >
              <svg className="w-4 h-4" fill={mastered.has(currentIndex) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {mastered.has(currentIndex) ? "Mastered" : "Mark as Mastered"}
            </button>
          </div>
        </div>
      </div>

      {/* Hint */}
      {!flipped && (
        <div className="mt-4 text-center" style={{ animation: "fadeIn 0.3s ease" }}>
          {showHint ? (
            <p className="text-sm text-[#737373] italic bg-[#F5F5F5] inline-block px-4 py-2 rounded-full border border-[#E5E5E5]">
              Hint: {card.hint}
            </p>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-[#737373] hover:text-[#0A0A0A] hover:underline transition-colors"
            >
              Show hint (H)
            </button>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E5E5E5] text-[#0A0A0A] hover:bg-[#F5F5F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setFlipped(false);
                  setShowHint(false);
                  setTimeout(() => { setCurrentIndex(i); setIsAnimating(false); }, 150);
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? "bg-[#0A0A0A] scale-125"
                  : mastered.has(i)
                  ? "bg-[#0A0A0A] opacity-40"
                  : "bg-[#E5E5E5] hover:bg-[#A3A3A3]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E5E5E5] text-[#0A0A0A] hover:bg-[#F5F5F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard shortcuts legend */}
      <div className="mt-6 flex justify-center gap-4 text-xs text-[#A3A3A3]">
        <span>← → Navigate</span>
        <span>Space Flip</span>
        <span>H Hint</span>
        <span>M Master</span>
      </div>
    </div>
  );
}
