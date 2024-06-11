import connectDB from "@/config/database";
import Property from "@/models/Property";


// Get /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();
    const {searchParams} = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    // const properties = await Property.find({
    //   location: { $regex: location, $options: "i" },
    //   propertyType: { $regex: propertyType, $options: "i" },
    // });
    
    const locationPattern = new RegExp(location, "i");
    // match location pattern against database fields

    let query = {
      $or: [
        { name: locationPattern },
        { description: propertyType },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    }
    // only check for property if its not "All"

    if (propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type= typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,  
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 }); 
  }
}