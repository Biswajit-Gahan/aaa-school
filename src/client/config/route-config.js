const routeConfig = {
    pageRoutes: {
        studentHome: "/student/home",
        examGuidelines: "/student/exam/guidelines",
        studentHistory: "/student/history",
        examStart: "/student/exam/start",
        studentLogin: "/student/login",
    },
    apiRoutes: {
        v1: {
            baseUrl: "/api/v1",
            endpoints: {
                generateOtp: "/auth/generate-otp",
                verifyOtp: "/auth/verify-otp",
                logout: "/auth/logout",
                studentDetails: "/student/details",
                allSubjects: "/exam/all-subjects",
                recentExams: "/exam/history/recent-exams",
            },
        }

    },
}

export default routeConfig;