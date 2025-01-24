"use client";

import dynamic from "next/dynamic";

const DynamicLoadingScreen = dynamic(
    () => import("./loading-screen"),
    {
        ssr: false
    }
)

export default DynamicLoadingScreen;