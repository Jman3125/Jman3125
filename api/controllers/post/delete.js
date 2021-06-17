module.exports = async function(req, res) {
    //Delete post
    const postId = req.param('postId')

    try {
        await Post.destroy({id: postId, user: req.session.userId})

        //Deleting the FeedItems for the users followers
        await FeedItem.destroy({post: postId})
    } catch (err){
        res.serverError(err.toString())
    }
    res.end()
}