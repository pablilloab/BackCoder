export class ErrorHandle extends Error{

    
    constructor(private status: number, message: string){
        super()
        this.status = status;
        this.message = message;
        console.log(this.stack);
    }

    static badRequest(message: string = "Bad Request"){
        return new ErrorHandle(400, message);
    }

    static unauthorized(message: string = "Unahutorized"){
        return new ErrorHandle(401, message);
    }

    static notFound(message: string = "Not Found"){
        return new ErrorHandle(404, message);
    }
}