"use client"
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = ({ session }) => {
  const { unread, setUnreadCount } = useGlobalContext(0);

  useEffect(() => {
    if (!session) return
    const getUnreadCount = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');
        if (res.status === 200) {
          const count = await res.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUnreadCount();
  }, [session])

  return unread === 0 ? null : (
    <span
      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
    >
      {unread}
      {/* <!-- Replace with the actual number of notifications --> */}
    </span>
  )
}

export default UnreadMessageCount