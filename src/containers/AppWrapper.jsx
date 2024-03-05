import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import "./styles.scss"

const AppWrapper = ({ children }) => {
    return (
        <>
            <Header />
            <div className='child' >{children}</div>
            <Footer />

        </>
    )
}

export default AppWrapper
