var apiEndpoint = require('supertest')("qaeval.herokuapp.com");
var expect = require('chai').expect;
var randomstring = require("randomstring");
var Browser = require('zombie');
var assert = require('assert');
var sleep = require('sleep');

function username(length) {
  return randomstring.generate({length: length, charset: 'alphabetic'})
}

function password(length) {
  return randomstring.generate({length: length-1, charset: 'alphabetic'}) + '0'
}

function email(length) {
  return randomstring.generate({length: length, charset: 'alphabetic'}) + '@email.com'
}

function randomletters(length) {
  return randomstring.generate({length: length, charset: 'alphabetic'})
}

describe("API Requirements -", function () {
  describe("Must have POST -", function () {
    describe("username, password, and email required -", function () {
      var testDataFail = [
                    {data: {"username":""}},
                    {data: {"password":""}},
                    {data: {"email":""}},
                    {data: {"username":"","password":""}},
                    {data: {"username":"","email":""}},
                    {data: {"password":"","email":""}}
                  ];
      testDataFail.forEach(function(test) {
        it("should fail if missing username, password, or email field -" + JSON.stringify(test.data), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(403)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body.result).to.equal("error");
              expect(res.body.message).to.equal("Invalid USER Data provided.");
              done();    
            });
        })
      });
    });

    describe("username field must be 4-10 characters only -", function () {
      var testDataFail = [
                        {data: {"username": username(1), "password": password(10), "email": email(10)}},
                        {data: {"username": username(2), "password": password(10), "email": email(10)}},
                        {data: {"username": username(3), "password": password(10), "email": email(10)}},
                        {data: {"username": username(11), "password": password(10), "email": email(10)}},
                        {data: {"username": username(12), "password": password(10), "email": email(10)}},
                        {data: {"username": username(13), "password": password(10), "email": email(10)}},
                      ];
      var testDataPass = [
                        {data: {"username": username(4), "password": password(10), "email": email(10)}},
                        {data: {"username": username(5), "password": password(10), "email": email(10)}},
                        {data: {"username": username(6), "password": password(10), "email": email(10)}},
                        {data: {"username": username(7), "password": password(10), "email": email(10)}},
                        {data: {"username": username(8), "password": password(10), "email": email(10)}},
                        {data: {"username": username(9), "password": password(10), "email": email(10)}},
                        {data: {"username": username(10), "password": password(10), "email": email(10)}},
                      ];

      testDataFail.forEach(function(test) {
        it("should fail if username length is not 4-10 -" + JSON.stringify(test.data.username), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(403)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body.result).to.equal("error");
              expect(res.body.message).to.equal("Invalid USER Data provided.");
              done();    
            });
        })
      });

      testDataPass.forEach(function(test) {
        it("should pass if username length is 4-10 -" + JSON.stringify(test.data.username), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(201)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body).to.have.property("userid");
              expect(res.body.result).to.equal("success");
              expect(res.body.message).to.equal("User Created");
              done();    
            });
        })
      });

    });

    describe("password field must be 8-20 characters with at least on letter and at least one number -", function () {
      var testDataFail = [
                        {data: {"username": username(8), "password": password(6), "email": email(10)}},
                        {data: {"username": username(8), "password": password(7), "email": email(10)}},
                        {data: {"username": username(8), "password": password(21), "email": email(10)}},
                        {data: {"username": username(8), "password": password(22), "email": email(10)}},
                        {data: {"username": username(8), "password": username(6), "email": email(10)}},
                        {data: {"username": username(8), "password": username(7), "email": email(10)}},
                        {data: {"username": username(8), "password": username(8), "email": email(10)}},
                        {data: {"username": username(8), "password": username(9), "email": email(10)}},
                        {data: {"username": username(8), "password": username(10), "email": email(10)}},
                        {data: {"username": username(8), "password": username(11), "email": email(10)}},
                        {data: {"username": username(8), "password": username(12), "email": email(10)}},
                        {data: {"username": username(8), "password": username(13), "email": email(10)}},
                        {data: {"username": username(8), "password": username(14), "email": email(10)}},
                        {data: {"username": username(8), "password": username(15), "email": email(10)}},
                        {data: {"username": username(8), "password": username(16), "email": email(10)}},
                        {data: {"username": username(8), "password": username(17), "email": email(10)}},
                        {data: {"username": username(8), "password": username(18), "email": email(10)}},
                        {data: {"username": username(8), "password": username(19), "email": email(10)}},
                        {data: {"username": username(8), "password": username(20), "email": email(10)}},
                        {data: {"username": username(8), "password": username(21), "email": email(10)}},
                        {data: {"username": username(8), "password": username(22), "email": email(10)}},
                      ];
      var testDataPass = [
                        {data: {"username": username(8), "password": password(8), "email": email(10)}},
                        {data: {"username": username(8), "password": password(9), "email": email(10)}},
                        {data: {"username": username(8), "password": password(10), "email": email(10)}},
                        {data: {"username": username(8), "password": password(11), "email": email(10)}},
                        {data: {"username": username(8), "password": password(12), "email": email(10)}},
                        {data: {"username": username(8), "password": password(13), "email": email(10)}},
                        {data: {"username": username(8), "password": password(14), "email": email(10)}},
                        {data: {"username": username(8), "password": password(15), "email": email(10)}},
                        {data: {"username": username(8), "password": password(16), "email": email(10)}},
                        {data: {"username": username(8), "password": password(17), "email": email(10)}},
                        {data: {"username": username(8), "password": password(18), "email": email(10)}},
                        {data: {"username": username(8), "password": password(19), "email": email(10)}},
                        {data: {"username": username(8), "password": password(20), "email": email(10)}},
                      ];

      testDataFail.forEach(function(test) {
        it("should fail if password length is not 8-20 with at least one letter and one number -" + JSON.stringify(test.data.password), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(403)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body.result).to.equal("error");
              expect(res.body.message).to.equal("Invalid USER Data provided.");
              done();    
            });
        })
      });

      testDataPass.forEach(function(test) {
        it("should pass if password is 8-20 character with at least one letter and one number -" + JSON.stringify(test.data.password), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(201)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body).to.have.property("userid");
              expect(res.body.result).to.equal("success");
              expect(res.body.message).to.equal("User Created");
              done();    
            });
        })
      });

    });

    describe("email address must be valid and unique -", function () {
      validEmail = email(8)
      var testDataPass = [
                          {data: {"username": username(8), "password": password(8), "email": validEmail}},
                        ];
      var testDataFail = [
                          {data: {"username": username(8), "password": password(8), "email": validEmail}, message: "User with that email already exists"},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8) + '@com.email'}, message: "Invalid USER Data provided."},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8) + 'email.com'}, message: "Invalid USER Data provided."},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8) + '@emailcom'}, message: "Invalid USER Data provided."},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8) + 'emailcom'}, message: "Invalid USER Data provided."},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8) + '@' + randomletters(8) + '@email.com'}, message: "Invalid USER Data provided."},
                          {data: {"username": username(8), "password": password(8), "email": randomletters(8)}, message: "Invalid USER Data provided."}
                        ];
      testDataPass.forEach(function(test) {
        it("should pass if email is unique and valid -" + JSON.stringify(test.data), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(201)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body).to.have.property("userid");
              expect(res.body.result).to.equal("success");
              expect(res.body.message).to.equal("User Created");
              done();    
            });
        })
      });

      testDataFail.forEach(function(test) {
        it("should fail if email is not unique or valid -" + JSON.stringify(test.data), function (done) {
          apiEndpoint
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(test.data)
            .expect(403)
            .expect('Content-Type', 'application/json')
            .end(function (err, res) {
              console.log(res.body)
              expect(res.body).to.have.property("result");
              expect(res.body).to.have.property("message");
              expect(res.body.result).to.equal("error");
              expect(res.body.message).to.equal(test.message);
              done();    
            });
        })
      });
    });

  });

  describe("Must have GET -", function () {
    var testDataPass = [
                        {data: {"username": username(8), "password": password(8), "email": email(8)}},
                        ];
    it("unknown user should return 404", function (done) {
      apiEndpoint
          .get('/api/users/0')
          .set('Accept', 'application/json')
          .expect(404)
      done();
    });
    testDataPass.forEach(function(test) {
      it("should return correct userid -", function (done) {
        var userID;
        apiEndpoint
          .post('/api/users')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send(test.data)
          .expect(201)
          .end(function (err, res) {
            console.log(res.body)
            expect(res.body).to.have.property("result");
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("userid");
            expect(res.body.result).to.equal("success");
            expect(res.body.message).to.equal("User Created");
            userID = res.body.userid;
            done();
          });
        sleep.sleep(2);
        apiEndpoint
          .get('/api/users/' + userID)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            console.log('/api/users/' + userID)
            console.log(res.body)
            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("username");
            expect(res.body).to.have.property("password");
            expect(res.body).to.have.property("email");
            expect(res.body.id).to.equal(userID);
            expect(res.body.username).to.equal(test.data.username);
            expect(res.body.password).to.equal(test.data.password);
            expect(res.body.email).to.equal(test.data.email);
            done();    
          });
      })
    });
  }); 
});

describe('UI Requirements -', function() {
  describe('username field', function() {
    before(function() {
      this.browser = new Browser({ site: 'http://qaeval.herokuapp.com' });
    });
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });
    it('should pass for usernames with 3-11 characters and at least one letter', function(done) {
      done();
    });
    it('should pass for usernames without 3-11 characters and at least one letter', function(done) {
      done();
    });
  });

  describe('password field', function() {
    before(function() {
      this.browser = new Browser({ site: 'http://qaeval.herokuapp.com' });
    });
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });
    it('should pass for passwords with 9-19 characters and at least one number and one letter', function(done) {
      done();
    });

    it('should fail for passwords without 9-19 characters and at least one number and one letter', function(done) {
      done();
    });

    it('should pass for valid password if password and confirm password match', function(done) {
      done();
    });

    it('should fail for if password and confirm password dont match', function(done) {
      done();
    });
  });

  describe('email field', function() {
    before(function() {
      this.browser = new Browser({ site: 'http://qaeval.herokuapp.com' });
    });
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });
    it('should pass valid and unique emails', function(done) {
      done();
    });

    it('should fail for invalid or non-unique emails', function(done) {
      done();
    });
  });

  describe('signup', function() {
    before(function() {
      this.browser = new Browser({ site: 'http://qaeval.herokuapp.com' });
    });
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });
    it('should display welcome page and text if succesful', function(done) {
      done();
    });
    it('should display error message if unsuccesful', function(done) {
      done();
    });
  });
});