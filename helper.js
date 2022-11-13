module.exports = {
    getToken: function(req) {
        return req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers["authorization"] ? req.headers["authorization"].replace('Bearer ', '') : '')
    }
}