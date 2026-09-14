import  express from "express"
import { CreatePatient, DeletePatient, findAllPatients, findPatient, UpdatePatient } from "../controllers/patientsController"
import ValidateTokenJwt from "../utils/jwt"
import { validate } from "../middlewares/validationMiddleware"
import { CreatePacientSchema} from "../schemas/patientSchemas"


const PatientRouter = express()

PatientRouter.post('/create',ValidateTokenJwt, validate(CreatePacientSchema), CreatePatient)
PatientRouter.get('/view-patients',ValidateTokenJwt,findAllPatients)
PatientRouter.get('/view-profile',ValidateTokenJwt, findPatient)
PatientRouter.put('/update-patient',ValidateTokenJwt, UpdatePatient)
PatientRouter.delete('/patient/delete-account',ValidateTokenJwt, DeletePatient)


export default PatientRouter
