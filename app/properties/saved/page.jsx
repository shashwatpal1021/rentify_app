"use client"
import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from "react-toastify"


const SavedProperiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.status === 200) {
          const data = res.json()
          // console.log("data", data.then(data => console.log(data)))
          data.then(data => setProperties(data))
          // setProperties(data)
        } else {
          console.log(res.statusText);
          // toast.error('Failed to fetch saved properties')
        }
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch saved properties')
      } finally {
        setLoading(false);
      }
    }
    fetchSavedProperties();
  }, [])

  // { console.log("properties", properties) }
  return loading ? (<Spinner loading={loading} />) : (
    <section className="px-4 py-6">
      <h1 className='text-2xl mb-4'>Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No saved properties </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedProperiesPage