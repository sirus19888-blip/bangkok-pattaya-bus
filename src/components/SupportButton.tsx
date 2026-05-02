import type { Translations } from "@/lib/i18n";

type SupportButtonProps = {
  labels: Translations["support"] & {
    buyMeCoffee: string;
  };
};

export function SupportButton({ labels }: SupportButtonProps) {
  return (
    <section className="rounded-lg border border-[#c8dbe9] bg-[#13233a] p-4 text-white shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#f3d77b]">
          {labels.title}
        </p>
        <h2 className="mt-1.5 text-xl font-black sm:mt-2 sm:text-2xl">
          {labels.question}
        </h2>
      </div>
      <a
        href="https://www.buymeacoffee.com/"
        className="mt-5 flex h-14 items-center justify-center rounded-lg bg-[#f3d77b] px-5 text-base font-black text-[#13233a] shadow-sm transition hover:bg-[#ffe39a] sm:mt-0 sm:min-w-52"
      >
        {labels.buyMeCoffee}
      </a>
    </section>
  );
}
