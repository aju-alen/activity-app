export const developmentLogs = (message: any, type?: string) => {
    if (__DEV__) {
        console.log(message, type);
    }
}

export const developmentErrorLogs = (message: any, type?: string) => {
    if (__DEV__) {
        console.error(message, type);
    }
}
