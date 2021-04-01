module.exports = async function(req, res) {
    const currentUserId = req.session.userId
    const userIdToFollow = req.param('id')
    await User.addToCollection(currentUserId, 'following',
        userIdToFollow)

    await User.addToCollection(userIdToFollow, 'followers',
        currentUserId) 

    res.end()
}