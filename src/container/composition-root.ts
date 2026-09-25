import app from "../app";
import { PatientController } from "../controllers/patientsController";
import { UserController } from "../controllers/usersController";
import { PatientRepository } from "../repositories/patient.repository";
import { UsersRepository } from "../repositories/user.repository";
import { PatientService } from "../services/patient.service";
import { UsersService } from "../services/user.service";

const repository = new UsersRepository()
const service = new UsersService(repository)
const controller = new UserController(service)

const patientRepo = new PatientRepository()
const patientService = new PatientService(patientRepo)
const patientController = new PatientController(patientService)



export {controller, patientController}

