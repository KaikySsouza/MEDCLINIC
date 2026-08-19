import type { PatientCreate, UpdatePatientInterface } from "../interfaces/patientInterface";
import type { Params } from "../interfaces/reqParams";
import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

export const CreatePatient = async (req: Request<{}, {}, PatientCreate>, res: Response) => {
  const {dob, gender, cep, address, telephone, user_Id} = req.body
  
  const patient = await prisma.patients.create({
    data: {
      dob,
      gender,
      cep,
      address,
      telephone,
      user_Id,
    }
  })

  res.status(201).json(patient)
}

export const findPatient = async (req: Request<Params>, res: Response) => {
  const patient = prisma.patients.findUnique({
    where: {id: req.params.id}
  })
  res.status(201).json(patient)
}


export const findAllPatients = async (req: Request, res: Response) => {
  const patients = prisma.patients.findMany()
  res.status(201).json(patients)
}


export const UpdatePatient = async (req: Request<Params, {}, UpdatePatientInterface>, res:Response) => {
  const {dob, gender, cep, address, telephone } = req.body
  const patient = prisma.patients.update({
    where: {id: req.params.id},
    data: {
      dob,
      gender,
      cep,
      address,
      telephone
    }
  })
  res.status(201).json(patient)
}

export const DeletePatient = async (req: Request<Params>, res: Response) => {
  const patient = prisma.patients.delete({
    where: {id: req.params.id}
  })
  res.status(201).json(patient)
}
