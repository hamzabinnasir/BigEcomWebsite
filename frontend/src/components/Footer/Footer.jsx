import "./footer.css"
import React from "react"
import footerData from "./footerData.js"
export default function Footer() {
    return (
        <>
            <footer id="footer">
                <div className="footerTopSection">
                    {
                        footerData.map((footerUl) =>
                            <ul key={footerUl._id} className="footerUl">
                                <h4>{footerUl.title}</h4>
                                {
                                    footerUl.footerListItems.map((footerLi, index) =>
                                        <li key={index}>{footerLi}</li>
                                    )
                                }
                            </ul>
                        )
                    }
                </div>

                <div className="footerBottomSection">
                    <p className="fCprPara"><span>&copy;</span>2023 by Company. All rights reserved.</p>
                    <p className="fmw">Made with love by Me.</p>
                    <p className="iconMade">Icons made by <span className="spanUnderLine">Material Ui</span> from <span className="spanUnderLine">www.materialui.com</span></p>
                </div>
            </footer>
        </>
    )
}