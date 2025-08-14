interface MenuType{
    name: string,
    icon: string,
    url: string
    children?: MenuType[]
}

export type {MenuType}