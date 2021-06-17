module.exports = async function(req, res) {
    //Capitalize the search query function
    String.prototype.capitalize = function() {
        return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };

    //Grab the requested band name
    const query = req.param('q')

    //Implement the function from above to capitalize each word in the search query
    var capQuery = query.toLowerCase().capitalize();


    const users = await User.find({
        fullName: {
            contains: capQuery,
        },
        
        id: {
            '!=': req.session.userId
        }
    }).sort('fullName ASC').limit(20)

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

    if (req.wantsJSON) {
        res.send(sanitizedUsers)
    }

    res.end()

}