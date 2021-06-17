module.exports = {

    customToJSON: function() {
        const fromNow = sails.moment(this.createdAt).fromNow()
        this.fromNow = fromNow
        return this
    },

    attributes: {
        numClaps: {
            type: 'number',
            defaultsTo: 0
        },

        //Since view such as the account and the public profile do not use the feeditem obj.
        //I'm using this value and just matching the two...
        hasLiked: {
            type: "boolean",
            defaultsTo: false
        },

        //Hide the like button on a post with this value
        showLikeBttn: {
            type: 'boolean',
            defaultsTo: true
        },

        text: {
            type: 'string', required: true, 
        },
        
        imageUrl: {
            type: 'string', 
            defaultsTo: '',
        },
        
        user: {
            model: 'user',
        }
    }
}