module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            parentId: Number(req.body.parentId) == 0 ? null : Number(req.body.parentId)
        }

        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
            existsOrError(category.description, 'Descrição não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')

            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')

            const category_urls = await app.db('url_has_categories')
                .where({ category_id: req.params.id })
            notExistsOrError(category_urls, 'Categoria possui URLs.')

            const category_keys = await app.db('key_has_categories')
                .where({ category_id: req.params.id })
            notExistsOrError(category_keys, 'Categoria possui Chaves.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    /* const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }
 */
    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const main = Number(req.query.parentId) == 0 ? null : Number(req.query.parentId)
        const search = req.query.search || ''

        const result = await app.db('categories')
            .where(function () {
                this.where('parentId', main).orWhereRaw(`(${Number(main) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                //.orWhere(true)
            }).count('id', { as: 'count' }).first()
        const count = parseInt(result.count)

        app.db('categories')
            .where(function () {
                this.where('parentId', main).orWhereRaw(`(${Number(main) == 0 ? true : false})`)
            })
            .andWhere(function () {
                this.where('name', 'like', `%${search}%`)
            })
            .limit(pageSize).offset(page * pageSize - pageSize)
            //.then(categories => res.json({ data: withPath(categories), count }))
            .then(categories => res.json({ data: categories, count }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const getMains = (req, res) => {
        app.db('categories')
            .whereNull('parentId')
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getAll, getById, getTree, getMains }
}