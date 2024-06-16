import mongoose  from "mongoose"
export const dbConnect=async()=>{try {
    
    const connectioninstance=await mongoose.connect(`${process.env.DATABASE_URL!}`)
    console.log(`Database is connected on host :${  connectioninstance.connection.host}`)
} catch (error) {
 console.error(error)   
}
}