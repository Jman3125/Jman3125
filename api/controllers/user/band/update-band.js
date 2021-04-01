module.exports = async function(req, res) {
    const fullName = req.body.fullName
    const bio = req.body.bio
    const details = req.body.details
    const location = req.body.location
    const musicType = req.body.musicType
    const musicAmount = req.body.musicAmount
    const moneyShow = req.body.moneyShow
    const links = req.body.links
    const phone = req.body.phone
    const isBand = true

    //Capitalize full name
    String.prototype.capitalize = function(){
        return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
        };
    
    var capFullName = fullName.toLowerCase().capitalize();

    //Send the error if one of the required fields is not filled out.
     if (fullName == "") {
        return res.serverError()
     }

    if (location == "") {
        return res.serverError()
    }

    if (musicType == "") {
        return res.serverError()
    }

    if (musicAmount == "") {
        return res.serverError()
    }

    if (moneyShow == "") {
        return res.serverError()
    }

    try {
        await User.update({id: req.session.userId})
            .set({fullName: capFullName, bio: bio,
                details: details, location: location,
                musicType: musicType, musicAmount: musicAmount,
                moneyShow: moneyShow, links: links, 
                phone: phone, isBand: isBand})
    } catch (error) {
        return res.serverError(err)
    };

    res.end()
}