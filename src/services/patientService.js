import db from "../models";
require('dotenv').config();

import emailService from './emailService';
import { v4 as uuid4} from 'uuid';


let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
}


let postBookAppointment = (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if(!data.email || !data.doctorId || !data.timeType || 
        !data.date || !data.fullName || !data.selectGender || !data.address) {
        resolve({
          errCode: 1,
          errMessage: 'Missing parameter'
        })
      }else {

        let token = uuid4();
        await emailService.sendEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token)
        })

        let user = await db.User.findOrCreate({
          where: { email : data.email },
          defaults: {
            email: data.email,
            roleId: 'R3',
            gender: data.selectGender,
            address: data.address,
            firstName: data.fullName
          }
        })
        console.log('check user: ', user[0]);
        //create booking record
        if(user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id},
            defaults: {
              statusId: 'S1',
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token
            }

          })
        }
        resolve({
          data: user,
          errCode: 0,
          errMessage: 'save infor patient succeed'
        })
      }
    } catch (e) {
      reject(e);
    }
  })
}


let postVerifyBookAppointment = (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if(!data.token || !data.doctorId){
        resolve({
          errCode: 1,
          errMessage: 'Missing parameter'
        })
      }else {
        let appointment = await db.Booking.findOne({
          where : {
            doctorId: data.doctorId,
            token: data.token,
            statusId: 'S1'
          },
          raw: false
          
        })
        if(appointment){
          appointment.statusId = 'S2';
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: 'Update the appointment succeed'
          })
        }else {
          resolve({
            errCode: 2,
            errMessage: 'Appointment has been actived or does not exist'
          })
        }
      }
    } catch (e) {
      reject(e);
    }
  })
} 

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  
}