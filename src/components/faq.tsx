import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const FAQs = [
  {
    question: 'Do I need to be good at programming to join?',
    answer: 'No, we welcome all skill levels. You just need to have passion for programming and commitment to yourself that you can learn it.'
  },
  {
    question: 'Who can join the DCC Programming Club?',
    answer: 'Any student from the Department of Computer Science & Engineering at DCC and HSC-level students who are passionate about programming are welcome to join. We encourage all skill levels, from beginners to advanced coders.'
  },
  {
    question: 'Is there a membership fee to join the club?',
    answer: 'Yes, there is a membership fee that can be paid on a monthly, quarterly, half-yearly, or yearly basis, depending on your preference.'
  },
  {
    question: 'Can I join if I don’t have programming experience?',
    answer: 'Absolutely! Beginners are always welcome. The club provides resources, mentors, and workshops to help you get started with programming.'
  },
  {
    question: 'How do I pay the membership fee?',
    answer: 'You can pay the fee through cash or mobile banking platforms like bKash and Nagad. Payment instructions will be provided after you apply.'
  },
  {
    question: 'Can I cancel my membership?',
    answer: 'Yes, you can cancel anytime by informing the club secretary. However, fees already paid are non-refundable.'
  },
  {
    question: 'How do I stay updated about club activities?',
    answer: 'Once you join, you’ll be added to our communication channels (like WhatsApp groups or email lists). You can also follow us on social media for updates.'
  }
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {
        FAQs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>
              <h3 className={'font-bold'}>{faq.question}</h3>
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}