export default class HTTPException extends Error {
  statusCode: number
  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
    this.name = 'httpExeception'
  }
}
