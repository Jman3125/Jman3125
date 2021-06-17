/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

  'GET /faq':                { action:   'view-faq' },
  'GET /legal/terms':        { action:   'legal/view-terms' },
  'GET /legal/privacy':      { action:   'legal/view-privacy' },
  'GET /contact':            { action:   'view-contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },

  'GET /signin':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account-update':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },


  //CUSTOM ROUTING
  //When you search a route it directs you to a view,
  //that view then requests data from the url under it, e.g. the search view hits /search-data
  //and it then get's the data and renders the page out with sed data

  //Home/main feed route
  'GET /': { 
    view: 'pages/feed/home',
    locals: {
      layout: 'layouts/layout'
    }
  },
  //These are the same routes just the one below is for home page uploads because the one above doesnt work there for some reason,
  //they both point to the home view and get data from
  //the /feed-data below...
  //Route for home page uploads
  'GET /post': { 
    view: 'pages/feed/home',
    locals: {
      layout: 'layouts/layout'
    }
   },
   'GET /feed-data': { action: 'feed/home' },

  //Entrance route
  //Adding this as login so that it is the first page that people see when application is presented
  //because I honeslty don't know how to change the url of the landing page
  'GET /login': {
    view: 'pages/entrance/welcome',
    locals: {
      layout: 'layouts/layout'
    }
  },
  //Routes for users DELETE ME WHEN LAUNCHING DELETE ME WHEN LAUNCHING DELETE ME WHEN LAUNCHING DELETE ME WHEN LAUNCHING
  'GET /listusers':       'user/listusers',
  //Routes for posts
  'POST /create':           { action: 'post/create' },
  //Delete reqs for post here
  'DELETE /post/:postId': {action: 'post/delete' },
  //Account routes
  'GET /account': {
    view: 'pages/user/account',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /account-data': 'user/account/account',
  //Routes for updating the user
  'POST /update-acc':    { action: 'user/account/update-acc' },
  //Public profile
  'GET /public-profile/user': {
    view: 'pages/user/publicprofile',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /user-data/:u': 'user/publicprofile',

  //Show follwers and following list
  'GET /followers/:u': { 
    view: 'pages/user/followers',
    locals: {
      layout: 'layouts/layout'
    }
   },
   'GET /followers/data/:id': 'user/followers',
   'GET /following/:u': { 
     view: 'pages/user/following',
     locals: {
       layout: 'layouts/layout'
    }
  },
  'GET /following/data/:id': 'user/following',

  //Routes for search
  'GET /search': { 
    view: 'pages/user/search/search', 
    locals: { 
      layout: 'layouts/layout' 
    }
  },
  'GET /search-data': {action: 'user/search'},
  
  'POST /follow/:id':     { action: 'user/follow' },
  'POST /unfollow/:id':   { action: 'user/unfollow' },
  //This is these are the routes to handle searching/advanced searching.
  'GET /search-results/query': {
    view: 'pages/user/search/search-results',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /search-results/data/:q': { action: 'user/find' },
  //Routes to handle advanced searching e.g. searching for location and type of music
  'GET /advanced-search/query': {
    view: 'pages/user/search/search-results-advanced',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /advanced-search/data/:l/:mt': { action: 'user/advanced-search' },
  //Routes for band actions
  'GET /band-form': {
    view: 'pages/user/update-band',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /band-form-data':       { action: 'user/band/band-form' },
  'POST /update-band':    { action: 'user/band/update-band' },

  //USER INFORMATION
  'GET /user-info/:u': {
    view: 'pages/user/user-info',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /user-info-data/:id': {action: 'user/userinfo'},

  'GET /band-terms': {
    view: 'pages/legal/band-terms',
    locals: {
      layout: 'layouts/layout'
    }
  },

  //Like post route (claps)
  'POST /clap/:p': {action: 'post/claps/clap'},
  //Dislike or 'unclap' a post
  'POST /unclap/:p': {action: 'post/claps/unclap'},
  //Show the users who have liked a certain post
  'GET /claps-page/post': {
    view: 'pages/user/claps-page/claps',
    locals: {
      layout: 'layouts/layout'
    }
  },
  'GET /post-claps/:p': {action: 'post/claps/claps-page'}

};