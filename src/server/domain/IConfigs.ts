export interface IConfigs {
    mongodb: IMongo,
    saltRounds: number,
    secret: string
}

interface IMongo {
    url: string,
    port: number,
    username: string,
    password: string,
    collection: string,
}
