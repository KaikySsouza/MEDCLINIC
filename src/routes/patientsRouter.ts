import  express from "express"
import ValidateTokenJwt from "../utils/jwt"
import { patientController } from "../container/composition-root"


const PatientRouter = express()

PatientRouter.post('/create',ValidateTokenJwt, patientController.CreatePatient)
PatientRouter.get('/view-profile',ValidateTokenJwt, patientController.findPatient)
PatientRouter.get('/view-patients',ValidateTokenJwt,patientController.findAllPatients)
PatientRouter.put('/update-patient',ValidateTokenJwt, patientController.UpdatePatient)
PatientRouter.delete('/patient/delete-account',ValidateTokenJwt, patientController.DeletePatient)


export default PatientRouter
