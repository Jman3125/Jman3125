module.exports = async function(req, res) {
    const currentUserId = req.session.userId
    const userIdToFollow = req.param('id')
    await User.addToCollection(currentUserId, 'following',
        userIdToFollow)

    //Posts for the user the requesting user is wanting to follow
    const posts = await Post.find({user: userIdToFollow})
    posts.forEach(async p => {
        await FeedItem.create({
            post: p.id,
            postOwner: userIdToFollow,
            user: currentUserId,
            postCreatedAt: p.createdAt
        })
    });

    await User.addToCollection(userIdToFollow, 'followers',
        currentUserId) 

    res.end()
}