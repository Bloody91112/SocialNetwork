export const required = (value:boolean) => {
    if (value) return undefined;
    return 'Field is reguired';  
}

export const maxLengthValidatorCreator = (maxLength: number) => {
    return (value: string) => {
        if (value.length > maxLength) {
            return `Max length is ${maxLength} symbols`
        }
        return undefined
    }
}
