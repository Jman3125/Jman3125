module.exports = async function(req, res) {
    const id = req.param('id') 

    //Find the user, then show their followers
    const user = await User.findOne({id: id})
        .populate('followers')

    const cleanedUser = JSON.parse(JSON.stringify(user))

    if (req.wantsJSON) {
        return res.send(cleanedUser)
    }

    res.end()
}