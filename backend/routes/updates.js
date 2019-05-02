const express = require('express');
const router = express.Router();
const updateController = require('./controllers/updateController');

router.get('/allposts/:id', (req, res) => {
    updateController.getAllPosts(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.post('/createpost/:id', (req, res) => {
    updateController.createPost(req.body)
    .then(result => {
        res.json(result)       
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.delete('/deletepost/:id', (req, res) => {
    updateController.deletePost(req.params.id, req.query.id)
    .then(result => {
        res.json(result)       
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.put('/editabout/:id', (req, res) => {
    updateController.editAbout(req.params.id, req.body)
    .then(result => {
        res.json(result)       
    })
    .catch(err => {
        res.status(400).json(err)
    }) 
});

router.get('/about/:id', (req, res) => {
    updateController.aboutSection(req.params.id)
    .then(result => {
        res.json(result)       
    })
    .catch(err => {
        res.status(400).json(err)
    }) 
})



router.get('/allpics/:id', (req, res) => {
    updateController.getAllPics(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.post('/addpic/:id', (req, res) => {
    updateController.addPic(req.body)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.delete('/deletepic/:id', (req, res) => {
    updateController.deletePic(req.params.id, req.query.picture)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;