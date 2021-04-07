// use the path of your model
const UploadNotes = require('../Models/UploadNotes');
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
        const note = {
            'file': 'nofile',
            'email': 'dummy1235@gmail.com',
            'password': "dummy",
            'image': 'noimg'
        };

        return Register.create(user)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('dummy name');
            });
    });

    it('to test the update', async () => {
        return Register.findOneAndUpdate({ _id: Object('606d42e6f77b38125c33f5df') },
            { $set: { name: 'ram' } })
            .then((pp) => {
                expect(pp.name).toEqual('ram')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Register.deleteMany();
        expect(status.ok).toBe(1);
    })

    

})