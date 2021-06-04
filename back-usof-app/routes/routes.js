'use strict';

module.exports = app => {
    const authRouter = require('./authent');
    const usersRouter = require('./user');
    const postRouter = require('./post');
    const categoriesRouter = require('./categories');
    const commentsRouter = require('./comments');

    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/post', postRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/comments', commentsRouter);
};
