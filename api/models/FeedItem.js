module.exports = {
    attributes: {
        post: {
            model: 'post'
        },

        user: {
            model: 'user'
        },

        postOwner: {
            model: 'user'
        },

        postCreatedAt: {
            type: 'number'
        },

        hasLiked: {
            type: "boolean",
            defaultsTo: false
        }
    }
}