"use client";

import {createContext, useEffect, useReducer} from "react";
import {notFound} from "next/navigation";

export const ExamContext = createContext(null);

const Initial_State = {
    actions: {
        isLoading: false,
        isError: false,
        isSubmitted: false,
        isQuestionFetched: false,
        isOptionSelected: false,
    },
    exam: {
        examId: "",
        question: '',
        options: {
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
        },
        answer: '',
        selectedAnswer: "",
        questionImage: "",
    },
    counters: {
        totalQuestionCount: 10,
        totalQuestionAttempted: 0,
    }
}

export const EXAM_CONTEXT_REDUCERS = {
    "STORE_EXAM_ID": "STORE_EXAM_ID",
    "START_LOADING": "START_LOADING",
    "SET_FETCHING_ERROR": "SET_FETCHING_ERROR",
    "END_FETCHING_QUESTION": "END_FETCHING_QUESTION",
    "SELECT_ANSWER": "SELECT_ANSWER",
    "END_ANSWER_SUBMITTING": "END_ANSWER_SUBMITTING",
    "START_EXAM_TIMER": "START_EXAM_TIMER",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "STORE_EXAM_ID": return {
            ...state,
            exam: {
                ...state.exam,
                examId: action.payload,
            }
        }
        case "START_LOADING": return {
            ...state,
            actions: {
                ...state.actions,
                isLoading: true,
                isError: false,
            }
        }
        case "SET_FETCHING_ERROR": return {
            ...state,
            actions: {
                ...state.actions,
                isLoading: false,
                isError: true,
            }
        }
        case "END_FETCHING_QUESTION": return {
            ...state,
            actions: {
                ...state.actions,
                isLoading: false,
                isError: false,
                isSubmitted: false,
                isQuestionFetched: false,
                isOptionSelected: false,
            },
            exam: {
                ...state.exam,
                question: action.payload.question,
                options: {
                    optionA: action.payload.optionA,
                    optionB: action.payload.optionB,
                    optionC: action.payload.optionC,
                    optionD: action.payload.optionD,
                },
                answer: action.payload.answer,
                selectedAnswer: "",
                questionImage: action.payload.questionImage,
            },
            counters: {
                ...state.counters,
                // totalQuestionAttempted: action.payload.totalQuestionAttempted,
                totalQuestionAttempted: state.counters.totalQuestionAttempted + 1,
            }
        }
        case "SELECT_ANSWER": return {
            ...state,
            exam: {
                ...state.exam,
                selectedAnswer: action.payload,
            }
        }
        case "END_ANSWER_SUBMITTING": return {
            ...state,
            actions: {
                isLoading: false,
                isError: false,
                isSubmitted: true,
            }
        }
        default: return state;
    }
}

export default function ExamContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, Initial_State);
    const storedExamId = sessionStorage.getItem("examId") || "";

    useEffect(() => {
        if (!storedExamId) {
            notFound();
        }

        dispatch({
            type: EXAM_CONTEXT_REDUCERS.STORE_EXAM_ID,
            payload: storedExamId,
        });

        sessionStorage.removeItem("examId");

    }, [])

    return <ExamContext.Provider value={{...state, dispatch }}>
        {children}
    </ExamContext.Provider>
}