"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Question {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  topic?: string;
}

interface QuizContent {
  questions: Question[];
}

interface Quiz {
  id: string;
  content: QuizContent;
}

interface MultipleChoiceQuizProps {
  quiz: Quiz;
  userId: string;
}

export default function MultipleChoiceQuiz({ quiz, userId }: MultipleChoiceQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const supabase = createClient();

  const questions = quiz.content.questions;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }

  async function handleSubmit() {
    if (answeredCount < questions.length) return;

    setSaving(true);

    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_index) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);

    await supabase.from("quiz_attempts").insert({
      quiz_id: quiz.id,
      user_id: userId,
      score,
      answers: selectedAnswers,
    });

    setSaving(false);
    setSubmitted(true);

    // Animate score counter
    let current = 0;
    const step = Math.max(1, Math.floor(score / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setAnimatedScore(current);
    }, 30);
  }

  function resetQuiz() {
    setSelectedAnswers({});
    setSubmitted(false);
    setAnimatedScore(0);
  }

  const correctCount = submitted
    ? questions.filter((q, i) => selectedAnswers[i] === q.correct_index).length
    : 0;

  return (
    <div>
      {/* Progress bar (before submit) */}
      {!submitted && (
        <div className="mb-6 bg-white rounded-lg border border-[#E5E5E5] p-4">
          <div className="flex justify-between text-sm text-[#737373] mb-2">
            <span>{answeredCount} of {questions.length} answered</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#F5F5F5] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#0A0A0A] h-1.5 rounded-full progress-bar" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      )}

      {/* Score result */}
      {submitted && (
        <div className="rounded-xl p-8 mb-8 text-center bg-white border border-[#E5E5E5]">
          <div className="text-6xl font-semibold text-[#0A0A0A] mb-2">
            {animatedScore}%
          </div>
          <p className="text-[#737373] text-lg">
            {correctCount} of {questions.length} correct
          </p>
          <p className="text-[#A3A3A3] text-sm mt-1">
            {correctCount / questions.length >= 0.8
              ? "Excellent work! You\u2019ve mastered this material."
              : correctCount / questions.length >= 0.5
              ? "Good effort! Review the explanations below to improve."
              : "Keep studying! Review the explanations to strengthen your understanding."}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-4 bg-[#0A0A0A] text-white px-6 py-2.5 rounded-lg hover:bg-[#171717] transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isCorrect = submitted && selectedAnswers[qIndex] === q.correct_index;
          const isWrong = submitted && selectedAnswers[qIndex] !== undefined && selectedAnswers[qIndex] !== q.correct_index;

          return (
            <div
              key={qIndex}
              className={`bg-white rounded-xl border p-6 transition-colors ${
                submitted
                  ? isCorrect
                    ? "border-[#0A0A0A]"
                    : isWrong
                    ? "border-red-300"
                    : "border-[#E5E5E5]"
                  : "border-[#E5E5E5]"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                  submitted
                    ? isCorrect ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : isWrong ? "border-red-400 text-red-600" : "border-[#E5E5E5] text-[#A3A3A3]"
                    : selectedAnswers[qIndex] !== undefined ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-[#E5E5E5] text-[#737373]"
                }`}>
                  {submitted ? (isCorrect ? "✓" : isWrong ? "✗" : qIndex + 1) : qIndex + 1}
                </span>
                <div>
                  <p className="font-medium text-[#0A0A0A] leading-relaxed">{q.question}</p>
                  {q.topic && <span className="text-xs text-[#A3A3A3] mt-1 inline-block">{q.topic}</span>}
                </div>
              </div>

              <div className="space-y-2 ml-11">
                {q.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex;
                  const isCorrectOption = q.correct_index === oIndex;

                  let optionClass = "border-[#E5E5E5] hover:border-[#0A0A0A] hover:bg-[#F5F5F5]";

                  if (submitted) {
                    if (isCorrectOption) {
                      optionClass = "border-[#0A0A0A] bg-[#F5F5F5]";
                    } else if (isSelected && !isCorrectOption) {
                      optionClass = "border-red-300";
                    } else {
                      optionClass = "border-[#F5F5F5] opacity-50";
                    }
                  } else if (isSelected) {
                    optionClass = "border-[#0A0A0A] bg-[#F5F5F5]";
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => selectAnswer(qIndex, oIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-center gap-3 ${optionClass} disabled:cursor-default`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium transition-colors ${
                        submitted
                          ? isCorrectOption
                            ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                            : isSelected ? "border-red-400 text-red-500" : "border-[#E5E5E5] text-[#A3A3A3]"
                          : isSelected
                          ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                          : "border-[#E5E5E5] text-[#737373]"
                      }`}>
                        {submitted && isCorrectOption ? "✓" : submitted && isSelected && !isCorrectOption ? "✗" : String.fromCharCode(65 + oIndex)}
                      </span>
                      <span className={`text-sm ${submitted && !isCorrectOption && !isSelected ? "text-[#A3A3A3]" : "text-[#0A0A0A]"}`}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-4 ml-11 p-4 rounded-lg text-sm leading-relaxed border border-[#E5E5E5] bg-[#F5F5F5] text-[#737373]`}>
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length || saving}
            className="bg-[#0A0A0A] text-white px-10 py-3 rounded-lg hover:bg-[#171717] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              `Submit Answers (${answeredCount}/${questions.length})`
            )}
          </button>
          {answeredCount < questions.length && (
            <p className="text-sm text-[#A3A3A3] mt-3">
              {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? "s" : ""} remaining
            </p>
          )}
        </div>
      )}
    </div>
  );
}
