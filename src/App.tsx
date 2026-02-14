import { useEffect, useMemo, useState } from "react";
import valentineImage from "./assets/18.jpg";
import kitty from "./assets/kitty.jpg";
import kitty2 from "./assets/kitty2.jpg";
import "./App.css";

type YesResult = {
  title: string;
  message: string;
  image?: string;
  yesButtonLabel?: string;
  copyReplyText?: string;

  // Optional "plan details" shown on YES
  plan?: {
    dateIdea?: string;
    time?: string;
    place?: string;
    extra?: string;
  };

  // Optional: open a link when they say yes (calendar invite, song, etc.)
  redirectUrl?: string;
};

type ValentineConfig = {
  name: string;
  message: string;
  yes: YesResult;
};

const VALID_CODES: Record<string, ValentineConfig> = {
  // Code 1
  CHERII: {
    name: "CHERII",
    message: "I made this little page just for you 💘",
    yes: {
      title: "OKAY IT’S OFFICIAL 💍💖",
      image: valentineImage,
      message:
        `Cherii you have been so supportive ever since I met you and you are genuinely a blessing to have in my life. Dare I say, anyone would be blessed to have someone as supportive as you.
        You have been such a great friend to me, my gooner companion, and amazing creator I get to talk to on the daily. Happy Valentine's Day Selene`,
      yesButtonLabel: "Yes!! 💖",
      copyReplyText: "I ACCEPT 💘 Happy Valentine’s Day!!",
      plan: {
        dateIdea: "being my duo",
        time: "anytime",
        place: "any game",
        extra: "Wear something cute. I’ll handle the rest whenever we see each other😌",
      },
      // redirectUrl: "https://calendar.google.com/..." // optional
    },
  },

  // Code 2 (different YES result)
  CUPID123: {
    name: "Bestie",
    message: "Okay but imagine saying yes 😌💖",
    yes: {
      title: "YUP. WE’RE LOCKED IN 😤💘",
      message:
        "This is your confirmation that you’re my Valentine. No refunds, no exchanges.",
      yesButtonLabel: "Fine… yes 💞",
      copyReplyText: "YES 😤💘 (you got me)",
      plan: {
        dateIdea: "Movie night + snacks",
        time: "8:30 PM",
        place: "My place / your place",
        extra: "Pick the movie. I’ll bring the snacks.",
      },
      // redirectUrl: "https://open.spotify.com/track/..." // optional
    },
  },

  PLASMAPIMP: {
    name: "Plasma",
    message: `PLASMA! I am so glad to have met you recently! You have been such a kind and supportive friend, and you deserve all the love in the world!
    Although you don't have a Valentine's, I guessss ill step up and be your Valentine. Much love twin, and can't wait to watch you grow as a person and your community.
    Much love - Fwitz`,
    yes: {
      title: "YUP. WE’RE LOCKED IN 😤💘",
      image: kitty,
      message:
        "This is your confirmation that you’re my Valentine. No refunds, no exchanges.",
      yesButtonLabel: "Fine… yes 💞",
      copyReplyText: "YES 😤💘 (you got me)",
      plan: {
        dateIdea: "being cool chuds",
        time: "anytime",
        place: "on discord",
        extra: "Stay goated queen.",
      },
      // redirectUrl: "https://open.spotify.com/track/..." // optional
    },
  },

  KINBARU: {
    name: "KINBARU",
    message: `YOU ARE NASTY ON MAGIK FIRST OF ALL. Also i recently had the priveledge to have met you, and you're a very cool and chill dude. You seem very genuine and I have no doubt you will grow into a
    very successful content creator or anything else that you aspire to be. Hopefully this message meets your high standards LMAO. Stay a humble, handsome, cute, awesome King. Although you're the 3rd best magik behind Panu,
    you are #1 in my heart.`,
    yes: {
      title: "YUP. WE’RE LOCKED IN 😤💘",
      image: kitty2,
      message:
        "This is your confirmation that you’re my Valentine. No refunds, no exchanges.",
      yesButtonLabel: "Fine… yes 💞",
      copyReplyText: "YES 😤💘 (you got me)",
      plan: {
        dateIdea: "being my duo?",
        time: "whenever i hit cel",
        place: "on Rivals",
        extra: "I think you have mad aura.",
      },
      // redirectUrl: "https://open.spotify.com/track/..." // optional
    },
  },


};

function getCodeFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return (params.get("code") ?? "").trim();
}

export default function App() {
  const [codeInput, setCodeInput] = useState("");
  const [code, setCode] = useState(() => getCodeFromUrl());

  useEffect(() => {
    const onPopState = () => setCode(getCodeFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const valentine = useMemo(() => {
    if (!code) return null;
    const key = code.toUpperCase();
    return VALID_CODES[key] ?? null;
  }, [code]);

  const [step, setStep] = useState<"ask" | "yes" | "no1" | "no2">("ask");

  useEffect(() => {
    setStep("ask");
  }, [valentine?.name]);

  const submitCode = () => {
    const cleaned = codeInput.trim().toUpperCase();
    const nextUrl = `?code=${encodeURIComponent(cleaned)}`;
    window.history.pushState({}, "", nextUrl);
    setCode(cleaned);
  };

  const handleYes = () => {
    setStep("yes");
    const url = valentine?.yes.redirectUrl;
    if (url) {
      // open in new tab without breaking the flow
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // -------- LOCKED SCREEN --------
  if (!valentine) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.h1}>🔒 Fwitz's Valentine Page</h1>
          <p style={styles.p}>Enter the secret code to unlock the surprise.</p>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter code (given to you by Fwitz)"
              style={styles.input}
            />
            <button onClick={submitCode} style={styles.primaryBtn}>
              Unlock 💘
            </button>
          </div>

          {code && (
            <p style={{ ...styles.p, marginTop: 12 }}>
              That code didn’t work. Check spelling/caps and try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  // -------- VALENTINE PAGE --------
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Happy Valentine’s Day 💝</h1>
        <p style={styles.p}>
          Hey <b>{valentine.name}</b> — {valentine.message}
        </p>

        {step === "ask" && (
          <>
            <h2 style={styles.h2}>Will you be my Valentine?</h2>

            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button onClick={handleYes} style={styles.primaryBtn}>
                {valentine.yes.yesButtonLabel ?? "Yes!! 💖"}
              </button>
              <button onClick={() => setStep("no1")} style={styles.secondaryBtn}>
                No 😭
              </button>
            </div>

            <p style={{ ...styles.small, marginTop: 16 }}>
              (This is a legally binding agreement btw)
            </p>
          </>
        )}

        {step === "no1" && (
          <>
            <h2 style={styles.h2}>Wait… are you sure? 🥺</h2>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button onClick={handleYes} style={styles.primaryBtn}>
                Okay fine, YES 💞
              </button>
              <button onClick={() => setStep("no2")} style={styles.secondaryBtn}>
                Still no 😐
              </button>
            </div>
          </>
        )}

        {step === "no2" && (
          <>
            <h2 style={styles.h2}>Last chance…</h2>
            <p style={styles.p}>
              I will be dramatically sad for 3–5 business days.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button onClick={handleYes} style={styles.primaryBtn}>
                YES YES YES 💘
              </button>
              <button onClick={() => setStep("ask")} style={styles.secondaryBtn}>
                Restart 😅
              </button>
            </div>
          </>
        )}

        {step === "yes" && (
          <>
            <h2 style={styles.h2}>{valentine.yes.title}</h2>
            {valentine.yes.image && (
              <img
                src={valentine.yes.image}
                alt="Valentine"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  borderRadius: 18,
                  marginTop: 16,
                  marginBottom: 6,
                  objectFit: "cover",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
                }}
              />
            )}
            <p style={styles.p}>{valentine.yes.message}</p>

            {valentine.yes.plan && (
              <div style={styles.box}>
                <p style={{ margin: 0 }}>
                  {valentine.yes.plan.dateIdea && (
                    <>
                      📍 Date idea: <b>{valentine.yes.plan.dateIdea}</b>
                      <br />
                    </>
                  )}
                  {valentine.yes.plan.time && (
                    <>
                      🕒 Time: <b>{valentine.yes.plan.time}</b>
                      <br />
                    </>
                  )}
                  {valentine.yes.plan.place && (
                    <>
                      📌 Place: <b>{valentine.yes.plan.place}</b>
                      <br />
                    </>
                  )}
                  {valentine.yes.plan.extra && (
                    <>
                      ✨ Note: <b>{valentine.yes.plan.extra}</b>
                    </>
                  )}
                </p>
              </div>
            )}

            {valentine.yes.copyReplyText && (
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(valentine.yes.copyReplyText!);
                  alert("Copied a reply message to clipboard 💌");
                }}
                style={{ ...styles.secondaryBtn, marginTop: 14 }}
              >
                Copy cute reply 💌
              </button>
            )}

            {valentine.yes.redirectUrl && (
              <p style={{ ...styles.small, marginTop: 12 }}>
                (I also opened something for you in a new tab 💘)
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 18,
    background:
      "radial-gradient(circle at top, rgba(255, 105, 180, .25), transparent 55%), #0b0b10",
    color: "white",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  card: {
    width: "min(720px, 100%)",
    borderRadius: 18,
    padding: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    textAlign: "center",
  },
  h1: { margin: 0, fontSize: 34, lineHeight: 1.1 },
  h2: { marginTop: 18, marginBottom: 0, fontSize: 26 },
  p: { marginTop: 10, marginBottom: 0, opacity: 0.92, fontSize: 16 },
  small: { opacity: 0.75, fontSize: 13 },
  input: {
    flex: 1,
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
  },
  primaryBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255, 105, 180, 0.85)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontWeight: 650,
  },
  box: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    border: "1px dashed rgba(255,255,255,0.22)",
    background: "rgba(0,0,0,0.18)",
    textAlign: "left",
  },
};
