import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify('User ID is required'), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify('Message not found'), {
        status: 404,
      });
    }
    // verify ownerShip

    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify('Unauthorized'), {
        status: 401,
      });
    }

    const data = await request.json();


    // upadate message to read/unread depending on the current status

    message.read = !message.read;

    await message.save();
    // const updatedMessage = await Message.findByIdAndUpdate(id, data, {
    //   new: true,
    // });

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}


// DELETE api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify('User ID is required'), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const message = await Message.findById(id);
    if (!message) {
      return new Response(JSON.stringify('Message not found'), {

        status: 404,
      });
    }
    // verify ownerShip
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify('Unauthorized'), {
        status: 401,
      });
    }
    await message.deleteOne(id);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}