"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["frontend", "React", "Next.js", "Creative Code", "UI Design"];

const TYPING_SPEED = 150;
const DELETING_SPEED = 50;
const PAUSE_AFTER_WORD = 2000;
const PAUSE_BEFORE_WORD = 500;
const INITIAL_DELAY = 1000;

export default function Typewriter() {
  const [text, setText] = useState(WORDS[0]);
  const progress = useRef({ wordIndex: 0, charIndex: WORDS[0].length, deleting: true });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const state = progress.current;
      const word = WORDS[state.wordIndex];

      state.charIndex += state.deleting ? -1 : 1;
      setText(word.slice(0, state.charIndex));

      let delay = state.deleting ? DELETING_SPEED : TYPING_SPEED;

      if (!state.deleting && state.charIndex === word.length) {
        state.deleting = true;
        delay = PAUSE_AFTER_WORD;
      } else if (state.deleting && state.charIndex === 0) {
        state.deleting = false;
        state.wordIndex = (state.wordIndex + 1) % WORDS.length;
        delay = PAUSE_BEFORE_WORD;
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, INITIAL_DELAY);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span className="typing-container">
      <span>{text}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
