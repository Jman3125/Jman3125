module.exports = async function(req, res) {

    const userId = req.session.userId
    
    const allPosts = await Post.find({user: userId})
        .populate('user')
        .sort("createdAt DESC")
        .limit(25)

    allPosts.forEach(p => p.canDelete = true)

    const cleanPosts = JSON.parse(JSON.stringify(allPosts))

    if (req.wantsJSON) {
        return res.send(cleanPosts)
    }

    res.end()
}