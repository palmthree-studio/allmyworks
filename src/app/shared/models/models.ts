export interface ProjectStatus {
    id:number,
    name: '🚀 Active' | '🛠️ Building' | '🏁 Ended'
}

export interface ProjectMetrics {
    currency:string,
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