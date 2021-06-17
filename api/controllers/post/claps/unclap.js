module.exports = async function(req, res) {
    const postId = req.param('id')
    try {
        await FeedItem.update({
            post: postId,
            user: req.session.userId
        }).set({hasLiked: false})

        await Post.update({
            id: postId,
            user: req.session.userId
        }).set({hasLiked: false})

        await Claps.destroy({
            post: postId,
            user: req.session.userId
        })

        const numClaps = await Claps.count({post: postId})

         await Post.update({
             id: postId
         }).set({numClaps: numClaps})
         
        res.end()
    } catch (err) {
        res.serverError(err.toString())
    }

    res.end()
}