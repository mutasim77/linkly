export interface Link {
    id: string
    name: string
    url: string
    tags?: string[]
    createdAt: string
    updatedAt?: string
}

export interface LinkFormData {
    name: string
    url: string
    tags: string[]
}