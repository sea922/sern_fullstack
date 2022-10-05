import db from '../models/index';

let createSpecialty = (data) => {
  return new Promise(async(resolve, reject) => {
    try{
      if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
        resolve({
          errCode: 1,
          errMess: 'Missing parameter'
        })
      }else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown
        })
        resolve({
          errCode: 0,
          errMess: 'OK'
        })
      }
    }catch(err){
      reject(err);
    }
  })
}

let getAllSpecialty = () => {
  return new Promise(async(resolve, reject) => {
    try{
      let data = await db.Specialty.findAll({});
      if(data && data.length > 0) {
        data.map(item => {
          item.image = new Buffer(item.image, 'base64').toString('binary');
        })
      }
      resolve({
        errCode: 0,
        errMess: 'OK',
        data
      })
    }catch(err){
      reject(err);
    }
  })
}

const getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async(resolve, reject) => {
    try{
      if(!inputId || !location){
        resolve({
          errCode: 1,
          errMess: 'Missing parameter'
        })
      }else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ['descriptionHTML', 'descriptionMarkdown']
        })
        if(data){
          let doctorSpecialty = [];
          if(location === 'ALL'){
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ['doctorId', 'provinceId']
            })
          }else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location
              },
              attributes: ['doctorId', 'provinceId']
            })
          }
          data.doctorSpecialty = doctorSpecialty;
        }else data = {};
        resolve({
          errCode: 0,
          errMess: 'OK',
          data
        })
      }
    }catch(err){
      reject(err);
    }
  })
}


module.exports = {
  createSpecialty : createSpecialty,
  getAllSpecialty : getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
}