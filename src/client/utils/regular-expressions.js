const regularExpressions = {
    number: /^([0-9]+)$/,
    mobileNumber: /^[6789][0-9]{9}$/,
    otpNumber: /^[0-9]{6}$/,
    fullName: /^([A-Za-z ]){5,20}$/,
    examGroup: /^(10|[1-9])$/,
    alphabetic: /^[A-Za-z ]+$/,
}

export default regularExpressions;