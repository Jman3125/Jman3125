module.exports = async function(req, res) {
    const id = req.param('id')

    //Find the user, then show who the user is following
    const user = await User.findOne({id: id})
        .populate('following')

    const cleanedData = JSON.parse(JSON.stringify(user))

    if (req.wantsJSON) {
        return res.send(cleanedData)
    }

    res.end()
}