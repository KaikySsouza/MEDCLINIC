import type { PatientCreate, UpdatePatientInterface } from "../interfaces/patientInterface";
import type { Params } from "../interfaces/paramsInterface";
import type { Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { PatientRepository } from "../repositories/patient.repository";

  const patientRepository = new PatientRepository
  const patientService = new PatientService(patientRepository)


export const CreatePatient = async (req: Request<{}, {}, PatientCreate>, res: Response) => {
  const patient = await patientService.create(req.body, req.user)

  res.status(201).json(patient)
}

export const findPatient = async (req: Request, res: Response) => {

   const patient = await patientService.viewprofile(req.user)
  res.status(201).json(patient)
}


export const findAllPatients = async (req: Request, res: Response) => {
  const patients = await patientService.findAll()
  res.status(201).json(patients)
}


export const UpdatePatient = async (req: Request<Params, {}, UpdatePatientInterface>, res:Response) => {
  const patient = await patientService.update(req.body, req.user)
  res.status(201).json(patient)
}

export const DeletePatient = async (req: Request , res: Response) => {

  const patient = await patientService.delete(req.user)
  res.status(201).json(patient)
}
