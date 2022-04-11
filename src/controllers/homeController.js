import db from '../models/index';
import CRUDservice from '../services/CRUDservice';
//Render data to view
let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------')
        console.log(data)
        console.log('---------')
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

// object:{
//     key:'',
//     value:'',
// }

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async(req, res) => {
    let mess = await CRUDservice.createNewUser(req.body);
    console.log(mess);
    return res.send('success');
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
} 