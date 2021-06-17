module.exports = async function(req, res) {
  const fullName = req.body.fullName
  const showEmailValue = req.body.showEmail
  //Just doing a quick check to make sure there is a full name
  if (fullName == "") {
    return res.serverError()
  } 
  const bio = req.body.bio
  const phone = req.body.phone
  const file = req.file('imagefile')
  const userId = req.session.userId
  
  String.prototype.capitalize = function() {
      return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
  };
  
  var capFullName = fullName.toLowerCase().capitalize();

  if (file.isNoop) {
    try {
        await User.update({id: req.session.userId})
            .set({fullName: capFullName, phone: phone, bio: bio, showEmail: showEmailValue})
            file.upload({noop: true})
            return res.end()
    } catch (error) {
        return res.serverError()
    };
  }

  try {
    const fileUrl = await sails.helpers.uploadfile(file)
    await User.update({id: userId})
      .set({fullName: capFullName, phone: phone, bio: bio, profileImageUrl: fileUrl, showEmail: showEmailValue})
    res.end()
  } catch (err) {
    return res.serverError(err)
  }

}