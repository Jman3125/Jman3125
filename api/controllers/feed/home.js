module.exports = async function(req, res) {

    const userId = req.session.userId

    const allPosts = []
    //Finding the users (and users there following) posts, then populating their feed
    const feedItems = await FeedItem.find({user: userId})
        .sort('postCreatedAt DESC')
        .populate('post')
        .populate('postOwner')
        .limit(15)
    //Setting up some properties that will determine some values in the feed
    feedItems.forEach(fi => {
        if (fi.post) {
            fi.post.user = fi.postOwner
            fi.post.canDelete = fi.post.user.id == req.session.userId
            fi.post.hasLiked = fi.hasLiked
            allPosts.push(fi.post)
        }
    });

    const cleanPosts = JSON.parse(JSON.stringify(allPosts))

    if (req.wantsJSON) {
        return res.send(cleanPosts)
    }

    res.end()
}