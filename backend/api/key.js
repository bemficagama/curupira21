module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

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

        if (req.params.id) key.id = req.params.id

        try {
            existsOrError(key.key, 'Chave não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (key.id) {
            app.db('keys')
                .update({ id: key.id, key: key.key })
                .where({ id: key.id })
                .then(key1 => {
                    let rows = categories.map(category => {
                        return { key_id: key.id, category_id: category }
                    })
                    if (categories.length > 0) {
                        app.db('key_has_categories')
                            .insert(rows)
                            .onConflict('key_id', 'category_id')
                            .ignore()
                            .then(_ => {
                                app.db('key_has_categories')
                                    .andWhere('key_id', key.id)
                                    .whereNotIn('category_id', categories)
                                    .del()
                                    .then(_ => res.status(204).send())
                                    .catch(err => res.status(500).send(err))
                            })
                            .catch(err => res.status(500).send(err))
                    } else {
                        app.db('key_has_categories')
                            .andWhere('key_id', key.id)
                            .whereNotIn('category_id', categories)
                            .del()
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(500).send(err))
                    }
                })
                .catch(err => res.status(500).send(err))
        } else {
            app.db('keys')
                .insert({ id: key.id, key: key.key })
                .then(id => {
                    if (categories) {
                        let rows = categories.map(category => {
                            return { key_id: id, category_id: category }
                        })
                        app.db('key_has_categories')
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
            existsOrError(req.params.id, 'Código da Chave não informado.')

            /* const subcategory = await app.db('key_has_categories')
                .where({ key_id: req.params.id })
            notExistsOrError(subcategory, 'Chave possui categorias selecionadas.')

            const category_urls = await app.db('url_has_categories')
                .where({ category_id: req.params.id })
            notExistsOrError(category_urls, 'Categoria possui URLs.') */

            const category_keys = await app.db('key_has_categories')
                .where({ key_id: id })
            notExistsOrError(category_keys, 'Chave possui categorias selecionadas.')

            const rowsDeleted = await app.db('keys')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Chave não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
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

    return { save, remove, getAll, getById, getCategories }
}