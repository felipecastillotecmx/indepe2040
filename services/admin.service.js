const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Admin.findAll();
}

async function getById(id) {
    return await getAdmin(id);
}

async function create(params) {
    // validate
    if (await db.Admin.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const admin = new db.Admin(params);

    // hash password
    admin.password = await bcrypt.hash(params.password, 10);

    // save user
    await admin.save();
}

async function update(id, params) {
    const admin = await getAdmin(id);

    // validate
    const emailChanged = params.email && admin.email !== params.email;
    if (emailChanged && await db.Admin.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(admin, params);
    await admin.save();
}

async function _delete(id) {
    const admin = await getAdmin(id);
    await admin.destroy();
}

// helper functions

async function getAdmin(id) {
    const admin = await db.Admin.findByPk(id);
    if (!admin) throw 'Admin not found';
    return admin;
}
