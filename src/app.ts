import * as express from "express";
import * as bodyParser from "body-parser";
 
class App {
 
public app: express.Application;
 
	constructor() {
		this.app = express();
		this.config();
		this.initRoutes();
	}
	 
	private config(): void {
		// support application/json type post data
		this.app.use(bodyParser.json());
		//support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	private initRoutes(): void {
		const suma = (accumulator, currentValue) => accumulator + currentValue;
		const resta = (accumulator, currentValue) => accumulator - currentValue;
		const multiplicacion = (accumulator, currentValue) => accumulator * currentValue;
		const division = (accumulator, currentValue) => accumulator / currentValue;

		this.app.post('/test', (req: any, res: any) => {
			const requestBody = req.body;
			if (Array.isArray(requestBody)) {
				if (requestBody.length === 0) {
					res.status(422).send({ 
						data: '', 
						errors: ['invalid_data_format']
					});
				} else {
					const allNumbers = requestBody.every(item => typeof item === 'number');
					if (allNumbers) { 
						res.json({
							data: {
								suma: requestBody.reduce(suma),
								resta: requestBody.reduce(resta),
								multiplicacion: requestBody.reduce(multiplicacion),
								division: requestBody.reduce(division)
							},
							errors: []
						});	
					} else {
						res.status(422).send({ 
							data: '', 
							errors: ['invalid_data_format'] 
						});	
					}									
				}
			} else {
				res.status(422).send({
					data: '',
					errors: ['invalid_data_format']
				});
			}
		});
	}
 
}
 
export default new App().app;