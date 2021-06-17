//The profile page for the current user
module.exports = async function(req, res) {
    //Grab the current users Id
    const currentId = req.session.userId
    //Find the current user with the info we grabbed from above useing the currenct user's id
    //Then populate the following - followers values
    const currentUser = await User.findOne({id: currentId})
        .populate('following')
        .populate('followers')

    //Find the posts to show in the account
    const posts = await Post.find({user: req.session.userId}).sort('createdAt DESC')
        .populate('user').limit(25)

    //Set the canDelete bool to true so that the 
    //current user can delete his/her posts
    posts.forEach(p => p.canDelete = true)

    posts.forEach(p => p.hasLiked = p.hasLiked)

    //Set the current users posts to the posts from above
    currentUser.posts = posts

    //Grab the necessary info 
    const sanitizedUser = JSON.parse(JSON.stringify(currentUser))
    
    //When the request from the page wants the JSON, send it here
    if (req.wantsJSON) {
        return res.send(sanitizedUser)
    }

    res.end()
}