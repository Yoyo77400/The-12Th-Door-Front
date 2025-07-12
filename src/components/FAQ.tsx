import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is the 12th Door ?",
      answer:
        "The 12th Door is an extension of the Socios platform, that contributes to engagement and community bulding towards the sports community.",
    },
    {
      question: "When do I get my rewards ?",
      answer:
        "You will get a chance to have a reward at the end of the match you went too. At the end of the match, please visit the rewards section to claim your reward.",
    },
    {
      question: "How to participate ?",
      answer:
        "To participate, you just have to stack fan token on the Socios platform. You can do it by clicking on the stack button on the Socios platform.",
    },
    {
      question: "Is it safe to invest via the blockchain ?",
      answer:
        "Yes, the blockchain provides enhanced security and transparency. All transactions are immutable and verifiable. Additionally, we comply with all financial regulations, and our smart contracts are audited by security experts.",
    },
  ];

  return (
    <section id="faq" className="py-16 pb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white/80 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to your questions about real estate tokenization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-4 pb-2">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="text-card-foreground text-white flex flex-col gap-6 rounded-xl border border-2 border-[#443149]/60 py-2 shadow-sm"
                style={{
                  background:
                    "linear-gradient(to bottom, #443149 0%, #0E0A0F 100%)",
                }}
              >
                <AccordionTrigger className="px-6 text-left hover:no-underline">
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
