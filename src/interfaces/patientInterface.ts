import type { Gender } from "../../generated/prisma/enums"



export interface PatientInterface {
  dob: Date
  gender: Gender
  cep: string
  address: string
  telephone: string
}


export interface UpdatePatientInterface {
  dob: string
  gender: Gender
  cep: string
  address: string
  telephone: string
}


export interface IPatientService {
  create(data: PatientInterface, userid: Express.UserReq): Promise<PatientInterface>
  viewprofile(userid: Express.UserReq): Promise<PatientInterface>
  findAll(): Promise<PatientInterface[]>
  update(data:UpdatePatientInterface, userid: Express.UserReq): Promise<PatientInterface>
  delete(userid: Express.UserReq): Promise<PatientInterface>
}


export interface IPatientRepo {
  patientCreate(dob: Date, gender: Gender, cep: string, address: string,telephone: string, userid: Express.UserReq): Promise<PatientInterface>
  patientProfile(userid: Express.UserReq): Promise<PatientInterface>
  findAllPatients(): Promise<PatientInterface[]>
  patientUpdate(dob: string, gender: Gender, cep: string, address: string,telephone: string, userid: Express.UserReq): Promise<PatientInterface>
  patientDelete(userid: Express.UserReq): Promise<PatientInterface>
}
