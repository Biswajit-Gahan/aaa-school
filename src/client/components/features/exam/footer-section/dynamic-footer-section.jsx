"use client";

import dynamic from "next/dynamic";

const DynamicFooterSection = dynamic(
    ()=> import("./footer-section"),
    {
        ssr: false,
    }
);

export default DynamicFooterSection;