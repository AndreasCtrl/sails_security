var bcrypt = require('bcryptjs')
module.exports = {
    inputs: {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true }
    },

    exits: {},

    fn: async function (inputs) {
        console.log("inputs.password=" + await bcrypt.hash(inputs.password, 12))
        let user = await User.findOne({ emailAddress: inputs.username }) //, password: await bcrypt.hash(inputs.password, 12)})
        let match = await bcrypt.compare(inputs.password, user.password)
        console.log("db____.password=" + user.password)
        // console.log(user)
        if (match) {
            // this.req.me = user;
            this.req.session.userId = user.id
            console.log(this.req.session)
            // console.log(this.req)
            return this.res.view('account/controlpanel')
        } else {
            this.res.statusCode = 403
            return this.res.forbidden()
        }
    }
}