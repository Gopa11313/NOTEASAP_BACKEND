// use the path of your model
const BookMark = require('../Models/BookMark');
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
        const bookmark = {
            'userId': 'test',
            'noteId': 'test'
           
        };

        return BookMark.create(bookmark)
            .then((pro_ret) => {
                expect(pro_ret.userId).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return BookMark.findOneAndUpdate({ _id: Object('606d4a64713f3c51f45395f4') },
            { $set: { userId: 'test' } })
            .then((pp) => {
                expect(pp.userId).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await BookMark.deleteOne({_id:"606d4a64713f3c51f45395f4"});
        expect(status.ok).toBe(1);
    })

    

})