const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const key = { ...req.body }
        if(req.params.id) key.id = req.params.id

        try {
            existsOrError(key.key, 'Chave não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(key.id) {
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
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('keys').count('id').first()
        const count = parseInt(result.count)

        app.db('keys')
            .select('id', 'key')
            .limit(limit).offset(page * limit - limit)
            .then(keys => res.json({ data: keys, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('keys')
            .where({ id: req.params.id })
            .first()
            .then(key => {
                key.content = key.content.toString()
                return res.json(key)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'keys', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(keys => res.json(keys))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}