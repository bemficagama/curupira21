const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

        console.log(categoryId)

        const result = await app.db('urls')
            .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
            .where(function () {
                this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('url', 'like', `%${search}%`)
            })
            .count('id', { as: 'count' }).first()
        const count = parseInt(result.count)

        app.db('urls').select('id', 'url')
            .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
            .where(function () {
                this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('url', 'like', `%${search}%`)
            })
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

        if (req.params.id) url.id = req.params.id

        try {
            existsOrError(url.url, 'Url não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (url.id) {
            app.db('urls')
                .update(url)
                .where({ id: url.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('urls')
                .insert(url)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('urls')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('urls')
            .where({ id: req.params.id })
            .first()
            .then(url => res.json(url))
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