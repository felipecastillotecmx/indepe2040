const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
const Role = require('../_helpers/role');
const adminService = require('../services/admin.service');

exports.admin_get_all = async function getAll(req, res, next) {
    adminService.getAll()
        .then(admins => res.json(admins))
        .catch(next);
}

exports.admin_get_by_id = async  function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(admin => res.json(admin))
        .catch(next);
}

exports.admin_create = async  function create(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json({ message: 'Admin created' }))
        .catch(next);
}

exports.admin_update = async  function update(req, res, next) {
    adminService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Admin updated' }))
        .catch(next);
}

exports.admin_delete = async  function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json({ message: 'Admin deleted' }))
        .catch(next);
}

// schema functions

exports.admin_create_schema = async  function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

exports.admin_update_squema = async  function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
