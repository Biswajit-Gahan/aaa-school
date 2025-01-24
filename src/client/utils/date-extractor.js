const dateExtractor = {
    isoDate(dateString) {
        try {
            const weekDay = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", weekday: "long"});
            const weekDayShort = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", weekday: "short"});
            const numericWeekDay = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", day: "2-digit"});
            const date = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", day: "2-digit"});
            const year = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", year: "numeric"});
            const shortYear = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", year: "2-digit"});
            const month = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", month: "long"});
            const shortMonth = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", month: "short"});
            const numericMonth = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", month: "numeric"});
            const hourAndMeridian = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", hour: "numeric"}, );
            const hour = hourAndMeridian.split(" ")[0];
            const meridian = hourAndMeridian.split(" ")[1];
            const minute = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", minute: "2-digit"});
            const seconds = new Date(dateString).toLocaleString("en-US", {timeZone: "Asia/Kolkata", second: "2-digit"});
            return {
                weekDay,
                weekDayShort,
                numericWeekDay,
                date,
                year,
                shortYear,
                month,
                shortMonth,
                numericMonth,
                hour,
                minute,
                seconds,
                meridian,
            }
        } catch (error) {
            return {
                weekDay: "",
                weekDayShort: "",
                numericWeekDay: "",
                date: "",
                year: "",
                shortYear: "",
                month: "",
                shortMonth: "",
                numericMonth: "",
                hour: "",
                minute: "",
                seconds: "",
            }
        }
    }
}

export default dateExtractor;