import Link from "next/link";

type TrustPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: {
    title: string;
    body: string;
  }[];
};

export function TrustPage({ eyebrow, title, intro, sections }: TrustPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#13233a] text-lg font-black text-white shadow-sm">
              BP
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold uppercase tracking-wide">
                Bangkok Pattaya
              </span>
              <span className="block text-xs font-semibold text-[#5f6874]">
                Bus Guide
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex h-11 items-center rounded-lg border border-[#7fb7d8] bg-white px-4 text-sm font-black text-[#13233a]"
          >
            Home
          </Link>
        </header>

        <article className="rounded-lg border border-[#eadcc7] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base font-semibold leading-7 text-[#4f5d6c]">
            {intro}
          </p>

          <div className="mt-6 space-y-4">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-4"
              >
                <h2 className="text-lg font-black">{section.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
