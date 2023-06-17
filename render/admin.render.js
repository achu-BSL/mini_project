const jwt = require('jsonwebtoken')
const CategoryModel = require('../models/categoryModel.js')
const UserModel = require('../models/userModel.js')

//@des http:localhost:3000/admin/login
const loginGET = (req, res)=>{
    const token = req.cookies.adminToken
    if(!token) return res.render('admin_login')

    const admin = jwt.verify(token, process.env.SUPER_SECRET)
    if(!admin) return res.render('admin_login')

    res.status(200).redirect("/admin/panel/category")
}

//@des http:localhost:3000/admin/panel
const panelGET = (req, res)=>{
    res.status(200).send("Admin panel")
}


/**=================CATEGORY GET============== */

//@des http:localhost:3000/admin/panel/category
const categoryGET = (req, res)=>{
    res.status(200).render('admin_category')
}

//@des http:localhost:3000/admin/panel/category/add
const addCategoryGET = (req, res)=>{
    res.status(200).render('admin_addCategory')
}

//@des http:localhost:3000/admin/panel/category/edit/:category_name
const editCategoryGET = async (req, res)=>{
    
    const category_name = req.params.category_name
    
    console.log(category_name)
    try{
        
        const category = await CategoryModel.findOne({category_name})
        if(!category) return res.status(400).send("category not exits")
        
        res.status(200).render('admin_editCategory', {category})
        
    } catch (err) {
        console.log(err.message)
        return res.status(500).send(err.message)
    }
}

/**=================USER GET============== */

//@des http:localhost:3000/admin/panel/user_management
const userManagementGET = async (req, res)=>{
    const users = await UserModel.find()
    res.status(200).render('admin_userManagement', {users})

}





module.exports = {
    loginGET,
    panelGET,
    categoryGET,
    addCategoryGET,
    editCategoryGET,
    userManagementGET
}
