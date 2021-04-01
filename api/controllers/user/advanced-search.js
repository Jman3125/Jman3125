module.exports = async function(req, res) {

    //Grab the requested Location
    const reqLocation = req.param("l")
    //Get the requested type of music
    //mt = music type
    const reqMusic = req.param("mt")
    const users = await User.find({
        location: {
            contains: reqLocation,
        },

        musicType: {
            contains: reqMusic
        },
        
        id: {
            '!=': req.session.userId
        }
    }).sort('location ASC', 'musicType ASC').limit(20)
    
    //Bring over the following value
    const currentUser = await User.findOne({id: req.session.userId}) 
        .populate('following')

    const followingDict = new Object()
    //O(2n) => O(n)
    //Construct hash map of all users
    currentUser.following.forEach(f => {
        followingDict[f.id] = f
    })

    users.forEach(u => {
        u.isFollowing = followingDict[u.id] != null
    })

    const sanitizedUsers = users.map(u => {
        return {id: u.id, fullName: u.fullName, profileImageUrl: u.profileImageUrl, isFollowing: u.isFollowing, isBand: u.isBand}
    })
    //Send the data back to the view...
    if (req.wantsJSON) {
        return res.send(sanitizedUsers)
    }

    res.end()
}