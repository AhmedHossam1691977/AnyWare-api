import { catchError } from "../../middleware/catchError.js"

export function deleteOne(model){

    return catchError(async(req,res,next)=>{ 
        let document =await model.findByIdAndDelete(req.params.id,{new:true})  
        !document && res.status(400).json({message:"document not found"})
        document && res.status(200).json({status:true,message:"success document is deleted"})
    })

}