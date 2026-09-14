import type { Gender } from "../../generated/prisma/enums";
import type { PatientCreate, UpdatePatientInterface } from "../interfaces/patientInterface";
import type { PatientRepository } from "../repositories/patient.repository";

class PatientService {
  constructor(private patientrepository: PatientRepository)
  {}

  async create(data: PatientCreate, userid: Express.UserReq) {

    const patient = await this.patientrepository.patientCreate(data.dob, data.gender, data.cep, data.address, data.telephone, data.user_Id, userid )
    return patient
  }

  async viewprofile(userid: Express.UserReq)  {

    const patient = await this.patientrepository.patientProfile(userid)
    return patient
  }

  async findAll() {
    const patients = await this.patientrepository.findAllPatients()
    return patients
  }

  async update(data: UpdatePatientInterface, userid: Express.UserReq) {
    const patient = await this.patientrepository.patientUpdate(data.dob, data.gender, data.cep, data.address, data.telephone, userid )
    return patient
  }

  async delete(userid: Express.UserReq) {
    const patient  = await  this.patientrepository.patientDelete(userid)
    console.log(patient)
    return patient
  }


}



export {PatientService}
