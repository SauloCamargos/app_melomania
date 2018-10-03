export interface AccountMoip {
    email:{
        address: string
    }
    person: {
        name: string,
        lastName: string,
        taxDocument: {
            type: string,
            number: string
        }, 
        birthDate: Date,
        phone: {
            countryCode: string,
            areaCode: string,
            number: string
        },
        address: {
            street: string,
            streetNumber: string
            district: string,
            zipCode: string,
            city: string,
            state: string,
            country: string
        }
       },
    type: string,
    transparentAccount: boolean    
}