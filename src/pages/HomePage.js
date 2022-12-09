import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import CardComponent from '../components/Card/CardComponent'
import HeaderComponent from '../components/Header/HeaderComponent'
import SideBarComponent from '../components/SideBar/SideBarComponent'
import { deleteUser, feachUser } from '../redux';

function HomePage( { fetchData, deleteUser, userData } ) {

    const scrollContainer = useRef();

    useEffect( () => {
        fetchData();
    }, [] )

    useEffect( () => {

        if( userData.loading ) return;

        /*** Make message call till page got scrollable ***/
        let scrollelem = scrollContainer.current;
        ( scrollelem.scrollHeight <= scrollelem.clientHeight ) && fetchData();

    }, [ userData.pageToken ] )

    function handlePageScroll( { target } ) {
        if( (target.clientHeight + target.scrollTop) > target.scrollHeight - 50 )
        {
            fetchData();
        }
    }

    return (
        <section className="page_main">
            <HeaderComponent />
            <SideBarComponent />
            <section className="page_list page_anim" ref={ scrollContainer } onScroll={ ( ev ) => handlePageScroll( ev ) }>
                {!userData.users.length ? <h1>Loading...</h1> : userData.users.map( ( cardData, index ) => { 
                    return <CardComponent key={ cardData.id } index={ index } handleDelete={ deleteUser } {...cardData} />;
                })}
            </section>
        </section>
    )
}

const mapStateToProps = ( state ) => {
    return {
        userData : state.users
    }
}
const mapDispatchToProps = {
    fetchData : feachUser,
    deleteUser : deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)