const routeConfig = {
    pageRoutes: {
        studentHome: "/student/home",
        examGuidelines: "/student/exam/guidelines",
        studentHistory: "/student/exam/history",
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
                studentRegistration: "/student/registration",
                startExam: "/exam/start",
                newQuestion: "/exam/question",
                submitAnswer: "/exam/submit-answer",
            },
        }

    },
}

export default routeConfig;