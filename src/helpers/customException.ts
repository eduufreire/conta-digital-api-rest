export class CustomException extends Error {

    public statusCode: number

    constructor(
        message: string, 
        statusCode: number
    ) {
        super(message)
        this.statusCode = statusCode
        console.log('STATUUUUUUUUUUUUS', this.statusCode)
    }

}