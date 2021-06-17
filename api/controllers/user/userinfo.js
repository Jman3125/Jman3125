module.exports = async function(req, res) {
    const id = req.param("id")

    const user = await User.findOne({id: id})
    console.log(user.showEmail)
    const cleanedData = JSON.parse(JSON.stringify(user))
    if (req.wantsJSON) {
        return res.send(cleanedData)
    }

    res.end()
}