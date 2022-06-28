import specialtyController from '../services/specialtyService';

let createSpecialty = async(req, res) => {
  try{
    let infor = await specialtyController.createSpecialty(req.body);
    return res.status(200).json(infor);
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMess: 'Error from server'
    })
  }
}

let getAllSpecialty = async(req, res) => {
  try{
    let infor = await specialtyController.getAllSpecialty();
    return res.status(200).json(infor);
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMess: 'Error from server'
    })
  }
}


module.exports = {
  createSpecialty : createSpecialty,
  getAllSpecialty: getAllSpecialty
}