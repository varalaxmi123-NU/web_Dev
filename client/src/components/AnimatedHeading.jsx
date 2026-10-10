import React, { useState, useEffect } from 'react';

export default function AnimatedHeading({ text, className = '', style = {} }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // 30ms per char
  let globalCharCount = 0;

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em', ...style }}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');

        return (
          <div key={lineIndex} className="block">
            {words.map((word, wordIndex) => {
              const wordChars = word.split('');
              return (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {wordChars.map((char, charIndex) => {
                    const delay = 200 + globalCharCount * charDelay;
                    globalCharCount++;

                    return (
                      <span
                        key={charIndex}
                        className="inline-block transition-all duration-500 ease-out"
                        style={{
                          opacity: animated ? 1 : 0,
                          transform: animated ? 'translateX(0px)' : 'translateX(-18px)',
                          transitionDelay: `${delay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {wordIndex < words.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </div>
        );
      })}
    </h1>
  );
}
