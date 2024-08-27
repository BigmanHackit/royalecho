import React from "react";
import './Content.css'
import ContentHeader from "../ContentHeader/ContentHeader";
import Card from "../Card/Card";
import ClientList from "../ClientList/ClientList";

export default function Content() {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <ClientList />
        </div>
    )
}