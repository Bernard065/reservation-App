import React from 'react'
import { FaSwimmingPool, FaUtensils, FaWifi, FaCar } from "react-icons/fa";
import './services.css'

const Service = () => {
    const services = [
        {
          icon: <FaSwimmingPool />,
          title: "Swimming Pool",
          description:
            "Take a dip in our crystal clear pool and soak up the sun in one of our comfortable sun loungers.",
        },
        {
          icon: <FaUtensils />,
          title: "Restaurant",
          description:
            "Enjoy a delicious meal in our restaurant featuring a variety of international and local cuisine.",
        },
        {
          icon: <FaWifi />,
          title: "Free Wi-Fi",
          description:
            "Stay connected with our fast and reliable Wi-Fi, available in all areas of the hotel.",
        },
        {
          icon: <FaCar />,
          title: "Free Parking",
          description:
            "Park your car for free in our secure and spacious parking lot with 24-hour surveillance.",
        },
    ];
    
  return (
    <section className='services'>
        <h1>Services</h1>
        <div className='services-center'>
            {services.map((service, index) => (
                <article key={index} className="service">
                    <span>{service.icon}</span>
                    <h6>{service.title}</h6>
                    <p>{service.description}</p>
                </article>
            ))}
        </div>
    </section>
  )
}

export default Service