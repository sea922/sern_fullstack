import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if(!limit) limit = 10;
  try{
    let doctors = await doctorService.getTopDoctorHome(+limit); //string->int
    return res.status(200).json(doctors)
  }catch(e){
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMesssage: 'Error from server...'
    })
  }
}

let getAllDoctors = async (req, res) => {
  try{
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMesssage: 'Error from server...'
    })
  }
}

let postInforDoctor = async (req, res) => {
  try{
    let respone = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(respone);
  }catch(e){
    return res.status(200).json({
      errCode: -1,
      errMesssage: 'Error from server ...'
    })
  }
}

let getDetailDoctorById = async (req, res) => {
  try{
    let infor = await doctorService.getDetailDoctor(req.query.id);
    return res.status(200).json(infor)
  }catch(e){
    return res.status(200).json({
      errCode: -1,
      errMesssage: 'Error from server ...'
    })
  }
}

//create schedule time doctor
let bulkCreateSchedule = async(req, res) => {
  try {
      let infor = await doctorService.bulkCreateSchedule(req.body);
      return res.status(200).json(infor);
  } catch (e) {
      console.log(e)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from the server'
      })
  }
}

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule
}