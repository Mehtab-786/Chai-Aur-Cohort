class APIResponse {
    static ok(res, message, data=null) {
        return res.status(200).json({
            message,
            data
        });
    };
    
    static created(res,message,data=null){
        return res.status(201).json({
            status:true,
            message,
            data
        });        
    }
    
    static noContent(){
        return res.status(204).send()
    }
}

export default APIResponse;