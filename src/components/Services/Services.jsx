import { useState } from 'react';
import { SERVICES} from '../data.js'
import './Services.css';
import Section from '../Section';
import Tabs from '../Tabs';
import TabButton from '../TabButton'
import Card from '../Cards/Cards';


export default function Services () {
    const [selectedTopic, setSelectedTopic] = useState("");
  
    function handleSelect(selectedButton) {
      setSelectedTopic(selectedButton);
    }
  
    let tabContent = <h2>Please Select a topic</h2>;
  
    if (selectedTopic) {
      tabContent = (
        <div className="tabs-details">
          <h2>{SERVICES[selectedTopic].title}</h2>
          <p>{SERVICES[selectedTopic].description}</p>
          <pre>
            <code>{SERVICES[selectedTopic].data}</code>
          </pre>
        </div>
      );
    }
  
    return (
        <Section title={<span>Services</span>} className="services">
            <Tabs buttons={
                <>
                    <TabButton
                    isSelected={selectedTopic==="marketing"}
                    onClick={() => handleSelect("marketing")}
                    >
                        MARKETING
                    </TabButton> 

                    <TabButton
                    isSelected={selectedTopic==="seo"}
                    onClick={() => handleSelect("seo")}
                    >
                        SEO
                    </TabButton> 

                    <TabButton
                    isSelected={selectedTopic==="web"}
                    onClick={() => handleSelect("web")}>
                        WEB SERVICES
                    </TabButton> 

                    <TabButton
                    isSelected={selectedTopic==="training"}
                    onClick={() => handleSelect("training")}>
                        TRAINING
                    </TabButton> 
                </>
            }
            >
                {tabContent}
            </Tabs>
        </Section>
    )
}