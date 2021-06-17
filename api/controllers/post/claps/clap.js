module.exports = async function(req, res) {
    const postId = req.param('p')
    try {
        await FeedItem.update({
            post: postId,
            user: req.session.userId
        }).set({hasLiked: true})

        await Post.update({
            id: postId,
            user: req.session.userId
        }).set({hasLiked: true})

        await Claps.create({
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