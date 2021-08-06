const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

        console.log(categoryId)

        const result = await app.db('keys')
            .leftJoin('key_has_categories', 'keys.id', 'key_has_categories.key_id')
            .where(function () {
                this.where('key_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('key', 'like', `%${search}%`)
            })
            .count('id', { as: 'count' }).first()
        const count = parseInt(result.count)

        app.db('keys').select('id', 'key')
            .leftJoin('key_has_categories', 'keys.id', 'key_has_categories.key_id')
            .where(function () {
                this.where('key_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('key', 'like', `%${search}%`)
            })
            .limit(pageSize).offset(page * pageSize - pageSize)
            .then(keys => res.json({ data: keys, count }))
            .catch(err => res.status(500).send(err))
    }

    const getCategories = async (req, res) => {
        await app.db('categories')
            .orderBy('name', 'asc')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const key = {
            id: req.body.id,
            key: req.body.key
        }

        if (req.params.id) key.id = req.params.id

        try {
            existsOrError(key.key, 'Chave não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (key.id) {
            app.db('keys')
                .update(key)
                .where({ id: key.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('keys')
                .insert(key)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('keys')
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
        app.db('keys')
            .where({ id: req.params.id })
            .first()
            .then(key => res.json(key))
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'keys', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(keys => res.json(keys))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getAll, getById, getByCategory, getCategories }
}