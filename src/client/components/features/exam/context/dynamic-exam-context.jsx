"use client";

import dynamic from "next/dynamic";

const DynamicExamContext = dynamic(
    () => import("./exam-context"),
    {
        ssr: false,
    }
)

export default DynamicExamContext;