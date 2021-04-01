module.exports = async function(req, res) {
    const currentId = req.session.userId

    const currentUser = await User.findOne({id: currentId})

    const cleanedUser = JSON.parse(JSON.stringify(currentUser))

    if (req.wantsJSON) {
        res.send(cleanedUser)
    }
    res.end()
}