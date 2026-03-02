import QuestionAccordion from "@/components/question/QuestionAccordion"
import QuestionHeader from "@/components/question/QuestionHeader"

const Question = () => {
    return (
        <section className="max-[1285px]:px-5">
            <QuestionHeader />
            <QuestionAccordion />
        </section>
    )
}

export default Question
