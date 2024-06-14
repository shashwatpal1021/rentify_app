"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read)
  const [isDeleted, setIsDeleted] = useState(message.deleted)
  
  const {setUnreadCount} = useGlobalContext()
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      })

      if (res.status === 200) {
        const { read } = await res.json()
        setIsRead(read)
        setUnreadCount((prev)=>(read ? prev - 1 : prev + 1))
        if (read) {
          toast.success('Marked as read')
        } else {
          toast.success('Marked as new')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      })

      if (res.status === 200) {
        setIsDeleted(true)
        setUnreadCount((prev)=>(prev - 1)) 
        toast.success('Message deleted')
      }
    } catch (error) {
      console.log(error)
      toast.error("Message not deleted")
    }
  }
 if(isDeleted) return null
  return (

    <div
      className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-whitw px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property}
      </h2>
      <p className="text-gray-700">
        {message.message}
      </p>

      <ul className="mt-4">
        <li><strong>Name:</strong> {message.sender.username}</li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500"
          >{message.email}</a
          >
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500"
          >{message.phone}</a
          >
        </li>
        <li><strong>Received:</strong>{(message.createdAt).localeString()}</li>
      </ul>
      <button
        className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'}  py-1 px-3 rounded-md`}
        onClick={handleReadClick}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
        Mark As Read
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>

  )
}

export default Message