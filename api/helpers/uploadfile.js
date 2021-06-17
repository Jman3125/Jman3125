module.exports = {


  friendlyName: 'Uploadfile',


  description: 'Upload a file such as the profile picture',


  inputs: {
    file: {
      type: 'ref',
      description: "The file I want to upload to AWS S3"
    },
  },


  exits: {

    success: {
      description: 'All done, the file was uploaded!',
    },

  },

  fn: async function (inputs, exits) {
    const file = inputs.file

    const key = process.env.AWS_Key
    const secret = process.env.AWS_Secret
    // Upload file
    const options =
      { // This is the usual stuff
        adapter: require('skipper-better-s3')
      , key: key
      , secret: secret
      , bucket: 'myagent'
        // Let's use the custom s3params to upload this file as publicly
        // readable by anyone
      , s3params:
        { ACL: 'public-read'
        }
        // And while we are at it, let's monitor the progress of this upload
      , onProgress: progress => sails.log.verbose('Upload progress:', progress)
      }

      file.upload(options, async (error, files) => {
        //Throw error
        if (error) { return res.serverError(err.toString()) }
        //success
        const fileUrl = files[0].extra.Location

        return exits.success(fileUrl)
    })
  }


};

