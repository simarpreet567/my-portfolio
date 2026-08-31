export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "Orders & Shipping",
    question: "How long does shipping take across India?",
    answer: "We dispatch all orders within 24 business hours from our central warehouse. Metro cities typically receive deliveries within 2–3 business days, while other locations take 4–6 business days. Express next-day dispatch is available for select pin codes.",
  },
  {
    id: "faq-2",
    category: "Orders & Shipping",
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We offer Cash on Delivery (COD) on all orders up to ₹5,000 across India. For seamless, contactless deliveries, UPI and digital card payments are also readily supported.",
  },
  {
    id: "faq-3",
    category: "Orders & Shipping",
    question: "How can I track my order?",
    answer: "Once your order is handed over to our courier partner (Bluedart / Delhivery / XpressBees), you will immediately receive an SMS and WhatsApp update with your tracking link and live AWB number.",
  },
  {
    id: "faq-4",
    category: "Returns & Exchanges",
    question: "What is your return & exchange policy?",
    answer: "We offer a hassle-free 14-day return and exchange policy on all unworn clothing and unused nursery items with original tags intact. For hygiene and safety reasons, opened skincare products and sterilized feeding items cannot be returned.",
  },
  {
    id: "faq-5",
    category: "Product Safety",
    question: "Are Littlebloom products safe for newborn sensitive skin?",
    answer: "Absolutely. 100% of our cotton is GOTS-certified organic, our wooden toys are painted with lead-free waterborne botanical stains, and our silicone feeding sets are 100% FDA & LFGB approved platinum food-grade silicone free from BPA, BPS, PVC, and phthalates.",
  },
  {
    id: "faq-6",
    category: "Sizing & Gifting",
    question: "How do I choose the right size for my baby?",
    answer: "Because babies grow quickly and come in all shapes, we recommend sizing up if your little one is in between sizes or approaching the upper weight/height percentile of an age bracket. Check our visual Size Guide chart on every product detail page.",
  },
  {
    id: "faq-7",
    category: "Sizing & Gifting",
    question: "Do you offer complimentary gift wrapping and personalized notes?",
    answer: "Yes! During checkout, simply check the 'Gift Wrap' option. We will package your order in our signature embossed luxury gift box tied with a satin ribbon, and print your personal message on a lovely gold-foiled card at no extra charge.",
  },
  {
    id: "faq-8",
    category: "Product Safety",
    question: "How should I wash and care for organic cotton muslin?",
    answer: "We recommend machine washing on a gentle cold cycle (30°C) with mild baby-safe liquid detergent. Avoid harsh chlorine bleach. Our organic bamboo-muslin fabrics are specially woven to become noticeably softer with every single wash cycle!",
  },
];
