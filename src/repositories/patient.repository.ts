
import type { Gender, PatientCreate } from "../interfaces/patientInterface";
import { prisma } from "../lib/prisma";
import HTTPException from "../middlewares/httpExeception";

class PatientRepository {


async  patientCreate(  dob: string, gender: Gender, cep: string, address: string,telephone: string, user_Id: number, userid: Express.UserReq){
  const { id } = userid
  const date = new Date(dob)
  const patient  = await prisma.patients.create({
    data:{
      dob: date,
      gender,
      cep,
      address,
      telephone,
      user_Id: Number(id),
    }

  })
  return patient
}

async patientProfile(userid: Express.UserReq) {

  const {id} = userid
  const patient = await prisma.patients.findUnique({where:{user_Id: Number(id)}})

  if (!patient){
    throw new HTTPException('Error', 404)
  }
  return patient
}

async findAllPatients() {
  const patients = await prisma.patients.findMany()
  return patients
}

async patientUpdate(dob: string, gender: Gender, cep: string, address: string,telephone: string, userid: Express.UserReq) {
  let date
  if(dob) {
    date = new Date(dob)
  }
  const {id} = userid
  const patient = await prisma.patients.update({
    data:{
     dob: date,
      gender,
      cep,
      address,
      telephone,
    }, where: {user_Id: Number(id)} })
    return patient
}

async patientDelete(userid: Express.UserReq) {
  const {id} = userid
  const patient = await prisma.patients.delete({where: {user_Id: Number(id)}})
return patient
}

}

export {PatientRepository}
