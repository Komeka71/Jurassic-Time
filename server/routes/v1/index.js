const { Router } = require('express')
const eraRoutes = require('./eraRoutes.js')
const dinosaurRoutes = require('./dinosaurRoutes.js')
const searchRoutes = require('./searchRoutes.js')

const router = Router()

router.use('/eras', eraRoutes)
router.use('/dinosaurs', dinosaurRoutes)
router.use('/search', searchRoutes)

module.exports = router