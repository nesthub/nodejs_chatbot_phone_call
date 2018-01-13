import Sequelize from 'sequelize'

import { _log, _sequelize } from '../config'

import ExtendController from './extend.controller'

/*
** Class SequelizeController
** This controller is here to connect database
** This controller also load and give table models
*/
module.exports = class SequelizeController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start ()
	** This method connect sequelize to the db
	** This is async because we wait to be connected before continue
	*/
	async start () {
		const function_name = 'start()'
		try {
			this.db = new Sequelize(_sequelize.database, _sequelize.username, _sequelize.password, { ..._sequelize, operatorsAliases: this.operators_aliases })
			await this.db.authenticate()
			global.info(__filename, function_name, 'connection to mysql established')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

	/*
	** Method operators_aliases
	** This is a security requierement by sequelize to prevent json object injection
	** Actually we dont really use it and we should do it later this is important
	*/
	operators_aliases () {
		const function_name = 'operators_aliases()'
		try {
			this.op = Sequelize.Op
			return {}

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

}
