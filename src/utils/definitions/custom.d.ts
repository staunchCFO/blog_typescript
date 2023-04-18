import User from "@/resources/user/user.interface";


/**
 * The below method will add User to the request interface for Express;
 */

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}