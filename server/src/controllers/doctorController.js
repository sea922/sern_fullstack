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

//select Schedule Time
let getScheduleByDate = async(req, res) => {
  try {
      let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
      return res.status(200).json(infor);
  } catch (e) {
      console.log(e)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from the server'
      })
  }
}

//extra infor doctor
let getExtraInforDoctorById = async(req, res) => {
  try {
      let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
      return res.status(200).json(infor);
  } catch (e) {
      console.log(e)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from the server'
      })
  }
}

let getProfileDoctorById = async(req, res) => {
  try{
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  }catch(e) {
    return res.status(200).json({
      errCode: -1,
      errCode: 'Error from the server'
    })
  }
}

let getListPatientForDoctor = async(req, res) => {
  try{
    let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
    return res.status(200).json(infor);
  }catch(e){
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server'
    })
  }
}

let sendRemedy = async(req, res) => {
  try{
    let infor = await doctorService.sendRemedy(req.body);
    return res.status(200).json(infor);
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server'
    })
  }
}


module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
  sendRemedy,
}