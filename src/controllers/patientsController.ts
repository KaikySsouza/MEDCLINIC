import type { PatientCreate, UpdatePatientInterface } from "../interfaces/patientInterface";
import type { Params } from "../interfaces/paramsInterface";
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
  const  id  = Number(req.params.id)
  const patient = prisma.patients.findUnique({
    where: {id}
  })
  res.status(201).json(patient)
}


export const findAllPatients = async (req: Request, res: Response) => {
  const patients = prisma.patients.findMany()
  res.status(201).json(patients)
}


export const UpdatePatient = async (req: Request<Params, {}, UpdatePatientInterface>, res:Response) => {
  const {dob, gender, cep, address, telephone } = req.body
  const  id  = Number(req.params.id)
  const patient = prisma.patients.update({
    where: {id },
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
  const  id  = Number(req.params.id)
  const patient = prisma.patients.delete({
    where: {id}
  })
  res.status(201).json(patient)
}
