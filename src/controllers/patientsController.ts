import type { IPatientService, PatientInterface, UpdatePatientInterface } from "../interfaces/patientInterface";
import type { Params } from "../interfaces/paramsInterface";
import type { Request, Response } from "express";





 export class PatientController {

  constructor(private readonly patientService: IPatientService)
  {}

 CreatePatient = async (req: Request<{}, {}, PatientInterface>, res: Response) => {
  const patient = await this.patientService.create(req.body, req.user)

  res.status(201).json(patient)
}

 findPatient = async (req: Request, res: Response) => {

   const patient = await this.patientService.viewprofile(req.user)
  res.status(201).json(patient)
}


 findAllPatients = async (req: Request, res: Response) => {
  const patients = await this.patientService.findAll()
  res.status(201).json(patients)
}


 UpdatePatient = async (req: Request<Params, {}, UpdatePatientInterface>, res:Response) => {
  const patient = await this.patientService.update(req.body, req.user)
  res.status(201).json(patient)
}

 DeletePatient = async (req: Request , res: Response) => {

  const patient = await this.patientService.delete(req.user)
  res.status(201).json(patient)
}

}
