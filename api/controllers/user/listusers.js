module.exports = async function(req, res) {
    const user = await User.find()
    res.send(user)
}