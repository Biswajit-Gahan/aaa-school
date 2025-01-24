import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {useRouter} from "next/navigation";
import routeConfig from "@/client/config/route-config";

export default function useViewResultButtonHandler() {
    const {
        exam: {
            examId
        }
    } = useExamContext();

    const router = useRouter();

    return function () {
        router.replace(`${routeConfig.pageRoutes.studentHistory}/${examId}`);
    }
}