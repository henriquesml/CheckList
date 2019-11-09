export default class ListSchema {
    static schema = {
        name: 'Listas',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            contents: 'string[]',          
        }
    }
}