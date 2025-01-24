import styles from "./option-list.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import QuestionOption
    from "@/client/components/features/exam/question-section/sub-components/question-option/question-option";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";

export default function OptionList() {
    const optionNames = ["A", "B", "C", "D"];

    const {
        exam: {
            options,
        }
    } = useExamContext();

    return <ContainerElement>
        {
            Object.values(options).map((option, index) => (
                <QuestionOption key={index} option={option} optionName={optionNames[index]} index={index} />
            ))
        }
    </ContainerElement>
}