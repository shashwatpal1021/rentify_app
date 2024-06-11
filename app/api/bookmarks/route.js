import Property from "@/app/models/Property";
import User from "@/app/models/User";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";


// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;


    // Find user in database
    const user = await User.findOne({ _id: userId });


    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Removed from bookmarks";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Added to bookmarks";
      isBookmarked = true;
    }
    await user.save();

    // console.log("user", user);
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}


// Get /api/bookmarks
export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }
    const { userId } = sessionUser;
    const user = await User.findOne({ _id: userId });

    // get users bookmarks
    const bookmarks = await Property.find(
      {
        _id: { $in: user.bookmarks },
      }
    )
    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}
