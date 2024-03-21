import { Request, Response, NextFunction } from "express";
import { ValidationChain, body, validationResult } from "express-validator";


export const validate=(validations: ValidationChain[])=>{
    return async (req:Request, res:Response,  next: NextFunction) => {
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()) break;
        }
        const error = validationResult(req);
        if(error.isEmpty()) return next();
        res.status(422).json({errors: error.array() })
    }
}   


export const signInValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should contain atleast 6 characters"),
  ];

  export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...signInValidator
  ];
  
