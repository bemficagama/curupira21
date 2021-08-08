module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

        const result = await app.db('urls')
            .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
            .where(function () {
                this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('url', 'like', `%${search}%`)
            })
            .countDistinct('id', { as: 'count' }).first()
        const count = parseInt(result.count)

        app.db('urls').select('id', 'url')
            .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
            .where(function () {
                this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('url', 'like', `%${search}%`)
            })
            .groupBy('id', 'url')
            .limit(pageSize).offset(page * pageSize - pageSize)
            .then(urls => res.json({ data: urls, count }))
            .catch(err => res.status(500).send(err))
    }

    const getCategories = async (req, res) => {
        await app.db('categories')
            .orderBy('name', 'asc')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const url = {
            id: req.body.id,
            url: req.body.url
        }

        const categories = req.body.categories

        if (req.params.id) url.id = req.params.id

        try {
            existsOrError(url.url, 'Url não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (url.id) {
            app.db('urls')
                .update({ id: url.id, url: url.url })
                .where({ id: url.id })
                .then(url1 => {
                    let rows = categories.map(category => {
                        return { url_id: url.id, category_id: category }
                    })
                    if (categories.length > 0) {
                        app.db('url_has_categories')
                            .insert(rows)
                            .onConflict('url_id', 'category_id')
                            .ignore()
                            .then(_ => {
                                app.db('url_has_categories')
                                    .andWhere('url_id', url.id)
                                    .whereNotIn('category_id', categories)
                                    .del()
                                    .then(_ => res.status(204).send())
                                    .catch(err => res.status(500).send(err))
                            })
                            .catch(err => res.status(500).send(err))
                    } else {
                        app.db('url_has_categories')
                            .andWhere('url_id', url.id)
                            .whereNotIn('category_id', categories)
                            .del()
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(500).send(err))
                    }
                })
                .catch(err => res.status(500).send(err))
        } else {
            app.db('urls')
                .insert({ id: url.id, url: url.url })
                .then(id => {
                    if (categories) {
                        let rows = categories.map(category => {
                            return { url_id: id, category_id: category }
                        })
                        app.db('url_has_categories')
                            .insert(rows)
                            .catch(err => res.status(500).send(err))
                    }
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {

            const id = req.params.id
            existsOrError(req.params.id, 'Código da Url não informado.')

            /* const subcategory = await app.db('key_has_categories')
                .where({ key_id: req.params.id })
            notExistsOrError(subcategory, 'Chave possui categorias selecionadas.')

            const category_urls = await app.db('url_has_categories')
                .where({ category_id: req.params.id })
            notExistsOrError(category_urls, 'Categoria possui URLs.') */

            const category_urls = await app.db('url_has_categories')
                .where({ url_id: id })
            notExistsOrError(category_urls, 'Url possui categorias selecionadas.')

            const rowsDeleted = await app.db('urls')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Url não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        const id = req.params.id
        app.db('urls')
            .where({ id: req.params.id })
            .first()
            .then(url => {
                app.db('url_has_categories')
                    .select('category_id')
                    .where('url_id', id)
                    .then(categories => {
                        url.categories = categories.map(reg => {
                            return `${reg.category_id}`
                        })
                        res.json(url)
                    })
                    .catch(err => res.status(500).send(err))
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'urls', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(urls => res.json(urls))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getAll, getById, getByCategory, getCategories }
}