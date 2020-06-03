export interface INavigationTypes {
    link: string,
    title: string,
    type: LinkImportance
}

export enum LinkImportance {
    major = 'major',
    minor = 'minor',
    external = 'external'
}

export default INavigationTypes