import Realm from 'realm'

import ListSchema from './ListSchema'

export default function getRealm() {
    return Realm.open({
        schema: [ListSchema]
    })
}