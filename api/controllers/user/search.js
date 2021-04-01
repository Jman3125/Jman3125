module.exports = async function(req, res) {
    //Find the users in the database to display on the search page,
    //I'm limiting it to 8 to reduce lag (because I would not want to have to load 100,000 users on the search page)
    const users = await User.find({
        id: {'!=': req.session.userId}
    }).limit(8)
    //Grab the current user
    const currentUser = await User.findOne({id: req.session.userId}) 
        .populate('following')

    //Use this for the following value
    const followingDict = new Object()

    //Construct hash map of all users
    //Basically iterating through all the users
    //and determining if I am following or not following them...
    currentUser.following.forEach(f => {
        followingDict[f.id] = f
    })

    users.forEach(u => {
        u.isFollowing = followingDict[u.id] != null
    })    
    //Only get the necessary info from below
    const sanitizedUsers = users.map(u => {
        return {id: u.id, fullName: u.fullName, isFollowing: u.isFollowing, isBand: u.isBand, profileImageUrl: u.profileImageUrl}
    })
    if (req.wantsJSON) {
        res.send(sanitizedUsers)
    }
    
    res.end()
}