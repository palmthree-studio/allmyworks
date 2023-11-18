export interface ProjectStatus {
    id:number,
    name: '🚀 Active' | '🛠️ Building' | '🏁 Ended'
}

export interface ProjectMetrics {
    currency?:string,
    value:number,
    name:string
}

export interface Project {
    id:number,
    img:string,
    name:string,
    status:ProjectStatus,
    metrics:ProjectMetrics,
    description:string | null,
    url:string | null,
}

export interface Profile {
    name:string,
    username:string,
    img:string
}

export interface Socials {
    xProfile:string,
    igProfile:string,
    urlToPromote:string,
    msgToPromote:string
}