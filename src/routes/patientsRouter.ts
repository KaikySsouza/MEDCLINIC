import  express from "express"
import { CreatePatient, DeletePatient, findAllPatients, findPatient, UpdatePatient } from "../controllers/patientsController"

const PatientRouter = express()

PatientRouter.post('/', CreatePatient)
PatientRouter.get('/view-patients', findAllPatients)
PatientRouter.get('/view-profile/:id', findPatient)
PatientRouter.put('/update-patient/:id', UpdatePatient)
PatientRouter.delete('remove-profile/:id', DeletePatient)


export default PatientRouter
