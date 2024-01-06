import React from 'react';
import ProductDisplay from '../../components/ProductDisplay';
import ResponsiveAppBar from '../../components/NavbarWithoutSearchBar';
import Footer from '../../components/Footer';

const index = () => {
  return (
    <div> 
        <ResponsiveAppBar />
        <ProductDisplay />
        <Footer />
    </div>
  )
}

export default index