export interface Project {
    name: string,
    description: string,
    tech: string[],
    links: { name: string, url: string }[]
}

export interface IframeMessage {
    page?: string
    close?: string
}
