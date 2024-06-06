"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import profileDefault from '@/assets/images/profile.png'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const { data: session } = useSession()
  const profileImage = session?.user?.image
  const profileName = session?.user?.name
  const profileEmail = session?.user?.email
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return
      }
      try {
        const res = await axios.get(`/api/properties/user/${userId}`)
        // console.log("res----->", res.data)
        if (res.data) {
          const data = await res.data
          setProperties(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    // Fetch user peoperties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id)
    }
  }, [session])

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this property");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`/api/properties/${propertyId}`)
      console.log("res -->", res)
      if (res.status === 200) {
        const updatedPorperties = properties.filter((property) => property._id !== propertyId)
        setProperties(updatedPorperties)
        // alert("property deleted")
        toast.success("Property Deleted")
      } else {
        alert("failed to delete");
        toast.error("Failed to delete Property")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete Property")
    }
  }

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={profileImage || profileDefault}
                    alt="User"
                    width={200}
                    height={200}
                  />
                </div>
                <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {profileName}</h2>
                <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail}</h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {!isLoading && properties.length === 0 && (
                  <p>You have no Property List.</p>
                )}
                {isLoading ? (<Spinner loading={isLoading} />) : (
                  properties.map((property) => (
                    <div key={property._id} className="mb-10">
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property 1"
                          width={500}
                          height={100}
                          priority={true}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <p className="text-gray-600">{property.location.street}{' '}{property.location.city}, {property.location.state}</p>
                      </div>
                      <div className="mt-2">
                        <Link href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          type="button"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfilePage