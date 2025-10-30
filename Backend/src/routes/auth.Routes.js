const express = require('express')
const {userRegister, userLogin, userLogout, userUpdate, getMyProfile, getAllUsers, getUserProfile}= require('../controllers/authController')
const {toggleFollow} = require('../controllers/toggleController')
const {authMiddleware} = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/user/register', userRegister)         //user ragister
router.post('/user/login', userLogin)               //user login
router.post('/user/logout', userLogout)             //user logout
router.put('/user/update', authMiddleware, userUpdate)       //user update
router.get('/user/myprofile', authMiddleware, getMyProfile) //get my profile
router.get('/user/userprofile/:id', authMiddleware, getUserProfile) //get user profile by id
router.get('/user/allusers', authMiddleware, getAllUsers)      //get all users
router.post("/user/follow/:id", authMiddleware, toggleFollow) //follow/unfollow a user

module.exports = router
