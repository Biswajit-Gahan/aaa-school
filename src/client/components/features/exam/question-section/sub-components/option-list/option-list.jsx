"use client";

import styles from "./option-list.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import dynamic from "next/dynamic";

const DynamicQuestionOption = dynamic(
    () => import("../question-option/question-option"),
    {ssr: false}
)

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
                <DynamicQuestionOption key={index} option={option} optionName={optionNames[index]} index={index} />
            ))
        }
    </ContainerElement>
}