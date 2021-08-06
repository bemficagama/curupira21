module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getAll)
        .post(app.api.category.save)

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/mains')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getMains)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/keys')
        .all(app.config.passport.authenticate())
        .get(app.api.key.getAll)
        .post(app.api.key.save)

    app.route('/keys/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.key.getCategories)

    app.route('/keys/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.key.getById)
        .put(app.api.key.save)
        .delete(app.api.key.remove)

        app.route('/urls')
        .all(app.config.passport.authenticate())
        .get(app.api.url.getAll)
        .post(app.api.url.save)

    app.route('/urls/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.url.getCategories)

    app.route('/urls/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.url.getById)
        .put(app.api.url.save)
        .delete(app.api.url.remove)


    /* app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(app.api.article.save))
        .delete(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get) */
}