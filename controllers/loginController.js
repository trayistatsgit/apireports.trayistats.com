const { Helper } = require('../helper');
const service  =  require('../services');
// const ipAddress = require('../Common/getRequestedIpAddress');

class loginController {

    async loginUser(request, response) {
        if (!request.body.UserName || !request.body.password) {
            let errors = request.body.UserName ? "Password is required" : "Username is required"
            return Helper.responseJsonHandler(errors, null, response)
        }
        // const userIpAddress = await ipAddress(request);
        // request.query.userIpAddress = userIpAddress;
        service.loginService.loginUser(request.body)
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }    
}

module.exports = new loginController();