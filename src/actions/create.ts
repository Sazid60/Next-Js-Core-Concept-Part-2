"use server" // for converting a regular function to server action function 
export const create = async (data: FormData) => {
    console.log(data)
}