import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const CURRENT_THEME = {
  month: "Март 2026",
  country: "Япония",
  flag: "🇯🇵",
  task: "Талисманы года",
  description:
    "Сфотографируйте японские новогодние украшения: кадомацу из бамбука, симэнава или традиционные нэцкэ. Покажите, как вы воссоздали японскую атмосферу — дома, в путешествии или на вечеринке.",
  deadline: "31 марта 2026",
};

const HOW_TO = [
  {
    num: "01",
    icon: "Camera",
    title: "Сделайте фото",
    text: "Отразите тему месяца — традицию выбранной страны. Допускается коллаж и творческий подход.",
  },
  {
    num: "02",
    icon: "FileText",
    title: "Заполните форму",
    text: "Расскажите, где сделано фото, что изображено и почему вы выбрали эту традицию.",
  },
  {
    num: "03",
    icon: "Trophy",
    title: "Ждите результатов",
    text: "Жюри и слушатели голосуют. Победитель объявляется в прямом эфире.",
  },
];

const COUNTRIES = [
  { month: "Янв", country: "Новая Зеландия", flag: "🇳🇿", done: true },
  { month: "Фев", country: "Китай", flag: "🇨🇳", done: true },
  { month: "Мар", country: "Япония", flag: "🇯🇵", done: false, active: true },
  { month: "Апр", country: "Индия", flag: "🇮🇳", done: false },
  { month: "Май", country: "Бразилия", flag: "🇧🇷", done: false },
  { month: "Июн", country: "Мексика", flag: "🇲🇽", done: false },
  { month: "Июл", country: "Италия", flag: "🇮🇹", done: false },
  { month: "Авг", country: "Шотландия", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", done: false },
  { month: "Сен", country: "Иран", flag: "🇮🇷", done: false },
  { month: "Окт", country: "Россия", flag: "🇷🇺", done: false },
];

const SNOWFLAKES_CHARS = ["❄", "❅", "❆", "✦", "✧"];

const flakesData = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + 1.2) % 100}%`,
  delay: `${(i * 0.43) % 12}s`,
  duration: `${8 + (i * 0.37) % 10}s`,
  size: `${0.6 + (i * 0.07) % 1}rem`,
  symbol: SNOWFLAKES_CHARS[i % SNOWFLAKES_CHARS.length],
  opacity: 0.15 + (i * 0.014) % 0.4,
}));

const starsData = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${(i * 1.83 + 0.5) % 100}%`,
  top: `${(i * 1.67 + 1.1) % 100}%`,
  delay: `${(i * 0.07) % 4}s`,
  duration: `${2 + (i * 0.054) % 3}s`,
  size: i % 5 === 0 ? 2 : 1,
  gold: i % 4 === 0,
}));

function Snowflakes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakesData.map((f) => (
        <span
          key={f.id}
          style={{
            position: "absolute",
            left: f.left,
            top: "-40px",
            fontSize: f.size,
            color: `rgba(255,255,255,${f.opacity})`,
            animation: `snowfall ${f.duration} ${f.delay} linear infinite`,
          }}
        >
          {f.symbol}
        </span>
      ))}
    </div>
  );
}

function Stars() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {starsData.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            display: "block",
            background: s.gold ? "hsl(45,80%,70%)" : "white",
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", where: "", story: "" });
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-montserrat relative">
      <Stars />
      <Snowflakes />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10,12,22,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-playfair text-lg tracking-wide" style={{ color: "hsl(var(--foreground))" }}>
            Новый год{" "}
            <em className="not-italic" style={{ color: "hsl(var(--gold))" }}>
              круглый год
            </em>
          </span>
          <button
            onClick={scrollToForm}
            className="text-xs font-montserrat tracking-[0.15em] uppercase transition-all hover:opacity-100 opacity-50"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Участвовать
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative z-10 section-full px-6"
        style={{
          background:
            "radial-gradient(ellipse at 25% 30%, hsl(230 50% 15%) 0%, hsl(224 35% 7%) 70%)",
          minHeight: "100vh",
        }}
      >
        {/* Декоративные круги */}
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "min(480px, 42vw)",
            height: "min(480px, 42vw)",
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.12)",
            background:
              "radial-gradient(circle at 40% 40%, rgba(212,175,55,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "min(340px, 30vw)",
            height: "min(340px, 30vw)",
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.07)",
            pointerEvents: "none",
          }}
        />
        {/* Флаг в круге */}
        <div
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: "calc(8% + min(480px,42vw)/2)",
            top: "50%",
            transform: "translate(50%,-50%)",
            fontSize: "min(90px,8vw)",
            filter: "drop-shadow(0 0 50px rgba(212,175,55,0.35))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {CURRENT_THEME.flag}
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-2xl animate-fade-up">
            <p
              className="text-xs font-montserrat tracking-[0.3em] uppercase mb-8"
              style={{ color: "hsl(var(--gold))" }}
            >
              Конкурс фотографий · Радиостанция
            </p>
            <h1
              className="font-playfair font-black leading-none mb-6"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                color: "hsl(var(--foreground))",
                lineHeight: 0.95,
              }}
            >
              Новый год
              <br />
              <span className="glow-gold" style={{ color: "hsl(var(--gold))" }}>
                круглый год
              </span>
            </h1>
            <div className="gold-line mb-8" style={{ width: "80px" }} />
            <p
              className="text-base leading-relaxed mb-10 animate-fade-up-delay-1"
              style={{
                color: "hsl(var(--muted-foreground))",
                maxWidth: "480px",
                fontWeight: 300,
              }}
            >
              10 месяцев — 10 стран — 10 новогодних традиций. Покажите миру,
              как празднуют Новый год в разных уголках планеты.
            </p>
            <button
              onClick={scrollToForm}
              className="animate-fade-up-delay-2 inline-flex items-center gap-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all hover:gap-5"
              style={{
                background: "hsl(var(--gold))",
                color: "hsl(224,35%,8%)",
                padding: "16px 36px",
                fontWeight: 600,
              }}
            >
              Отправить фотографию
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>

        {/* Счётчики внизу */}
        <div className="absolute bottom-10 left-0 right-0 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-12 animate-fade-up-delay-3">
              {[
                ["10", "стран мира"],
                ["10", "месяцев"],
                ["1", "суперприз"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p
                    className="font-playfair font-bold"
                    style={{
                      fontSize: "2.5rem",
                      color: "hsl(var(--gold))",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs mt-1 tracking-widest uppercase"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ТЕКУЩАЯ ТЕМА */}
      <section
        className="relative z-10 section-full px-6"
        style={{
          background:
            "radial-gradient(ellipse at 75% 50%, hsl(250 40% 12%) 0%, hsl(224 35% 7%) 65%)",
          minHeight: "100vh",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full py-24">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-16"
            style={{ color: "hsl(var(--gold))" }}
          >
            Тема {CURRENT_THEME.month}
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="mb-8 inline-flex items-center justify-center rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  fontSize: "3.5rem",
                  boxShadow: "0 0 60px rgba(212,175,55,0.15)",
                }}
              >
                {CURRENT_THEME.flag}
              </div>
              <h2
                className="font-playfair font-bold mb-2"
                style={{
                  fontSize: "clamp(2.5rem,6vw,5rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1,
                }}
              >
                {CURRENT_THEME.country}
              </h2>
              <p
                className="text-lg mb-6"
                style={{ color: "hsl(var(--gold))", fontWeight: 300 }}
              >
                {CURRENT_THEME.task}
              </p>
              <div className="gold-line mb-6" style={{ width: "60px" }} />
              <p
                className="leading-relaxed"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontWeight: 300,
                  maxWidth: "440px",
                }}
              >
                {CURRENT_THEME.description}
              </p>
            </div>

            <div className="card-glass p-10 space-y-8">
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  Дедлайн приёма работ
                </p>
                <p
                  className="font-playfair text-3xl"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {CURRENT_THEME.deadline}
                </p>
              </div>
              <div className="gold-line" />
              <div className="space-y-4">
                {[
                  ["Users", "Голосование слушателей — 50%"],
                  ["Star", "Оценка жюри радиостанции — 50%"],
                  ["Radio", "Объявление победителя в прямом эфире"],
                  ["Gift", "Приз: сертификат на путешествие"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-4">
                    <div style={{ color: "hsl(var(--gold))", flexShrink: 0 }}>
                      <Icon name={icon} size={15} />
                    </div>
                    <span
                      className="text-sm"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        fontWeight: 300,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollToForm}
                className="w-full py-4 text-xs tracking-[0.2em] uppercase font-montserrat font-semibold transition-all hover:opacity-80"
                style={{
                  background: "hsl(var(--gold))",
                  color: "hsl(224,35%,8%)",
                }}
              >
                Участвовать в конкурсе
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section
        className="relative z-10 px-6 py-24"
        style={{
          background: "hsl(var(--background))",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--gold))" }}
          >
            Программа конкурса
          </p>
          <h2
            className="font-playfair text-4xl font-bold mb-16"
            style={{ color: "hsl(var(--foreground))" }}
          >
            10 стран · 10 месяцев
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5">
            {COUNTRIES.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 20px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: c.active
                    ? "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))"
                    : c.done
                    ? "rgba(255,255,255,0.01)"
                    : "transparent",
                  borderColor: c.active
                    ? "rgba(212,175,55,0.3)"
                    : "rgba(255,255,255,0.06)",
                  opacity: c.done ? 0.4 : 1,
                  transition: "all 0.2s",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {c.month}
                </p>
                <p style={{ fontSize: "1.6rem", marginBottom: "8px" }}>{c.flag}</p>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: c.active
                      ? "hsl(var(--gold))"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {c.country}
                </p>
                {c.active && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: "hsl(var(--gold))", opacity: 0.8 }}
                  >
                    ● Идёт сейчас
                  </p>
                )}
                {c.done && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    Завершён
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК УЧАСТВОВАТЬ */}
      <section
        className="relative z-10 px-6 py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(230 40% 11%) 0%, hsl(224 35% 8%) 60%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--gold))" }}
          >
            Как участвовать
          </p>
          <h2
            className="font-playfair text-4xl font-bold mb-16"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Три простых шага
          </h2>

          <div className="grid md:grid-cols-3 gap-1">
            {HOW_TO.map((step, i) => (
              <div
                key={i}
                className="card-glass p-10 relative overflow-hidden"
                style={{ transition: "border-color 0.2s" }}
              >
                <p
                  className="font-playfair font-black mb-6"
                  style={{
                    fontSize: "5rem",
                    color: "rgba(212,175,55,0.1)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </p>
                <div className="mb-4" style={{ color: "hsl(var(--gold))" }}>
                  <Icon name={step.icon} size={22} />
                </div>
                <h3
                  className="font-playfair text-xl font-bold mb-3"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--muted-foreground))", fontWeight: 300 }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМА */}
      <section
        ref={formRef}
        className="relative z-10 px-6 py-24"
        style={{
          background: "hsl(var(--background))",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--gold))" }}
          >
            Форма участия
          </p>
          <h2
            className="font-playfair text-4xl font-bold mb-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Отправить фотографию
          </h2>
          <p
            className="text-sm mb-12"
            style={{ color: "hsl(var(--muted-foreground))", fontWeight: 300 }}
          >
            Текущая тема:{" "}
            <span style={{ color: "hsl(var(--gold))" }}>
              {CURRENT_THEME.flag} {CURRENT_THEME.country} — {CURRENT_THEME.task}
            </span>
          </p>

          {submitted ? (
            <div className="card-glass p-16 text-center">
              <div className="text-5xl mb-6">{CURRENT_THEME.flag}</div>
              <h3
                className="font-playfair text-3xl font-bold mb-4"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Работа принята!
              </h3>
              <p
                className="text-sm mb-8"
                style={{ color: "hsl(var(--muted-foreground))", fontWeight: 300 }}
              >
                Мы получили вашу фотографию. Следите за результатами в эфире и
                на сайте.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFile(null);
                  setPreview(null);
                  setForm({ name: "", where: "", story: "" });
                }}
                className="text-xs tracking-widest uppercase underline transition-opacity hover:opacity-60"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Отправить ещё одну работу
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              {/* Дроп-зона */}
              <div
                className="relative cursor-pointer transition-all"
                style={{
                  border: `2px dashed ${
                    dragOver
                      ? "hsl(var(--gold))"
                      : "rgba(255,255,255,0.12)"
                  }`,
                  background: dragOver ? "rgba(212,175,55,0.05)" : "transparent",
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                {preview ? (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-72 object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      <span
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: "white" }}
                      >
                        Изменить фото
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center gap-3">
                    <Icon
                      name="ImagePlus"
                      size={36}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                    <p
                      className="text-sm"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        fontWeight: 300,
                      }}
                    >
                      Перетащите фото или{" "}
                      <span className="underline">выберите файл</span>
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      JPG, PNG — до 10 МБ
                    </p>
                  </div>
                )}
              </div>

              {[
                {
                  label: "Ваше имя",
                  key: "name",
                  placeholder: "Как вас зовут?",
                },
                {
                  label: "Где сделано фото?",
                  key: "where",
                  placeholder: "Город, страна или место съёмки",
                },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label
                    className="block text-xs tracking-[0.1em] uppercase mb-2"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-3 text-sm transition-all focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "hsl(var(--foreground))",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "hsl(var(--gold))")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-xs tracking-[0.1em] uppercase mb-2"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  История фотографии
                </label>
                <textarea
                  value={form.story}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, story: e.target.value }))
                  }
                  placeholder="Что изображено на фото? Почему вы выбрали эту традицию?"
                  rows={5}
                  required
                  className="w-full px-4 py-3 text-sm resize-none transition-all focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "hsl(var(--foreground))",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "hsl(var(--gold))")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "24px",
                }}
              >
                <button
                  type="submit"
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase font-montserrat font-semibold transition-all hover:opacity-80"
                  style={{
                    background: "hsl(var(--gold))",
                    color: "hsl(224,35%,8%)",
                  }}
                >
                  Отправить работу на конкурс
                </button>
                <p
                  className="text-xs text-center mt-4 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  Отправляя форму, вы соглашаетесь с правилами конкурса и даёте
                  согласие на публикацию фотографии на сайте и в эфире.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative z-10 px-6 py-12"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "hsl(224,35%,6%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="font-playfair text-xl font-bold"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Новый год{" "}
              <em className="not-italic" style={{ color: "hsl(var(--gold))" }}>
                круглый год
              </em>
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Конкурс слушателей радиостанции
            </p>
          </div>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            10 месяцев · 10 стран · 10 традиций
          </p>
        </div>
      </footer>
    </div>
  );
}
