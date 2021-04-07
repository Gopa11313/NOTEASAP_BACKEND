// use the path of your model
const UploadNotes = require('../Models/UploadNotes');
const mongoose = require('mongoose');
const UploadNote = require('../Models/UploadNotes');
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
            'level': 'test',
            'subject': "test",
            'c_name': 'test',
            'topic':'test',
            'description':'test',
            "userId":"test"
        };

        return UploadNotes.create(note)
            .then((pro_ret) => {
                expect(pro_ret.file).toEqual('nofile');
            });
    });

    it('to test the update', async () => {
        return UploadNotes.findOneAndUpdate({ _id: Object('606d4a64df60f7255812cd73') },
            { $set: { file: 'nofile' } })
            .then((pp) => {
                expect(pp.file).toEqual('nofile')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await UploadNotes.deleteOne({_id:"606d4a64df60f7255812cd73"});
        expect(status.ok).toBe(1);
    })

    

})