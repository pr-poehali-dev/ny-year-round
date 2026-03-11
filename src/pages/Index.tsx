import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const CURRENT_THEME = {
  month: "Март 2026",
  country: "Япония",
  flag: "🇯🇵",
  task: "Талисманы года",
  description:
    "Сфотографируйте японские новогодние украшения: кадомацу из бамбука, симэнава или традиционные нэцкэ. Покажите, как вы воссоздали японскую атмосферу дома, в путешествии или на вечеринке.",
  deadline: "31 марта 2026",
};

const HOW_TO = [
  {
    num: "01",
    title: "Сделайте фото",
    text: "Отразите тему месяца — традицию страны. Допускается коллаж и творческий подход.",
  },
  {
    num: "02",
    title: "Заполните форму",
    text: "Расскажите, где сделано фото, что изображено и почему вы выбрали эту традицию.",
  },
  {
    num: "03",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-cormorant text-lg font-medium tracking-wide text-foreground">
            Новый год круглый год
          </span>
          <button
            onClick={scrollToForm}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Участвовать
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <div className="animate-fade-up">
          <p className="text-sm font-golos tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Конкурс фотографий
          </p>
          <h1 className="font-cormorant text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-light text-foreground mb-8">
            Новый год
            <br />
            <em className="not-italic" style={{ color: "hsl(var(--gold))" }}>
              круглый год
            </em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-12 font-golos animate-fade-up-delay-1">
            10 месяцев — 10 стран — 10 новогодних традиций. Присылайте фотографии,
            отражающие новогодние обычаи разных народов мира.
          </p>
          <button
            onClick={scrollToForm}
            className="animate-fade-up-delay-2 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm font-medium tracking-wider uppercase hover:opacity-80 transition-opacity"
          >
            Отправить фото
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-border grid grid-cols-3 gap-8 animate-fade-up-delay-3">
          <div>
            <p className="font-cormorant text-4xl font-light" style={{ color: "hsl(var(--gold))" }}>10</p>
            <p className="text-sm text-muted-foreground mt-1">стран мира</p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light" style={{ color: "hsl(var(--gold))" }}>10</p>
            <p className="text-sm text-muted-foreground mt-1">месяцев конкурса</p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light" style={{ color: "hsl(var(--gold))" }}>1</p>
            <p className="text-sm text-muted-foreground mt-1">суперприз в финале</p>
          </div>
        </div>
      </section>

      {/* CURRENT THEME */}
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase mb-8 opacity-50">
            Тема {CURRENT_THEME.month}
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{CURRENT_THEME.flag}</span>
                <div>
                  <h2 className="font-cormorant text-5xl font-light leading-tight">
                    {CURRENT_THEME.country}
                  </h2>
                  <p className="opacity-60 mt-1">{CURRENT_THEME.task}</p>
                </div>
              </div>
              <p className="opacity-70 leading-relaxed text-base">
                {CURRENT_THEME.description}
              </p>
            </div>
            <div className="border border-background/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Clock" size={16} className="opacity-50" />
                <span className="text-sm opacity-50">Дедлайн</span>
              </div>
              <p className="font-cormorant text-3xl font-light mb-8">
                {CURRENT_THEME.deadline}
              </p>
              <div className="space-y-3 text-sm opacity-60">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={14} />
                  <span>Голосование слушателей — 50%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Star" size={14} />
                  <span>Оценка жюри — 50%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Radio" size={14} />
                  <span>Объявление в прямом эфире</span>
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="mt-8 w-full border border-background/40 py-3 text-sm tracking-wider uppercase hover:bg-background hover:text-foreground transition-colors"
              >
                Участвовать
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME TIMELINE */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-10">
            Программа конкурса
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0">
            {COUNTRIES.map((c, i) => (
              <div
                key={i}
                className={`border border-border p-4 transition-all ${
                  c.active
                    ? "bg-foreground text-background"
                    : c.done
                    ? "opacity-40"
                    : ""
                }`}
              >
                <p
                  className={`text-xs tracking-widest uppercase mb-2 ${
                    c.active ? "opacity-60" : "text-muted-foreground"
                  }`}
                >
                  {c.month}
                </p>
                <p className="text-lg mb-1">{c.flag}</p>
                <p className={`text-xs font-medium ${c.active ? "" : "text-foreground"}`}>
                  {c.country}
                </p>
                {c.done && (
                  <p className="text-xs mt-2 opacity-40">Завершён</p>
                )}
                {c.active && (
                  <p className="text-xs mt-2 opacity-70">● Идёт сейчас</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO PARTICIPATE */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-12">
            Как участвовать
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {HOW_TO.map((step, i) => (
              <div key={i}>
                <p
                  className="font-cormorant text-5xl font-light mb-4"
                  style={{ color: "hsl(var(--gold))" }}
                >
                  {step.num}
                </p>
                <h3 className="font-cormorant text-2xl font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD FORM */}
      <section ref={formRef} className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Форма участия
          </p>
          <h2 className="font-cormorant text-5xl font-light mb-2">
            Отправить фото
          </h2>
          <p className="text-muted-foreground mb-12">
            Тема месяца:{" "}
            <strong className="text-foreground">
              {CURRENT_THEME.flag} {CURRENT_THEME.country} — {CURRENT_THEME.task}
            </strong>
          </p>

          {submitted ? (
            <div className="border border-border p-12 text-center">
              <p className="text-4xl mb-4">{CURRENT_THEME.flag}</p>
              <h3 className="font-cormorant text-3xl font-light mb-3">
                Работа принята!
              </h3>
              <p className="text-muted-foreground text-sm">
                Мы получили вашу фотографию. Следите за результатами в эфире
                и на сайте.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFile(null);
                  setPreview(null);
                  setForm({ name: "", where: "", story: "" });
                }}
                className="mt-8 text-sm underline text-muted-foreground hover:text-foreground transition-colors"
              >
                Отправить ещё одну работу
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div
                className={`relative border-2 border-dashed transition-colors cursor-pointer ${
                  dragOver
                    ? "border-foreground bg-card"
                    : "border-border hover:border-foreground/40"
                }`}
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
                      className="w-full max-h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-background text-sm font-medium bg-foreground/80 px-4 py-2 transition-opacity">
                        Изменить фото
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center gap-3 text-muted-foreground">
                    <Icon name="Upload" size={32} className="opacity-30" />
                    <p className="text-sm">
                      Перетащите фото или{" "}
                      <span className="underline">выберите файл</span>
                    </p>
                    <p className="text-xs opacity-50">JPG, PNG, до 10 МБ</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Как вас зовут?"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Где сделано фото?
                  </label>
                  <input
                    type="text"
                    value={form.where}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, where: e.target.value }))
                    }
                    placeholder="Город, страна или место съёмки"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    История фотографии
                  </label>
                  <textarea
                    value={form.story}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, story: e.target.value }))
                    }
                    placeholder="Что изображено на фото? Почему вы выбрали эту традицию? Расскажите свою историю..."
                    rows={5}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-4 text-sm font-medium tracking-wider uppercase hover:opacity-80 transition-opacity"
                >
                  Отправить работу
                </button>
                <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                  Отправляя форму, вы соглашаетесь с правилами конкурса и даёте
                  согласие на публикацию фотографии на сайте и в эфире.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-cormorant text-xl font-medium">
              Новый год круглый год
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Конкурс слушателей радиостанции
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            10 месяцев · 10 стран · 10 традиций
          </p>
        </div>
      </footer>
    </div>
  );
}
