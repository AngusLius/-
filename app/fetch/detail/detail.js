import { get } from '../get'

export function getInfo(id) {
    return get('/api/detail/info/' + id)
}

export function getComment(page, id) {
    return get('/api/detail/comment/' + page + '/' + id)
}