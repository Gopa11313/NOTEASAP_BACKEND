// use the path of your model
const Comment = require('../Models/Comment');
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
describe('Comment Schema test anything', () => {
    // the code below is for insert testing
    it('Add comment testing anything', () => {
        const comment = {
            'userId': 'test',
            'noteId': 'test',
            'comment': "test"
        };

        return Comment.create(comment)
            .then((pro_ret) => {
                expect(pro_ret.userId).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return Comment.findOneAndUpdate({ _id: Object('606d489c2049660d18cf2f84') },
            { $set: { userId: 'test' } })
            .then((pp) => {
                expect(pp.userId).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Comment.deleteOne({_id: '606d489c2049660d18cf2f84'});
        expect(status.ok).toBe(1);
    })

    

})