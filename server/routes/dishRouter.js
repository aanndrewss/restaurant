const Router = require('express')
const router = new Router()
const dishController = require('../controllers/dishController')
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/',checkRole('ADMIN'), dishController.create)
router.get('/', dishController.getAll)
router.get('/:id', dishController.getOne)

module.exports = router