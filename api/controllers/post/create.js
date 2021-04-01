module.exports = async function(req, res) {
  const postBody = req.body.postBody
  const file = req.file('imagefile')
  const userId = req.session.userId
  try {
    const fileUrl = await sails.helpers.uploadfile(file)
    await Post.create({text: postBody, 
      user: userId,
      imageUrl: fileUrl
    }).fetch()

    res.end()

  } catch (error) {
    return res.serverError(error)
  }
}