import  express from "express"
import { CreatePatient, DeletePatient, findAllPatients, findPatient, UpdatePatient } from "../controllers/patientsController"
import TokenJwtValidation from "../middlewares/tokenjwtValidation"


const PatientRouter = express()

PatientRouter.post('/',TokenJwtValidation, CreatePatient)
PatientRouter.get('/view-patients',TokenJwtValidation,  findAllPatients)
PatientRouter.get('/view-profile/:id', findPatient)
PatientRouter.put('/update-patient/:id', UpdatePatient)
PatientRouter.delete('remove-profile/:id', DeletePatient)


export default PatientRouter
