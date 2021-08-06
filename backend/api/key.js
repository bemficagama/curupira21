const { json } = require('body-parser')
const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

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
            .groupBy('id', 'key')
            .limit(pageSize).offset(page * pageSize - pageSize)
            .then(keys => res.json({ data: keys, count }))
            .catch(err => res.status(500).send(err))
    }

    const getCategories = async (req, res) => {
        return await app.db('categories')
            .orderBy('name', 'asc')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const key = {
            id: req.body.id,
            key: req.body.key
        }

        const categories = req.body.categories

        const oldCategories = async () => {
            return await app.db('key_has_categories')
                .select('id')
                .where('key_id', key.id)
                .catch(err => res.status(500).send(err))
        }

        //const insCategories = categories.filter(x => !oldCategories.includes(x))
        //const delCategories = oldCategories.filter(x => !categories.includes(x))

        //insertKeyInCategories(insCategories)

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
                .insert({ id: key.id, key: key.key })
                .then(id => {
                    if (categories) {
                        rows = categories.map(category => {
                            return { key_id: id, category_id: category }
                        })
                        console.log(rows.length)
                        chunkSize = rows.length
                        app.db('key_has_categories')
                            .batchInsert(rows, chunckSize)
                            .catch(err => res.status(500).send(err))
                    }
                })
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
        const id = req.params.id
        app.db('keys')
            .where({ id: req.params.id })
            .first()
            .then(key => {
                app.db('key_has_categories')
                    .select('category_id')
                    .where('key_id', id)
                    .then(categories => {
                        key.categories = categories.map(reg => {
                            return `${reg.category_id}`
                        })
                        res.json(key)
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