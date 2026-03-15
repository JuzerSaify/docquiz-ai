"use client";

import { useState } from "react";

interface KeyConcept {
  term: string;
  definition: string;
  importance?: string;
}

interface Connection {
  concept_a: string;
  concept_b: string;
  relationship: string;
}

interface StudyGuideContent {
  summary: string;
  key_concepts: KeyConcept[];
  important_points?: string[];
  review_questions: string[];
  connections?: Connection[];
}

interface Quiz {
  id: string;
  content: StudyGuideContent;
}

interface StudyGuideViewProps {
  quiz: Quiz;
}

export default function StudyGuideView({ quiz }: StudyGuideViewProps) {
  const { summary, key_concepts, important_points, review_questions, connections } = quiz.content;
  const [expandedConcepts, setExpandedConcepts] = useState<Set<number>>(new Set());
  const [revealedQuestions, setRevealedQuestions] = useState<Set<number>>(new Set());

  function toggleConcept(index: number) {
    setExpandedConcepts((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div
        className="bg-white rounded-xl border border-[#E5E5E5] p-5 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">Summary</h2>
        </div>
        <p className="text-[#737373] leading-relaxed whitespace-pre-line text-sm">{summary}</p>
      </div>

      {/* Key Concepts */}
      <div
        className="bg-white rounded-xl border border-[#E5E5E5] p-5 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">Key Concepts</h2>
          <span className="text-xs text-[#A3A3A3] ml-auto">{key_concepts.length} concepts</span>
        </div>
        <div className="space-y-3">
          {key_concepts.map((concept, index) => (
            <div
              key={index}
              className="border border-[#E5E5E5] rounded-lg overflow-hidden transition-colors hover:border-[#0A0A0A]"
            >
              <button
                onClick={() => toggleConcept(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#E5E5E5] text-[#0A0A0A] flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <h3 className="font-medium text-[#0A0A0A] text-sm">{concept.term}</h3>
                </div>
                <svg
                  className={`w-4 h-4 text-[#A3A3A3] transition-transform duration-200 ${
                    expandedConcepts.has(index) ? "rotate-180" : ""
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedConcepts.has(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-4 pl-5 sm:pl-16">
                  <p className="text-[#737373] text-sm leading-relaxed">{concept.definition}</p>
                  {concept.importance && (
                    <p className="text-[#0A0A0A] text-xs mt-2 font-medium">
                      Why it matters: {concept.importance}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Points */}
      {important_points && important_points.length > 0 && (
        <div
          className="bg-[#F5F5F5] rounded-xl border border-[#E5E5E5] p-5 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">Must Remember</h2>
          </div>
          <ul className="space-y-3">
            {important_points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#0A0A0A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#737373] text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Connections */}
      {connections && connections.length > 0 && (
        <div
          className="bg-white rounded-xl border border-[#E5E5E5] p-5 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">Concept Connections</h2>
          </div>
          <div className="space-y-4">
            {connections.map((conn, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#F5F5F5] rounded-lg">
                <span className="border border-[#E5E5E5] bg-white text-[#0A0A0A] px-3 py-1.5 rounded-lg text-sm font-medium text-center">
                  {conn.concept_a}
                </span>
                <div className="hidden sm:block flex-1 border-t border-dashed border-[#E5E5E5] relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5F5F5] px-2 text-xs text-[#A3A3A3]">
                    {conn.relationship}
                  </span>
                </div>
                <span className="sm:hidden text-xs text-[#A3A3A3] py-1">{conn.relationship}</span>
                <span className="border border-[#E5E5E5] bg-white text-[#0A0A0A] px-3 py-1.5 rounded-lg text-sm font-medium text-center">
                  {conn.concept_b}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Questions */}
      <div
        className="bg-white rounded-xl border border-[#E5E5E5] p-5 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">Review Questions</h2>
          <span className="text-xs text-[#A3A3A3] ml-auto">Click to mark reviewed</span>
        </div>
        <div className="space-y-3">
          {review_questions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setRevealedQuestions((prev) => {
                  const next = new Set(prev);
                  if (next.has(index)) next.delete(index);
                  else next.add(index);
                  return next;
                });
              }}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                revealedQuestions.has(index)
                  ? "border-[#0A0A0A] bg-[#F5F5F5]"
                  : "border-[#E5E5E5] hover:border-[#0A0A0A]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border transition-colors ${
                  revealedQuestions.has(index)
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-[#E5E5E5] text-[#737373]"
                }`}>
                  {revealedQuestions.has(index) ? "✓" : index + 1}
                </span>
                <span className="text-[#737373] text-sm leading-relaxed">{question}</span>
              </div>
            </button>
          ))}
        </div>
        {revealedQuestions.size === review_questions.length && review_questions.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-[#0A0A0A] text-sm font-medium">
              All questions reviewed! Consider writing out your answers for deeper retention.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
