export class CustomException extends Error {

    public status: number

    constructor(message, status: number) {
        super(message)
        this.status = status
    }

}