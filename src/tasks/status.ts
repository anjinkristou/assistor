export const statuses = [
    {id: 'pending', name: 'Pending', color: '#FFA000'},
    {id: 'done', name: 'Done', color: '#CDDC39'},
    {id: 'postponed', name: 'Postponed', color: '#2196F3'},
]

export const getStatus = (id: string) => statuses.find(status => status.id == id);