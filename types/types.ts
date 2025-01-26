export interface Project {
    name: string,
    description: string,
    tech: string[],
    links: { name: string, url: string }[]
    screenData: {
        title: string, 
        contentSrc: string,
        alt: string,
    }
}

export interface IframeMessage {
    page?: string
    close?: string
    projectTitle?: string // To be specific, this refers to the title within screenData
}
