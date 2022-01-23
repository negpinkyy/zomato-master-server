import jo from "joi";

export const validateRestaurantCity = (restaurantObject) =>{
    const Schema = joi.object({
        city: joi().string().required(),

    })
    return Schema.validateAsync(restaurantObject);
};

export const validaterestaurantSearch = (restaurantObject)=>{
    const Schema = joi.object({
        searchString: joi.string().required(),
    })

    return Schema.validateAsync(restaurantObject)
}