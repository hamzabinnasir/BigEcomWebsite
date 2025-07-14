import React from "react"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Carousel from "../../components/Carousel/Carousel.jsx"
import ProductGallery from "../../components/ProductGallery/ProductGallery.jsx"
import Footer from "../../components/Footer/Footer.jsx"
export default function Home() {
    return (
        <>
            <section id="homeSection">
                <Header />
                <Navbar />
                <Carousel />
                <div className="productGallerySectionContainer">
                    <ProductGallery title={`Men's Kurtas`} topLevelCategory={"men"} secondLevelCategory={"clothing"} thirdLevelCategory={"kurtas"} />
                    <ProductGallery title={`Men's Shoes`} topLevelCategory={"men"} secondLevelCategory={"clothing"} thirdLevelCategory={"shoes"} />
                    <ProductGallery title={`Lengha Choli`} topLevelCategory={"women"} secondLevelCategory={"clothing"} thirdLevelCategory={"lenghaCholi"} />
                    <ProductGallery title={`Saree`} topLevelCategory={"women"} secondLevelCategory={"clothing"} thirdLevelCategory={"saree"} />
                    <ProductGallery title={`Dress`} topLevelCategory={"women"} secondLevelCategory={"clothing"} thirdLevelCategory={"dress"} />
                    <ProductGallery title={`Women's Kurtas`} topLevelCategory={"women"} secondLevelCategory={"clothing"} thirdLevelCategory={"gouns"} />
                    <ProductGallery title={`Women's gouns`} topLevelCategory={"women"} secondLevelCategory={"clothing"} thirdLevelCategory={"gouns"} />
                </div>
                <Footer />
            </section>
        </>
    )
}