"use client";

import dynamic from "next/dynamic";

const DynamicQuestionSection = dynamic(
    () => import("./question-section"),
    {ssr: false},
)

export default DynamicQuestionSection;