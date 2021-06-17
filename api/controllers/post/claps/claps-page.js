module.exports = async function(req, res) {
    const postId = req.param('p')
    const claps = await Claps.find({post: postId})
        .populate('user')

    const cleanedData = JSON.parse(JSON.stringify(claps))

    if (req.wantsJSON) {
        return res.send(cleanedData)
    }
    
    res.end()
}