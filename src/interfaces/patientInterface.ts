enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export interface PatientCreate {
  dob: Date
  gender: Gender
  cep: string
  address: string
  telephone: string
  user_Id: number
}

export interface UpdatePatientInterface {
  dob: Date
  gender: Gender
  cep: string
  address: string
  telephone: string
}

