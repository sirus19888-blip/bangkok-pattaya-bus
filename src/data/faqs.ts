export type GuideTip = {
  title: string;
  body: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const guideTips: GuideTip[] = [
  {
    title: "Arrive 20 minutes early",
    body: "Buy your ticket at the counter and keep a little buffer for queues, snacks, and finding the platform.",
  },
  {
    title: "Keep small cash ready",
    body: "Bus fares and local rides are easiest with Thai baht notes. Keep coins or small bills for songthaews in Pattaya.",
  },
  {
    title: "Plan around Bangkok traffic",
    body: "Morning and evening departures can take longer. Add extra time if you connect to a flight or train.",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "How long is the bus from Bangkok to Pattaya?",
    answer:
      "The bus usually takes around 2-3 hours, depending on traffic and the departure station.",
  },
  {
    question: "Where do I buy tickets?",
    answer:
      "You can usually buy tickets at the bus station counter. Some routes may also be available online. Confirm before travel.",
  },
  {
    question: "Can I take a bus from Suvarnabhumi Airport?",
    answer:
      "Yes, there are bus services between Suvarnabhumi Airport and Pattaya. Check the current schedule before you go.",
  },
  {
    question: "Do buses run every day?",
    answer:
      "Most routes run daily, but departure times may change on holidays or busy travel days.",
  },
];
