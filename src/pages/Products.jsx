import { useState } from 'react';
import { TEMPLATES } from '../components/templates';
import Section from "../components/Section";
import Header from "../components/Header/Header";
import TabButton from "../components/TabButton";
import Tabs from "../components/Tabs";
import Cards from "../components/Cards/Cards";

import '../components/PageStyle/Products.css'
import '../App.css'
import '../index.css'

export default function Products() {
    const [selectedCat, setSelectedCat] = useState("");
  
    function handleSelect(selectedButton) {
      setSelectedCat(selectedButton);
    }
  
    let tabContent = <h2>Please Select a topic</h2>;
  
    if (selectedCat) {
      tabContent = (
        <div className="tabs-details">

        </div>
      );
    }
  
    return (
        <>
        <Header />
        <Section className='body'>
            {/* <div className="page-box"> */}
                <div className="products-intro">
                    <h1>Get a <span>Website</span> at <span>Low Cost </span>for Your Business Within <span>a Day</span></h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A mollitia, quas harum deserunt aperiam laudantium, impedit libero dolor reprehenderit sapiente, saepe similique vitae. Sequi veniam iure tempore eum quae rerum.</p>
                </div>
                <div id="templates">
                    <ul>
                        {TEMPLATES.map(templateItem => <Cards key={templateItem.title} {...templateItem} />)}
                    </ul>
                </div>
            {/* </div> */}
        </Section>
        </>
    )
}