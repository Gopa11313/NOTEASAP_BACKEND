// use the path of your model
const Register = require('../Models/RegisterUSer');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/NoteAsap';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Register Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', () => {
        const user = {
            'name': 'dummy name',
            'email': 'dummy1234@gmail.com',
            'password': "dummy",
            'image': 'noimg'
        };

        return Register.create(user)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('dummy name');
            });
    });

    it('to test the update', async () => {
        return Register.findOneAndUpdate({ _id: Object('606d48358c59ed26c81f1a5c') },
            { $set: { name: 'dummy name' } })
            .then((pp) => {
                expect(pp.name).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Register.deleteOne({_id: '606d48358c59ed26c81f1a5c'});
        expect(status.ok).toBe(1);
    })

    

})