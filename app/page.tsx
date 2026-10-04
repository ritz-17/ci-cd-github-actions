"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const wishes = [
  {
    language: "ENGLISH",
    message:
      "May your year be filled with laughter, love, and little moments that feel like magic.",
  },
  {
    language: "हिन्दी",
    message: "तुम्हारा हर दिन खुशियों, प्रेम और खूबसूरत पलों से भरा रहे।",
  },
  {
    language: "संस्कृतम्",
    message: "तव जीवनं सुखेन, प्रेम्णा, आनन्देन च परिपूर्णं भवतु।",
  },
];

const confettiColors = ["#ff4d4f", "#ff922b", "#ffd43b", "#51cf66", "#339af0", "#5c7cfa", "#845ef7"];

export default function Home() {
  const [name, setName] = useState("");
  const [birthdayName, setBirthdayName] = useState("");
  const [celebrationId, setCelebrationId] = useState(0);

  function updateName(value: string) {
    setName(value);
  }

  function celebrate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      setBirthdayName(trimmedName);
      setCelebrationId((currentId) => currentId + 1);
    }
  }

  return (
    <main className="birthday-page">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="A Little Wish home">
          <span className="wordmark-star" aria-hidden="true">✳</span>
          a little wish
        </a>
        <span className="topbar-note">MADE FOR YOUR FAVOURITE PERSON</span>
      </header>

      {birthdayName && (
        <div className="falling-confetti" key={`rain-${celebrationId}`} aria-hidden="true">
          {Array.from({ length: 208 }, (_, index) => (
            <span
              className="falling-piece"
              key={index}
              style={{
                "--fall-left": `${(index * 37 + 9) % 100}%`,
                "--fall-delay": `${(index % 7) * 0.055}s`,
                "--fall-duration": `${1.35 + (index % 5) * 0.1}s`,
                "--fall-drift": `${((index % 5) - 2) * 18}px`,
                "--fall-rotation": `${index % 2 === 0 ? 540 : -540}deg`,
                "--fall-color": confettiColors[index % confettiColors.length],
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      <section className="birthday-layout" id="home">
        <div className="intro-panel">
          <p className="eyebrow"><span /> THE DAY IS THEIRS</p>
          <h1>Make their<br /><em>day.</em></h1>
          <p className="intro-copy">
            A little name, a lot of love. Make someone feel wonderfully celebrated today.
          </p>

          <form className="name-form" onSubmit={celebrate}>
            <label htmlFor="birthday-name">WHO ARE WE CELEBRATING?</label>
            <div className="input-row">
              <input
                autoComplete="off"
                id="birthday-name"
                maxLength={40}
                onChange={(event) => updateName(event.target.value)}
                placeholder="Their name goes here"
                required
                value={name}
              />
              <button type="submit">Make a wish <span aria-hidden="true">↗</span></button>
            </div>
          </form>
          <p className="tiny-note">A small surprise, just for them <span aria-hidden="true">♥</span></p>
        </div>

        <article className="wish-card" aria-live="polite">
          <div className="photo-panel" role="img" aria-label="A birthday cake topped with candles">
            <span className="photo-tag">A DAY TO REMEMBER</span>
            <span className="photo-sparkle sparkle-one" aria-hidden="true">✳</span>
            <span className="photo-sparkle sparkle-two" aria-hidden="true">✦</span>
          </div>
          <div className="wish-content">
            <p className="card-kicker">{birthdayName ? "TODAY IS ALL YOURS" : "A NOTE FOR SOMEONE SPECIAL"}</p>
            <div className="name-stage">
              {birthdayName && (
                <div className="celebration-burst" key={`burst-${celebrationId}`} aria-hidden="true">
                  <span className="confetti confetti-one">✦</span>
                  <span className="confetti confetti-two">✳</span>
                  <span className="confetti confetti-three">♥</span>
                  <span className="confetti confetti-four">✦</span>
                  <span className="confetti confetti-five">✳</span>
                  <span className="confetti confetti-six">♥</span>
                  <span className="confetti confetti-seven">✦</span>
                  <span className="confetti confetti-eight">✳</span>
                  <span className="flare-core" />
                </div>
              )}
              <h2 className={birthdayName ? "birthday-name is-visible" : "birthday-name"} key={`name-${celebrationId}`}>
                {birthdayName || "Your person"}
                <span aria-hidden="true">{birthdayName ? "!" : "."}</span>
              </h2>
            </div>
            {birthdayName ? (
              <div className="wish-list">
                {wishes.map((wish) => (
                  <section className="wish-line" key={wish.language}>
                    <h3>{wish.language}</h3>
                    <p>{wish.message}</p>
                  </section>
                ))}
              </div>
            ) : (
              <p className="empty-message">Their birthday wish will bloom right here.</p>
            )}
            <div className="card-footer"><span>WITH LOVE, ALWAYS</span><span aria-hidden="true">✳</span></div>
          </div>
        </article>
      </section>

      <footer className="page-footer">
        <span>GOOD THINGS ARE WORTH CELEBRATING</span>
        <span>01 <i /> 01</span>
      </footer>
    </main>
  );
}
