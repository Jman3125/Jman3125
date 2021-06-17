module.exports = async function(req, res) {
    const id = req.param('u')

    const posts = await Post.find({user: id}).sort('createdAt DESC')
        .populate('user').limit(25)
    posts.forEach(p => p.showLikeBttn = false)

    //Find the user with the selected id
    const user = await User.findOne({id: id})
        .populate('following')
        .populate('followers')

    //Just grabbing the isFollowing value
    const currentUser = await User.findOne({id: req.session.userId}) 
        .populate('following')

    const followingDict = new Object()

    currentUser.following.forEach(f => {
        followingDict[f.id] = f
    })

    user.isFollowing = followingDict[user.id] != null

    user.posts = posts

    const cleanedUser = {
        id: user.id, 
        fullName: user.fullName, 
        profileImageUrl: user.profileImageUrl,
        isFollowing: user.isFollowing, 
        isBand: user.isBand,
        followers: user.followers, 
        following: user.following,
        posts: user.posts
    }

    const cleanedData = JSON.parse(JSON.stringify(cleanedUser))

    //Ok, what i'm doing here is when the document requests the JSON,
    //they may be able to request their own account, if I do a redirect it
    //does not work (since it's an ajax call), I'm sending a 500 back to the
    //view and I'll handle the rest there, go see pages/user/publicprofile
    //to see the 500 status code handling (I'm just sending the user to their profile when the fail code comes in)
    if (req.wantsJSON) {
        if (id == req.session.userId) {
            return res.serverError()
        } else {
            return res.send(cleanedData)
        }
    }
    
    res.end()
}