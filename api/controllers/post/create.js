module.exports = async function(req, res) {
  const postBody = req.body.postBody
  const file = req.file('imagefile')
  const userId = req.session.userId
  try {
    const fileUrl = await sails.helpers.uploadfile(file)

    const postRecord = await Post.create({text: postBody, 
      user: userId,
      imageUrl: fileUrl
    }).fetch()

    await FeedItem.create({
      post: postRecord.id,
      postOwner: userId,
      user: userId,
      postCreatedAt: postRecord.createdAt
    })

    const user = await User.findOne({id: userId}).populate('followers')

    user.followers.forEach(async f => {
      await FeedItem.create({
        post: postRecord.id,
        postOwner: userId,
        user: f.id,
        postCreatedAt: postRecord.createdAt
      })
    });

    res.end()

  } catch (error) {
    return res.serverError(error)
  }
}