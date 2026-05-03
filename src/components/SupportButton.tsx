import type { Translations } from "@/lib/i18n";

type SupportButtonProps = {
  labels: Translations["support"] & {
    buyMeCoffee: string;
  };
};

export function SupportButton({ labels }: SupportButtonProps) {
  return (
    <section className="rounded-2xl border border-[#c8dbe9] bg-white p-4 text-[#13233a] shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
          {labels.title}
        </p>
        <h2 className="mt-1.5 text-xl font-black leading-tight sm:mt-2 sm:text-2xl">
          {labels.question}
        </h2>
      </div>
      <a
        href="https://www.buymeacoffee.com/"
        className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl border border-[#13233a] bg-[#13233a] px-5 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#1d3455] sm:mt-0 sm:min-w-52 sm:w-auto sm:text-base"
      >
        {labels.buyMeCoffee}
      </a>
    </section>
  );
}
