import "server-only";

const errorMessages = {
    "unexpected end of json input": "Required request body not found.",
    "invalid mobile number": "Invalid mobile number else, found invalid or tempered request parameters.",
    "unauthorized": "You are not authorized to access this service.",
    "invalid otp number": "Invalid otp number, else, found invalid or tempered request parameters.",
    "invalid name": "Invalid name or invalid request parameter.",
    "invalid exam group": "Invalid exam group, else, found invalid or tempered request parameters.",
    "invalid subject id": "Invalid subject id, else, found invalid or tempered request parameters.",
    "client validation error": "Client validation error",
    "invalid exam details": "Invalid exam details, else, found invalid or tempered request parameters.",
    "exam mark exceeded": "Can't update the mark, unless it will be exceeded from exam base mark.",
    "invalid pagination number": "Invalid pagination number, else, found invalid or tempered request parameters.",
    "no data found": "No data found on the request"
}

export const errorMessageKeys = {
    invalidBody: "unexpected end of json input",
    invalidMobileNumber: "invalid mobile number",
    unAuthorized: "unauthorized",
    invalidOtpNumber: "invalid otp number",
    invalidName: "invalid name",
    invalidExamGroup: "invalid exam group",
    invalidSubjectId: "invalid subject id",
    prismaClientValidateError: "client validation error",
    invalidExamDetails: "invalid exam details",
    examMarkExceeded: "exam mark exceeded",
    invalidPaginationNumber: "invalid pagination number",
    notDataFound: "no data found",
}

export default errorMessages;