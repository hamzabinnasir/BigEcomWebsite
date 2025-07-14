import "./productCategory.css"
import shopContext from "../../context/shopContext";
import React, { useContext, useEffect, useState } from "react"
import assets from "../../assets/assetsFile";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Product from "../../components/Product/Product.jsx"
import axios from "axios";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
export default function ProductCategory() {
    let { topLevelCategory, secondLevelCategory, thirdLevelCategory } = useParams();
    let { backendURL, currency } = useContext(shopContext);
    let [categoryProducts, setCategoryProducts] = useState([]);
    let [color, setColor] = useState([]);
    let [size, setSize] = useState([]);
    let [priceRange, setPriceRange] = useState("");
    let [discountRange, setDiscountRange] = useState("");
    let [availability, setAvailability] = useState("");
    const [openBox1, setOpenBox1] = useState(false);
    const [openBox2, setOpenBox2] = useState(false);
    const [openBox3, setOpenBox3] = useState(false);
    const [openBox4, setOpenBox4] = useState(false);
    const [openBox5, setOpenBox5] = useState(false);

    const handleColor = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;
        if (checked) {
            let success = true;
            for (let i = 0; i < color.length; i++) {
                if (color[i] === value) {
                    success = false;
                    break;
                }
            }

            if (success === true) {
                setColor([...color, value]);
            }
        } else {
            setColor(color.filter((c) => c !== value));
        }
    }

    const handleSize = (e) => {
        let value = e.target.value;
        let success = true;
        for(let i = 0 ; i < size.length; i++){
            if(size[i] === value){
                success = false;
                break;
            }
        }
        if(success === true){
            setSize((prev) => [...prev, value]);
        }else{
            setSize(size.filter((item) => item !== value));
        }
    }

    const handleSort = (e) => {
        let value = e.target.value;
        if (categoryProducts) {
            switch (value) {
                case "lowToHigh":
                    sortFromLowToHigh();
                    break;
                case "highToLow":
                    sortFromHighToLow();
                    break;
                default:
                    break;
            }
        }
    }

    const sortFromLowToHigh = () => {
        let temp;
        for (let i = 0; i < categoryProducts.length - 1; i++) {
            for (let j = 0; j < categoryProducts.length - i - 1; j++) {
                if (categoryProducts[j].price > categoryProducts[j + 1].price);
                temp = categoryProducts[j];
                categoryProducts[j] = categoryProducts[j + 1];
                categoryProducts[j + 1] = temp;
            }
        }
    }

    const sortFromHighToLow = () => {
        let temp;
        for (let i = 0; i < categoryProducts.length - 1; i++) {
            for (let j = 0; j < categoryProducts.length - i - 1; j++) {
                if (categoryProducts[j].price < categoryProducts[j + 1].price);
                temp = categoryProducts[j];
                categoryProducts[j] = categoryProducts[j + 1];
                categoryProducts[j + 1] = temp;
            }
        }
    }

    useEffect(() => {
        const getFilteredProducts = async () => {
            try {
                let payload = {
                    topLevelCategory,
                    secondLevelCategory,
                    thirdLevelCategory,
                    color,
                    size,
                    priceRange,
                    discountRange,
                    availability,
                };

                let response = await axios.post(`${backendURL}/api/product/filter`, payload);
                if (response.data.success) {
                    setCategoryProducts(response?.data?.findedFilteredProducts);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getFilteredProducts();
    }, [backendURL, availability, color, discountRange, priceRange, secondLevelCategory, thirdLevelCategory, topLevelCategory, size]);
    return (
        <>
            <div className="productCategorySection">
                <Header />
                <Navbar />
                <div className="proCatSecHeader">
                    <h1>Product</h1>
                    <div className="headerBox">
                        <select onChange={(e) => handleSort(e)} id="proCatSecHeadSelect">
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                        <img src={assets.sortIcon} alt="no img" />
                    </div>
                </div>


                <div className="categoryPageFilterSection">
                    <h3 className="filterHead">Filters</h3>
                    <div className="filterBoxAndProductSec">
                        <div className="filterBox">
                            <div className="filterCardContainer">
                                {/* Filter Card */}
                                <div className="filterCard">
                                    <p>color</p>
                                    <div onClick={() => setOpenBox1(!openBox1)} className="addIcon">
                                        {
                                            openBox1 ?
                                                <RemoveIcon />
                                                :
                                                <AddIcon />
                                        }
                                    </div>
                                    {
                                        openBox1 ?
                                            <div className="openCard">
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"white"} />
                                                    <p>white</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"beige"} />
                                                    <p>beige</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"blue"} />
                                                    <p>blue</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"brown"} />
                                                    <p>brown</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"green"} />
                                                    <p>green</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"purple"} />
                                                    <p>purple</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleColor(e)} type="checkbox" value={"yellow"} />
                                                    <p>yellow</p>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                                {/* Filter Card */}
                                <div className="filterCard">
                                    <p>size</p>
                                    <div onClick={() => setOpenBox2(!openBox2)} className="addIcon">
                                        {

                                            openBox2 ?
                                                <RemoveIcon />
                                                :
                                                <AddIcon />

                                        }
                                    </div>
                                    {

                                        openBox2 ?
                                            <div className="openCard">
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleSize(e)} type="checkbox" value={"S"} />
                                                    <p>S</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleSize(e)} type="checkbox" value={"M"} />
                                                    <p>M</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => handleSize(e)} type="checkbox" value={"L"} />
                                                    <p>L</p>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                                {/* Filter Card */}
                                <div className="filterCard">
                                    <p>price</p>
                                    <div onClick={() => setOpenBox3(!openBox3)} className="addIcon">
                                        {

                                            openBox3 ?
                                                <RemoveIcon />
                                                :
                                                <AddIcon />

                                        }
                                    </div>
                                    {

                                        openBox3 ?
                                            <div className="openCard">
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setPriceRange(e.target.value)} type="radio" name="priceRange" value="159 to 399" />
                                                    <p>{currency}159 To {currency}399</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setPriceRange(e.target.value)} type="radio" name="priceRange" value="399 to 999" />
                                                    <p>{currency}399 To {currency}999</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setPriceRange(e.target.value)} type="radio" name="priceRange" value="999 to 1999" />
                                                    <p>{currency}999 To {currency}1999</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setPriceRange(e.target.value)} type="radio" name="priceRange" value="1999 to 2999" />
                                                    <p>{currency}1999 To {currency}2999</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setPriceRange(e.target.value)} type="radio" name="priceRange" value="3999 to 4999" />
                                                    <p>{currency}3999 To {currency}4999</p>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                                {/* Filter Card */}
                                <div className="filterCard">
                                    <p>discount range</p>
                                    <div onClick={() => setOpenBox4(!openBox4)} className="addIcon">
                                        {

                                            openBox4 ?
                                                <RemoveIcon />
                                                :
                                                <AddIcon />


                                        }
                                    </div>
                                    {

                                        openBox4 ?
                                            <div className="openCard">
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="10" />
                                                    <p>10% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="20" />
                                                    <p>20% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="30" />
                                                    <p>30% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="40" />
                                                    <p>40% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="50" />
                                                    <p>50% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="60" />
                                                    <p>60% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="70" />
                                                    <p>70% and above</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setDiscountRange(e.target.value)} type="radio" name="discountRange" value="80" />
                                                    <p>80% and above</p>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                                {/* Filter Card */}
                                <div className="filterCard">
                                    <p>avalilability</p>
                                    <div onClick={() => setOpenBox5(!openBox5)} className="addIcon">
                                        {

                                            openBox5 ?
                                                <RemoveIcon />
                                                :
                                                <AddIcon />

                                        }
                                    </div>
                                    {

                                        openBox5
                                            ?
                                            <div className="openCard">
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setAvailability(e.target.value)} type="radio" name="avalilability" value="inStock" />
                                                    <p>In Stock</p>
                                                </div>
                                                <div className="openCardInpField">
                                                    <input onChange={(e) => setAvailability(e.target.value)} type="radio" name="avalilability" value="outOfStock" />
                                                    <p>Out Of Stock</p>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                        </div>


                        {/* Products Data */}
                        <div className="filteredProductContainer">
                            {
                                categoryProducts?.map((item, index) =>
                                    <Product key={index} imageUrl={item.imageUrl} brand={item.brand} title={item.title} productId={item._id} />
                                )
                            }
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}