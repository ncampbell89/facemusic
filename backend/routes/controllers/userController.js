const User = require('./models/User');
const FriendRequest = require('./models/FriendRequests');
const PendingRequest = require('./models/PendingRequests');
const Friends = require('./models/Friends');
const MainPic = require('./models/MainPic');
const uuid = require('uuidv4');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport-spotify');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'b40a880e696b433981d9888e1f9c9ab3',
    clientSecret: 'a549535cd6a042e8ae4ccf1e753405a6',
    redirectUri: 'http://172.31.93.58:3001/auth/spotify/callback'
    // redirectUri: 'http://localhost:3001/auth/spotify/callback'
});

module.exports = {

    allUsers: () => {
        return new Promise((resolve, reject) => {
            User.find()
            .then(users => resolve(users))
            .catch(err => reject(err))
        })
    },

    regLogin: (params) => {
        
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: params.id})
            .then(user => {

                if(!user) {                   

                    const newUser = new User({
                        name: params.name,
                        email: params.email,
                        password: params.password,
                        spotifyID: params.id
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) {
                                throw err
                            } else {
                                newUser.password = hash;
                                newUser.save()
                                .then(saved => resolve(saved))
                                .catch(err => reject(err));
                            }
                        })
                    })
                    
                    theUser.save()
                    .then(savedUser => {
                        resolve(savedUser)
                    })
                    .catch(err => {
                        reject(err)
                    })
                    
                }

                resolve(user)
                
            })
            .catch(err => reject(err))
        })
    },
    

    profilePic: (params) => {
        return new Promise((resolve, reject) => {

            User.findOne({spotifyID: params.id})
            .then(user => {
                let newPicObj = new MainPic({
                    url: params.newPic,
                    user_id: params.picID
                })

                newPicObj.save()
                .then(savedPic => {
                    user.profilePic.unshift(savedPic)

                    user.save()
                    .then(result => resolve(result))
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    },

    profilePicUrls: (id) => {
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: id}, 'profilePic')
            .populate('profilePic', '-user_id -__v')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            })
        })
    },


    friendRequests: (params) => {
        return new Promise((resolve, reject) => {

            User.findOne({spotifyID: params.receiverID})
            .then(found => {

                let newFriend = new FriendRequest({
                    name: params.name,
                    user_id: params.sourceID
                })

                newFriend.save()
                .then(saved => {
                    found.friendRequests.unshift(saved)                   

                    found.save()
                    .then(result => resolve(result))
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    },

    allFriendRequests: (id) => {
        return new Promise((resolve, reject) => {
            // Find the user id then find that user's friend requests
            // populate the inner genres database of the user
            // execute the error or success

            User.findOne({spotifyID: id}, 'friendRequests')
            .populate('friendRequests', '-user_id -__v')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            })
        })
    },


    deleteRequest: (userID, reqID) => {
        return new Promise((resolve, reject) => {

            User.findOne({spotifyID: userID})
            .then(user => {
                let filtered = user.friendRequests.filter(item => {
                    return item != reqID
                })

                user.friendRequests = filtered

                user.save()
                .then(() => {
                    FriendRequest.findByIdAndDelete({_id: reqID})
                    .then(() => {
                        // save the new info in the browser after reloading
                        User.findOne({spotifyID: userID}, 'friendRequests')
                            .populate('friendRequests', '-user_id -__v')
                            .exec((err, data) => {
                                err ? reject(err) : resolve(data)
                            })
                    })
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
            
        })
    },

    cancelRequest: (userID, pendingID) => {
        return new Promise((resolve, reject) => {

            User.findOne({spotifyID: userID})
            .then(user => {
                let filtered = user.pendingRequests.filter(item => {
                    return item != pendingID
                })

                user.pendingRequests = filtered

                user.save()
                .then(() => {
                    PendingRequest.findByIdAndDelete({_id: pendingID})
                    .then(() => {
                        User.findOne({spotifyID: userID}, 'pendingRequests')
                            .populate('pendingRequests', '-user_id -__v')
                            .exec((err, data) => {
                                err ? reject(err) : resolve(data)
                            })
                    })
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))

        })
    },


    pendingRequests: (params) => {
        return new Promise((resolve, reject) => {
            console.log(params)

            User.findOne({spotifyID: params.sourceID})
            .then(found => {
                let pending = new PendingRequest({
                    name: params.name,
                    user_id: params.id
                })

                pending.save()
                .then(saved => {
                    console.log(found)
                    
                    found.pendingRequests.unshift(saved)

                    found.save()
                    .then(result => resolve(result))
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    },

    allPendingRequests: (id) => {
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: id}, 'pendingRequests')
            .populate('pendingRequests', '-user_id -__v')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            })           
        })
    },


    friends: (params) => {
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: params.loggedInUser})
            .then(user => {
                let newFriend = new Friends({
                    name: params.name,
                    user_id: params.id
                })

                newFriend.save()
                .then(saved => {
                    // add the new friend(source) in the receiver's friends list
                    user.friends.unshift(saved)   

                    user.save()
                    .then((result) => {
                        // remove the accepted friend request from the list
                        let filtered = user.friendRequests.filter(item => {
                            return item != params.id
                        })

                        user.friendRequests = filtered

                        user.save()
                            .then(result => resolve(result))
                            .catch(err => reject(err))
                        
                    })
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    },

    // friendsSource: (params) => {
    //     return new Promise((resolve, reject) => {
    //         User.findOne({spotifyID: params.loggedInUser})
    //         .then(user => {
    //             let newFriend = new Friends({
    //                 name: params.name,
    //                 user_id: params.id
    //             })

    //             newFriend.save()
    //             .then(saved => {
    //                 // add the new friend(source) in the receiver's friends list
    //                 user.friends.unshift(saved)   

    //                 user.save()
    //                 .then((result) => {
    //                     // remove the accepted friend request from the list
    //                     let filtered = user.friendRequests.filter(item => {
    //                         return item != params.id
    //                     })

    //                     user.friendRequests = filtered

    //                     user.save()
    //                         .then(result => resolve(result))
    //                         .catch(err => reject(err))
                        
    //                 })
    //                 .catch(err => reject(err))
    //             })
    //             .catch(err => reject(err))
    //         })
    //         .catch(err => reject(err))
    //     })
    // },

    allFriends: (id) => {
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: id}, 'friends')
            .populate('friends', '-user_id -__v')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            }) 
        })      
    },

    profilePage: (id) => {
        return new Promise((resolve, reject) => {
            User.find({spotifyID: id})
            .populate('posts')
            .populate('friends')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            })
        })
    },

    profilePageGenres: (id) => {
        return new Promise((resolve, reject) => {
            User.findOne({spotifyID: id})
            .populate('genres')
            .exec((err, user) => {

                if(err) {
                    reject(err)
                } else if(user) {
                    spotifyApi.clientCredentialsGrant()
                    .then(data => {
                        console.log('The access token expires in ' + data.body['expires_in']);
                        console.log('The access token is ' + data.body['access_token']);

                        spotifyApi.setAccessToken(data.body['access_token'])

                        let genres = []
                        user.genres.forEach(item => {
                            genres.push(item.genre_lowercase)
                        })
                        
                        let genreList = genres.map(item => {
                            var accessToken = data.body['access_token'] 

                            return new Promise((resolve, reject) => {
                                spotifyApi.getCategory(item, {
                                    country: 'US'
                                })
                                .then(data => {                                    
                                    data.body.itemID = uuid()
                                    data.body.accessToken = accessToken  
                                    data.body.userID = id
                                    resolve(data.body)
                                })
                                .catch(err => {
                                    let capitalize = item[0].toUpperCase() + item.slice(1)
                                    let error = `${capitalize} ${err.message}. Redirecting to previous page...`;
                                    reject(error)
                                })
                            })
                            
                        })

                        Promise.all(genreList)
                                .then(result => {
                                    resolve(result)
                                })
                                .catch(err => {
                                    reject(err)
                                })

                    })
                }
            })
        })
    },


    deleteAccount: (id) => {
        return new Promise((resolve, reject) => {

            User.findOneAndDelete({spotifyID: id})
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // testAccount: (id) => {
    //     allFriends(id)
    //     .then(allResuts => {
    //         profilePage(id)
    //         .then(profileResult => {
    //             finalResult = {
    //                 allFriends: allResults,
    //                 profilePage: profileResult
    //             }
    //             resolve(finalResult)
    //         })
    //     })
    // }
}
