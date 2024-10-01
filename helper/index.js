const { errors }  =  require('./errors');

class Helper {

    static responseJsonHandler(error, data, expressResponse) {
        let obj = { error: error, data: data };
        if (obj.error) {
            let myResponse = {
                Success : false,
                Version: "1.0.0",
                ResponseData : obj.error
            }
            expressResponse.status(200).send(myResponse)
        } else {
            let myResponse = {
                Success: true,
                Version: "1.0.0",
                ResponseData: obj.data
            }
            expressResponse.status(200).send(myResponse)
        }
    }

};

module.exports = {
    Helper,
    errors : errors
}