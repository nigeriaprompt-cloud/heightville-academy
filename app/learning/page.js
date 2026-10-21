import Link from "next/link";
import PageHero from "@/components/PageHero";
import Quiz from "@/components/Quiz";
import QuestionOfTheDay from "@/components/QuestionOfTheDay";
import { questions } from "@/data/questions";
import { departments } from "@/data/subjects";
export const metadata = { title: "Learning Centre", description: "Objective-question exam practice in Science, Arts and Commercial subjects." };
export const revalidate = 3600;

export default function Learning() {
  return (
    <>
      <PageHero title="Learning Centre" intro="Practise objective questions in Science, Arts and Commercial subjects, with instant marking and explanations. No login needed." />
      <section className="section"><div className="wrap two">
        <Quiz questions={questions} departments={departments} />
        <div>
          <QuestionOfTheDay />
          <div className="quote"><h2 className="serif">For younger learners</h2>
            <p>Games and activities for children to play and learn.</p>
            <Link href="/play" className="link">Play &amp; Learn →</Link></div>
        </div>
      </div></section>
    </>
  );
}
