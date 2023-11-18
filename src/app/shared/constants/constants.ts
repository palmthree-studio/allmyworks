import { ProjectStatus } from "../models/models";

export const ProjectsStatus: ProjectStatus[] = [{
        id: 0,
        name: '🚀 Active',
    },{
        id: 1,
        name: '🛠️ Building',
    },{
        id: 2,
        name: '🏁 Ended',
    }
]

export const currencies: { [key: string]: string } = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'JPY': '¥', // Japanese Yen
    'GBP': '£', // British Pound
    'AUD': 'A$', // Australian Dollar
    'CAD': 'C$', // Canadian Dollar
    'CHF': 'CHF', // Swiss Franc
    'CNY': '¥', // Chinese Yuan
    'SEK': 'kr', // Swedish Krona
    'NZD': 'NZ$', // New Zealand Dollar
}

export const metricsType: string[] = [
    'Financial',
    'Other'
]

export const financialsMetrics: string[] = [
    'Sales',
    'Sold',
    'MRR',
    'ARR'
]

export const otherMetrics: string[] = [
    'followers',
    'users',
    'members',
    'views',
    'listens',
    'readers'
]