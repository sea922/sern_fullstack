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
}