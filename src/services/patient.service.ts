import type { IPatientRepo, IPatientService, PatientInterface, UpdatePatientInterface } from "../interfaces/patientInterface";


class PatientService implements IPatientService  {
  constructor(private patientrepository: IPatientRepo)
  {}

  async create(data: PatientInterface, userid: Express.UserReq) {



    const patient = await this.patientrepository.patientCreate(data.dob, data.gender, data.cep, data.address, data.telephone, userid )

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
