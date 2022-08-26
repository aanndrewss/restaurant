const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/:id', authMiddleWare, userController.addAddress)
router.delete('/:id', authMiddleWare, userController.deleteAddress)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/auth', authMiddleWare, userController.check)
router.get('/:id', authMiddleWare, userController.getUser)

module.exports = router