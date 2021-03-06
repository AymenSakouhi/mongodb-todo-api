const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const  todos = [{
    _id : new ObjectID(),
    text : "first to do"
}, {
    _id : new ObjectID(),
    text : "second to do",
    completed : true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
        }
    ).then(() => done());
});

describe('Post /todos', () => {
   it('should create a new todo', (done) => {
        let text = 'Test to do test';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err , res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
   });


   it('should not create todo with invalid body data', (done) => {
       request(app)
           .post('/todos')
           .send({})
           .expect(400)
           .end((err, res) => {
               if(err) {
                   return done(err);
               }
           })

            Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
            }).catch((e) => done(e));
   });

});

describe('GET /todos', () => {
   it('should get all todos', (done) => {
       request(app)
           .get('/todos')
           .expect(200)
           .expect((res) => {
               expect(res.body.todos.length).toBe(2);
           })
           .end(done);
   })
});


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });


    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 for not non object ids', (done)=> {

        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })

});

describe('DELETE /todos/:id', ()=> {

    it('should remove a todo', (done)=> {
       let hexId = todos[1]._id.toHexString();

       request(app)
           .delete(`/todos/${hexId}`)
           .expect(200)
           .expect((res) => {
             expect(res.body.todo._id).toEqual(hexId);
           })
           .end((err, res) => {
               if(err) {
                   return(done(err));
               }

               Todo.findById(hexId).then((todo)=> {
                   expect(todo).toBeFalsy();
                   done();
               }).catch((e)=> {
                   done(e);
               });


           });
    });

    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 for not non object ids', (done)=> {

        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    })

});

describe('PATCH /todos/:id', ()=> {

    it('should update a todo', (done) => {
        let hexId = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${hexId}`)
            .expect(200)
            .send({
                completed : true,
                text : "Eating so much"
            })
            .expect( (res) => {
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.text).toBe('Eating so much');
                expect(res.body.todo.completedAt)
            })
            .end(done);


                /*Todo.findById(hexId).then((todo) => {
                    expect(todo.completedAt).toBeA('Number');
                    done();
                }).catch((e) => {
                    done(e);
                });*/

            });


    it('should clear completedAt when to do is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .expect(200)
            .send({
                complete : false,
                text: "Hellaluyah"

            })
            .expect( (res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.text).toBe('Hellaluyah');
                expect(res.body.todo.completedAt)
            })
            .end(done);
    });


});