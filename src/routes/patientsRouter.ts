import  express from "express"
import { CreatePatient, DeletePatient, findAllPatients, findPatient, UpdatePatient } from "../controllers/patientsController"
import ValidateTokenJwt from "../utils/jwt"
import { validate } from "../middlewares/validationMiddleware"
import { CreatePacientSchema, DeletePatientSchema, FindPatientSchema, UpdatePatientSchema } from "../schemas/patientSchemas"


const PatientRouter = express()

PatientRouter.post('/',ValidateTokenJwt, validate(CreatePacientSchema), CreatePatient)
PatientRouter.get('/view-patients',ValidateTokenJwt,findAllPatients)
PatientRouter.get('/view-profile/:id',validate(FindPatientSchema), findPatient)
PatientRouter.put('/update-patient/:id',validate(UpdatePatientSchema), UpdatePatient)
PatientRouter.delete('remove-profile/:id',validate(DeletePatientSchema), DeletePatient)


export default PatientRouter
