export type Favorite = {
    image_url:string, 
    name:string,
    location: {
        city:string, 
        state:string, 
        zip_code:string,
    }, 
    categories:[{
        title:string
    }],
    rating:number, 
    review_count:number
}

export type Business = {
    image_url:string, 
    name:string,
    location: {
        city:string, 
        state:string, 
        zip_code:string,
    }, 
    categories:[{
        title:string
    }],
    rating:number, 
    review_count:number
}

export type NewUser = {
    uid: string,
    email: string,
    password: string, 
    favorites?: Favorite | [],
}
